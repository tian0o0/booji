import { init as browserInit } from "@booji/browser";
import { Options } from "@booji/types";
import { logger } from "@booji/utils";
import { setupVueErrorHandler } from "./ErrorHandler";

/**
 * Vue Init SDK, setupVueErrorHandler after browserInit
 * @param option - {@link @booji/types#Options}
 * @public
 */
export function init(options: Options) {
  browserInit(options);

  if (!options.Vue && !options.app) {
    return logger.warn(
      "缺少vue相关配置项，无法获取错误所在的钩子函数、组件等信息。请检查配置项：\n" +
        "a.如果您使用Vue2.x, 请传入`Vue: {{Vue Constructor}}`\n" +
        "b.如果您使用Vue3.x, 请传入`app: {{Application Instance}}`"
    );
  }

  if (options.app) {
    const apps = Array.isArray(options.app) ? options.app : [options.app];
    apps.forEach((app) => setupVueErrorHandler(app));
  } else if (options.Vue) {
    setupVueErrorHandler(options.Vue);
  }
}
