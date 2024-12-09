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

    async getProductsByIds(ids) {
        return await Product.find({ _id: { $in: ids } });
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

    async getProductByName(productName, page, limit) {
        const skip = (page - 1) * limit;
    
        const [results, total] = await Promise.all([
            Product.find({
                productName: { $regex: productName.trim(), $options: 'i' }
            })
                .skip(skip)
                .limit(limit),
            Product.countDocuments({
                productName: { $regex: productName.trim(), $options: 'i' }
            })
        ]);
    
        return { success: true, data: results, total };
    }

    async getProductByCategory(category, page, limit) {
        
        const skip = (page - 1) * limit;
    
        const [results, total] = await Promise.all([
            Product.find({
                category: { $regex: category.trim(), $options: 'i' }
            })
                .skip(skip)
                .limit(limit),
            Product.countDocuments({
                category: { $regex: category.trim(), $options: 'i' }
            })
        ]);
    
        return { success: true, data: results, total };
    }

    
}

module.exports = ProductRepository;