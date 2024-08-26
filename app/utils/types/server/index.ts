export type HttpStatusCodes = 200 | 201 | 400 | 401 | 403 | 404 | 409 | 500;

export interface HttpMetaMessage {
  [key: string]: string;
}
