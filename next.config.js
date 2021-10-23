const { join } = require("path");

module.exports = {
  env: {
    POKE_API: "https://pokeapi.co/api/v2/pokemon/",
  },
  sassOptions: {
    includePaths: [join(__dirname, "src", "styles")],
  },
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};
