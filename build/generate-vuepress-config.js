// markdown文件夹是打包后生成的，因此需要每次在生成markdown后在下面添加 .vuepress/config.js 用于网站打包配置
const path = require("path");
const fse = require("fs-extra");

fse.ensureDirSync(path.join(__dirname, "../markdown/.vuepress"));
fse.copySync(
  path.join(__dirname, "../vuepress.config.js"),
  path.join(__dirname, "../markdown/.vuepress/config.js")
);
