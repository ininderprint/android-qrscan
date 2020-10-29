/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */

const {getDefaultConfig} = require('metro-config');
const blacklist = require('metro-config/src/defaults/blacklist');

module.exports = (async () => {
  const {
    resolver: {sourceExts},
  } = await getDefaultConfig();
  return {
    transformer: {
      getTransformOptions: async () => ({
        transform: {
          experimentalImportSupport: false,
          inlineRequires: false,
        },
      }),
      babelTransformerPath: require.resolve('./transformer.js'),
    },
    resolver: {
      sourceExts: [...sourceExts, 'tsx', 'scss', 'sass'],
      blacklistRE: blacklist([
        /\/android\/.*/,
        /\/ios\/.*/
      ])
    },
  };
})();

// module.exports = {
//   transformer: {
//     getTransformOptions: async () => ({
//       transform: {
//         experimentalImportSupport: false,
//         inlineRequires: false,
//       },
//     }),
//   },
// };
