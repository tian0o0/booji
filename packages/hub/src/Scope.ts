import { BreadcrumbItem, EventProcessor, Playback, User } from "@booji/types";
import { createUserId, Global, logger } from "@booji/utils";
import { MAX_BREADCRUMBS, MAX_PLAYBACKS } from ".";

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
   * 用户行为轨迹
   * {@link @booji/types#Playback}
   */
  playbacks: Playback[] = [];

  /**
   * 项目唯一标识
   */
  appKey: string = "";

  /**
   * 自定义用户信息
   */
  user: User = {
    id: createUserId(),
  };

  /**
   * release版本
   */
  release?: string;

  setUser(user: User) {
    this.user = {
      ...this.user,
      ...user,
    };
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

  /**
   * 收集用户行为轨迹
   * @param playback - {@link @booji/types#Playback}
   */
  collectPlayback(playback: Playback, maxPlaybacks: number) {
    const max = Math.min(maxPlaybacks, MAX_PLAYBACKS);
    this.playbacks = [...this.playbacks, playback].slice(-max);
    logger.log(this.playbacks);
  }

  /**
   * 清空用户行为轨迹
   */
  clearPlayback() {
    this.playbacks = [];
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
