import {AxiosInstance} from 'axios';
import {UserContext} from 'koa';

export abstract class ApiClient {
  protected userContext: UserContext | undefined;

  setUserContext(userContext: UserContext | undefined) {
    this.userContext = userContext;

    return this;
  }

  addInterceptor(client: AxiosInstance) {
    client.interceptors.request.use(config => {
      if (this.userContext?.userId) {
        config.headers['X-UserId'] = this.userContext.userId;

        if (this.userContext?.userType) {
          config.headers['X-UserType'] = this.userContext.userType;
        }
      }

      return config;
    });
  }
}
