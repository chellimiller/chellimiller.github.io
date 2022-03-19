const fs = require("fs");
const path = require("path");
const Hashids = require("hashids/cjs");

const hashids = new Hashids();

const root = path.dirname(__dirname);
const posts = path.join(root, "posts");

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

/**
 * Parse the title of the post to exclude date,
 * file ending, and all non-letter characters.
 *
 * @param {string} postTitle
 * @returns {string}
 */
function parseTitle(postTitle) {
  return (
    path
      .parse(postTitle)
      .name // Remove date
      .replace(POST_DATE, "")
      // Remove underscore and all non-alphanumeric characters
      .replace(NON_ALPHANUMERIC, "")
      .toLowerCase()
  );
}

/**
 * Parse the title of the post to exclude date,
 * file ending, and all non-letter characters.
 *
 * @param {string} postTitle
 * @returns {string}
 */
function parseDate(postTitle) {
  const match = postTitle.match(POST_DATE);
  if (!match) throw new Error(`'${postTitle}' does not match date`);

  const [_full, year, month, day] = match;

  return {
    year: Number.parseInt(year, 10),
    month: Number.parseInt(month, 10),
    day: Number.parseInt(day, 10),
  };
}

/**
 * Convert the random string to a number.
 * Removes all non-letter characters and uses base 36
 *
 * @param {string} randomString
 * @returns {number}
 */
function toNumberish(randomString) {
  return Number.parseInt(randomString.replace(NON_ALPHANUMERIC, ""), 36);
}

/**
 * Generate a unique post id for a post.
 *
 * @param {string} postTitle
 * @returns {number}
 */
function generatePostId(postTitle) {
  const {year, month, day} = parseDate(postTitle);
  const title = toNumberish(parseTitle(postTitle));

  return hashids.encode([year, month, day, title]);
}

module.exports = {
  toNumberish,
  parseTitle,
  generatePostId,
  parseDate,
};
