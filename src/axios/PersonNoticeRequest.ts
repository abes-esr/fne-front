import http from "./config";
import { ApiResponse } from "@/axios/ApiResponse";

export abstract class PersonNoticeRequest {
  public static async createPersonNotice(
    personNotice: any
  ): Promise<ApiResponse> {
    return await http.post<ApiResponse>("/person", personNotice);
  }
}
