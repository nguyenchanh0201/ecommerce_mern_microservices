const Product = require('../models/product');
const mongoosePaginate = require("mongoose-paginate-v2");

class ProductRepository {

    async getProduct() {
        return Product.find();
    }

    async getProductPaginate(page, limit) {
        return await Product.paginate({}, { page, limit });
    }

    async getProductById(id) {
        return await Product.findOne({_id: id});
    }

    async createProduct(product) {
        return await Product.create(product);
    }

    async deleteProduct(id) {
        return await Product.findByIdAndDelete({_id: id});
    }

    async save() {
        return await Product.save();
    }

    async save(product) {
        return await product.save()
    }

}

module.exports = ProductRepository;