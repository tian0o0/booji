import { EventProcessor } from "@booji/types";

const fallbackGlobalObject = {};

/**
 * Booji全局对象定义
 * @internal
 */
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
  const isNode =
    Object.prototype.toString.call(
      typeof process !== "undefined" ? process : 0
    ) === "[object process]";

  isNode && mockSessionStorage();

  return isNode;
}

/**
 * 在 Node 环境中模拟浏览器端 sessionStorage api
 * @internal
 */
function mockSessionStorage(): void {
  let globalWithStorage = global as typeof globalThis & {
    storage: { [key: string]: string };
  };
  let map = globalWithStorage.storage || {};

  global.sessionStorage = {
    setItem: (key: string, value: string) => (map[key] = value),
    clear: () => (map = {}),
    getItem: (key: string) => map[key],
    removeItem: (key: string) => delete map[key],
    key: () => null,
    length: 0,
  };
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
