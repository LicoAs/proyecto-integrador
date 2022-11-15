import config from '../config.js';
// import Model from '../models/products-mem.js';
// import Model from '../models/products-fs.js';
import Model from '../models/products-mongodb.js';
// import Model from '../models/products.js';

const model = new Model();
// const model = Model.get('MEM');
// const model = Model.get('FILE');
//const model = Model.get(config.PERSISTENCE_TYPE);
// creates PARA TESTING:
// model.createProduct({name: 'Licuadora', description: 'Con botón turbo', price: 24000});
// model.createProduct({name: 'TV', description: 'Smart TV de 55 pulgadas', price: 115000});
// model.createProduct({name: 'Parlante', description: 'Con batería', price: 21800});
// model.createProduct({name: 'PlayStation 4', description: 'Con 2 juegos', price: 175000});
// model.createProduct({name: 'PlayStation 5', description: 'Color blanco', price: 290000});


///////////////////////////////////////////////////////////////////////////////
//                                API Get ALL                                //
///////////////////////////////////////////////////////////////////////////////
const getProducts = async () => {
    const products = await model.readProducts();
    return products;
};


///////////////////////////////////////////////////////////////////////////////
//                                API Get One                                //
///////////////////////////////////////////////////////////////////////////////
const getProduct = async id => {
    const product = await model.readProduct(id);
    return product;
};


////////////////////////////////////////////////////////////////////////////////
//                                 API Create                                 //
////////////////////////////////////////////////////////////////////////////////

const createProduct = async product => {
    const createdProduct = await model.createProduct(product);
    return createdProduct;
};


////////////////////////////////////////////////////////////////////////////////
//                                 API Update                                 //
////////////////////////////////////////////////////////////////////////////////

const updateProduct = async (id, product) => {
    const updatedProduct = await model.updateProduct(id, product);
    return updatedProduct;
};


////////////////////////////////////////////////////////////////////////////////
//                                 API Delete                                 //
////////////////////////////////////////////////////////////////////////////////

const deleteProduct = async id => {
    const removedProduct = await model.deleteProduct(id);
    return removedProduct;
};


export default {
    getProducts,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct
};
