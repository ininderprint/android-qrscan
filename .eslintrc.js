module.exports = {
  root: true,
  'extends': ['@react-native-community'],
  'rules': {
    'max-len': 200,
    'no-shadow': 0,
    'jsx-quotes': [
      'error',
      'prefer-single'
    ],
    "react/jsx-boolean-value": 0, //在JSX中强制布尔属性符号
    'import/first': 0,
    'react-native/no-inline-styles': [0],
    "@typescript-eslint/no-unused-vars": [0, {
      "vars": "all",
      "args": "after-used",
      "ignoreRestSiblings": false
    }],
    'no-unused-vars': [0, { 
      // 允许声明未使用变量
      "vars": "local",
      // 参数不检查
      "args": "none" 
    }]
  }
}
