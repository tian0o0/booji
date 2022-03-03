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
      file: "./dist/react.min.js",
      format: "iife",
      globals: {
        react: "React",
      },
    },
  ],

  // see: https://rollupjs.org/guide/en/#warning-treating-module-as-external-dependency
  external: ["react"],

  plugins: [
    typescript({
      tsconfig: "tsconfig.json",
      useTsconfigDeclarationDir: true,
    }),
    terser(),
  ],
};
