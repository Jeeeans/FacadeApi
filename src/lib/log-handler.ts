import Koa from "koa";
import _ from 'lodash';
import { logger } from "./logger";

export async function requestLogHandler(ctx: Koa.ParameterizedContext, next: Koa.Next) {
  next()

  const querystring = ctx.querystring === '' ? 'N/A' : ctx.querystring;

  logger.info(ctx.message, {    
    parameter: `querystring: ${querystring}, body: ${JSON.stringify(
      _.omit(ctx.request.body, ['password']),
    )}`,
    http_method: ctx.request.method,
    request_url: ctx.path,
    user_id: ctx?.userContext?.userId,
    user_type: ctx?.userContext?.userType,
    http: {
      response: {
        status_code: ctx.status
      }
    }
  })
}