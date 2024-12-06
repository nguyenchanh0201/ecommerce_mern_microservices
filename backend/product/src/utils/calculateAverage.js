module.exports = (product) => {
    const reviews = product.reviews;
    let totalRatings = 0;
    let totalReviews = 0;

    // Calculate total ratings and total verified reviews
    for (const review of reviews) {
        if (review.is_verified) {
            totalRatings += review.rating;
            totalReviews++;
        }
    }

    // Calculate average ratings (avoid division by zero)
    const averageRatings = totalReviews > 0 ? totalRatings / totalReviews : 0;

    // Update the product's averageRatings
    product.averageRatings = averageRatings;

    return product;
};
