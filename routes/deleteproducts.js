const fs = require('fs');
const path = require('path');

function deleteProduct(req, res) {
    const filePath = path.join(__dirname, 'data/products.json');
    const productId = req.params.id;

    fs.readFile(filePath, 'utf-8', (err, data) => {
        if (err) {
            return res.status(500).send('Không thể đọc tệp JSON.');
        }
        try {
            let products = JSON.parse(data);
            const filteredProducts = products.filter(product => product.id !== productId);

            if (products.length === filteredProducts.length) {
                return res.status(404).send('Không tìm thấy sản phẩm.');
            }

            fs.writeFile(filePath, JSON.stringify(filteredProducts, null, 2), 'utf-8', (writeErr) => {
                if (writeErr) {
                    return res.status(500).send('Không thể ghi vào tệp JSON.');
                }
                res.status(200).send('Sản phẩm đã được xóa thành công.');
            });
        } catch (parseErr) {
            res.status(500).send('Lỗi trong quá trình parse tệp JSON.');
        }
    });
}

module.exports = deleteProduct;