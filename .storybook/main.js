const path = require("path");

module.exports = {
  core: {
    builder: "@storybook/builder-webpack5",
  },
  staticDirs: ["./public"],
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    "@storybook/addon-postcss",
    "@storybook/preset-scss",
  ],
  framework: "@storybook/react",
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
      apis: path.resolve(__dirname, "../lib/apis"),
      components: path.resolve(__dirname, "../lib/components"),
      hooks: path.resolve(__dirname, "../lib/hooks"),
      constants: path.resolve(__dirname, "../lib/constants"),
      utils: path.resolve(__dirname, "../lib/utils"),
      lib: path.resolve(__dirname, "../lib"),
    };

    return config;
  },
};
