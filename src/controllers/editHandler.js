const fs = require("fs/promises");
const path = require("path");
const { getProducts, cache } = require("./helpers");

const dbPath = path.join(__dirname, '..', 'routes', "data.json");

const editProduct = async (req, res) => {
  try {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).json({ error: "that product id doesn't look right" });
    }

    const { name, price } = req.body;

    if (!name && !price) {
      return res.status(400).json({ error: "no data provided to update" });
    }

    const items = await getProducts();

    const target = items.find((p) => Number(p.id) === productId);

    if (!target) {
      return res.status(404).json({ error: "couldn't find that product" });
    }

    if (name) target.name = name;
    if (price) target.price = price;

    await fs.writeFile(dbPath, JSON.stringify(items), "utf-8");

    delete cache['products'];
    delete cache[`product${productId}`];

    return res.status(200).json({ product: target });

  } catch (err) {
    return res.status(500).json({ error: `something broke: ${err.message}` });
  }
};

module.exports = { editProduct };
