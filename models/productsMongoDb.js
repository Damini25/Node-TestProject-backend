const getDb = require('../utils/database').getDb;
const mongodb = require('mongodb');

class Product {
    constructor(title, price, desc, imageUrl, id) {
        //this.id = id;
        this.title = title;
        this.price = price;
        this.desc = desc;
        this.imageUrl = imageUrl;
        this._id = id ? new mongodb.ObjectId(id) : null
    }

    save() {
        const db = getDb();
       // console.log(this._id);
        if (this._id) {
            return db.collection('products').updateOne(
                { _id: new mongodb.ObjectId(this._id) },
                {
                    $set: {
                        title: this.title, price: this.price, desc: this.desc, imageUrl: this.imageUrl
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
        return db.collection('products').insertOne(this).then(
            result => {
              //  console.log('save()', result)
            }
        ).catch(err => {
            console.log('err', err);
        })
    }

    static fetchAll() {
        const db = getDb();
        return db.collection('products').find().toArray().then(
            products => {
                // console.log('fetchAll()', products);
                return products
            }
        ).catch(err => {
            console.log('err', err);
        })
    }

    static fetchById(prodId) {
        const db = getDb();
        //  console.log('in model',prodId);
        return db.collection('products').find({ _id: new mongodb.ObjectId(prodId) }).next().then(
            product => {
                console.log('fetchById()', product);
                return product;
            }
        ).catch(err => {
            console.log('err', err);
        })
    }

    static deleteById(prodId) {
        const db = getDb();
        //  console.log('in model',prodId);
        return db.collection('products').deleteOne({ _id: new mongodb.ObjectId(prodId) }).then(
            product => {
                console.log('deleted');
                // return product;
            }
        ).catch(err => {
            console.log('err', err);
        })
    }
}
module.exports = Product;