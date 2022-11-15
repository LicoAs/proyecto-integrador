import express from 'express';
import routerProducts from './routers/products.js';
import ProductModelMongoDB from './models/DB/MongoDB.js';
import config from './config.js';
import morgan from 'morgan';

// await ProductModelMongoDB.connectDB();
ProductModelMongoDB.connectDB();

const app = express();

app.use(express.static('public', { extensions: ['html', 'htm'] }));
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(morgan('dev'));

app.use('/api/products', routerProducts);


const PORT = config.PORT;
const server = app.listen(PORT, () => console.log(`Servidor Express escuchando en el puerto ${PORT}.`));
server.on('error', error => console.log('Error al iniciar el servidor Express: ' + error.message));
