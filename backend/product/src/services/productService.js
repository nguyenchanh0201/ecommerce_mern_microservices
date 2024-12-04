const ProductRepository = require('../repositories/productRepository');

class ProductService {

    constructor() {
        this.ProductRepository = new ProductRepository();
    }

    async getProduct() {
        const result = await this.ProductRepository.getProduct();

        if (!result) {
            return { success : false, message : 'No product found' };
        }

        return { success : true, data : result };
    }

    async getProductPaginate(page, limit) {
        const result = await this.ProductRepository.getProductPaginate(page, limit);

        if (!result) {
            return { success : false, message : 'No product found' };
        }

        return { success : true, data : result };
    }


    async getProductById(id) {
        const result = await this.ProductRepository.getProductById(id);

        if (!result) {
            return { success : false, message : 'No product found' };
        }

        return { success : true, data : result };
    }


    async createProduct(product) {
        const result = await this.ProductRepository.createProduct(product);

        if (!result) {
            return { success : false, message : 'Failed to create product' };
        }

        return { success : true, data : result };

    }

    async deleteProduct(id) {
        const result = await this.ProductRepository.deleteProduct(id);

        if (!result) {
            return { success : false, message : 'Failed to delete product' };
        }

        return { success : true, data : result };
    }

    async updateProduct(id, productData) {

        const product = await this.ProductRepository.getProductById(id);

        if (!product) {
            return { success : false, message : 'Product not found' };
        }


        const {productName, imageURL, category, price, discount, original_price, specifications, description, brand, tags, warranty, return_policy} = productData;


        product.productName = productName || product.productName;
        product.imageURL = imageURL || product.imageURL;
        product.category = category || product.category;
        product.price = price || product.price;
        product.discount = discount || product.discount;
        product.original_price = original_price || product.original_price;
        product.specifications = specifications || product.specifications;
        product.description = description || product.description;
        product.brand = brand || product.brand;
        product.tags = tags || product.tags;
        product.warranty = warranty || product.warranty;
        product.return_policy = return_policy || product.return_policy;
        
        const result = await this.ProductRepository.save(product);

        if (!result) {
            return { success : false, message : 'Failed to update product' };
        }

        return { success : true, data : result };
    }
}


module.exports = ProductService;