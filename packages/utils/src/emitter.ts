import { Client } from "@booji/types";

type Listener<T> = (arg: T) => void;

/**
 * Type Safe EventEmitter
 * @internal
 */
export class Emitter<T> {
  private listeners: Listener<T>[] = [];
  private listenersOncer: Listener<T>[] = [];
  on(listener: Listener<T>) {
    this.listeners.push(listener);
  }
  once(listener: Listener<T>) {
    this.listenersOncer.push(listener);
  }
  emit(arg: T) {
    this.listeners.forEach((listener) => listener(arg));
    this.listenersOncer.forEach((listener) => listener(arg));
    this.listenersOncer = [];
  }
}

/**
 * Client EventEmitter Instance
 * @example
 * ```ts
 * emitter.on(client => callback(client))
 *
 * emitter.emit(client)
 * ```
 * @public
 */
export const emitter = new Emitter<Client>();
