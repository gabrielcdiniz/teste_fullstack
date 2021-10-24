const { join } = require("path");

module.exports = {
  env: {
    POKE_API_V2: "https://pokeapi.co/api/v2",
  },
  sassOptions: {
    includePaths: [join(__dirname, "src", "styles")],
  },
  images: {
    domains: ["raw.githubusercontent.com"],
  },
};
