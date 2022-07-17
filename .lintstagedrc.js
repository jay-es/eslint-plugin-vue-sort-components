module.exports = {
  "*.[jt]s": ["prettier --check", "eslint"],
  "*.ts": [() => "npm run type-check", "mocha"],
};
