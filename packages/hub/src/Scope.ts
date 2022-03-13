import { BreadcrumbItem, EventProcessor, User } from "@booji/types";
import { Global, logger } from "@booji/utils";
import { MAX_BREADCRUMBS } from ".";

/**
 * 作用域类
 * @public
 */
export class Scope {
  /**
   * 面包屑栈
   * {@link @booji/types#BreadcrumbItem}
   */
  breadcrumbs: BreadcrumbItem[] = [];

  /**
   * 项目唯一标识
   */
  appKey: string = "";
  /**
   * 自定义用户信息
   */
  user: User = {};

  setUser(user: User) {
    this.user = user;
  }

  /**
   * 面包屑入栈
   * @param breadcrumb - {@link @booji/types#BreadcrumbItem}
   */
  addBreadcrumb(breadcrumb: BreadcrumbItem, maxBreadcrumbs: number) {
    const max = Math.min(maxBreadcrumbs, MAX_BREADCRUMBS);
    this.breadcrumbs = [...this.breadcrumbs, breadcrumb].slice(-max);
    // this.breadcrumbs.sort((a, b) => a.timestamp - b.timestamp);
    logger.log(this.breadcrumbs);
  }

  /**
   * 清空面包屑栈
   */
  clearBreadcrumb() {
    this.breadcrumbs = [];
  }
}

/**
 * 获取全局事件处理器，如果没有则新建
 * @returns EventProcessor[] - {@link @booji/types#EventProcessor}
 * @public
 */
export function getGlobalEventProcessors(): EventProcessor[] {
  if (Global.__BOOJI__?.globalEventProcessors)
    return Global.__BOOJI__.globalEventProcessors;

  Global.__BOOJI__ = Global.__BOOJI__ || {};
  Global.__BOOJI__.globalEventProcessors = [];
  return Global.__BOOJI__.globalEventProcessors;
}

/**
 * 添加全局事件处理器回调，在上报事件前统一执行
 * @param callback - {@link @booji/types#EventProcessor}
 * @public
 */
export function addGlobalEventProcessor(callback: EventProcessor) {
  getGlobalEventProcessors().push(callback);
}
