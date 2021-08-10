import { Service } from "../../common/service";
import { HomeClient } from "./home.client";

export class HomeService extends Service {
  private client = new HomeClient()

  getHome(version: string) {

    
  }
}