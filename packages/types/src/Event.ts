import {
  BreadcrumbItem,
  BreadcrumbType,
  BreadcrumbCategory,
  SdkInfo,
  Severity,
} from ".";
/**
 * 事件接口
 * @public
 */
export interface Event {
  /**
   * hash with env，用于事件去重
   */
  eventHash?: string;
  /**
   * hash without env，用于事件分组
   */
  issueId?: string;
  /**
   * uuid，每个eventId都不相同
   */
  eventId?: string;
  /**
   * 事件类型
   */
  type?: BreadcrumbType;
  /**
   * 事件分类
   */
  category?: BreadcrumbCategory;
  /**
   * 事件等级
   */
  level?: Severity;
  /**
   * 报错信息
   */
  message?: string;
  /**
   * 错误栈
   */
  stack?: string;
  /**
   * 事件发生的时间戳
   */
  timestamp?: number;
  /**
   * 事件发生时的用户行为栈
   */
  breadcrumbs?: BreadcrumbItem[];
  /**
   * 事件发生时的url
   */
  url?: string;
  /**
   * 事件对应的SDK Info
   */
  sdk?: SdkInfo;
}

/**
 *
 * 平台类型
 * @public
 */
export enum PlatformType {
  Vue = "VUE",
  Vue2 = "VUE2",
  React = "REACT",
  Mp = "MP",
}
