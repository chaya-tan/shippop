import axios from "axios";
import { BookingRequest, BookingResponse } from "@interfaces/book";

export class Shippop {
  apiKey: string;
  baseUrl: string;

  constructor(apiKey: string, baseUrl: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  get bookingEndPoint() {
    return `${this.baseUrl}/booking/`;
  }

  get confirmEndPoint() {
    return `${this.baseUrl}/confirm/`;
  }

  // internal API
  book() {}
  confirmPurchase() {}
  cancelOrder() {}

  // use cases
  getTrackingData() {}
}
