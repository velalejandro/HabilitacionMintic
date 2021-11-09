const express = require('express');
require('dotenv').config();
const { dbConnection } = require('./db/config');
const cors = require('cors');

const app = express();
app.use(cors());

/** Database */
dbConnection();

app.use(express.static('public'));

//Lectura y parseo del body
app.use(express.json());

// Routes //
app.use('/api/users',require('./routes/users'));
app.use('/api/products',require('./routes/products'));
app.use('/api/auth',require('./routes/auth'));
app.use('/api/ventas',require('./routes/ventas'));

app.listen(process.env.Port, () => {
    console.log(`Servidor ejecutandose por el puerto ${process.env.Port}`);
});



