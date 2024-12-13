# Rspack Node.js app HMR example

This is an example demonstrating how to utilize the [Rspack](https://rspack.dev/) HMR (Hot Module Replacement) feature when developing an [Express](https://expressjs.com/) application with TypeScript.

> The highest impact on your application's bootstrapping process is **TypeScript compilation**. Fortunately, with Rspack HMR (Hot-Module Replacement), we don't need to recompile the entire project each time a change occurs. This significantly decreases the amount of time necessary to instantiate your application, and makes iterative development a lot easier.

## Setup

```bash
pnpm install
pnpm run dev
```

## Notes about this app

The example consists of the following main files:

### src/index.tsx

This is the main server entrypoint, built using Express.

Within this file, the `module.hot` is used to listen for any alterations in the modules. Whenever a module undergoes a change, the service is restarted automatically.

### rspack.config.ts

This is the configuration file dedicated to Rspack, specifically designed to enable HMR for Node.js applications. The following configurations are implemented:

1. In the `entry`, `"@rspack/core/hot/poll?100"` is added.
2. In the `plugins`, the `new rspack.HotModuleReplacementPlugin()` is incorporated. 

Furthermore, a custom plugin named `new BootPlugin()` is added. The primary purpose of this plugin is to automatically launch the Node.js application immediately after the initial build process is completed.

## Relevant Resources

* https://docs.nestjs.com/recipes/hot-reload
* https://github.com/webpack/docs/issues/45

## License

MIT

