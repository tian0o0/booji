import { Client } from ".";

/**
 * 集成接口
 *
 * @remarks
 * 自定义集成需要实现该接口
 *
 * @public
 */
export interface Integration {
  /**
   * 集成名称
   */
  name: string;
  /**
   * 调用该方法开启集成
   */
  setup(): void;

  /**
   * hub绑定client后才能在集成内获取client配置项
   * @param client -{@link Client}
   */
  onClientBinded?(client: Client): void;
}
