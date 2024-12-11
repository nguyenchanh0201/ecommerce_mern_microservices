const CouponService = require('../services/couponService');

class CouponController {

    constructor() {
        this.couponService = new CouponService();
    }

    async getCoupons(req, res, next) {
        try {
            const coupons = await this.couponService.getCoupons();
            res.json(coupons);
        } catch (error) {
            next(error);
        }
    }

    async getCouponById(req, res, next) {
        try {
            const coupon = await this.couponService.getCouponById(req.params.id);
            res.json(coupon);
        } catch (error) {
            next(error);
        }
    }

    async createCoupon(req, res, next) {
        try {
            const coupon = await this.couponService.createCoupon(req.body);
            res.json(coupon);
        } catch (error) {
            next(error);
        }
    }

    async updateCoupon(req, res, next) {
        try {
            const coupon = await this.couponService.updateCoupon(req.params.id, req.body);
            res.json(coupon);
        } catch (error) {
            next(error);
        }
    }


    async deleteCoupon(req, res, next) {
        try {
            const coupon = await this.couponService.deleteCoupon(req.params.id);
            res.json(coupon);
        } catch (error) {
            next(error);
        }
    }

    async getCouponByCode(req, res, next) {
        try {
            const coupon = await this.couponService.getCouponByCode(req.params.code);
            res.json(coupon);
        } catch (error) {
            next(error);
        }
    }




}

module.exports = CouponController;