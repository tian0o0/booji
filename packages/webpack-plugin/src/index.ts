/**
 * Booji webpack-plugin
 * @packageDocumentation
 */

import { Options } from "./types";
const http = require("http");

const NAME = "BoojiWebpackPlugin";

/**
 * @public
 */
export default class BoojiWebpackPlugin {
  private readonly options: Options;
  /**
   *
   * @param options {@link Options}
   */
  constructor(options: Options) {
    this.options = options;
  }
  apply(compiler: any) {
    const callback = (compilation: any, cb: any) => {
      const dist = Object.keys(compilation.assets).filter((file) =>
        file.includes(".js.map")
      );
      upload(dist, this.options);
      cb();
    };
    // 兼容webpack不同版本
    // compiler.hooks.emit.tapSync: webpack5+仅支持该写法
    // compiler.plugin('emit')
    if (compiler.hooks?.emit) {
      compiler.hooks.emit.tapAsync(NAME, callback);
    } else {
      compiler.plugin("emit", callback);
    }
  }
}

/**
 *
 * @param dist - sourcemap文件名，如：static/js/xxx.js.map
 * @param options - 配置项
 * @internal
 */
function upload(dist: string[], options: Options) {
  const postData = JSON.stringify({
    appKey: options.appKey,
    release: options.release,
    url: options.url,
    dist,
  });

  const req = http.request(
    options.reportUrl,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${options.token}`,
      },
    },
    () => {
      console.log(
        `SourceMap文件名已上传至Booji，请确保${options.url}下可以访问SourceMap文件`
      );
    }
  );

  req.on("error", (e: Error) => {
    console.error(`problem with request: ${e.message}`);
  });

  req.write(postData);
  req.end();
}
