import { Service } from "../../common/service";
import { AppInfoClient } from "./appInfo.client";
import { AppInfoModel } from "./data/appinfo.dto";



export class AppInfoService extends Service {
  private client = new AppInfoClient()


  async getAppInfo(version: string) {
    var appInfo = await this.client.getAppInfo()

    return new AppInfoModel(
      appInfo.isForceUpdate,
      appInfo.isLottieSplash,
      appInfo.splashImageUrl,
      appInfo.tabList
    )
  }
}