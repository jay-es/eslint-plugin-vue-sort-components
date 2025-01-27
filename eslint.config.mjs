import neostandard from "neostandard";
import tseslint from "typescript-eslint";

export default [
  ...neostandard({
    ignores: ["lib/*"],
    noStyle: true,
    semi: true,
    ts: true,
  }),
  ...tseslint.config(tseslint.configs.strict, tseslint.configs.stylistic),
];
