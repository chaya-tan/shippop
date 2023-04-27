import { ParcelObject, AddressObject, ProductObject } from "@interfaces/object";

export interface BookingResponseObject {
  price: number;
  from: AddressObject;
  to: AddressObject;
  parcel: ParcelObject;
  courier_code: string;
  status: boolean;
  tracking_code: string;
  courier_tracking_code: string;
  discount: number;
  cod_amount?: number;
  cod_charge?: number;
  price_fuel_surcharge?: number;
  price_travel_area?: number;
  price_remote_area?: number;
}

export interface BookingDataObject {
  from: AddressObject;
  to: AddressObject;
  parcel: ParcelObject;
  product: ProductObject[];
  courier_code: string;
  remark?: string;
  // starttime	yes	Time	กำหนดเวลาในการเข้ารับสินค้า (สำหรับเลือกขนส่ง Skootar เท่านั้น)
  // finishtime	yes	Time	กำหนดเวลาที่สินค้าจะถึงผู้รับ (สำหรับเลือกขนส่ง Skootar เท่านั้น)
  cod_amount?: number;
  insurance_code?: string;
  declared_value?: number;
  branch_id?: string;
  pre_barcode?: string;
}

export interface BookingRequest {
  api_key: string;
  email: string;
  promo_code?: string;
  token?: string;
  domain?: string;
  url: {
    success: string;
    fail: string;
  };
  data: BookingDataObject[];
}

export interface BookingResponse {
  status: boolean;
  code: number;
  data: BookingResponseObject[];
  purchase_id: number;
  payment_url?: string;
  total_price: number;
}
