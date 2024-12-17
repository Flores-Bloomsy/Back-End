function updateOrderStatus(next) {
  if (this.isModified("products")) {
    const productStatuses = this.products.map(
      (product) => product.shippingStatus
    );
    console.log(productStatuses);

    if (productStatuses.every((status) => status === "delivered")) {
      this.orderStatus = "delivered";
    } else if (productStatuses.every((status) => status === "shipped")) {
      this.orderStatus = "shipped";
    } else {
      this.orderStatus = "pending";
    }
  }
  next();
}

module.exports = updateOrderStatus;
