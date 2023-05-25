import axios from "axios";
import { BookingDataObject, BookingResponse } from "./interfaces/book";

export class Shippop {
  apiKey: string;
  baseUrl: string;
  email: string;

  constructor(apiKey: string, baseUrl: string, email: string) {
    this.apiKey = apiKey;
    this.baseUrl = baseUrl;
    this.email = email;
  }

  get bookingEndPoint() {
    return `${this.baseUrl}/booking/`;
  }

  get confirmEndPoint() {
    return `${this.baseUrl}/confirm/`;
  }

  // internal API
  async book(
    bookingDataObjects: BookingDataObject[],
    url: {
      success: string;
      fail: string;
    } = {
      success: "http://shippop.com/?success",
      fail: "http://shippop.com/?fail",
    }
  ): Promise<{ purchaseId: string; bookingResponseData: BookingResponse }> {
    try {
      return await axios<BookingResponse>({
        method: "post",
        url: this.bookingEndPoint,
        data: {
          api_key: this.apiKey,
          email: this.email,
          url,
          data: bookingDataObjects,
        },
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

  async confirmPurchase(purchaseId: string) {
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

  // use cases
  async bookAndConfirm(
    bookingDataObjects: BookingDataObject[]
  ): Promise<BookingResponse> {
    const { purchaseId, bookingResponseData } = await this.book(
      bookingDataObjects
    );
    await this.confirmPurchase(purchaseId);
    return bookingResponseData;
  }

  async getTrackingNumbers(bookingDataObjects: BookingDataObject[]): Promise<{
    purchaseId: string;
    trackingNumbers: {
      courierTrackingNumber: string;
      shippopTrackingNumber: string;
    }[];
  }> {
    const bookingResponse = await this.bookAndConfirm(bookingDataObjects);
    const { status, code, data, purchase_id } = bookingResponse;
    const bookingResponseObjects = data;

    if (code === 400) {
      throw new Error("Invalid Input Data");
    } else if (!status) {
      throw new Error("Unknown Error occurred");
    }

    return {
      purchaseId: purchase_id,
      trackingNumbers: bookingResponseObjects.map((bookingResponseObject) => {
        const { tracking_code, courier_tracking_code } = bookingResponseObject;
        return {
          courierTrackingNumber: courier_tracking_code,
          shippopTrackingNumber: tracking_code,
        };
      }),
    };
  }
}
