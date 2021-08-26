const connectToDatabase = require('./db/db.js');
const dotenv = require( 'dotenv/config');
const services = require('./services');
'use strict';

module.exports.create = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    console.log('Mi evento:', event);

    const conn = await connectToDatabase();
    try {
        const newProduct = await services.create(JSON.parse(event.body));

        return {
            statusCode: 200,
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify(newProduct)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: { 'Content-Type': 'text/plain' },
            body: 'Could not create the Product.'
        }
    }
};

module.exports.listOne = async (event, context) => {
    
  context.callbackWaitsForEmptyEventLoop = false;

  const conn = await connectToDatabase();

  try {
      const productObject = await services.listOne(event.pathParameters.id);
      console.log(productObject);

      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify(productObject)
      }
  } catch (err) {
      return {
        statusCode: err.statusCode || 500,
        headers: { 
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: 'Could not fetch the Product.'
      }
  }
};

module.exports.listAll = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;

    const conn = await connectToDatabase();

    try {
        const products = await services.listAll();

        return {
            statusCode: 200,
            headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify(products)
        }
    } catch (err) {
        return {
            statusCode: err.statusCode || 500,
            headers: { 
            'Content-Type': 'text/plain',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Credentials': true
            },
            body: 'Could not fetch the Product.'
        }
    }
};

module.exports.edit = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const conn = await connectToDatabase();

  connectToDatabase()

  try {
        const editedProduct = await services.edit(event.pathParameters.id, JSON.parse(event.body), { new: true });
        return {
            statusCode: 200,
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Access-Control-Allow-Credentials': true
            },
            body: JSON.stringify(editedProduct)
        }
  } catch (err) {
      return {
        statusCode: err.statusCode || 500,
        headers: { 
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: 'Could not fetch the Product.'
      }
  }
};

module.exports.deleteOne = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;

  const conn = await connectToDatabase();

  try {
      const product = await services.deleteOne(event.pathParameters.id);
      return {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: JSON.stringify({ message: 'Removed Product with id: ' + product._id, product: product })
      }
  } catch (err) {
      return {
        statusCode: err.statusCode || 500,
        headers: { 
          'Content-Type': 'text/plain',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true
        },
        body: 'Could not fetch the Product.'
      }
  }
};