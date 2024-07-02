const router = require("express").Router();
const productController = require("../controller/productController");

router.get('/products', productController.getAllProducts)
router.post('/products', productController.createProduct)
router.put('/products/:id', productController.updateProduct)
router.delete('/products/:id', productController.deleteProduct)
router.get('/products/:id', productController.getProductById)
router.get('/categories/:id', productController.getProductsByCategoryId)

module.exports = router