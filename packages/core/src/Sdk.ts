import { Client, Options } from "@booji/types";
import { getCurrentHub } from "@booji/hub";

/**
 * 客户端类型定义
 * @internal
 */
export type ClientClass<C extends Client, O extends Options> = new (
  options: O
) => C;

/**
 * 初始化客户端并将其绑定至当前控制中心
 * @param Client - {@link @booji/types#Client}
 * @param options - {@link @booji/types#Options}
 * @public
 */
export function initClientAndBindHub<C extends Client, O extends Options>(
  Client: ClientClass<C, O>,
  options: O
): void {
  const hub = getCurrentHub();
  const client = new Client(options);
  hub.bindClient(client);
}
