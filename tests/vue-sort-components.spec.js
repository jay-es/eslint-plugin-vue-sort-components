// @ts-check
"use strict";

const rule = require("../rules/vue-sort-components");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester();

ruleTester.run("vue-sort-components", rule, {
  valid: [
    // single
    {
      code: "const obj = { components: { foo } }",
      parserOptions: { ecmaVersion: 6 },
    },
    // multiple
    {
      code: "const obj = { components: { bar, baz, foo } }",
      parserOptions: { ecmaVersion: 6 },
    },
    // multiple, not shorthand
    {
      code: "const obj = { components: { bar: 0, baz: 1, foo: 2 } }",
      parserOptions: { ecmaVersion: 6 },
    },
    // nested
    {
      code: "const obj = { nested: { components: { bar, baz, foo } } }",
      parserOptions: { ecmaVersion: 6 },
    },
    // not components
    {
      code: "const obj = { nested: { foo, bar } }",
      parserOptions: { ecmaVersion: 6 },
    },
    // array
    {
      code: "const obj = { components: [ foo, bar, baz ] }",
      parserOptions: { ecmaVersion: 6 },
    },
  ],
  invalid: [
    // multiple
    {
      code: "const obj = { components: { foo, bar, baz } }",
      output: "const obj = { components: { bar, baz, foo } }",
      parserOptions: { ecmaVersion: 6 },
      errors: [{ messageId: "sortComponents" }],
    },
    // multiple, not shorthand
    {
      code: "const obj = { components: { foo: 0, bar: 1, baz: 2 } }",
      output: "const obj = { components: { bar: 1, baz: 2, foo: 0 } }",
      parserOptions: { ecmaVersion: 6 },
      errors: [{ messageId: "sortComponents" }],
    },
    // nested
    {
      code: "const obj = { nested: { components: { foo, bar, baz } } }",
      output: "const obj = { nested: { components: { bar, baz, foo } } }",
      parserOptions: { ecmaVersion: 6 },
      errors: [{ messageId: "sortComponents" }],
    },
  ],
});
