import Koa from 'koa';
import { Controller, Get, Request, Route } from "tsoa";
import { AppInfoService } from "./appInfo.service";


@Route('v1/app')
export class AppInfoController extends Controller {
  private service = new AppInfoService()

  @Get('/info')
  async getAppInfo(@Request() request: Koa.Request) {
    const version = request.ctx.userAgent?.version ?? "1.0.0"
    return this.service.getAppInfo(version)
  }
}