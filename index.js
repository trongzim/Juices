const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const routes = require('./routes/route'); // Import route.js
const createProducts = require('./routes/createproducts'); // Import createproducts.js
const deleteProducts = require('./routes/deleteproducts'); // Import deleteproducts.js

// Middleware để phân tích dữ liệu JSON
app.use(express.json());

// Middleware để phục vụ các tệp tĩnh từ thư mục 'public'
app.use(express.static(path.join(__dirname, 'public')));

// Sử dụng các route
app.use('/products', routes); // Sử dụng route.js cho các thao tác chính như lấy danh sách sản phẩm
app.use('/products', createProducts); // Sử dụng createproducts.js để thêm sản phẩm
app.use('/products', deleteProducts); // Sử dụng deleteproducts.js để xóa sản phẩm

// Route để phục vụ index.html tại đường dẫn gốc
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
