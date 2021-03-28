import http from "./config";
import { ApiResponse } from "@/axios/ApiResponse";

export abstract class WikibaseApiUtilsRequest {
  public static async getCounties(): Promise<ApiResponse> {
    return await http.get<ApiResponse>("/person/countries");
  }

  public static async getLangues(): Promise<ApiResponse> {
    return await http.get<ApiResponse>("/person/langues");
  }

  public static async findItem(itemName: string): Promise<ApiResponse> {
    return await http.get<ApiResponse>("/search/" + itemName);
  }

  public static async getItemDescript(itemId: string): Promise<ApiResponse> {
    return await http.get<ApiResponse>("/item/description/" + itemId);
  }
}
