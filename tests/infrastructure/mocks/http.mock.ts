import {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  HttpClient,
} from "@/domain/protocols/http";

import { faker } from "@faker-js/faker";

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: "get",
  body: faker.database.collation(),
  headers: faker.database.collation(),
});

export class HttpClientSpy<R = any> implements HttpClient<R> {
  url?: string;
  method?: string;
  body?: any;
  headers?: any;
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok,
  };

  async request(data: HttpRequest): Promise<HttpResponse<R>> {
    this.url = data.url;
    this.method = data.method;
    this.body = data.body;
    this.headers = data.headers;
    return this.response;
  }
}
