module.exports = {
  env: {
    es2021: true,
    node: true,
  },
  extends: ["next", "prettier"],
  rules: {
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
  },
  parserOptions: {
    ecmaVersion: 12,
    sourceType: "module",
  },
};
