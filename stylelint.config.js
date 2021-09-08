module.exports = {
  extends: ["stylelint-config-standard", "stylelint-config-recess-order"],
  rules: {
    indentation: 4,
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: ["include", "mixin", "use", "function", "return"],
      },
    ],
    "at-rule-empty-line-before": [
      "always",
      {
        ignore: ["after-comment"],
        except: ["after-same-name"],
      },
    ],
  },
};
