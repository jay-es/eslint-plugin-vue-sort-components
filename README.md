# `eslint-plugin-vue-sort-components`

A plugin for ESLint to keep order of component names.

## Installation

```shell
$ npm install --save-dev eslint @jay-es/eslint-plugin-vue-sort-components
```

or

```shell
$ yarn add -dev @jay-es/eslint-plugin-vue-sort-components
```

## Usage

Add `plugin:@jay-es/vue-sort-components/recommended` to the extends section of your `.eslintrc` configuration file.

```js
{
  "extends": [
    // ...
    "plugin:@jay-es/vue-sort-components/recommended"
  ]
}
```

### Custom Configuration

Add `@jay-es/vue-sort-components` to the plugins section of your `.eslintrc` configuration file.

```js
{
  "plugins": ["@jay-es/vue-sort-components"]
}
```

Then configure the rule under the rules section.

```js
{
  "rules": {
    "@jay-es/vue-sort-components/vue-sort-components": "error"
  }
}
```

## Rule Details

This rule checks property definitions of object expressions named `components` and verifies that all keys are sorted alphabetically.

Examples of **incorrect** code for this rule:

```js
export default defineComponent({
  components: { Foo, Bar, Baz },
});

// not only in Vue-specific context
const myObject = {
  components: { Foo, Bar, Baz },
};
```

Examples of **correct** code for this rule:

```js
export default defineComponent({
  components: { Bar, Baz, Foo },
});

// not only in Vue-specific context
const myObject = {
  components: { Bar, Baz, Foo },
};
```
