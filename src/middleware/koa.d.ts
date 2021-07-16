import 'koa';

declare module 'koa' {
  interface ExtendableContext {
    userContext?: UserContext;
    userAgent?: MIUserAgent;
  }

  interface UserContext {
    userId?: string;
    userName?: string
    userType?: MIUserType;
  }

  interface MIUserAgent {
    os: MIUserAgentOSType;
    version: string;
    packageName: string;
    deviceName: string;
  }
}
