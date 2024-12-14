const productsModel = require('./products.model');

module.exports = {
  Query: {
    products: parent => {
      return productsModel.getAllProducts();
    },
  },
};
