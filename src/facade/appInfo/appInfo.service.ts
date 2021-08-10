import { Service } from "../../common/service";
import { AppInfoClient } from "./appInfo.client";



export class AppInfoService extends Service {
  private client = new AppInfoClient()


  getAppInfo(version: string) {
    
  }
}