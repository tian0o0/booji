/**
 * rrweb跟踪的用户行为数据
 * @public
 */
export interface Playback {
  data: { [key: string]: any };
  timestamp: number;
  type: number;
}
