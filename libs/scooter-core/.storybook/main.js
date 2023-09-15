const path = require("path");
module.exports = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(js|jsx|ts|tsx)"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: "@storybook/addon-postcss",
      options: {
        postcssLoaderOptions: {
          implementation: require("postcss"),
        },
        cssLoaderOptions: {
          // When you have splitted your css over multiple files
          // and use @import('./other-styles.css')
          importLoaders: 1,
        },
      },
    },
    "@storybook/preset-scss",
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  babel: async options => ({
    ...options,
    plugins: ["@babel/plugin-proposal-class-properties"],
  }),
  webpackFinal: async (config, { configType }) => {
    // (config.module.rules = [
    //   {
    //     test: /.jsx?$/,
    //     loader: "babel-loader",
    //   },
    // ]),
    config.resolve.alias = {
      ...config.resolve.alias,
      "@factly/scooter-bubble-menu": path.resolve(
        __dirname,
        "../../scooter-bubble-menu/src/index.js"
      ),
      "@factly/scooter-code-block": path.resolve(
        __dirname,
        "../../scooter-code-block/src/index.js"
      ),
      "@factly/scooter-core": path.resolve(
        __dirname,
        "../../scooter-core/src/index.js"
      ),
      "@factly/scooter-embed": path.resolve(
        __dirname,
        "../../scooter-embed/src/index.js"
      ),
      "@factly/scooter-fixed-menu": path.resolve(
        __dirname,
        "../../scooter-fixed-menu/src/index.js"
      ),
      "@factly/scooter-image": path.resolve(
        __dirname,
        "../../scooter-image/src/index.js"
      ),
      "@factly/scooter-shared-utils": path.resolve(
        __dirname,
        "../../scooter-shared-utils/src/index.js"
      ),
      "@factly/scooter-slash-commands": path.resolve(
        __dirname,
        "../../scooter-slash-commands/src/index.js"
      ),
      "@factly/scooter-ui": path.resolve(
        __dirname,
        "../../scooter-ui/src/index.js"
      ),
    };
    return config;
  },
  docs: {
    autodocs: true,
  },
};
