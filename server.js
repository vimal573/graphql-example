const path = require('path');
const express = require('express');
const { createHandler } = require('graphql-http/lib/use/express');

const { loadFilesSync } = require('@graphql-tools/load-files');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const typesArray = loadFilesSync(path.join(__dirname, '**/*.graphql'));

const schema = makeExecutableSchema({
  typeDefs: typesArray,
  resolvers: {
    Query: {
      products: async parent => {
        console.log('Getting the products...');
        const porduct = await Promise.resolve(parent.products);
        return porduct;
      },
      orders: parent => {
        console.log('Getting orders...');
        return parent.orders;
      },
    },
  },
});

const root = {
  products: require('./products/products.model'),
  orders: require('./orders/orders.model'),
};

const app = express();

app.use(
  '/graphql',
  createHandler({
    schema: schema,
    rootValue: root,
    graphiql: true,
  })
);

app.listen(3000, () => {
  console.log('Running GraphQl server...');
});
