import axios from "axios";
import { BookingRequest, BookingResponse } from "@interfaces/book";
import { BookingDataObject } from "./interfaces/book";

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
  async book(
    bookingDataObjects: BookingDataObject[]
  ): Promise<{ purchaseId: number; bookingResponseData: BookingResponse }> {
    try {
      return await axios<BookingResponse>({
        method: "post",
        url: this.bookingEndPoint,
        data: bookingDataObjects,
      }).then((bookingResponse) => {
        const bookingResponseData = bookingResponse.data;
        const purchaseId = bookingResponse.data.purchase_id;
        return { bookingResponseData, purchaseId };
      });
    } catch (e) {
      throw new Error(
        typeof e === "string"
          ? e
          : e instanceof Error
          ? e.message
          : "Unknown error occurred on booking process"
      );
    }
  }

  async confirmPurchase(purchaseId: number) {
    try {
      return axios({
        method: "post",
        url: this.confirmEndPoint,
        data: {
          api_key: this.apiKey,
          purchase_id: purchaseId,
        },
      });
    } catch (e) {
      throw new Error(
        typeof e === "string"
          ? e
          : e instanceof Error
          ? e.message
          : "Unknown error occurred on confirm purchase process"
      );
    }
  }

  async bookAndConfirm(
    bookingDataObjects: BookingDataObject[]
  ): Promise<BookingResponse> {
    const { purchaseId, bookingResponseData } = await this.book(
      bookingDataObjects
    );
    await this.confirmPurchase(purchaseId);
    return bookingResponseData;
  }

  // use cases
  getTrackingData() {}
}
