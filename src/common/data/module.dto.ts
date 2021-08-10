

export class ModuleData {

}

export class ModuleModel {
  type: string
  data: ModuleData

  constructor(type: string, data: ModuleData) {
    this.type = type
    this.data = data
  }
}

export class BigBannerListModel extends ModuleData {
  title: string
  list: BigBannerModel[]

  constructor(title: string, list: BigBannerModel[]) {
    super()
    this.title = title
    this.list = list
  }
}

export class BigBannerModel extends ModuleData {
  imageUrl: string
  landingUrl: string
  title: string
  description: string


  constructor(
    imageUrl: string, 
    landingUrl: string, 
    title: string, 
    description: string
) {
  super()
    this.imageUrl = imageUrl
    this.landingUrl = landingUrl
    this.title = title
    this.description = description
  }

}

export class MediumBannerModel extends ModuleData {
  imageUrl: string
  landingUrl: string
  title: string
  description: string


  constructor(
    imageUrl: string, 
    landingUrl: string, 
    title: string, 
    description: string
) {
  super()
    this.imageUrl = imageUrl
    this.landingUrl = landingUrl
    this.title = title
    this.description = description
  }

}

export class SmallContentListModel extends ModuleData {
  title: string
  list: SmallContentModel[]


  constructor(title: string, list: SmallContentModel[]) {
    super()
    this.title = title
    this.list = list
  }

}

export class SmallContentModel extends ModuleData {
  imageUrl: string
  title: string
  description: string


  constructor(imageUrl: string, title: string, description: string) {
    super()
    this.imageUrl = imageUrl
    this.title = title
    this.description = description
  }
}

