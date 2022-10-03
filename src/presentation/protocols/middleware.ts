import { HttpResponse } from "./http-response";

export interface Middleware {
  handle: (httpRequest: any) => Promise<HttpResponse>
}