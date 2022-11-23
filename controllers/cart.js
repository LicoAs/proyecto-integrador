import api from '../api/cart.js';

////////////////////////////////////////////////////////////////////////////////
//                                 GET Controller                             //
////////////////////////////////////////////////////////////////////////////////

const getCarts = async (req, res) => {
    const carts = await api.getCarts();
    res.json(carts);
};



const getCart = async(req, res) => {
    const id = req.params.id;
    res.json(await api.getCart(id));
};


///////////////////////////////////////////////////////////////////////////////
//                                POST Controller                            //
///////////////////////////////////////////////////////////////////////////////

const postCart = async (req, res) => {
    const cart = req.body;
    const newCart = await api.createCart(cart);
    console.log("Productos Comprados ", newCart);
    res.json(newCart);
};


///////////////////////////////////////////////////////////////////////////////
//                                PUT Controller                             //
///////////////////////////////////////////////////////////////////////////////

const putCart = async (req, res) => {
    const id = req.params.id;
    const cart = req.body;

    const updatedCart = await api.updateCart(id, cart);
    res.json(updatedCart);
};


///////////////////////////////////////////////////////////////////////////////
//                               DELETE Controller                           //
///////////////////////////////////////////////////////////////////////////////

const deleteCart = async (req, res) => {
    const id = req.params.id;
    const removedCart = await api.deleteCart(id);
    res.json(removedCart);
};


export default {
    getCarts,   //getCarts: getCarts
    getCart,
    postCart,
    putCart,
    deleteCart
};
