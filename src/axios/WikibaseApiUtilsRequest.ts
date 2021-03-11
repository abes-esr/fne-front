import axios from "axios";
import { ApiResponse } from "@/axios/ApiResponse";

export abstract class WikibaseApiUtilsRequest {
  public static async getCounties(): Promise<ApiResponse> {
    return await axios.get<ApiResponse>(
      "http://fne-query-test.abes.fr/proxy/wdqs/bigdata/namespace/wdq/sparql?query=%23Ch%C3%A8vre%0ASELECT%20%3Fitem%20%3FitemLabel%0AWHERE%20%0A{%0A%20%20%3Fitem%20wdt%3AP1%20wd%3AQ6.%0A%20%20%3Fitem%20wdt%3AP14%20%3Fb.%0A%20%20SERVICE%20wikibase%3Alabel%20{%20bd%3AserviceParam%20wikibase%3Alanguage%20%22[AUTO_LANGUAGE]%2Cfr%22.%20}%0A}&format=json"
    );
  }

  public static async getLangues(): Promise<ApiResponse> {
    return await axios.get<ApiResponse>(
      "http://fne-query-test.abes.fr/proxy/wdqs/bigdata/namespace/wdq/sparql?query=%23Ch%C3%A8vre%0ASELECT%20%3Fitem%20%3FitemLabel%0AWHERE%20%0A{%0A%20%20%3Fitem%20wdt%3AP1%20wd%3AQ6.%0A%20%20%3Fitem%20wdt%3AP13%20%3Fb.%0A%20%20SERVICE%20wikibase%3Alabel%20{%20bd%3AserviceParam%20wikibase%3Alanguage%20%22[AUTO_LANGUAGE]%2Cfr%22.%20}%0A}&format=json"
    );
  }
}
