const express = require('express');

const router = express.Router();

const ProductController = require('../controllers/productController');

const productController = new ProductController();

router.get('/', (req, res, next) => productController.getProduct(req, res, next));
router.get("/page", (req, res, next) => productController.getProductPaginate(req, res, next));
router.get('/:id', (req, res, next) => productController.getProductById(req, res, next));
router.post('/', (req, res, next) => productController.createProduct(req, res, next));
router.put('/:id', (req, res, next) => productController.updateProduct(req, res, next));
router.delete('/:id', (req, res, next) => productController.deleteProduct(req, res, next));



module.exports = router;