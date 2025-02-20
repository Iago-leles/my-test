import type { Place } from '@/types'
import { StateModel } from '../state/StateModel'

export class PlaceModel implements Place {
  constructor(
    public name: string,
    public state: StateModel,
    public placeId: number,
  ) {}

  static fromJson(json: any): PlaceModel {
    return new PlaceModel(json.name, StateModel.fromJson(json.state), json.placeId)
  }
}
