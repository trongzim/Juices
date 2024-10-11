const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');

// Lấy danh sách tất cả các sản phẩm
router.get('/products', (req, res) => {
    const filePath = path.join(__dirname, '../data/products.json');
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

// Lấy thông tin chi tiết sản phẩm theo ID
router.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const filePath = path.join(__dirname, '../data/products.json');
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Không thể đọc tệp JSON.');
        }
        try {
            const products = JSON.parse(data);
            const product = products.find(p => p.id == productId);
            if (product) {
                res.status(200).json(product);
            } else {
                res.status(404).send('Không tìm thấy sản phẩm.');
            }
        } catch (parseErr) {
            res.status(500).send('Lỗi trong quá trình parse tệp JSON.');
        }
    });
});

module.exports = router;
