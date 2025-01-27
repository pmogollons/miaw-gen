import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginUnusedImports from "eslint-plugin-unused-imports";


export default [
  { files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"] },
  { languageOptions: { globals: { ...globals.browser, ...globals.node, ...globals.meteor } } },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,

  {
    plugins: {
      "unused-imports": pluginUnusedImports,
    },
  },

  {
    "rules": {
      "indent": [
        "error",
        2,
        {
          "SwitchCase": 1,
          "ignoredNodes": ["TemplateLiteral"],
        },
      ],
      "quotes": [
        "error",
        "double",
      ],
      "semi": [
        "error",
        "always",
      ],
      "no-console": [
        "off",
      ],
      "no-unused-vars": [
        "warn",
      ],
      "comma-dangle": [
        "warn",
        "always-multiline",
      ],
      "curly": [
        "error",
      ],
      "no-extra-bind": [
        "error",
      ],
      "no-multi-spaces": [
        "error",
      ],
      "comma-spacing": [
        "error",
        { "before": false, "after": true },
      ],
      "brace-style": [
        "error",
        "1tbs",
      ],
      "block-spacing": [
        "error",
        "always",
      ],
      "padded-blocks": [
        "error",
        "never",
      ],
      "keyword-spacing": [
        "error",
        { "after": true, "before": true },
      ],
      "object-curly-spacing": [
        "error",
        "always",
      ],
      "jsx-quotes": [
        "error",
        "prefer-double",
      ],
      "prefer-const": [
        "warn",
      ],
      "no-var": [
        "error",
      ],
      "no-trailing-spaces": [
        "error",
      ],
      "react/jsx-uses-react": "off",
      "react/react-in-jsx-scope": "off",
      "unused-imports/no-unused-imports": "error",
      // 'unused-imports/no-unused-vars': [
      //   'warn',
      //   { 'vars': 'all', 'varsIgnorePattern': '^_', 'args': 'after-used', 'argsIgnorePattern': '^_' }
      // ],
      "@typescript-eslint/no-explicit-any": "off",
    },
  },
];