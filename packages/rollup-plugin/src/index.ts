import { PluginOptions } from "@booji/types";
import fs from "fs";
import path from "path";
import axios from "axios";
import FormData from "form-data";

/**
 * @public
 */
export default function boojiPlugin(options: PluginOptions) {
  return {
    name: "rollup-plugin-booji",
    writeBundle(_: any, bundle: { [key: string]: any }) {
      const dists = Object.keys(bundle)
        .filter((file) => bundle[file].map)
        .map((_) => `${_}.map`);
      upload(dists, options);
    },
  };
}

/**
 *
 * @param dists - sourcemap文件名，如：static/js/xxx.js.map
 * @param options - {@link Options}
 * @internal
 */
function upload(dists: string[], options: PluginOptions) {
  const fd = new FormData();
  fd.append("appKey", options.appKey);
  fd.append("release", options.release);

  dists.forEach((dist: string) => {
    const realpath = path.join(__dirname, options.dir || "dist", dist);
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
