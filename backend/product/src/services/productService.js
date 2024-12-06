const ProductRepository = require('../repositories/productRepository');
const calculateAverage = require('../utils/calculateAverage');

class ProductService {

    constructor() {
        this.ProductRepository = new ProductRepository();
    }

    async getProduct() {
        const result = await this.ProductRepository.getProduct();

        if (!result) {
            return { success: false, message: 'No product found' };
        }

        return { success: true, data: result };
    }

    async getProductPaginate(page, limit) {
        const result = await this.ProductRepository.getProductPaginate(page, limit);

        if (!result) {
            return { success: false, message: 'No product found' };
        }

        return { success: true, data: result };
    }


    async getProductById(id) {
        const result = await this.ProductRepository.getProductById(id);

        if (!result) {
            return { success: false, message: 'No product found' };
        }

        return { success: true, data: result };
    }


    async createProduct(product) {
        const result = await this.ProductRepository.createProduct(product);

        if (!result) {
            return { success: false, message: 'Failed to create product' };
        }

        return { success: true, data: result };

    }

    async deleteProduct(id) {
        const result = await this.ProductRepository.deleteProduct(id);

        if (!result) {
            return { success: false, message: 'Failed to delete product' };
        }

        return { success: true, data: result };
    }

    async updateProduct(id, productData) {

        const product = await this.ProductRepository.getProductById(id);

        if (!product) {
            return { success: false, message: 'Product not found' };
        }


        const { productName, imageURL, category, price, discount, original_price, specifications, description, brand, tags, warranty, return_policy } = productData;


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
            return { success: false, message: 'Failed to update product' };
        }

        return { success: true, data: result };
    }

    //
    async updateProductSpecifications(id, specifications) {
        const product = await this.ProductRepository.getProductById(id);

        if (!product) {
            return { success: false, message: 'Product not found' };
        }

        const { ram, CPU, VGA, SSD, battery, operating_system } = specifications;

        product.specifications.ram = specifications.ram || product.specifications.ram;
        product.specifications.CPU = specifications.CPU || product.specifications.CPU;

        product.specifications.VGA = specifications.VGA || product.specifications.VGA;
        product.specifications.SSD = specifications.SSD || product.specifications.SSD;
        product.specifications.battery = specifications.battery || product.specifications.battery;
        product.specifications.operating_system = specifications.operating_system || product.specifications.operating_system;

        const result = await this.ProductRepository.save(product);

        if (!result) {
            return { success: false, message: 'Failed to update specifications' };
        }

        return { success: true, data: result };
    }


    async addProductReview(productId, review) {
        const product = await this.ProductRepository.getProductById(productId);

        if (!product) {
            return { success: false, message: 'Product not found' };
        }

        product.reviews.push(review);
        calculateAverage(product);

        const result = await this.ProductRepository.save(product);

        if (!result) {
            return { success: false, message: 'Failed to add review' };
        }

        return { success: true, data: result };
    }


    async deleteProductReview(id, reviewId) {
        const product = await this.ProductRepository.getProductById(id);

        if (!product) {
            return { success: false, message: 'Product not found' };
        }

        const initialLength = product.reviews.length;
        product.reviews = product.reviews.filter(review => review._id != reviewId);

        if (product.reviews.length === initialLength) {
            return { success: false, message: `Review with ID ${reviewId} not found` };
        }

        calculateAverage(product);
        const result = await this.ProductRepository.save(product);

        if (!result) {
            return { success: false, message: 'Failed to delete review' };
        }

        return { success: true, data: result };
    }


    async getProductByName(name, page, limit) {
        const result = await this.ProductRepository.getProductByName(name, page, limit);

        if (!result) {
            return { success: false, message: 'No product found' };
        }

        return { success: true, data: result };
    }

    async getProductByCategory(category, page, limit) {
        const result = await this.ProductRepository.getProductByCategory(category, page, limit);

        if (!result) {
            return { success: false, message: 'No product found' };
        }

        return { success: true, data: result };
    }

    async editVariant(id, variantId, variants) {
        const product = await this.ProductRepository.getProductById(id);

        if (!product) {
            return { success: false, message: 'Product not found' };
        }

        const variant = product.variants.id(variantId);

        if (!variant) {
            return { success: false, message: 'Variant not found' };
        }

        const { price, color, size, stock } = variants;

        variant.price = price || variant.price;
        variant.color = color || variant.color;
        variant.size = size || variant.size;
        variant.stock = stock || variant.stock;


        const result = await this.ProductRepository.save(product);

        if (!result) {
            return { success: false, message: 'Failed to update variants' };
        }

        return { success: true, data: result };
    }

    async addVariant(id, variant) {
        const product = await this.ProductRepository.getProductById(id);

        if (!product) {
            return { success: false, message: 'Product not found' };
        }

        product.variants.push(variant);

        const result = await this.ProductRepository.save(product);

        if (!result) {
            return { success: false, message: 'Failed to add variant' };
        }

        return { success: true, data: result };
    }

    async deleteVariant(id, variantId) {
        const product = await this.ProductRepository.getProductById(id);

        if (!product) {
            return { success: false, message: 'Product not found' };
        }

        const initialLength = product.variants.length;
        product.variants = product.variants.filter(variant => variant._id != variantId);

        
        if (product.variants.length === initialLength) {
            return { success: false, message: `Variant with ID ${variantId} not found` };
        }


        const result = await this.ProductRepository.save(product);

        if (!result) {
            return { success: false, message: 'Failed to delete variant' };
        }

        return { success: true, data: result };
    }

    async updateStock(id, stock) {
        const product = await this.ProductRepository.getProductById(id);

        if (!product) {
            return { success: false, message: 'Product not found' };
        }

        product.stock = stock || product.stock;

        const result = await this.ProductRepository.save(product);

        if (!result) {
            return { success: false, message: 'Failed to update stock' };
        }

        return { success: true, data: result };
    }

    async addTags(productId, tags) {
        // Fetch the product by ID
        const product = await this.ProductRepository.getProductById(productId);


        // Check if the product exists
        if (!product) {
            return { success: false, message: 'Product not found' };
        }

        // Ensure `tags` is an array
        console.log(tags)
        if (!Array.isArray(tags)) {
            return { success: false, message: 'Tags should be an array' };
        }

        // Add new tags to the product's tags array (avoid duplicates)
        const existingTags = new Set(product.tags);
        for (const tag of tags) {
            if (!existingTags.has(tag)) {
                product.tags.push(tag);
            }
        }

        // Save the updated product
        const result = await this.ProductRepository.save(product);

        // Check if save was successful
        if (!result) {
            return { success: false, message: 'Failed to add tags' };
        }

        return { success: true, data: result };
    }




}


module.exports = ProductService;