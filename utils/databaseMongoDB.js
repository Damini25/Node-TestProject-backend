const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://Damini:Jl8CGpsFIIxypgeb@cluster0-qpcj9.mongodb.net/test?retryWrites=true&w=majority'
    ).then(client => {
        console.log('connected');
        _db = client.db()
        callback();
    }
    ).catch(err => {
        console.log(err);
        throw err;
    });
}

const getDb = () => {
    if (_db) {
        return _db;
    }
    return "No Database Found";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
