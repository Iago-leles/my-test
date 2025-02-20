import type { HotelData } from '@/types'
import { HotelModel } from './HotelModel'

export class HotelDataModel implements HotelData {
  constructor(
    public hotels: HotelModel[],
    public placeId: number,
  ) {}

  static fromJson(json: any): HotelDataModel {
    return new HotelDataModel(
      json.hotels.map((h: any) => HotelModel.fromJson(h)),
      json.placeId,
    )
  }
}
