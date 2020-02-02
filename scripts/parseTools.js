const { readFile, readdir, writeFile } = require("fs");

readFile("./README.md", "utf8", (err, data) => {
  console.log(data);
});
