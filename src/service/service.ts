import {UserContext} from 'koa';

export abstract class Service {
  protected userContext: UserContext | undefined;

  setUserContext(userContext: UserContext | undefined) {
    this.userContext = userContext;

    return this;
  }
}
