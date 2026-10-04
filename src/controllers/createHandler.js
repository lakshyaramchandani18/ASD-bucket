const fs = require("fs/promises");
const path = require("path");
const { getProducts, cache } = require("./helpers");

const dbPath = path.join(__dirname, '..', 'routes', "data.json");

const createProduct = async (req, res) => {
  try {
    const { id, name, price } = req.body;

    if (id === undefined || !name || price === undefined) {
      return res.status(400).json({ error: "missing required fields from body" });
    }

    const items = await getProducts();

    const product = { id, name, price };
    items.push(product);

    await fs.writeFile(dbPath, JSON.stringify(items), "utf-8");

    delete cache['products'];

    return res.status(200).json({ product });

  } catch (err) {
    return res.status(500).json({ "error": `something broke: ${err.message}` });
  }
};

module.exports = { createProduct };
