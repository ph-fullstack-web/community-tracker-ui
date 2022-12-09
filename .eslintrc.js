module.exports = {
  plugins: [
    "react"
 ],
  rules: {
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
