import { Options, Severity, Event } from ".";

/**
 * 各个端的客户端需要实现该接口
 * @public
 */
export interface Client {
  /**
   * 初始化
   */
  init(): void;
  /**
   * 捕获异常
   * @param exception - 异常信息
   */
  captureException(exception: any): void;
  /**
   * 捕获消息
   * @param message - 消息
   * @param level - {@link Severity}
   */
  captureMessage(message: string, level?: Severity): void;
  /**
   * 捕获事件
   * @param event - 事件
   */
  captureEvent(event: Event): void;
  /**
   * 获取客户端options
   */
  getOptions(): Options;
}
