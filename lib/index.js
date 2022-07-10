// @ts-check

"use strict";

const sortComponentsRule = require("./rules/vue-sort-components");

/** @type {import('eslint').ESLint.Plugin} */
module.exports = {
  rules: {
    "vue-sort-components": sortComponentsRule,
  },
  configs: {
    recommended: {
      plugins: ["vue-sort-components"],
      rules: {
        "vue-sort-components/vue-sort-components": "error",
      },
    },
  },
};
