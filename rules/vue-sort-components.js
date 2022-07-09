// @ts-check
"use strict";

const naturalCompare = require("natural-compare");

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
    fixable: "code",
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

        const properties = value.properties.filter(
          /** @returns {node is import('estree').Property} */
          (node) => node.type === "Property"
        );
        const sorted = [...properties].sort((a, b) =>
          naturalCompare(getKeyName(a), getKeyName(b))
        );
        const sameOrder = properties.every((v, i) => v === sorted[i]);

        if (sameOrder) return;

        context.report({
          node,
          messageId: "sortComponents",
          fix(fixer) {
            const sourceCode = context.getSourceCode();
            const sortedCodes = sorted.map((node) => sourceCode.getText(node));
            return properties.map((node, i) =>
              fixer.replaceText(node, sortedCodes[i])
            );
          },
        });
      },
    };
  },
};
