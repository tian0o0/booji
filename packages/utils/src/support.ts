/* istanbul ignore file */
import { Global } from "./global";

/**
 * 检查当前环境是否支持 `histroy` api
 * @returns boolean
 * @public
 */
export function isSupportHistory(): boolean {
  const hasHistoryApi =
    "history" in Global &&
    !!Global.history.pushState &&
    !!Global.history.replaceState;

  return hasHistoryApi;
}
