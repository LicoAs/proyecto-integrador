import mongoose from "mongoose";
import DBMongoDB from "./DB/MongoDB.js";

const cartSchema = mongoose.Schema({
    price : Number,
    name : String,
    imgSrc : String,
    quantity : Number,
    productId : String,
    subtotal : Number
});

// Modelo del documento almacenado en la colección
const CartsModel = mongoose.model("cart", cartSchema);

class CartModelMongoDB {
    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - C: Create                              //
    ////////////////////////////////////////////////////////////////////////////////`

    async createCart(cart) {
        if (!(await DBMongoDB.connectDB())) {
            return {};
        }
        try {
            const newCarts = CartsModel.create(cart);
            return DBMongoDB.getObjectWithId(newCarts);
        } catch (error) {
            console.error(
                "Error al intentar dar de alta el carto:",
                error.message
            );
            return {};
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                               CRUD - R: Read                               //
    ////////////////////////////////////////////////////////////////////////////////

    async readCarts() {
        if (!(await DBMongoDB.connectDB())) {
            return [];
        }
        try {
            const carts = await CartsModel.find({}).lean();
            console.log(carts);
            return DBMongoDB.getObjectWithId(carts);
        } catch (error) {
            console.error(
                "Error al intentar leer los datos:",
                error.message
            );
            return [];
        }
    }

    async readCart(id) {
        if (!(await DBMongoDB.connectDB())) {
            return {};
        }
        try {
            const cart = (await CartsModel.findById(id).lean()) || {};
            return DBMongoDB.getObjectWithId(cart);
        } catch (error) {
            console.error(
                `Error al intentar leer el carto #:${id}`,
                error.message
            );
        }
        return {};
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - U: Update                              //
    ////////////////////////////////////////////////////////////////////////////////`

    async updateCart(id, cart) {
        if (!(await DBMongoDB.connectDB())) {
            return {};
        }
        try {
            
            const updatedCart =
                (await CartsModel.findByIdAndUpdate(
                    id,
                    { $set: cart },
                    {
                        returnDocument: "after",
                    }
                ).lean()) || {};
            return DBMongoDB.getObjectWithId(updatedCart);
        } catch (error) {
            console.error(
                `Error al intentar actualizar el carto #:${id}`,
                error.message
            );
            return {};
        }
    }

    ////////////////////////////////////////////////////////////////////////////////
    //                              CRUD - D: Delete                              //
    ////////////////////////////////////////////////////////////////////////////////

    async deleteCart(id) {
        if (!(await DBMongoDB.connectDB())) {
            return {};
        }
        try {
            
            const deletedCart =
                (await CartsModel.findByIdAndDelete(id).lean()) || {};
            return DBMongoDB.getObjectWithId(deletedCart);
        } catch (error) {
            console.error(
                `Error al intentar eliminar el carto #:${id}`,
                error.message
            );
            return {};
        }
    }
}

export default CartModelMongoDB;
