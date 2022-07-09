// @ts-check
"use strict";

/**
 * @param {import('estree').Property} node
 * @returns {string}
 */
const getKeyName = (node) =>
  node.key.type === "Identifier" ? node.key.name : "";

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "layout",
    messages: {
      sortComponents: "Component names must be sorted.",
    },
  },
  create(context) {
    return {
      Property(node) {
        const value = node.value;
        if (
          getKeyName(node) !== "components" ||
          value.type !== "ObjectExpression"
        ) {
          return;
        }

        const keys = value.properties
          .filter(
            /** @returns {node is import('estree').Property} */
            (node) => node.type === "Property"
          )
          .map((node) => getKeyName(node));

        const sortedKeys = [...keys].sort();
        const sameOrder = sortedKeys.every((v, i) => v === keys[i]);

        if (sameOrder) return;

        context.report({
          node,
          messageId: "sortComponents",
        });
      },
    };
  },
};
