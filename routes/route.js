    const express = require('express');
    const router = express.Router();
    const createProduct = require('./createproducts');
    const deleteProduct = require('./deleteproducts');
    const fs = require('fs');
    const path = require('path');

    // Route lấy danh sách sản phẩm
    router.get('/products', (req, res) => {
        const filePath = path.join(__dirname, 'data/products.json');
        fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {
                return res.status(500).send('Không thể đọc tệp JSON.');
            }
            try {
                const products = JSON.parse(data);
                res.status(200).json(products);
            } catch (parseErr) {
                res.status(500).send('Lỗi trong quá trình parse tệp JSON.');
            }
        });
    });

    // Route tạo sản phẩm
    router.post('/products', createProduct);

    // Route xóa sản phẩm
    router.delete('/products/:id', deleteProduct);

    module.exports = router;
