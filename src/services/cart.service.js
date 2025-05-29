import { CartModel } from '../models/cart.model.js';

export const getCartById = async (id) => {
    return await CartModel.findById(id).populate('products.product').lean();
};

export const addProductToCart = async (cid, pid) => {
    const cart = await CartModel.findById(cid);
    if (!cart) throw new Error('Carrito no encontrado');

    const productInCart = cart.products.find(p => p.product.toString() === pid);
    if (productInCart) {
        productInCart.quantity += 1;
    } else {
        cart.products.push({ product: pid, quantity: 1 });
    }
    await cart.save();
    return cart;
};

export const updateCartProductQty = async (cid, pid, quantity) => {
    const cart = await CartModel.findById(cid);
    const product = cart.products.find(p => p.product.toString() === pid);
    if (product) product.quantity = quantity;
    await cart.save();
    return cart;
};

export const updateAllCartProducts = async (cid, products) => {
    const cart = await CartModel.findById(cid);
    cart.products = products;
    await cart.save();
    return cart;
};

export const deleteProductFromCart = async (cid, pid) => {
    const cart = await CartModel.findById(cid);
    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    return cart;
};

export const deleteAllCartProducts = async (cid) => {
    const cart = await CartModel.findById(cid);
    cart.products = [];
    await cart.save();
    return cart;
};
