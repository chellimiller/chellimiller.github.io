/**
 * Matches a post date
 * @type {RegExp}
 */
const POST_DATE = /^(\d\d\d\d)-(\d\d)-(\d\d)/;

/**
 * Matches a value that is not a letter or number.
 * Unlike `\W`, this includes underscore.
 * @type {RegExp}
 */
const NON_ALPHANUMERIC = /[\W_]/g;

module.exports = {
  POST_DATE,
  NON_ALPHANUMERIC,
};
