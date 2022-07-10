// @ts-check
"use strict";

/** @type {import('eslint').ESLint.Plugin} */
module.exports = {
  rules: {
    "vue-sort-components": require("./rules/vue-sort-components"),
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
