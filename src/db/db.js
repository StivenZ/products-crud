const mongoose = require('mongoose');

let isConnected;

module.exports = connectToDatabase = async () => {

  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }

  console.log('=> using new database connection');

  try {
      const conn = await mongoose.connect(process.env.DB_DRIVER, { useNewUrlParser: true });
      console.log('DB succesfully connected');
      isConnected = conn.connections[0].readyState;
  } catch (err) {
      console.log(err);
  }
};