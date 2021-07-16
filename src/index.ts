import Router from '@koa/router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';
import jsonError from 'koa-json-error';
import send from 'koa-send';
import koaSwagger from 'koa2-swagger-ui';
import _ from 'lodash';
import {RegisterRoutes} from '../build/routes';
import {errorHandler} from './lib/error-handler';
import { requestLogHandler } from './lib/log-handler';
import { logger } from './lib/logger';
import {userAgentParser, userContextParser} from './middleware';
import {Metrics} from './util/metrics';

const app = new Koa();

if (
  process.env.NODE_ENV === 'development' ||
  process.env.NODE_ENV === 'production'
) {
  app.on('error', errorHandler);
}

// Stack Trace
app.use(
  jsonError({
    preFormat: err => _.omit(err, 'statusCode', 'expose'),
    postFormat: (err, obj) =>
      process.env.NODE_ENV === 'production'
        ? _.omit(obj, 'stack', 'error')
        : obj,
  }),
);

// Swagger
if (process.env.NODE_ENV !== 'production') {
  const swaggerJsonRouter = new Router().get('/swagger.json', async ctx => {
    await send(ctx, 'build/swagger.json');
  });
  app.use(swaggerJsonRouter.routes()).use(swaggerJsonRouter.allowedMethods());
  app.use(
    koaSwagger({
      swaggerOptions: {
        url: 'swagger.json',
      },
    }),
  );
}

app.use(bodyParser());
const metricPort = Number(process.env.METRICS_PORT);
if (metricPort) {
  app.use(Metrics.httpExceptionMiddleware()); // Must be called after bodyParser()
}

app.use(userContextParser());
app.use(userAgentParser());

const router = new Router();
RegisterRoutes(router);
app.use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

// logger
if (process.env.NODE_ENV !== 'production') {
  app.use(requestLogHandler);
}

if (metricPort) {
  Metrics.routePath(ctx => {
    const matchedRoute = ctx._matchedRoute;
    let path = ctx.request.path;
    if (typeof matchedRoute === 'string') {
      path = matchedRoute;
    }
    return path;
  });
  Metrics.startMetricServer(app, metricPort);
}
