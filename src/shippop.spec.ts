import Shippop, { AddressObject } from "..";
import { BookingDataObject } from "./interfaces/book";
import { ParcelObject } from "./interfaces/object";
import { ProductObject } from "./interfaces/object";

const apiKey =
  "dvb8324bdba7bcbfb3f0d7931758d1bd4742f21728427efd36553303bae1129d82c7bba53cb90ec4891682669068";
const baseUrl = "https://mkpservice.shippop.dev";
const email = "simbarkarkai@test.com";

const shippop = new Shippop(apiKey, baseUrl, email);

const sampleSenderAddress: AddressObject = {
  name: " เท็นๆ",
  address: "2 ถ.ไดแอกอน",
  district: "ดุสิต",
  state: "ดุสิต",
  province: "กรุงเทพมหานคร",
  postcode: "10300",
  tel: "0656626694",
};

const sampleValidCustomerAddress: AddressObject = {
  name: "แฟร้งกี้",
  address: "2 ถ.ไดแอกอน",
  district: "จอมพล",
  state: "จตุจักร",
  province: "กรุงเทพมหานคร",
  postcode: "10900",
  tel: "0944969638",
};

const sampleInvalidCustomerAddress: AddressObject = {
  name: "แฟร้งกี้",
  address: "2 ถ.ไดแอกอน",
  district: "จอมพล",
  state: "จตุจักร",
  province: "กรุงเทพมหานคร",
  postcode: "1090000",
  tel: "0944969638",
};

const sampleParcel: ParcelObject = {
  name: "sample parcel",
  weight: 100,
  width: 10,
  length: 10,
  height: 10,
  default: 0,
};

const sampleProduct: ProductObject = {
  product_code: "SKU0001",
  name: "wowza product",
  // detail	yes	String	คำอธิบายของสินค่านั้นๆ
  // price	yes	Float	ราคาของสินค้าที่ขายในกล่องพัสดุ
  // amount	yes	Integer	จำนวนสินค้าที่ขายในกล่องพัสดุ
  weight: 100, //		Float	น้ำหนักของพัสดุ หน่วยเป็น กรัม เช่น 500
};

const bookingObj: BookingDataObject = {
  from: sampleSenderAddress,
  to: sampleValidCustomerAddress,
  parcel: sampleParcel,
  product: [sampleProduct],
  courier_code: "DHL",
  // remark?: string;
  // cod_amount?: number;
  // insurance_code?: string;
  // declared_value?: number;
  // branch_id?: string;
  // pre_barcode?: string;
};

it("can book and confirm with valid addresses", async () => {
  const bookingResponse = await shippop.bookAndConfirm([bookingObj]);

  expect(bookingResponse.status).toBe(true);
  expect(bookingResponse).toHaveProperty("purchase_id");
  expect(bookingResponse).toHaveProperty("total_price");
  expect(bookingResponse).toHaveProperty("data");
});
