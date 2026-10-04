const router = require("express").Router();
const fs = require("fs/promises");
const path = require("path");

const { getProducts, cache } = require('../controllers/helpers')
const { getAllProducts, getProductById } = require("../controllers/fetchHandlers")
const { createProduct } = require("../controllers/createHandler")
const { removeProduct } = require("../controllers/removeHandler")
const { editProduct } = require("../controllers/editHandler")

router.get("/", getAllProducts);
router.get("/:id", getProductById);

router.post('/', createProduct);

router.delete('/:id', removeProduct);

router.patch('/:id', editProduct);

module.exports = router;
