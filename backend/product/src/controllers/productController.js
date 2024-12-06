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


    async addReview(req, res, next) {
        try {
            const { id } = req.params;
            const review = req.body;
            const result = await this.ProductService.addProductReview(id, review);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch(err) {
            next(err);
        }
    }

    async deleteReview(req, res, next) {
        try {
            const {id, index} = req.params;
            const result = await this.ProductService.deleteProductReview(id, index);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);

        } catch(err) {
            next(err);
        }
    }

    async searchProduct(req, res, next) {
        try {
            const { nameOrCategory } = req.query;
    
            if (!nameOrCategory) {
                return res.status(400).json({ success: false, message: 'Query parameter is required' });
            }
    
            
            const result = await this.ProductService.getProductByName(nameOrCategory);
    
            
            if (!result || result.length === 0) {
                const resultCategory = await this.ProductService.getProductByCategory(nameOrCategory);
    
                if (!resultCategory || resultCategory.length === 0) {
                    return res.status(404).json({ success: false, message: 'No product found' });
                }
    
                return res.status(200).json({ success: true, data: resultCategory });
            }
    
            
            return res.status(200).json({ success: true, data: result });
    
        } catch (err) {
            next(err); 
        }
    }

    

    async editSpecification(req, res, next) {
        try {
            const {id} = req.params;
            const {specification} = req.body;
            const result = await this.ProductService.updateProductSpecifications(id, specification);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch(err) {
            next(err);
        }
    }

    async addVariant(req, res, next) {
        try {
            const {id} = req.params;
            const variant = req.body;
            const result = await this.ProductService.addVariant(id, variant);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch(err) {
            next(err);
        }
    }

    async editVariant(req, res, next) {
        try {
            const {id} = req.params;
            const variant = req.body;
            const result = await this.ProductService.editVariant(id, variant);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch(err) {
            next(err);
        }
    }

    async deleteVariant(req, res, next) {
        try {
            const {id, index} = req.params;
            const result = await this.ProductService.deleteVariant(id, index);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch(err) {
            next(err);
        }
    }

    async addTag(req, res, next) {
        try {
            const {id} = req.params;
            const {tags} = req.body;
            const result = await this.ProductService.addTags(id, tags);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch(err) {
            next(err);
        }
    }

    async deleteTag(req, res, next) {
        try {
            const {id, index} = req.params;
            const result = await this.ProductService.deleteTag(id, index);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch(err) {
            next(err);
        }
    }

    async updateStock(req, res, next) {
        try {
            const {id} = req.params;
            const {stock} = req.body;
            const result = await this.ProductService.updateStock(id, stock);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch(err) {
            next(err);
        }
    }

}


module.exports = ProductController;