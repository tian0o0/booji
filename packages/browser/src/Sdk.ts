import { CoreIntegrations, initClientAndBindHub } from "@booji/core";
import { Options } from "@booji/types";
import { BrowserClient } from "./Client";
import {
  BreadcrumbIntegration,
  GlobalHandlerIntegration,
  PerformanceIntegration,
} from "./integrations";

const defaultIntegrations = [
  new CoreIntegrations.InboundFilterIntegration(),
  new CoreIntegrations.DedupeIntegration(),
  new BreadcrumbIntegration(),
  new GlobalHandlerIntegration(),
  new PerformanceIntegration(),
];
/**
 *
 * 初始化浏览器SDK
 *
 * @example
 * ```ts
 * import { init } from "@booji/browser"
 * init({
 *    dsn: "xxx",
 *    appKey: "xxx"
 *    // ...
 * })
 * ```
 *
 * @public
 */
function init(options: Options) {
  // TODO: 提示缺少具体的参数名
  if (!options || !options.dsn || !options.appKey) {
    throw new Error("缺少初始化参数");
  }
  if (
    options.defaultIntegrations === undefined ||
    options.defaultIntegrations === true
  ) {
    options.defaultIntegrations = defaultIntegrations;
  }
  if (options.dedupe === undefined) {
    options.dedupe = true;
  }
  initClientAndBindHub(BrowserClient, options);
}

export {
  init,
  Options,
  CoreIntegrations,
  BreadcrumbIntegration,
  GlobalHandlerIntegration,
};
