// 批量替换packages的版本号

const replace = require("replace-in-file");
const pkg = require("../package.json");

process.chdir(__dirname);

replace({
  files: "../packages/**/package.json",
  from: /"\d+\.\d+.\d+(?:-\w+(?:\.\w+)?)?"/g,
  to: `"${pkg.version}"`,
})
  .then((changedFiles) => {
    console.log("Modified files:", changedFiles);
  })
  .catch((error) => {
    console.error("Error occurred:", error);
    process.exit(1);
  });
