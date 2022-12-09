module.exports = {
  plugins: [
    "react",
    "react-hooks"
 ],
  rules: {
    "react-hooks/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off",
    "react/prop-types": "off",
    "prettier/prettier": [
      "error",
      {
        "endOfLine": "auto"
      }
    ],
  },
  extends: ["eslint:recommended", "plugin:react/recommended", "plugin:prettier/recommended"],
};
