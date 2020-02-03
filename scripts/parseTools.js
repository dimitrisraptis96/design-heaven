const { readFile, readdir, writeFile } = require("fs");

readFile("./README.md", "utf8", (err, data) => {
  var categories = data.split("### ");

  categories.forEach(category => {
    const tools = category.split("- **[");

    tools.forEach(tool => {
      const toolRefined = category.split("\n");
      console.log(toolRefined);
    });
  });
});
