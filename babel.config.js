module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    // 'react-native-classname-to-style',
    // [
    //   'react-native-platform-specific-extensions',
    //   {
    //     extensions: ['scss', 'sass'],
    //   },
    // ],
    [
      '@babel/plugin-proposal-decorators',
      {
        legacy: true,
      },
    ],
    [
      'babel-plugin-module-alias',
      {
        paths: [
          {
            src: './src',
            expose: '@',
          },
        ],
      },
    ],
    [
      'import',
      {
        libraryName: '@ant-design/react-native',
      },
    ],
  ],
};
