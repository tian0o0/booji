import { Event } from ".";

/**
 * 事件处理器，如果返回 null 则忽略该事件
 * @public
 */
export type EventProcessor = (event: Event) => Event | null;
