import http from "./config";
import { ApiResponse } from "@/axios/ApiResponse";

export abstract class WikibaseApiUtilsRequest {
  public static async getCounties(): Promise<ApiResponse> {
    return await http.get<ApiResponse>("/person/countries");
  }

  public static async getLangues(): Promise<ApiResponse> {
    return await http.get<ApiResponse>("/person/langues");
  }
}
