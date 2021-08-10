
export interface ModuleDataBiz {

}

export interface ModuleBiz {
  type: string
  data: ModuleDataBiz
}

export interface BigBannerListBiz extends ModuleDataBiz {
  title: string
  list: BigBannerBiz[]
}

export interface BigBannerBiz extends ModuleDataBiz {
  imageUrl: string
  landingUrl: string
  title: string
  description: string
}

export interface MediumBannerBiz extends ModuleDataBiz {
  imageUrl: string
  landingUrl: string
  title: string
  description: string
}

export interface SmallContentListBiz extends ModuleDataBiz {
  title: string
  list: SmallContentBiz[]
}

export interface SmallContentBiz extends ModuleDataBiz {
  imageUrl: string
  title: string
  description: string
}

