/* istanbul ignore file */
import { BreadcrumbCategory } from "@booji/types";
import { Global, rewrite } from "@booji/utils";
import { handleHttp } from ".";

export class FetchInstrument {
  static setup(): void {
    if (!("fetch" in Global)) return;

    rewrite(Global, "fetch", (originalFetch) => {
      return (url: string, options: Partial<Request> = {}) => {
        const _boojiFetch = {
          request: {
            method: options.method || "GET",
            url,
            data: options.body,
          },
          // startTimestamp: Date.now(),
        };

        return originalFetch.apply(Global, [url, options]).then(
          (response: Response) => {
            FetchInstrument.handle({
              ..._boojiFetch,
              // endTimestamp: Date.now(),
              response,
            });
            return response;
          },
          (error: Error) => {
            FetchInstrument.handle({
              ..._boojiFetch,
              // endTimestamp: Date.now(),
              error,
            });
            throw error;
          }
        );
      };
    });
  }
  static handle(data: any): void {
    const { method, url, body } = data.request;
    const { status, statusText } = data.response;

    handleHttp(
      {
        method,
        url,
        status,
        statusText,
        body,
      },
      BreadcrumbCategory.Fetch
    );
  }
}
