// const Nunjucks = require("nunjucks");
const path = require("path");
const yaml = require("js-yaml");
const prettier = require("prettier");

module.exports = eleventyConfig => {
  eleventyConfig.addDataExtension("yaml", contents => yaml.safeLoad(contents));
  eleventyConfig.addPassthroughCopy(
    {
      "src/assets/images": "_resources/images",
      "src/assets/data": "data"
    }
  );

  eleventyConfig.addTransform("prettier", function (content, outputPath) {
    const extname = path.extname(outputPath);
    switch (extname) {
      case ".html":
      case ".json":
        // Strip leading period from extension and use as the Prettier parser
        const parser = extname.replace(/^./, "");
        return prettier.format(content, { parser, printWidth: 320 });

      default:
        return content;
    }
  });

  return {
    dir: {
      input: "src/views",
      output: "dist",
      data: "_data",
      layouts: "_layouts",
      includes: "_includes"
    },
    htmlTemplateEngine: "njk"
  };
};
