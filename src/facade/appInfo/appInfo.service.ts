import { Service } from "../../common/service";
import { AppInfoClient } from "./appInfo.client";
import { AppInfoModel } from "./data/appinfo.dto";



export class AppInfoService extends Service {
  private client = new AppInfoClient()


  getAppInfo(version: string) {
    return new AppInfoModel(
      false,
      false,
      ""
    )
  }
}