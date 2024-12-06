const express = require('express');

const router = express.Router();
const ProductController = require('../controllers/productController');
const productController = new ProductController();

// General Product Routes
router.get('/', (req, res, next) => productController.getProduct(req, res, next));
router.post('/', (req, res, next) => productController.createProduct(req, res, next));
router.get('/page', (req, res, next) => productController.getProductPaginate(req, res, next));
router.get('/search', (req, res, next) => productController.searchProduct(req, res, next));
router.get('/:id', (req, res, next) => productController.getProductById(req, res, next));
router.put('/:id', (req, res, next) => productController.updateProduct(req, res, next));
router.delete('/:id', (req, res, next) => productController.deleteProduct(req, res, next));

// Variant Routes
router.post('/:id/variant', (req, res, next) => productController.addVariant(req, res, next));
router.put('/:id/variant/:variantId', (req, res, next) => productController.editVariant(req, res, next));
router.delete('/:id/variant/:variantId', (req, res, next) => productController.deleteVariant(req, res, next));

// Specification Routes
router.put('/:id/specifications', (req, res, next) => productController.editSpecification(req, res, next));

// Review Routes
router.post('/:id/review/', (req, res, next) => productController.addReview(req, res, next));
router.delete('/:id/review/:reviewId', (req, res, next) => productController.deleteReview(req, res, next));

// Tag Routes
router.post('/:id/tags', (req, res, next) => productController.addTag(req, res, next));
router.delete('/:id/tags/:index', (req, res, next) => productController.deleteTag(req, res, next));

module.exports = router;


