    const express = require('express');
    const router = express.Router();
    const createProduct = require('./createproducts');
    const deleteProduct = require('./deleteproducts');
    const fs = require('fs');
    const path = require('path');

    router.get('/products/:id', (req, res) => {
        const filePath = path.join(__dirname, 'data/products.json');
        const productId = req.params.id;
    
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                return res.status(500).send('Không thể đọc tệp JSON.');
            }
            try {
                const products = JSON.parse(data);
                const product = products.find(p => p.id === productId);
                if (!product) {
                    return res.status(404).send('Sản phẩm không tồn tại.');
                }
                res.status(200).json(product);
            } catch (parseErr) {
                res.status(500).send('Lỗi trong quá trình parse tệp JSON.');
            }
        });
    });
   
    router.post('/products', createProduct);

    router.delete('/products/:id', deleteProduct);

    module.exports = router;
