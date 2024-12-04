const ProductService = require('../services/productService');

class ProductController {

    constructor() {
        this.ProductService = new ProductService();
    }

    async getProduct(req, res, next) {
        try {
            const result = await this.ProductService.getProduct();

            if(!result.success) {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch(err){
            next(err);
        }
    }

    async getProductPaginate(req, res, next) {
        try {
            const { page} = req.query;
            const limit = 10 ; 
            const result = await this.ProductService.getProductPaginate(page, limit);
            if (!result.success) {
                return res.status(404).json(result);
            }
            res.status(200).json(result);

        } catch(err){
            next(err);
        }
    }


    async getProductById(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this.ProductService.getProductById(id);
            if (!result.success) {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch(err){
            next(err);
        }
    }

    async createProduct(req, res, next) {
        try {
            const product = req.body;
            const result = await this.ProductService.createProduct(product);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(201).json(result);
        } catch(err){
            next(err);
        }
    }

    async deleteProduct(req, res, next) {
        try {
            const { id } = req.params;
            const result = await this.ProductService.deleteProduct(id);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch(err){
            next(err);
        }
    }

    async updateProduct(req, res, next) {
        try {
            const { id } = req.params;
            const product = req.body;
            const result = await this.ProductService.updateProduct(id, product);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch(err){
            next(err);
        }
    }



}


module.exports = ProductController;