const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const productRoutes = require('./routes/route'); 

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', productRoutes);

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/products', (req, res) => {
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

app.get('/products/search', (req, res) => {
    const filePath = path.join(__dirname, 'data/products.json');
    const searchTerm = req.query.name ? req.query.name.toLowerCase() : '';

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Không thể đọc tệp JSON.');
        }
        try {
            const products = JSON.parse(data);
            const filteredProducts = products.filter(product =>
                product.product_name.toLowerCase().includes(searchTerm)
            );

            if (filteredProducts.length > 0) {
                res.status(200).json(filteredProducts);
            } else {
                res.status(404).send('Không tìm thấy sản phẩm.');
            }
        } catch (parseErr) {
            res.status(500).send('Lỗi trong quá trình parse tệp JSON.');
        }
    });
});
app.get('/products/:id', (req, res) => {
    const productId = req.params.id;
    const filePath = path.join(__dirname, 'data/products.json');

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

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/productDetails/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'productDetails.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
