import axios from "axios";
import { BookingRequest, BookingResponse } from "@interfaces/book";

export class Shippop {
  apiKey: string;
  baseUrl: string;

  constructor(apiKey: string, baseUrl: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
  }

  // internal API
  book() {}
  confirmPurchase() {}
  cancelOrder() {}

  // use cases
  getTrackingData() {}
}
