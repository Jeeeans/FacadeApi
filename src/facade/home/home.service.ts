import { Service } from "../../common/service";
import { HomeClient } from "./home.client";
import { HomeModel } from "./data/home.dto"
import { BigBannerListModel, BigBannerModel, MediumBannerModel, ModuleData, ModuleModel, SmallContentListModel, SmallContentModel } from "../../common/data/module.dto";
import { BigBannerBiz, BigBannerListBiz, MediumBannerBiz, SmallContentBiz, SmallContentListBiz } from "../../common/data/module.biz";
import { Module } from "module";
import { ModuleType } from "../../common/constant/enum/moduleType.enum";

export class HomeService extends Service {
  private client = new HomeClient()

  async getHome(version: string) {
    var homeBiz = await this.client.getHome()

    var moduleList: ModuleModel[] = []

    homeBiz.moduleList.forEach((module) => {
      var model: ModuleData
      switch(module.type) {
        case ModuleType.BigBannerList:
          const bigBannerList = module.data as BigBannerListBiz
          model = this.convertBigBannerList(bigBannerList)
          break
          
        case ModuleType.BigBanner:
          const bigBanner = module.data as BigBannerBiz
          model = this.convertBigBanner(bigBanner)
          break

        case ModuleType.MediumBanner:
          const mediumBanner = module.data as MediumBannerBiz
          model = this.convertMediumBanner(mediumBanner)
          break

        case ModuleType.SmallContentsList:
          const smallContentList = module.data as SmallContentListBiz
          model = this.convertSmallContentList(smallContentList)
          break

        default:
          model = new ModuleData()
          break
      }

      moduleList.push(new ModuleModel(module.type, model))
    })


    return new HomeModel(
      homeBiz.moduleList
    )
  }

  private convertBigBanner(data: BigBannerBiz){
    return new BigBannerModel(
         data.imageUrl,
         data.landingUrl,
         data.title,
         data.description
    )
  }

  private convertBigBannerList(data: BigBannerListBiz) {
    var list: BigBannerModel[] = []

    data.list.forEach((banner) => {
      list.push(this.convertBigBanner(banner))
    })

    return new BigBannerListModel(
        data.title,
        list
        )
  }

  private convertMediumBanner(data: MediumBannerBiz) {

    return new MediumBannerModel(
      data.imageUrl,
      data.landingUrl,
      data.title,
      data.description
    )
  }

  private convertSmallContentList(data: SmallContentListBiz) {
    const list: SmallContentModel[] =[]

    data.list.forEach((banner)=>{
      list.push(this.convertSmallContent(banner))
    })

    return new SmallContentListModel(
      data.title,
      list
    )
  }

  private convertSmallContent(data: SmallContentBiz) {
    return new SmallContentModel(
      data.imageUrl,
      data.title,
      data.description
    )
  }
}