const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const { GridFSBucket } = require('mongodb');

async function connectToDb(dbName) {
    try {
        const db = await mongoose.connect(process.env.DB_URI, {dbName});
        console.log(`Connected to database ${dbName}`);
        return db;
    } catch(err) {
        console.log(`Error in Connecting to database ${err.message}`);
        process.exit(1);
    }
}

function createBucket(bucketName) {
    const bucket = new GridFSBucket(mongoose.connection.db, { bucketName });
    return bucket;
}


module.exports = { connectToDb, createBucket };