const Product = require('../models/products');

exports.addProductPage = (req, res, next) => {
    console.log('in add product middleware');
    //res.sendFile(path.join(rootDir, 'views', 'addProduct.html'))
    res.render('addProduct', { path: '/admin/addProduct', docTitle: "Add Products" });
};


exports.onAddingProduct = (req, res, next) => {
    console.log('in product middleware', req.body);
    //products.push({ title: req.body.title });
    const product = new Product(req.body.title);
    product.save();
    res.redirect('/')
};

exports.getProducts = (req, res, next) => {
    const products = Product.fetchAll().then(([rows,fieldData]) => {
        console.log('rows',rows);
       // res.send(JSON.stringify(rows));
    }).catch(err => {
        return err;
        }
    );
    // res.render('shop', { prods: products, docTitle: 'My Shop', path: '/', hasProducts: products.length > 0 });//no need to write shop.pug.bcz pug id default templating engine.
    //res.sendFile(path.join(rootDir, 'views', 'shop.html'));
};