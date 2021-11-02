const { MongoClient } = require('mongodb');

const MONGODB_URI = process.env.MONGODB_URI;
const MONGODB_DB = process.env.MONGODB_DB;

if (!MONGODB_URI)
    throw new Error('Please define the MONGODB_URI environment variable inside .env.local');


if (!MONGODB_DB)
    throw new Error('Please define the MONGODB_DB environment variable inside .env.local');


/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached)
    cached = global.mongo = { conn: null, promise: null };


module.exports = {
    connectToDatabase: async function() {
        if (cached.conn)
            return cached.conn;


        if (!cached.promise) {
            const opts = {
                useNewUrlParser:    true,
                useUnifiedTopology: true,
            };

            cached.promise = MongoClient.connect(MONGODB_URI, opts).then(client => ({
                client,
                db: client.db(MONGODB_DB),
            }));
        }
        cached.conn = cached.promise;
        return cached.conn;
    }
}

// module.exports.connectToDatabase = connectToDatabase();