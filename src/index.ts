import type { ESLint } from "eslint";

import { sortComponentsRule } from "./rules/vue-sort-components";

const plugin: ESLint.Plugin = {
  rules: {
    "vue-sort-components": sortComponentsRule,
  },
  configs: {
    recommended: {
      plugins: ["@jay-es/vue-sort-components"],
      rules: {
        "@jay-es/vue-sort-components/vue-sort-components": "error",
      },
    },
  },
};

export default plugin;
