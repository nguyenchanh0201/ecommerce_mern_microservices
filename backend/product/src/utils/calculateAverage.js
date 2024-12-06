module.exports = (product) => {
    const reviews = product.reviews;
    let totalRatings = 0;
    let totalReviews = 0;

    
    for (const review of reviews) {
        if (review.is_verified) {
            totalRatings += review.rating;
            totalReviews++;
        }
    }

    
    const averageRatings = totalReviews > 0 ? totalRatings / totalReviews : 0;

    
    product.averageRatings = averageRatings;

    return product;
};
