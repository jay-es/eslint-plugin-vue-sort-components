/** @type {import('eslint/lib/shared/types').ConfigData} */
module.exports = {
  ignorePatterns: "lib/*",
  env: {
    commonjs: true,
    es2021: true,
    node: true,
  },
  extends: [
    "eslint:recommended",
    "airbnb-base",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/strict",
    "plugin:@typescript-eslint/stylistic",
    "prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    // tsconfig の verbatimModuleSyntax の代わり
    "@typescript-eslint/consistent-type-imports": "error",
    "@typescript-eslint/no-import-type-side-effects": "error",

    "import/extensions": "off",
    "import/prefer-default-export": "off",
  },
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".ts"],
      },
    },
  },
};
