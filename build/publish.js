// 发布packages至npm仓库
const fse = require("fs-extra");
const path = require("path");
const execa = require("execa");

const packages = fse.readdirSync(path.join(__dirname, "../packages"));

packages.forEach((package) => {
  publish(package);
});

async function publish(package) {
  const cwd = path.join(__dirname, `../packages/${package}`);
  const pkg = require(`${cwd}/package.json`);
  if (fse.existsSync(`${cwd}/dist`)) {
    try {
      await execa("npm", ["publish", "--access=public"], { cwd });
      console.log(`发布成功：@booji/${package}@${pkg.version}`);
    } catch (e) {
      console.log(
        `发布失败：@booji/${package}@${pkg.version}, ${JSON.stringify(e)}`
      );
      process.exit(1);
    }
  } else {
    console.log(`发布失败：@booji/${package}/dist不存在，请先打包`);
    process.exit(1);
  }
}
