module.exports = {
  ignores: [(commit) => commit.includes("init")] /* 要忽略的提交信息 */,
  extends: ["@commitlint/config-conventional"] /* 常规配置，不能省略 */,
  parserPreset: {
    parserOpts: {
      headerPattern: /^(\w*|[\u4e00-\u9fa5]*)(?:[\（](.*)[\）])?[\：](.*)/,
      headerCorrespondence: ["type", "scope", "subject"],
    },
  },
  rules: {
    "header-max-length": [2, "always", 72],
    "body-leading-blank": [2, "always"],
    "footer-leading-blank": [2, "always"],
    "subject-empty": [2, "never"],
    "type-empty": [2, "never"],
    "type-enum": [
      2,
      "always",
      [
        "build", // 修改项目的的构建系统（vite等）的提交
        "ci", // 修改项目的持续集成流程（Kenkins、Travis等）的提交
        "docs", // 文档提交（documents）
        "feat", // 新增功能（feature）
        "fix", // 修复 bug
        "perf", // 性能、体验相关的提交
        "refactor", // 代码重构
        "test", // 测试相关的开发
        "style", // 不影响程序逻辑的代码修改、主要是样式方面的优化、修改
        "chore", // 依赖更新/脚手架配置修改等
        "revert", // 撤销修改
      ],
    ],
  },
};
