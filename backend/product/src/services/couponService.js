const Coupon = require('../models/coupon');

class CouponService {

    async getCoupons() {
        const coupons = await Coupon.find();
        
        if (!coupons) {
            return { error: 'No coupons found' };
        }

        return coupons;
    }

    async getCouponById(id) {
        const coupon = await Coupon.findById(id);

        if (!coupon) {
            return { error: 'Coupon not found' };
        }
        return coupon;
    }

    async createCoupon(data) {
        const result = await Coupon.create(data);

        if (!result) {
            return { error: 'Coupon creation failed' };
        }
        return result;
    }

    async updateCoupon(id, data) {
        const result = await Coupon.findByIdAndUpdate(id, data, { new: true });
        
        if (!result) {
            return { error: 'Coupon update failed' };
        }
        return result;
    }

    async deleteCoupon(id) {
        const result =  Coupon.findByIdAndDelete(id);

        if (!result) {
            return { error: 'Coupon deletion failed' };
        }

        return result;
    }

    async getCouponByCode(code) {
        const coupon = await Coupon.findOne({ code });

        if (!coupon) {
            return { error: 'Coupon not found' };
        }
        return coupon;
    }
}

module.exports = CouponService;