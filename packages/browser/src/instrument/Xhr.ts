/** istanbul ignore file */
import {
  BoojiWrappedXMLHttpRequest,
  BreadcrumbItem,
  BreadcrumbCategory,
  BreadcrumbType,
  Event,
  Severity,
  VoidFn,
} from "@booji/types";
import { Global, rewrite, isString } from "@booji/utils";
import { getCurrentHub } from "@booji/hub";

/**
 * xhr插装
 * @internal
 */
export class XhrInstrument {
  static setup(): void {
    if (!("XMLHttpRequest" in Global)) return;

    const xhrproto = XMLHttpRequest.prototype;

    rewrite(xhrproto, "open", function (originalOpen: VoidFn): VoidFn {
      return function (this: BoojiWrappedXMLHttpRequest, ...args: any[]): void {
        const xhr = this;
        const url = args[1];
        const xhrInfo: BoojiWrappedXMLHttpRequest["_boojiXhr"] =
          (xhr._boojiXhr = {
            method: isString(args[0]) ? args[0].toUpperCase() : args[0],
            url: args[1],
          });

        // 防止booji内部请求/webpack-dev-server上报
        if (url.match(/booji|sockjs-node/)) {
          xhr._shouldNotHandle = true;
        }

        const onreadystatechangeHandler = () => {
          if (xhr.readyState === 4) {
            xhrInfo.status = xhr.status;

            XhrInstrument.handle({
              args,
              xhr,
            });
          }
        };

        if (
          "onreadystatechange" in xhr &&
          typeof xhr.onreadystatechange === "function"
        ) {
          rewrite(xhr, "onreadystatechange", (original) => {
            return function (...readyStateArgs: any[]): void {
              onreadystatechangeHandler();
              return original.apply(xhr, readyStateArgs);
            };
          });
        } else {
          /** istanbul ignore next */
          xhr.addEventListener("readystatechange", onreadystatechangeHandler);
        }

        return originalOpen.apply(xhr, args);
      };
    });

    rewrite(xhrproto, "send", function (originalSend: VoidFn): VoidFn {
      return function (this: BoojiWrappedXMLHttpRequest, ...args: any[]): void {
        if (this._boojiXhr && args[0] !== undefined) {
          this._boojiXhr.body = args[0];
        }

        // that.handle({
        //   args,
        //   xhr: this,
        // });

        return originalSend.apply(this, args);
      };
    });
  }
  static handle(data: { [key: string]: any }): void {
    if (data.xhr._shouldNotHandle) return;

    const { method, url, status, body } = data.xhr._boojiXhr || {};

    handleHttp(
      {
        method,
        url,
        status,
        body,
      },
      BreadcrumbCategory.Xhr
    );
  }
}

/**
 * xhr/fetch统一处理
 * @internal
 */
export function handleHttp(
  { method, url, status, statusText, body }: any,
  category: BreadcrumbCategory
) {
  const isHttpError = status >= 400;

  if (isHttpError) {
    const event: Event = {
      type: BreadcrumbType.Http,
      category,
      level: Severity.Warn,
      message: `${url} ${statusText || "failed"} [${status}]`, // TODO:
      timestamp: Date.now(),
    };
    getCurrentHub().captureEvent(event);
  } else {
    const breadcrumb: BreadcrumbItem = {
      type: BreadcrumbType.Http,
      category,
      level: Severity.Info,
      data: {
        method,
        url,
        status,
        body,
      },
      timestamp: Date.now(),
    };
    getCurrentHub().addBreadcrumb(breadcrumb);
  }
}
