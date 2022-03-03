import { BreadcrumbItem, Client, Event, Options, Severity } from "@booji/types";
import { emitter, Global, logger } from "@booji/utils";
import { Scope, MAX_BREADCRUMBS } from ".";

/**
 * 控制中心
 * @public
 */
export class Hub {
  /**
   * 客户端
   * @remarks
   * 使用非空断言，因为Booji初始化调用bindClient后client一定有值
   */
  client!: Client;
  /**
   * 作用域
   * @remarks
   * TODO: 当前仅有一个scope，后续考虑改成scopes
   */
  scope: Scope = new Scope();

  /**
   * 获取当前hub的scope
   * @returns {@link Scope}
   */
  getScope(): Scope {
    return this.scope;
  }
  /**
   * 将客户端实例绑定到当前hub
   * @param client - {@link @booji/types#Client}
   */
  bindClient(client: Client): void {
    this.client = client;
    emitter.emit(client);
  }
  customScope(cb: (scope: Scope) => void): void {
    cb(this.scope);
  }
  /**
   * 面包屑入栈
   * @param breadcrumb - {@link @booji/types#BreadcrumbItem}
   */
  addBreadcrumb(breadcrumb: BreadcrumbItem) {
    const { maxBreadcrumbs = MAX_BREADCRUMBS, beforeAddBreadcrumb }: Options =
      this.client.getOptions();

    if (maxBreadcrumbs <= 0) return;

    let _breadcrumb: BreadcrumbItem | null = breadcrumb;

    if (beforeAddBreadcrumb) {
      if (typeof beforeAddBreadcrumb === "function") {
        _breadcrumb = beforeAddBreadcrumb(breadcrumb);
      } else {
        logger.error("`beforeAddBreadcrumb` hook 必须为函数");
      }
    }

    if (!_breadcrumb) {
      return logger.warn(
        "`beforeAddBreadcrumb hook`没有返回值，取消面包屑入栈"
      );
    }

    this.scope.addBreadcrumb(_breadcrumb, maxBreadcrumbs);
  }
  /**
   * 捕获事件
   * @param event - {@link @booji/types#Event}
   */
  captureEvent(event: Event) {
    // TODO: nextTick, 下一个宏任务队列再执行，确保收集到完整的面包屑
    setTimeout(() => {
      this.invokeClient("captureEvent", event);
    });
  }
  /**
   * 捕获消息
   * @param message - 上报的message
   * @param level - {@link @booji/types#Severity}
   */
  captureMessage(message: string, level?: Severity) {
    this.invokeClient("captureMessage", message, level);
  }
  /**
   * 捕获异常
   * @param message - 上报的message
   * @param level - {@link @booji/types#Severity}
   */
  captureException(exception: Error | string) {
    this.invokeClient("captureException", exception);
  }
  /**
   * 调用客户端实例方法
   * @internal
   */
  private invokeClient<M extends keyof Client>(method: M, ...args: any[]) {
    const { client } = this;
    if (client[method]) {
      (client as any)[method](...args);
    }
  }
}

/**
 * 获取当前的控制中心，如果没有则新建
 * @returns Hub - {@link Hub}
 * @public
 */
export function getCurrentHub(): Hub {
  if (Global.__BOOJI__?.hub) return Global.__BOOJI__.hub;

  Global.__BOOJI__ = Global.__BOOJI__ || {};
  Global.__BOOJI__.hub = new Hub();
  return Global.__BOOJI__.hub;
}

/**
 * 自定义捕获消息
 * @param message - 上报的message
 * @param level - {@link @booji/types#Severity}
 * @public
 */
export function captureMessage(message: string, level?: Severity) {
  getCurrentHub().captureMessage(message, level);
}

/**
 * 自定义捕获异常
 * @param exception - 上报的exception
 * @public
 */
export function captureException(exception: Error | string) {
  getCurrentHub().captureException(exception);
}

/**
 * 自定义捕获事件
 * @param event - 上报的event
 * @public
 */
export function captureEvent(event: Event) {
  getCurrentHub().captureEvent(event);
}

/**
 * 用户自定义 Booji 作用域
 * @param cb - (scope: Scope) =\> void
 * @remarks
 * 如果需要Booji检测每个事件影响的用户数量，需要设置用户id
 * @example
 * ```ts
 * Booji.customScope((scope) => {
 *    scope.setUser({
 *      id: 'xxx-xxx' // id可采用uuid，
 *    })
 * })
 * ```
 * @public
 */
export function customScope(cb: (scope: Scope) => void): void {
  getCurrentHub().customScope(cb);
}
