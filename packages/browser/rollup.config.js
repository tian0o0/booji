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
      file: "./dist/browser.min.js",
      format: "iife",
      globals: {
        rrweb: "rrweb",
        // rrweb: "rrwebRecord",
      },
    },
  ],
  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
      useTsconfigDeclarationDir: true,
    }),
    terser(),
  ],
  external: ["rrweb"],
};
