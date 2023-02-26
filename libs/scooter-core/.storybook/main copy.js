const path = require("path");

module.exports = {
  // core: {
  //   builder: "@storybook/builder-webpack5",
  // },
  // staticDirs: ["./public"],
  stories: [
    "../stories/**/*.stories.mdx",
    "../stories/**/*.stories.@(js|jsx|ts|tsx)",
  ],
  addons: [
    "@storybook/preset-scss",
    "@nrwl/react/plugins/storybook",
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-interactions",
    {
      name: '@storybook/addon-postcss',
      options: {
        postcssLoaderOptions: {
          implementation: require('postcss'),
        },
        cssLoaderOptions: {
          // When you have splitted your css over multiple files
          // and use @import('./other-styles.css')
          importLoaders: 1,
        },

      },
    },

  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        viteConfigPath: "",
      },
    },
  },
  features: {
    storyStoreV7: false,
  },
  babel: async options => ({
    ...options,
    plugins: [
      "@babel/plugin-proposal-class-properties",
      ["@babel/plugin-proposal-private-methods", { "loose": false }],
      ["@babel/plugin-proposal-private-property-in-object", { "loose": false }]],
  }),
  webpackFinal: async (config, { configType }) => {
    config.module.rules.push(
      // {
      //   test: /\.(s*)css$/i,
      //   use: [
      //     "style-loader",
      //     "css-loader",
      //     {
      //       loader: "postcss-loader",
      //       options: {
      //         postcssOptions: {

      //           plugins: [
      //             "postcss-preset-env",
      //             "postcss-import",
      //             "autoprefixer"
      //           ],
      //         },
      //       },
      //     },
      //   ]
      // },
      {
        test: /\.(ttf|eot|svg|mp4)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
      },
    );
    // (config.module.rules = [
    //   {
    //     test: /.jsx?$/,
    //     loader: "babel-loader",
    //   },
    // ]),
    config.resolve.alias = {
      ...config.resolve.alias,
      "@factly/scooter-bubble-menu": path.resolve(__dirname, "../../scooter-bubble-menu/src/index.js"),
      "@factly/scooter-code-block": path.resolve(__dirname, "../../scooter-code-block/src/index.js"),
      "@factly/scooter-core": path.resolve(__dirname, "../../scooter-core/src/index.js"),
      "@factly/scooter-embed": path.resolve(__dirname, "../../scooter-embed/src/index.js"),
      "@factly/scooter-fixed-menu": path.resolve(__dirname, "../../scooter-fixed-menu/src/index.js"),
      "@factly/scooter-image": path.resolve(__dirname, "../../scooter-image/src/index.js"),
      "@factly/scooter-shared-utils": path.resolve(__dirname, "../../scooter-shared-utils/src/index.js"),
      "@factly/scooter-slash-commands": path.resolve(__dirname, "../../scooter-slash-commands/src/index.js"),
      "@factly/scooter-ui": path.resolve(__dirname, "../../scooter-ui/src/index.js"),
    };

    return config;
  },
};
