import * as cartService from '../services/cart.service.js';

export const getCartById = async (req, res) => {
    try {
        const cart = await cartService.getCartById(req.params.cid);
        if (!cart) return res.status(404).send('Carrito no encontrado');
        res.render('cart', { cart });
    } catch (error) {
    console.error(error);
    res.status(500).send('Error al obtener el carrito');
    }
};

export const addProductToCart = async (req, res) => {
    try {
        const cart = await cartService.addProductToCart(req.params.cid, req.params.pid);
        res.status(200).json({ message: 'Producto agregado al carrito', cart });
    } catch (error) {
        res.status(500).json({ error: 'Error agregando producto al carrito', details: error.message });
    }
};

export const updateCartProductQty = async (req, res) => {
    try {
        const cart = await cartService.updateCartProductQty(req.params.cid, req.params.pid, req.body.quantity);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar la cantidad del producto', details: error.message });
    }
};

export const updateAllCartProducts = async (req, res) => {
    try {
        const cart = await cartService.updateAllCartProducts(req.params.cid, req.body.products);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar los productos del carrito', details: error.message });
    }
};

export const deleteProductFromCart = async (req, res) => {
    try {
        const cart = await cartService.deleteProductFromCart(req.params.cid, req.params.pid);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto del carrito', details: error.message });
    }
};

export const deleteAllCartProducts = async (req, res) => {
    try {
        const cart = await cartService.deleteAllCartProducts(req.params.cid);
        res.json(cart);
    } catch (error) {
        res.status(500).json({ error: 'Error al vaciar el carrito', details: error.message });
    }
};
