const mongoose = require( "mongoose" );

const DB_URI = process.env.DB_URI || "mongodb+srv://admin:adminpass@main.dbs9vfl.mongodb.net/";

const connectMongoDB = async () => {
  await mongoose.connect(DB_URI).then(() => {
    console.log("Connected to MongoDB");
  }).catch((err) => {
    
    console.log(err); // Development only

    console.log("Error connecting to MongoDB");
  })
}

module.exports = connectMongoDB;