import { fork } from "child_process";

import { defineConfig } from "@rspack/cli";
import rspack, { type Compiler } from "@rspack/core";
// @ts-ignore
import nodeExternals from "webpack-node-externals";

const isDev = process.env.NODE_ENV === "development";

class BootPlugin {
  #booted = false;

  apply(compiler: Compiler) {
    compiler.hooks.done.tap("BootPlugin", (stats) => {
      if (this.#booted || stats.hasErrors()) {
        return;
      }

      fork("./dist/main.js", [], { stdio: "inherit" });
      this.#booted = true;
    });
  }
}

export default defineConfig({
  mode: "development",
  target: "node",
  entry: ["@rspack/core/hot/poll?100", "./src/index.ts"],
  externals: [
    nodeExternals({
      allowlist: ["@rspack/core/hot/poll?100"],
    }),
  ],
  resolve: {
    extensions: ["...", ".ts", ".tsx", ".jsx"],
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|tsx?)$/,
        use: [
          {
            loader: "builtin:swc-loader",
            options: {
              jsc: {
                parser: {
                  syntax: "typescript",
                  tsx: true,
                },
              },
            },
          },
        ],
      },
    ],
  },
  plugins: isDev
    ? [
        new rspack.HotModuleReplacementPlugin(),
        new BootPlugin()
    ]
    : [],
});
