const router = require("express").Router();
const productController = require("../controller/productController");

router.get('/products', productController.getAllProducts)

module.exports = router