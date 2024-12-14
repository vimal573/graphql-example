const productsModel = require('./products.model');

module.exports = {
  Query: {
    products: parent => {
      return productsModel.getAllProducts();
    },
    productsByPrice: (_, args) => {
      return productsModel.getProductsByPrice(args.min, args.max);
    },
  },
};
