import { EventProcessor } from "@booji/types";

const fallbackGlobalObject = {};
interface BoojiGlobal {
  console: Console;
  __BOOJI__: {
    logger: any;
    hub: any;
    lastEventId?: string;
    globalEventProcessors: EventProcessor[];
  };
}
/**
 * 是否为 Node 环境
 * @internal
 * @returns boolean
 */
function isNodeEnv(): boolean {
  return (
    Object.prototype.toString.call(
      typeof process !== "undefined" ? process : 0
    ) === "[object process]"
  );
}
/**
 * 获取不同环境下的全局对象
 * @returns 全局对象
 * @public
 */
export function getGlobalObject<T>(): BoojiGlobal & typeof globalThis & T {
  return (
    isNodeEnv()
      ? global
      : typeof window !== "undefined"
      ? window
      : typeof self !== "undefined"
      ? self
      : fallbackGlobalObject
  ) as BoojiGlobal & typeof globalThis & T;
}

/**
 * 全局对象
 * @public
 */
export const Global = getGlobalObject<Window>();
