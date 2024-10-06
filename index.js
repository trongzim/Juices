const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

const productRoutes = require('./routes/route'); 
const createProducts = require('./routes/createproducts'); 
const deleteProducts = require('./routes/deleteproducts'); 

app.use(express.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/products', productRoutes); 
app.use('/products/create', createProducts); 
app.use('/products/delete', deleteProducts); 

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/createproducts.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'createproducts.html'));
});
app.get('/products/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'productDetails.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
