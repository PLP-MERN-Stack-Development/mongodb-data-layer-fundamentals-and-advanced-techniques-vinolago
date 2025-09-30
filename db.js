// Connect to database 
require('dotenv').config(); // Load env
const { MongoClient } = require('mongodb');


const client = new MongoClient(process.env.MONGODBATLAS_URI); // 

async function connectDB(dbName) {
    try {
        await client.connect(); // connect to DB
        console.log('Connected to MongoDB');
        return client.db(dbName);
    } catch(error) {
        console.error('Failed to connect:', error);
    }
}
module.exports = {connectDB, client};