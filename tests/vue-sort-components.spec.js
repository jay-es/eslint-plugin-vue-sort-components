// @ts-check
"use strict";

const rule = require("../rules/vue-sort-components");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

ruleTester.run("vue-sort-components", rule, {
  valid: [
    {
      code: "const obj = { components: { foo } }",
      parserOptions: { ecmaVersion: 6 },
    },
    {
      code: "const obj = { components: { bar, baz, foo } }",
      parserOptions: { ecmaVersion: 6 },
    },
    {
      code: "const obj = { nested: { components: { bar, baz, foo } } }",
      parserOptions: { ecmaVersion: 6 },
    },
    {
      code: "const obj = { foo, bar }",
      parserOptions: { ecmaVersion: 6 },
    },
    {
      code: "const obj = { components: [ foo, bar, baz ] }",
      parserOptions: { ecmaVersion: 6 },
    },
  ],
  invalid: [
    {
      code: "const obj = { components: { foo, bar, baz } }",
      parserOptions: { ecmaVersion: 6 },
      errors: [{ messageId: "sortComponents" }],
    },
    {
      code: "const obj = { nested: { components: { foo, bar, baz } } }",
      parserOptions: { ecmaVersion: 6 },
      errors: [{ messageId: "sortComponents" }],
    },
  ],
});
