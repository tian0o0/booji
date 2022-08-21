import { CoreClient } from "@booji/core";
import { BrowserOptions } from "@booji/types";
import { BrowserReporter } from "./Reporter";

/**
 * Booji Browser 客户端
 *
 * @remarks
 * 继承自{@link @booji/core#CoreClient}
 */
export class BrowserClient extends CoreClient {
  /**
   * 上报中心
   */
  reporter: BrowserReporter = new BrowserReporter();
  /**
   * 创建 Browser端 SDK 实例
   * @param options - {@link @booji/types#BrowserOptions}
   */
  constructor(options: BrowserOptions) {
    super(options);
  }
}
