let mix = require('laravel-mix');

mix.js('src/scripts/main.js', 'dist/assets').vue({ version: 2 })
  .postCss("src/styles/app.css", "dist/assets", [
   require("postcss-import"),
   require("postcss-nested"),
   require("tailwindcss"),
  ])
  .options({
    clearConsole: false,
  });
