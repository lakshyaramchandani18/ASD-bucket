const fs = require("fs/promises");
const path = require("path");
let cache = {};

const dbPath = path.join(__dirname, '..', 'routes', "data.json");

console.log(dbPath);


async function loadProducts() {
  let items = await fs.readFile(dbPath, "utf-8");
  return JSON.parse(items);
}

async function getProducts() {
  await new Promise((resolve, reject) => {
    setTimeout(resolve, 1500);
  });
  return await loadProducts();
}
module.exports = { 'getProducts': getProducts, 'cache': cache }
