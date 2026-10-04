const helper = require("./helpers")
const cache = helper.cache;

const getAllProducts = async (req, res) => {
    try {
      const key = 'products';
  
      if (cache[key]) {
        res.setHeader('X-Cache', 'HIT')
        return res.status(200).json(cache[key])
        
      }
      else {
        const items = await helper.getProducts()
        cache[key] = items
        res.setHeader('X-Cache', 'MISS')

        return res.status(200).json(items)
        
      }
      
      
    } catch (err) {
      return res.status(500).json({ error: `something went wrong: ${err}` });
    }
}

const getProductById = async (req, res) => {
  try {
    const productId = Number(req.params.id);
    if (isNaN(productId)) {
    return res.status(400).json({ error: "Invalid product ID" });
    }
    const cacheKey = `product${productId}`
    

    if (cache[cacheKey]) {
      res.setHeader('X-Cache', 'HIT')

      return res.status(200).json(cache[cacheKey]);
      
    } else {
      res.setHeader('X-Cache', 'MISS');
      const items = await helper.getProducts();

      const matched =  items.find((item) => item.id === productId);

      if (matched) {
        cache[cacheKey] = matched
        

        return res.status(200).json(matched)
      } else {
        return res.status(404).json({ error: `couldn't find that product` });
      }
      
      
      
    }

    
  } catch (err) {
    
    return res.status(500).json({ error: `something went wrong: ${err}` });
    
  }
}

module.exports = { 'getAllProducts': getAllProducts, 'getProductById': getProductById }



