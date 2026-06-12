module.exports = function (eleventyConfig) {
  // Site assets live at the project root and are copied verbatim into the
  // build output, preserving their paths so every page's relative links
  // (tokens.css, app.css, app.js, images/…) keep working at any base path.
  eleventyConfig.addPassthroughCopy("tokens.css");
  eleventyConfig.addPassthroughCopy("app.css");
  eleventyConfig.addPassthroughCopy("app.js");
  eleventyConfig.addPassthroughCopy("images");
  eleventyConfig.addPassthroughCopy("薛伯輝基金會場地使用辦法.pdf");
  eleventyConfig.addPassthroughCopy("pdfs");

  return {
    dir: {
      input: "src",
      output: "_site",
      includes: "_includes",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
