import { Compiler } from "webpack";
import { Options } from "./types";
const http = require("http");

const NAME = "BoojiWebpackPlugin";

export default class BoojiWebpackPlugin {
  private readonly options: Options;
  constructor(options: Options) {
    this.options = options;
  }
  apply(compiler: Compiler) {
    compiler.hooks.emit.tapAsync(NAME, (compilation, cb) => {
      const dist = Object.keys(compilation.assets).filter((file) =>
        file.includes(".js.map")
      );
      upload(dist, this.options);
      cb();
    });
  }
}

function upload(dist: string[], options: Options) {
  const postData = JSON.stringify({
    appKey: options.appKey,
    release: options.release,
    url: options.url,
    dist,
  });

  const req = http.request(
    "http://localhost:3333/sourcemap",
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
