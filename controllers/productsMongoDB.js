const Product = require('../models/productsMongoDb');

exports.onAddingProduct = (req, res, next) => {
    console.log('in product middleware', req.body);
    const id = req.body._id;
    const title = req.body.title;
    const price = req.body.price;
    const desc = req.body.desc;
    const imageUrl = req.body.imageUrl;
    const product = new Product(title, price, desc, imageUrl,id);
    product.save().then(() => {
        res.send(JSON.stringify({
            success: true,
            data: {
                msg: "Product added successfully"
            },
            error: null
        }));
    }).catch((err) => {
        res.send(JSON.stringify({
            success: false,
            data: null,
            error: err
        }))
    });
};

exports.getProducts = (req, res, next) => {
    Product.fetchAll().then((rows) => {
        console.log('rows', rows);
        res.send(JSON.stringify({
            success: true,
            data: rows,
            error: null
        }));
    }).catch(err => {
        res.send(JSON.stringify({
            success: false,
            data: null,
            error: err
        }));
    }
    );
};

exports.onGettingProductById = (req, res, next) => {
    const prodId = req.params.id;
    console.log('pp',prodId)
    Product.fetchById(prodId).then(product => {
       // console.log('in controller',product)
        res.send(JSON.stringify({
            success: true,
            data: product,
            error: null
        }));
    }).catch(err => {
        res.send(JSON.stringify({
            success: false,
            data: null,
            error: err
        }));
    }
    );
}

exports.onDeletingProduct=(req,res,next)=>{
    const prodId = req.params.id;
    Product.deleteById(prodId).then(() => {
        res.send(JSON.stringify({
            success: true,
            data: {
                msg:"Product Deleted Successfully"
            },
            error: null
        }));
    }).catch(err => {
        res.send(JSON.stringify({
            success: false,
            data: null,
            error: err
        }));
    }
    );
}