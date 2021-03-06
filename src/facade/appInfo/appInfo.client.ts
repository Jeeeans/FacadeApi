import Axios from "axios"
import { ApiClient } from "../../common/api.client"


export class AppInfoClient extends ApiClient {
  private client = Axios.create({
    baseURL: process.env.HOME_API_URL,
    timeout: Number(process.env.HOME_API_TIMEOUT)
  })

  async getAppInfo() {
    const res = await this.client.get<AppInfoBizResponse>('v1/appInfo');
    return res.data
  }
}