import type { Address } from '@/types'

export class AddressModel implements Address {
  constructor(
    public street: string,
    public number: string,
    public district: string,
    public city: string,
    public state: string,
    public country: string,
    public zipCode: string | null,
    public fullAddress: string,
  ) {}

  static fromJson(json: any): AddressModel {
    return new AddressModel(
      json.street,
      json.number,
      json.district,
      json.city,
      json.state,
      json.country,
      json.zipCode,
      json.fullAddress,
    )
  }
}
