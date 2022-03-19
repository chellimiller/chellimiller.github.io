const fs = require("fs");
const path = require("path");
const {generateCorrectMarkdown} = require("./lib/util");

const root = path.dirname(__dirname);
const posts = path.join(root, "posts");

function updateFileFrontmatter(directory, file) {
  const filePath = path.join(directory, file);
  fs.readFile(filePath, {encoding: "latin1"}, (readError, data) => {
    if (readError) throw readError;

    const next = generateCorrectMarkdown(file, data);

    if (data !== next) {
      fs.writeFile(filePath, next, {}, (writeError) => {
        if (writeError) throw readError;
      });
    }
  });
}

function addMissingPermalinks(directory = posts) {
  fs.readdirSync(directory, {withFileTypes: true}).forEach((entry) => {
    if (entry.isDirectory()) {
      addMissingPermalinks(path.join(directory, entry.name));
      return;
    }

    if (entry.isFile()) {
      updateFileFrontmatter(directory, entry.name);
    }
  });
}

addMissingPermalinks();
