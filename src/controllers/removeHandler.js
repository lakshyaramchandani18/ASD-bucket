const fs = require("fs/promises");
const path = require("path");
const { getProducts, cache } = require("./helpers");

const dbPath = path.join(__dirname, '..', 'routes', "data.json");

const removeProduct = async (req, res) => {
  try {
    const productId = Number(req.params.id);

    if (isNaN(productId)) {
      return res.status(400).json({ error: "that product id doesn't look right" });
    }

    const items = await getProducts();

    const targetProduct = items.find((p) => Number(p.id) === productId);

    if (!targetProduct) {
      return res.status(404).json({ error: "couldn't find that product" });
    }

    const remaining = items.filter((p) => Number(p.id) !== productId);

    await fs.writeFile(dbPath, JSON.stringify(remaining), "utf-8");

    delete cache['products'];
    delete cache[`product${productId}`];

    return res.status(200).json({ product: targetProduct });


  } catch (err) {
    return res.status(500).json({ error: `something broke: ${err.message}` });
  }
};

module.exports = { removeProduct };
