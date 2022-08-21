import { CoreClient } from "@booji/core";
import { NodeOptions } from "@booji/types";
import { NodeReporter } from "./Reporter";

/**
 * Booji NodeJS 客户端
 *
 * @remarks
 * 继承自{@link @booji/core#CoreClient}
 */
export class NodeClient extends CoreClient {
  /**
   * 上报中心
   */
  reporter: NodeReporter = new NodeReporter();
  /**
   * 创建 Node端 SDK 实例
   * @param options - {@link @booji/types#NodeOptions}
   */
  constructor(options: NodeOptions) {
    super(options);
  }
}
