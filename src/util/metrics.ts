import Router, { Middleware, RouterContext } from '@koa/router'
import Koa from 'koa'
// eslint-disable-next-line max-len
import { collectDefaultMetrics, Counter, exponentialBuckets, Histogram, register, Summary } from 'prom-client'

type RoutePathFunc = (ctx:RouterContext) => string
export class Metrics  {

  private static instance: Metrics = new Metrics()

  private metricsApp = new Koa()

  private httpRequestsTotalCounter: Counter<string>
  private httpServerRequestsSecondsHistogram: Histogram<string>
  private httpRequestSizeBytesSummary: Summary<string>
  private httpResponseSizeBytesSummary: Summary<string>
  
  routePath: RoutePathFunc = (ctx) => { 
    const path = ctx.path
    return path
  }

  private constructor() {
    const labelNames = ['method', 'uri', 'code']

    this.httpRequestsTotalCounter = new Counter({
        labelNames,
        name: 'nodejs_http_requests_total',
        help: 'Total number of HTTP requests',
    })

    this.httpRequestSizeBytesSummary = new Summary({
        labelNames,
        name: 'nodejs_http_request_size_bytes',
        help: 'Duration of HTTP requests size in bytes',
    })

    this.httpResponseSizeBytesSummary = new Summary({
        labelNames,
        name: 'nodejs_http_response_size_bytes',
        help: 'Duration of HTTP response size in bytes',
    })

    this.httpServerRequestsSecondsHistogram = new Histogram({
      labelNames,
      name: 'nodejs_http_server_requests_seconds',
      help: 'Duration of HTTP requests in seconds',
      buckets: exponentialBuckets(0.05, 1.3, 20)
    })
  }

  static routePath(func: RoutePathFunc) {
    this.instance.routePath = func
  }

  static startMetricServer(app: Koa, metricPort: number) {

    const metrics = this.instance

    metrics.startCollection(app)
    
    metrics.addHealthRouter()
    metrics.addMetricRounter()

    // start metric-server
    metrics.metricsApp.listen(metricPort, () => {
      console.log(`Metric-Server running on port ${metricPort}`);
    })
  }

  private addHealthRouter() {
    const healthRouter = new Router().get('/health', async ctx => {
      ctx.body = {
        status: 'UP',
      };
    });
    this.metricsApp.use(healthRouter.routes()).use(healthRouter.allowedMethods());
  }

  private addMetricRounter() {
    const metricsRouter = new Router().get('/metrics', async (ctx: RouterContext) => {
      ctx.headers['content-type'] = register.contentType
        ctx.body = register.metrics()
      })
      this.metricsApp.use(metricsRouter.routes()).use(metricsRouter.allowedMethods())
  }
    
  private startCollection(app: Koa) {
    collectDefaultMetrics()
    app.use(this.httpMiddleware())
  }  

  private milliseconds() {
    const now = process.hrtime()
    return (now[0] * 1e3) + (now[1] * 1e-6)
  }

  private addHttpMetric(ctx: RouterContext, startEpoch: number) {

    const path = this.routePath(ctx)
      
    const httpResponseStatus = `${ctx.response.status}`
    const httpRequestMethod = ctx.request.method

    // TotalCount
    this.httpRequestsTotalCounter
      .labels(httpRequestMethod, path, httpResponseStatus)
      .inc()

    // Request Bytes
    if (ctx.request.length) {
      this.httpRequestSizeBytesSummary
        .labels(httpRequestMethod, path, httpResponseStatus)
        .observe(ctx.request.length)
    }

    // Response Bytes
    if (ctx.response.length) {
      this.httpResponseSizeBytesSummary
        .labels(httpRequestMethod, path, httpResponseStatus)
        .observe(ctx.response.length)
    }

    // Response Time
    this.httpServerRequestsSecondsHistogram
      .labels(httpRequestMethod, path, httpResponseStatus)
      .observe((this.milliseconds() - startEpoch) / 1000)
    
  }

  static httpExceptionMiddleware(): Middleware {
    return this.instance.httpErrorMiddleware()
  }
  
  private httpErrorMiddleware(): Middleware {

    return async (ctx: RouterContext, next: Koa.Next) => {
    
      const startEpoch = this.milliseconds()
      try{
        await next()
      }
      catch(err) {
        // let path = ctx.request.path
        this.addHttpMetric(ctx, startEpoch)

        throw err
      }
    }
  }

  private httpMiddleware(): Middleware {
    
    return async (ctx: RouterContext, next: Koa.Next) => {
    
      const startEpoch = this.milliseconds()
      // let path = ctx.request.path
      await next()
      
      this.addHttpMetric(ctx, startEpoch)
    }
  }
}
