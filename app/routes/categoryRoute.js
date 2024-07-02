const router = require("express").Router();
const categoryController = require("../controller/categoryController");

router.get('/categories', categoryController.getAllCategories)
router.post('/categories', categoryController.createCategory)

module.exports = router