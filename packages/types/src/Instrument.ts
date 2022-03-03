type XHRSendInput =
  | null
  | Blob
  | BufferSource
  | FormData
  | URLSearchParams
  | string;

/**
 * 自定义Booji请求接口，继承了 `XMLHttpRequest`，增加 `_boojiXhr` 字段
 * @public
 */
export interface BoojiWrappedXMLHttpRequest extends XMLHttpRequest {
  [key: string]: any;
  _boojiXhr?: {
    method?: string;
    url?: string;
    status?: number;
    body?: XHRSendInput;
  };
}
