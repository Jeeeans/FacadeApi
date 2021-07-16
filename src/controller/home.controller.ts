import Koa from 'koa';
import {Route, Get, Controller, Request } from 'tsoa';
import {HomeService} from '../service/home.service';
import {
  ForbiddenReasonType,
  ForbiddenActionType,
  ForbiddenError,
} from '../error/forbidden.error';

@Route('v1/home')
export class HomeController extends Controller {
  private homeService: HomeService;

  constructor() {
    super();
    this.homeService = new HomeService();
  }

  @Get('/main')
  async getHomeMain(@Request() request: Koa.Request) {    
    
    const version = request.ctx.userAgent?.version

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

  @Get('/popup')
  async getPopup() {
    return this.homeService.getPopupSlotAll()
  }

}
