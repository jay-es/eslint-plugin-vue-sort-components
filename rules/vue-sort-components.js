// @ts-check
"use strict";

const naturalCompare = require("natural-compare");

/**
 * @param {import('estree').Property} node
 * @returns {string}
 */
const getKeyName = (node) =>
  node.key.type === "Identifier" ? node.key.name : "";

/**
 * @param {import('estree').Expression} arg
 * @returns {string}
 */
const getArgName = (arg) => (arg.type === "Identifier" ? arg.name : "");

/**
 * @param {import('estree').Property | import('estree').SpreadElement} a
 * @param {import('estree').Property | import('estree').SpreadElement} b
 * @returns {-1 | 0 | 1}
 */
const compareNodes = (a, b) => {
  if (a.type === "Property" && b.type === "Property") {
    return naturalCompare(getKeyName(a), getKeyName(b));
  }

  if (a.type === "SpreadElement" && b.type === "SpreadElement") {
    return naturalCompare(getArgName(a.argument), getArgName(b.argument));
  }

  return a.type === "SpreadElement" ? -1 : 1;
};

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

        const properties = value.properties;
        const sorted = [...properties].sort(compareNodes);
        const sameOrder = properties.every((v, i) => v === sorted[i]);

        if (sameOrder) {
          return;
        }

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
