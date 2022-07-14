import type { Rule } from "eslint";
import type { Expression, Property, SpreadElement } from "estree";
import naturalCompare from "natural-compare";

const getKeyName = (node: Property): string =>
  node.key.type === "Identifier" ? node.key.name : "";

const getArgName = (arg: Expression): string =>
  arg.type === "Identifier" ? arg.name : "";

const compareNodes = (
  a: Property | SpreadElement,
  b: Property | SpreadElement
): -1 | 0 | 1 => {
  if (a.type === "Property" && b.type === "Property") {
    return naturalCompare(getKeyName(a), getKeyName(b));
  }

  if (a.type === "SpreadElement" && b.type === "SpreadElement") {
    return naturalCompare(getArgName(a.argument), getArgName(b.argument));
  }

  return a.type === "SpreadElement" ? -1 : 1;
};

export const sortComponentsRule: Rule.RuleModule = {
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
        const { value } = node;
        if (
          getKeyName(node) !== "components" ||
          value.type !== "ObjectExpression"
        ) {
          return;
        }

        const { properties } = value;
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
            const sortedCodes = sorted.map((prop) => sourceCode.getText(prop));
            return properties.map((prop, i) =>
              fixer.replaceText(prop, sortedCodes[i])
            );
          },
        });
      },
    };
  },
};
