import { toInteger } from "lodash"

export class CommonInfo {
  static shared = new CommonInfo()


  appVersion: string = ""


  checkAppVersion(version: string) : Boolean {
    let cvList = version.split('.')
    let av = this.appVersion.replace("-debug", "")
    let avList = av.split('.')
    
    if (cvList.length == avList.length) {
      for(var i = 0 ; i < avList.length; i++ ){
        if (toInteger(avList[i]) > toInteger(cvList[i])) {
          return true
        }
      }
    }

    return false
  }
}