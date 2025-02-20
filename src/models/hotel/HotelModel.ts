import type { Hotel } from '@/types'
import { AddressModel } from './AddressModel'
import { AmenityModel } from './AmenityModel'

export class HotelModel implements Hotel {
  constructor(
    public id: number,
    public favorite: boolean,
    public name: string,
    public description: string,
    public stars: string,
    public thumb: string,
    public amenities: AmenityModel[] | null,
    public hasBreakFast: boolean,
    public hasRefundableRoom: boolean,
    public hasAgreement: boolean,
    public nonRefundable: null,
    public address: AddressModel,
    public images: string[],
    public deals: null,
    public roomsQuantity: number,
    public price: number,
  ) {}

  static fromJson(json: any): HotelModel {
    return new HotelModel(
      json.id,
      json.favorite,
      json.name,
      json.description,
      json.stars,
      json.thumb,
      json.amenities ? json.amenities.map((a: any) => AmenityModel.fromJson(a)) : null,
      json.hasBreakFast,
      json.hasRefundableRoom,
      json.hasAgreement,
      json.nonRefundable,
      AddressModel.fromJson(json.address),
      json.images,
      json.deals,
      json.roomsQuantity,
      json.price,
    )
  }

  getFormattedPrice(): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(this.price)
  }

  getStarsCount(): number {
    return parseInt(this.stars, 10)
  }
}
