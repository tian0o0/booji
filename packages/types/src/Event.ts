import { BreadcrumbItem, SdkInfo, Severity } from ".";
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
  type?: string;
  category?: string;
  level?: Severity;
  message?: string;
  /**
   * 错误栈
   */
  stack?: string;
  /**
   * 错误所在行
   */
  row?: number;
  /**
   * 错误所在列
   */
  col?: number;
  timestamp?: number;
  sdk?: SdkInfo;
  breadcrumbs?: BreadcrumbItem[];
  /**
   * 事件发生时的url
   */
  url?: string;
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
