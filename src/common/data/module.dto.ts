

export interface ModuleData {

}

export interface ModuleModel {
  type: string
  data: ModuleData
}

export interface BigBannerListModel extends ModuleData {
  title: string
  list: BigBannerModel[]
}

export interface BigBannerModel extends ModuleData {
  imageUrl: string
  landingUrl: string
  title: string
  description: string
}

export interface MiddleBannerModel extends ModuleData {
  imageUrl: string
  landingUrl: string
  title: string
  description: string
}

export interface SmallContentsListModel extends ModuleData {
  title: string
  list: SmallContentsModel[]
}

export interface SmallContentsModel {
  imageUrl: string
  title: string
  description: string
}

