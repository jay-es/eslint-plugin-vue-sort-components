import { RuleTester } from "eslint";
import { sortComponentsRule } from "../../src/rules/vue-sort-components";

const ruleTester = new RuleTester();

ruleTester.run("vue-sort-components", sortComponentsRule, {
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
    // spread
    {
      code: "const obj = { components: { ...others, bar, baz, foo } }",
      parserOptions: { ecmaVersion: 2018 },
    },

    // options.sortSpreads
    {
      code: "const obj = { components: { ...others2, ...others1, bar, baz, foo } }",
      parserOptions: { ecmaVersion: 2018 },
    },
    {
      options: [{ sortSpreads: true }],
      code: "const obj = { components: { ...others1, ...others2, bar, baz, foo } }",
      parserOptions: { ecmaVersion: 2018 },
    },

    // not applied
    // non-component
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
    // spread
    {
      code: "const obj = { components: { bar, ...others, foo } }",
      output: "const obj = { components: { ...others, bar, foo } }",
      parserOptions: { ecmaVersion: 2018 },
      errors: [{ messageId: "sortComponents" }],
    },

    // options.sortSpreads
    {
      code: "const obj = { components: { bar, ...others2, foo, ...others1 } }",
      output:
        "const obj = { components: { ...others2, ...others1, bar, foo } }",
      parserOptions: { ecmaVersion: 2018 },
      errors: [{ messageId: "sortComponents" }],
    },
    {
      options: [{ sortSpreads: true }],
      code: "const obj = { components: { bar, ...others2, foo, ...others1 } }",
      output:
        "const obj = { components: { ...others1, ...others2, bar, foo } }",
      parserOptions: { ecmaVersion: 2018 },
      errors: [{ messageId: "sortComponents" }],
    },
  ],
});
