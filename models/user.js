const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');

class User {
    constructor(name, email,id) {
        this.name = name;
        this.email = email;
        this._id = id ? new mongodb.ObjectId(id) : null
    }

    save() {
        const db = getDb();
        // console.log(this);
         if (this._id) {
             return db.collection('users').updateOne(
                 { _id: new mongodb.ObjectId(this._id) },
                 {
                     $set: {
                         name: this.name, email: this.email
                     }
                 }
             ).then(
                 result => {
                    // console.log('save()', result)
                 }
             ).catch(err => {
                 console.log('err', err);
             })
         }
         return db.collection('users').insertOne(this).then(
             result => {
                console.log('save()', result)
             }
         ).catch(err => {
             console.log('err', err);
         })
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('users').find().toArray().then(
            users => {
                // console.log('fetchAll()', products);
                return users;
            }
        ).catch(err => {
            console.log('err', err);
        })
    }

    static findById(userId) {
        const db = getDb();
        //  console.log('in model',prodId);
        return db.collection('users').find({ _id: new mongodb.ObjectId(userId) }).next().then(
            user => {
                console.log('fetchById()', user);
                return user;
            }
        ).catch(err => {
            console.log('err', err);
        })
    }

    static deleteById(userId) {
        const db = getDb();
        //  console.log('in model',prodId);
        return db.collection('users').deleteOne({ _id: new mongodb.ObjectId(userId) }).then(
            user => {
                console.log('User deleted');
                // return product;
            }
        ).catch(err => {
            console.log('err', err);
        })
    }
}
module.exports = User;