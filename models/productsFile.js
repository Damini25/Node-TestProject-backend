const products = [];
const fs = require('fs');
const path = require('path')
const rootDir = require('../utils/path');
const p = path.join(rootDir, 'data', 'products.json');

const getProductsFromFile=(cl)=>{
    fs.readFile(p, (err, fileContent) => {
        if (err) {
            return cl([]);
        }
        return cl(JSON.parse(fileContent));
    });
}

module.exports = class Product {
    constructor(id,title,price,desc,imageUrl) {
        this.id=id;
        this.title = title;
        this.price=price;
        this.desc=desc;
        this.imageUrl=imageUrl;
    }

    save() {
        getProductsFromFile((products)=>{
            products.push(this);
            fs.writeFile(p, JSON.stringify(products), err => {
                console.log('err', err);
            })
        })
    }

    static fetchAll(cl) {
       getProductsFromFile(cl);
    }
}