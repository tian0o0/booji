import {
  BreadcrumbItem,
  Client,
  EventProcessor,
  Playback,
  User,
} from "@booji/types";
import {
  createUserId,
  Global,
  logger,
  Queue,
  emitter,
  Stack,
} from "@booji/utils";
import { MAX_BREADCRUMBS, MAX_PLAYBACKS } from ".";

/**
 * 作用域类
 * @public
 */
export class Scope {
  /**
   * 项目唯一标识
   */
  appKey: string = "";

  /**
   * release版本
   */
  release?: string;

  /**
   * 面包屑栈
   * {@link @booji/types#BreadcrumbItem}
   */
  breadcrumbStack!: Stack<BreadcrumbItem>;

  /**
   * 用户行为队列
   * {@link @booji/types#Queue}
   */
  playbackQueue!: Queue<Playback>;

  /**
   * 自定义用户信息
   * {@link @booji/types#User}
   */
  user: User = {
    id: createUserId(),
  };

  constructor() {
    emitter.once((client: Client) => {
      const { maxBreadcrumbs = MAX_BREADCRUMBS, maxPlaybacks = MAX_PLAYBACKS } =
        client.getOptions();
      this.breadcrumbStack = new Stack<BreadcrumbItem>(maxBreadcrumbs);
      this.playbackQueue = new Queue(maxPlaybacks);
    });
  }

  /**
   * 自定义用户信息
   * @param user - {@link @booji/types#User}
   */
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
  addBreadcrumb(breadcrumb: BreadcrumbItem) {
    this.breadcrumbStack.push(breadcrumb);
    logger.log(this.breadcrumbStack);
  }

  /**
   * 清空面包屑栈
   */
  clearBreadcrumb() {
    this.breadcrumbStack.clear();
  }

  /**
   * 收集用户行为轨迹
   * @param playback - {@link @booji/types#Playback}
   */
  collectPlayback(playback: Playback) {
    this.playbackQueue.enqueue(playback);
    logger.log(this.playbackQueue);
  }

  /**
   * 清空用户行为轨迹
   */
  clearPlayback() {
    this.playbackQueue.clear();
  }
}

/**
 * 获取全局事件处理器，如果没有则新建
 * @returns EventProcessor[] - {@link @booji/types#EventProcessor}
 * @public
 */
export function getGlobalEventProcessors(): EventProcessor[] {
  /* istanbul ignore next */
  if (Global.__BOOJI__?.globalEventProcessors)
    return Global.__BOOJI__.globalEventProcessors;
  /* istanbul ignore next */
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
