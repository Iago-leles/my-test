import type { State } from '@/types'

export class StateModel implements State {
  constructor(
    public name: string,
    public shortname: string,
  ) {}

  static fromJson(json: any): StateModel {
    return new StateModel(json.name, json.shortname)
  }
}
