const { hashSync, compareSync } = require("bcryptjs");

const SALT_ROUND = 10;

function encrypt(plainText) {
  return hashSync(plainText, SALT_ROUND);
}

function compare(plainText, hash) {
  return compareSync(plainText, hash);
}

module.exports = {
  encrypt,
  compare,
};
