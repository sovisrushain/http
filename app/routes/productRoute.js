const router = require("express").Router();
const productController = require("../controller/productController");

router.get('/products', productController.getAllProducts)
router.post('/products', productController.createProduct)

module.exports = router