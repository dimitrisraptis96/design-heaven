const { readFile, readdir, writeFile } = require("fs");
const { toSlug } = require("./slug");
const path = require("path");

const fullLinkOnlyRegex = /^\[([\w\s\d]+)\]\((https?:\/\/[\w\d./?=#]+)\)$/;

const regexMdLinks = /\[([^\[]+)\](\(.\))/gm;
const regexMdLinks2 = /\[(.+)\]\(([^ ]+)(?: "(.+)")?\)/;

readFile("./README.md", "utf8", async (err, data) => {
  const mainContent = data.split("---")[1];

  var categories = mainContent.split("### ");
  categories.shift();
  var finalTools = [];

  for (var i = 0; i < categories.length; i++) {
    const category = categories[i];
    const title = category.split("\n\n")[0];

    const categoryNew = {
      name: title,
      id: title.toLowerCase().replace(" ", "-")
    };

    const tools = category.split("\n\n")[1].split("\n");

    for (var j = 0; j < tools.length; j++) {
      const tool = tools[j];

      const description = tool.split("** - ")[1];

      // console.log(tool.match(regexMdLinks2));

      const link = tool.match(regexMdLinks2);
      console.log(link);
      const name = link[1];
      const url = link[2];

      // const [tag, name, url] = link.match(fullLinkOnlyRegex);

      finalTools.push({
        name,
        description,
        url,
        category: categoryNew.id
      });
    }
  }

  const helpersDir = path.resolve(__dirname, "..", "data");

  const filePath = path.join(helpersDir, `tools.json`);
  const toolsData = JSON.stringify(finalTools, null, 2) + "\n";
  console.log(finalTools);

  await writeFile(filePath, toolsData, (err, result) => {
    if (err) console.log("error", err);
  });
});
