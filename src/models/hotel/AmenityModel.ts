import type { Amenity } from '@/types'

export class AmenityModel implements Amenity {
  constructor(
    public key: string,
    public label: string,
  ) {}

  static fromJson(json: any): AmenityModel {
    return new AmenityModel(json.key, json.label)
  }
}
