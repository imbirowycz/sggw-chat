const path = require('path');

module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, './src/assets/styles/variables.scss')],
    },
  },
  css: {
    loaderOptions: {
      sass: {
        data: `@import "@/assets/styles/variables.scss";
        @import "@/assets/styles/global.scss";`
      },
    },
  },
};

// vue.config.js
// module.exports = {
//   css: {
//     loaderOptions: {
//       sass: {
//         data: `@import "@/assets/styles/variables.scss";`
//       }
//     }
//   }
// }
