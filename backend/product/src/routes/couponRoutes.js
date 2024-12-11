const express = require('express');

const router = express.Router();

const CouponController = require('../controllers/couponController');

const couponController = new CouponController();


router.get('/', (req, res, next) => couponController.getCoupons(req, res, next));
router.get('/:id', (req, res, next) => couponController.getCouponById(req, res, next));
router.post('/', (req, res, next) => couponController.createCoupon(req, res, next));
router.put('/:id', (req, res, next) => couponController.updateCoupon(req, res, next));
router.delete('/:id', (req, res, next) => couponController.deleteCoupon(req, res, next));
router.get('/code/:code', (req, res, next) => couponController.getCouponByCode(req, res, next));


module.exports = router;
