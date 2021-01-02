const db = require('../utils/databaseMYSQL2');

module.exports = class Product {
    constructor(id, title, price, desc, imageUrl) {
        this.id = id;
        this.title = title;
        this.price = price;
        this.desc = desc;
        this.imageUrl = imageUrl;
    }

    save() {
        if(this.id){
            return db.execute(
                'UPDATE `products` SET `title`=?,`desc`=?,`price`=?,`imageUrl`=? WHERE products.id = ?', 
                [this.title, this.desc, this.price, this.imageUrl,this.id]
            );
        }
        return db.execute(
            'INSERT INTO `products` (`title`,`desc`,`price`,`imageUrl`) VALUES (?,?,?,?)', 
            [this.title, this.desc, this.price, this.imageUrl]
        );
    }

    static fetchAll() {
        return db.execute('SELECT * FROM products');
    }
    static fetchById(id){
        return db.execute('SELECT * FROM `products` WHERE products.id = ?',[id]);
    }
    static deleteById(id){
        return db.execute('DELETE FROM `products` WHERE products.id = ?',[id]);
    }
}