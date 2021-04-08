import http from "./config";
import { ApiResponse } from "@/axios/ApiResponse";

export abstract class PersonNoticeRequest {
  public static async createPersonNotice(
    personNotice: any
  ): Promise<ApiResponse> {
    return await http.post<ApiResponse>("/person", personNotice);
  }

  public static async updatePersonNotice(
    personNotice: any
  ): Promise<ApiResponse> {
    return await http.put<ApiResponse>("/person", personNotice);
  }

  public static async getPersonNotice(itemId: string): Promise<ApiResponse> {
    return await http.get<ApiResponse>("/person/item/" + itemId);
  }
}
