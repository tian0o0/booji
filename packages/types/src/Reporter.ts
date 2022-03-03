import { Event } from ".";

/**
 * 上报中心接口
 * @public
 */
export interface Reporter {
  /**
   * 上报前的操作：事件去重、加入scope信息、生成eventId...
   * @param event - 上报的事件
   */
  beforeReport(event: Event): Promise<Event | null>;
  /**
   * 上报至Booji，各端自行实现
   * @param event - 上报的数据{@link Event}
   */
  report(event: Event): void;
  /**
   * 待上报事件准备完成后的操作：清空面包屑...
   */
  afterEventReady(): void;
}
