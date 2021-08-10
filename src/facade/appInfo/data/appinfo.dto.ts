


export class AppInfoModel {
  isForceUpdate: boolean
  isLottieSplash: boolean
  splashImageUrl: string

  constructor(isForceUpdate: boolean, isLottieSplash: boolean, splashImageUrl: string) {
    this.isForceUpdate = isForceUpdate
    this.isLottieSplash = isLottieSplash
    this.splashImageUrl = splashImageUrl
  }
}