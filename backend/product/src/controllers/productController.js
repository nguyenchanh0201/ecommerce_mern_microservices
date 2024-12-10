const ProductService = require('../services/productService');
const messageBroker = require("../utils/messageBroker");
const uuid = require('uuid');
const uploadFile = require('../utils/uploadFile');

class ProductController {

    constructor() {
        this.ProductService = new ProductService();
        this.createOrder = this.createOrder.bind(this);
        this.getOrderStatus = this.getOrderStatus.bind(this);
        this.ordersMap = new Map();
        this.createProduct = this.createProduct.bind(this);
        
    }

    async getProduct(req, res, next) {
        try {
            const result = await this.ProductService.getProduct();

            if (!result.success) {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    async getProductPaginate(req, res, next) {
        try {
            const { page, limit } = req.query;
            const result = await this.ProductService.getProductPaginate(page, limit);
            if (!result.success) {
                return res.status(404).json(result);
            }
            res.status(200).json(result);

        } catch (err) {
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
        } catch (err) {
            next(err);
        }
    }



    async createProduct(req, res, next) {
        try {
            // Upload image using multer middleware
            uploadFile.single('image')(req, res, async (err) => {
                if (err) {
                    return res.status(400).json({ success: false, message: 'Image upload failed', error: err });
                }

                const product = JSON.parse(req.body.productData);

                // If an image was uploaded, add the image URL to the product
                if (req.file) {
                    product.imageURL = `uploads/${req.file.filename}`;
                }
                // Call the service to create a new product
                
                const result = await this.ProductService.createProduct(product);
                if (!result.success) {
                    return res.status(400).json(result);
                }

                
                res.status(201).json(result);
            });

        } catch (err) {
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
        } catch (err) {
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
        } catch (err) {
            next(err);
        }
    }


    async addReview(req, res, next) {
        try {
            const { id } = req.params;
            const username = req.user.username;

            const review = req.body;
            review.username = username;
            const result = await this.ProductService.addProductReview(id, review);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    async deleteReview(req, res, next) {
        try {
            const { id, reviewId } = req.params;
            const result = await this.ProductService.deleteProductReview(id, reviewId);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);

        } catch (err) {
            next(err);
        }
    }

    async searchProduct(req, res, next) {
        try {
            const { nameOrCategory, page, limit } = req.query;

            if (!nameOrCategory) {
                return res.status(400).json({ success: false, message: 'Query parameter is required' });
            }


            const result = await this.ProductService.getProductByName(nameOrCategory, page, limit);
            // console.log(result.success)


            if (!result.success) {
                const resultCategory = await this.ProductService.getProductByCategory(nameOrCategory, page, limit);
                
                if (!resultCategory.success) {
                    return res.status(404).json(result);
                }
                return res.status(200).json(resultCategory.data);
                
            }
            
            return res.status(200).json(result.data);

        } catch (err) {
            next(err);
        }
    }



    async editSpecification(req, res, next) {
        try {
            const { id } = req.params;
            const { specification } = req.body;
            const result = await this.ProductService.updateProductSpecifications(id, specification);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    async addVariant(req, res, next) {
        try {
            const { id } = req.params;
            const variant = req.body;
            const result = await this.ProductService.addVariant(id, variant);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    async editVariant(req, res, next) {
        try {
            const { id, variantId } = req.params;

            const variant = req.body;
            const result = await this.ProductService.editVariant(id, variantId, variant);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    async deleteVariant(req, res, next) {
        try {
            const { id, variantId } = req.params;
            const result = await this.ProductService.deleteVariant(id, variantId);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    async addTag(req, res, next) {
        try {
            const { id } = req.params;
            const { tags } = req.body;
            const result = await this.ProductService.addTags(id, tags);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    async deleteTag(req, res, next) {
        try {
            const { id, index } = req.params;
            const result = await this.ProductService.deleteTag(id, index);
            if (!result.success) {
                return res.status(400).json(result);
            }
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }

    // async updateStock(req, res, next) {
    //     try {
    //         const {id} = req.params;
    //         const {stock} = req.body;
    //         const result = await this.ProductService.updateStock(id, stock);
    //         if (!result.success) {
    //             return res.status(400).json(result);
    //         }
    //         res.status(200).json(result);
    //     } catch(err) {
    //         next(err);
    //     }
    // }

    async createOrder(req, res, next) {

        try {

            

            const { ids } = req.body;
            
            const products = await this.ProductService.getProductsByIds(ids);

            if (!products.success) {
                return res.status(400).json(products);
            }
           
            const total = products.data.reduce((acc, product) => {
                return acc + product.price;
            }, 0);

            const orderId = uuid.v4();
            this.ordersMap.set(orderId, {
                status: "pending",
                products,
                userId: req.user._id,
                total: total
            });

            await messageBroker.publishMessage("orders", {
                products: ids,
                userId: req.user._id,
                orderId,
                total: total,
            })

            messageBroker.consumeMessage("products", (data) => {
                const orderData = JSON.parse(JSON.stringify(data));
                const { orderId } = orderData;
                const order = this.ordersMap.get(orderId);
                if (order) {
                    // update the order in the map
                    this.ordersMap.set(orderId, { ...order, ...orderData, status: 'completed' });
                    console.log("Updated order:", order);
                }
            });

            // Long polling until order is completed
            let order = this.ordersMap.get(orderId);
            while (order.status !== 'completed') {
                await new Promise(resolve => setTimeout(resolve, 1000)); // wait for 1 second before checking status again
                order = this.ordersMap.get(orderId);
            }

            // Once the order is marked as completed, return the complete order details
            return res.status(201).json(order);


            // res.status(200).json({ success: true, data: { products: products.data, total } });
        } catch (err) {
            next(err);
        }

    }

    async getOrderStatus(req, res, next) {
        try {
            const { orderId } = req.params;
            const order = this.ordersMap.get(orderId);
            if (!order) {
                return res.status(404).json({ message: 'Order not found' });
            }
            return res.status(200).json(order);
        }
        catch (err) {
            next(err);
        }

    }

    async getLatestAndBestSellersProducts(req, res, next) {
        try {
            const { x } = req.params;
            const result = await this.ProductService.getLatestAndBestSellersProducts(x);
            if (!result.success) {
                return res.status(404).json(result);
            }
            res.status(200).json(result);
        } catch (err) {
            next(err);
        }
    }




}


module.exports = ProductController;