module.exports = {
  trailingComma: "all",
  printWidth: 200,        // 指定代码换行的行长度。单行代码宽度超过指定的最大宽度，将会换行，如果都不想换，可以添加 "proseWrap": "never"
  proseWrap: "never",
  semi: true,            // 是否在语句末尾打印分号，这里选择不加
  singleQuote: true,      // 是否使用单引号，这里选择使用
  jsxSingleQuote: true, // jsx 中使用单引号
  jsxBracketSameLine: false,
  arrowParens: "always",
  overrides: [
    {
      "files": ".prettierrc",
      "options": { "parser": "json" }
    }
  ]
}
