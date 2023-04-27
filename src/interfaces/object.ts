export interface AddressObject {
  province: string;
  state: string;
  district: string;
  postcode: string;
  address: string;
  name: string;
  tel: string;
}

export interface ParcelObject {
  parcel_size?: number;
  name: string;
  weight: number;
  width: number;
  length: number;
  height: number;
  default: number;
}

export interface ProductObject {
  product_code: string;
  name: string;
  detail?: string;
  price?: number;
  amount?: number;
  weight: number;
}

export interface PostOfficeObject {
  id: number;
  name: string;
  postcode: string;
  latlong: string;
}
