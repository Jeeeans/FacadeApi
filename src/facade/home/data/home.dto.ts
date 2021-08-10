import { ModuleModel } from "../../../common/data/module.dto";


export class HomeModel {
  moduleList: ModuleModel[]

  constructor(moduleList: ModuleModel[]) {
    this.moduleList = moduleList
  }
}