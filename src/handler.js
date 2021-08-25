const connectToDatabase = require('../db/db.js')
const ProductModel = require('../db/models/Product.Model.js')
const dotenv = require( 'dotenv/config');

'use strict';

module.exports.create = (event, context, callback) => {
    context.callbackWaitsForEmptyEventLoop = false;

    connectToDatabase()
      .then(() => {
        ProductModel.create(JSON.parse(event.body))
          .then(newProduct => callback(null, {
            statusCode: 200,
            body: JSON.stringify(newProduct)
          }))
          .catch(err => callback(null, {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Could not create the note.'
          }));
      });
};

module.exports.listOne = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      ProductModel.findById(event.pathParameters.id)
        .then(ProductModel => callback(null, {
          statusCode: 200,
          body: JSON.stringify(ProductModel)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the ProductModel.'
        }));
    });
};

module.exports.listAll = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      ProductModel.find()
        .then(products => callback(null, {
          statusCode: 200,
          body: JSON.stringify(products)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the ProductModels.'
        }))
    });
};

module.exports.edit = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      ProductModel.findByIdAndUpdate(event.pathParameters.id, JSON.parse(event.body), { new: true })
        .then(product => callback(null, {
          statusCode: 200,
          body: JSON.stringify(product)
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the ProductModels.'
        }));
    });
};

module.exports.delete = (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  connectToDatabase()
    .then(() => {
      ProductModel.findByIdAndRemove(event.pathParameters.id)
        .then(product => callback(null, {
          statusCode: 200,
          body: JSON.stringify({ message: 'Removed ProductModel with id: ' + product._id, product: product })
        }))
        .catch(err => callback(null, {
          statusCode: err.statusCode || 500,
          headers: { 'Content-Type': 'text/plain' },
          body: 'Could not fetch the ProductModels.'
        }));
    });
};