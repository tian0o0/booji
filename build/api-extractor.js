// rollup打包生成的.d.ts文件比较分散，利用api-extractor将多个.d.ts文件打包成单独的文件

const path = require("path");
const fse = require("fs-extra");

const { Extractor, ExtractorConfig } = require("@microsoft/api-extractor");

buildApiExtractor(process.argv[2]);

// 生成 dist/*.d.ts 和 dist/*.api.md
function buildApiExtractor(p) {
  const apiExtractorJsonPath = path.join(
    __dirname,
    `../packages/${p}/api-extractor.json`
  );
  const extractorConfig =
    ExtractorConfig.loadFileAndPrepare(apiExtractorJsonPath);

  const extractorResult = Extractor.invoke(extractorConfig, {
    // Equivalent to the "--local" command-line parameter
    localBuild: true,
    // Equivalent to the "--verbose" command-line parameter
    showVerboseMessages: true,
  });

  if (extractorResult.succeeded) {
    console.log(
      `[build/api-extractor.js]: API Extractor completed successfully!`
    );
    fse.removeSync(path.join(__dirname, `../packages/${p}/dist/temp`));
    console.log(
      `[build/api-extractor.js]: Origin .d.ts declaration dir has been removed!`
    );
    buildApiDoc(p);
    process.exitCode = 0;
  } else {
    console.error(
      `[build/api-extractor.js]: API Extractor completed with ${extractorResult.errorCount} errors` +
        ` and ${extractorResult.warningCount} warnings`
    );
    process.exitCode = 1;
  }
}

// 生成 api-docs/*.api.json， 然后使用 api-documenter cli 生成 .md
function buildApiDoc(p) {
  const from = path.join(__dirname, `../packages/${p}/temp`);
  const to = path.join(__dirname, `../api-docs`);
  fse.copySync(from, to);
  fse.removeSync(from);
}
