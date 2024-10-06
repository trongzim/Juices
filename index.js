const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

// Import các route
const productRoutes = require('./routes/route'); // Route chính cho sản phẩm (liệt kê sản phẩm)
const createProducts = require('./routes/createproducts'); // Route để thêm sản phẩm
const deleteProducts = require('./routes/deleteproducts'); // Route để xóa sản phẩm

// Middleware để phân tích dữ liệu JSON
app.use(express.json());

// Middleware để phục vụ các tệp tĩnh từ thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Sử dụng các route
app.use('/products', productRoutes); // Sử dụng route.js cho các thao tác chính như lấy danh sách sản phẩm
app.use('/products/create', createProducts); // Sử dụng createproducts.js để thêm sản phẩm
app.use('/products/delete', deleteProducts); // Sử dụng deleteproducts.js để xóa sản phẩm

// Route để phục vụ index.html tại đường dẫn gốc
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
// Route để phục vụ trang tạo sản phẩm
app.get('/createproducts.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'createproducts.html'));
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
