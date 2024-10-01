const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Route để lấy danh sách tất cả sản phẩm
app.get('/products', (req, res) => {
    const filePath = path.join(__dirname, 'data/products.json');
    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Không thể đọc tệp JSON.');
        }
        const products = JSON.parse(data);
        res.status(200).json(products);
    });
});

// Route để tìm kiếm sản phẩm theo tên
app.get('/products/search', (req, res) => {
    const filePath = path.join(__dirname, 'data/products.json');
    const searchTerm = req.query.name.toLowerCase();

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Không thể đọc tệp JSON.');
        }
        const products = JSON.parse(data);
        const filteredProducts = products.filter(product =>
            product.name.toLowerCase().includes(searchTerm)
        );

        if (filteredProducts.length > 0) {
            res.status(200).json(filteredProducts);
        } else {
            res.status(404).send('Không tìm thấy sản phẩm.');
        }
    });
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
