import { CoreIntegrations, initClientAndBindHub } from "@booji/core";
import { NodeOptions } from "@booji/types";
import { NodeClient } from "./Client";
import { GlobalHandlerIntegration } from "./integrations";

const defaultIntegrations = [
  new CoreIntegrations.InboundFilterIntegration(),
  new CoreIntegrations.DedupeIntegration(),
  new GlobalHandlerIntegration(),
];
/**
 *
 * 初始化 NodeJS SDK
 *
 * @example
 * ```ts
 * import { init } from "@booji/node"
 * init({
 *    dsn: "xxx",
 *    appKey: "xxx"
 *    // ...
 * })
 * ```
 *
 * @public
 */
function init(options: NodeOptions) {
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
  initClientAndBindHub(NodeClient, options);
}

export { init, NodeOptions, CoreIntegrations, GlobalHandlerIntegration };
