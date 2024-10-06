const fs = require('fs');
const path = require('path');

function createProduct(req, res) {
    const filePath = path.join(__dirname, 'data/products.json');
    const newProduct = req.body; // Giả sử dữ liệu sản phẩm mới được gửi qua body

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Không thể đọc tệp JSON.');
        }
        try {
            const products = JSON.parse(data);
            products.push(newProduct); // Thêm sản phẩm mới vào danh sách
            fs.writeFile(filePath, JSON.stringify(products, null, 2), 'utf-8', (writeErr) => {
                if (writeErr) {
                    return res.status(500).send('Không thể ghi vào tệp JSON.');
                }
                res.status(201).send('Sản phẩm đã được thêm thành công.');
            });
        } catch (parseErr) {
            res.status(500).send('Lỗi trong quá trình parse tệp JSON.');
        }
    });
}

module.exports = createProduct;