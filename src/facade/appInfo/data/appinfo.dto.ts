
export class AppInfoModel {
  isForceUpdate: boolean
  isLottieSplash: boolean
  splashImageUrl: string

  tabList: MainTabModel[]

  constructor(isForceUpdate: boolean, isLottieSplash: boolean, splashImageUrl: string, tabList: MainTabModel[]) {
    this.isForceUpdate = isForceUpdate
    this.isLottieSplash = isLottieSplash
    this.splashImageUrl = splashImageUrl
    this.tabList = tabList
  }
}

export class MainTabModel {
  title: string
  imageUrl: string
  selectedImageUrl: string
  textColor: string
  selectedTextColor: string
  apiUrl: string

  constructor(
    title: string, 
    imageUrl: string, 
    selectedImageUrl: string, 
    textColor: string, 
    selectedTextColor: string, 
    apiUrl: string
) {
    this.title = title
    this.imageUrl = imageUrl
    this.selectedImageUrl = selectedImageUrl
    this.textColor = textColor
    this.selectedTextColor = selectedTextColor
    this.apiUrl = apiUrl
  }

}