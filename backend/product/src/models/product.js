const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const reviewSchema = new Schema({
  username: { type: String, required: true },
  rating: { type: Number, required: true, min: 1, max: 5 }, 
  comment: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  is_verified: { type: Boolean, default: false }
});


const variantSchema = new Schema({
  color: { type: String, required: true },
  size: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  totalSold: { type: Number, default: 0 },
});


const productSchema = new Schema({
  productName: { type: String, required: true },
  imageURL: { type: String, required: false },
  category: { type: String, required: true },
  price: { type: Number, required: true },
  discount: { type: Number, default: 0 }, 
  original_price: { type: Number, required: true },
  specifications: {
    ram: { type: String, required: true },
    CPU: { type: String, required: true },
    VGA: { type: String, required: true },
    SSD: { type: String, required: true },
    operating_system: { type: String, required: true },
    battery: { type: String, required: true }
  },
  description: { type: String, required: true },
  brand: { type: String, required: true },
  tags: [{ type: String }],
  averageRatings: { type: Number, default: 0 },
  totalSold: { type: Number, default: 0 },
  stock: { type: Number, required: true },
  reviews: [reviewSchema], 
  variants: [variantSchema], 
  related_products: [{
    type: Schema.Types.ObjectId,
    ref: 'products'
  }],
  warranty: { type: String, required: true },
  return_policy: { type: String, required: true },
  date_added: { type: Date, default: Date.now },
  last_updated: { type: Date, default: Date.now }
});


const Product = mongoose.model('Product', productSchema);

module.exports = Product;
