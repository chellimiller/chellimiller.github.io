const path = require("path");
const {POST_DATE, NON_ALPHANUMERIC} = require("./regex");
const Hashids = require("hashids/cjs");
const fm = require("front-matter");

const hashids = new Hashids();

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

/**
 * Parse the front matter from markdown and return as an object.
 * This uses the `front-matter` library.
 *
 * @param {string} markdown
 * @returns
 */
function parseFrontMatter(markdown) {
  const {attributes, frontmatter} = fm(markdown);
  return {attributes, frontmatter};
}

/**
 * Parse the front matter from markdown and return as an object.
 * This uses the `front-matter` library.
 *
 * @param {string} markdown
 * @returns
 */
function generateCorrectMarkdown(title, markdown) {
  const prev = fm(markdown);
  if (prev.attributes.permalink) return markdown;

  const postId = generatePostId(title);
  const permalink = `/articles/${postId}/`;

  const next = [`permalink: ${permalink}`, prev.frontmatter].join("\n");

  return markdown.replace(prev.frontmatter, next);
}

module.exports = {
  generateCorrectMarkdown,
  generatePostId,
  parseDate,
  parseFrontMatter,
  parseTitle,
  toNumberish,
};
