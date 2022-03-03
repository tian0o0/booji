import { terser } from "rollup-plugin-terser";
import typescript from "rollup-plugin-typescript2";

import pkg from "./package.json";

export default {
  input: "./src/index.ts",

  output: [
    {
      file: pkg.module,
      format: "es",
      sourcemap: true,
    },
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      name: "Booji",
      file: "./dist/angular.min.js",
      format: "iife",
    },
  ],

  // see: https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
  // external: ["@angular/common/http"],

  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
      useTsconfigDeclarationDir: true,
    }),
    terser(),
  ],
};
