import Koa from 'koa';
import {Route, Get, Controller, Request } from 'tsoa';
import {
  ForbiddenReasonType,
  ForbiddenActionType,
  ForbiddenError,
} from '../../error/forbidden.error';
import { HomeService } from './home.service';

@Route('v1/home')
export class HomeController extends Controller {
  private homeService: HomeService;

  constructor() {
    super();
    this.homeService = new HomeService();
  }

  @Get('/main')
  async getHomeMain(@Request() request: Koa.Request) {    
    
    const version = request.ctx.userAgent?.version ?? "1.0.0"

    return this.homeService
    .setUserContext(request.ctx.userContext)
    .getHome(version);
  }

  @Get('/user')
  async getUser(@Request() request: Koa.Request) {
    if (request.ctx.userContext) {
      return request.ctx.userContext;
    } else {
      throw new ForbiddenError(
        ForbiddenReasonType.InsufficientPermission,
        ForbiddenActionType.Login,
      );
    }
  }
}
