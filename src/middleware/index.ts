import Koa, {UserContext, MIUserAgent} from 'koa';
import { CommonInfo } from '../common/info.common';

export enum MIUserAgentOSType {
  IOS = 'iOS',
  ANDROID = 'Android',
}

export enum MIUserType {
  BUYER = 'buyer',
  SELLER = 'seller',
  ADMIN = 'admin',
}

export function userContextParser(): Koa.Middleware {
  return async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
    const userId = ctx.request.get('X-MUSTIT-UserId');
    if (userId !== '') {
      ctx.userContext = {
        userId,
      } as UserContext;

      const userType = ctx.request.get('X-MUSTIT-UserType');
      if (
        userType == MIUserType.BUYER ||
        userType == MIUserType.SELLER ||
        userType == MIUserType.ADMIN
      ) {
        ctx.userContext.userType = userType as MIUserType;
      }

      ctx.userContext.userName = decodeURIComponent(ctx.request.get('X-MUSTIT-UserName'));
    }

    await next();
  };
}

export function userAgentParser(): Koa.Middleware {
  const prefix = 'MobileApp/1.0';

  return async (ctx: Koa.ParameterizedContext, next: Koa.Next) => {
    const userAgentString = ctx.request.get('User-Agent');
    if (userAgentString.includes(prefix)) {
      const deviceDataString = userAgentString
        .split(prefix)[1]
        .replace(' (', '')
        .replace(')', '');

      const deviceData = deviceDataString.split('; ');
      CommonInfo.shared.appVersion = deviceData[1]
      
      ctx.userAgent = {
        os: deviceData[0] as MIUserAgentOSType,
        version: deviceData[1],
        packageName: deviceData[2],
        deviceName: deviceData[3],
      } as MIUserAgent;
    }

    await next();
  };
}
