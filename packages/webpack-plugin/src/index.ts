/**
 * Booji webpack-plugin
 * @packageDocumentation
 */

import { Options } from "./types";
import fs from "fs";
import path from "path";
import axios from "axios";
import FormData from "form-data";

const NAME = "BoojiWebpackPlugin";

/**
 * @public
 */
export default class BoojiWebpackPlugin {
  private readonly options: Options;
  /**
   *
   * @param options - {@link Options}
   */
  constructor(options: Options) {
    this.options = options;
  }
  apply(compiler: any) {
    const callback = (compilation: any, cb: any) => {
      const dists = Object.keys(compilation.assets).filter((file) =>
        file.includes(".js.map")
      );

      upload(dists, this.options);
      cb();
    };
    // 兼容webpack不同版本
    // compiler.hooks.afterEmit.tapSync: webpack5+仅支持该写法
    // compiler.plugin('afterEmit')
    if (compiler.hooks?.afterEmit) {
      compiler.hooks.afterEmit.tapAsync(NAME, callback);
    } else {
      compiler.plugin("afterEmit", callback);
    }
  }
}

/**
 *
 * @param dists - sourcemap文件名，如：static/js/xxx.js.map
 * @param options - {@link Options}
 * @internal
 */
function upload(dists: string[], options: Options) {
  const fd = new FormData();
  fd.append("appKey", options.appKey);
  fd.append("release", options.release);

  dists.forEach((dist: string) => {
    const realpath = path.join(__dirname, "./dist", dist);
    const buffer = fs.createReadStream(realpath);
    fd.append("files", buffer);
  });

  axios({
    method: "POST",
    url: options.reportUrl,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${options.token}`,
    },
    data: fd,
  })
    .then(() => {
      console.log("SourceMap已上传至Booji Server");
    })
    .catch((error: Error) => {
      console.log(error);
    });
}
