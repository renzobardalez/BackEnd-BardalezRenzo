import { CartModel } from "../models/cart.model.js";

export const deleteProductFromCart = async (req, res) => {
    const { cid, pid } = req.params;
    const cart = await CartModel.findById(cid);
    cart.products = cart.products.filter(p => p.product.toString() !== pid);
    await cart.save();
    res.json(cart);
};

export const updateAllCartProducts = async (req, res) => {
    const { cid } = req.params;
    const cart = await CartModel.findById(cid);
    cart.products = req.body.products;
    await cart.save();
    res.json(cart);
};

export const updateCartProductQty = async (req, res) => {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await CartModel.findById(cid);
    const product = cart.products.find(p => p.product.toString() === pid);
    if (product) product.quantity = quantity;
    await cart.save();
    res.json(cart);
};

export const deleteAllCartProducts = async (req, res) => {
    const { cid } = req.params;
    const cart = await CartModel.findById(cid);
    cart.products = [];
    await cart.save();
    res.json(cart);
};

export const getCartById = async (req, res) => {
    try {
        const { cid } = req.params;

        const cart = await CartModel.findById(cid).populate('products.product').lean();

        if (!cart) {
            return res.status(404).send('Carrito no encontrado');
        }

        res.render('cart', { cart });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error al obtener el carrito');
    }
};

export const addProductToCart = async (req, res) => {
    const { cid, pid } = req.params;
    try {
        const cart = await CartModel.findById(cid);
        if (!cart) 
            return res.status(404).json({ error: 'Carrito no encontrado' });
        const productInCart = cart.products.find(p => p.product.toString() === pid);
        if (productInCart) {
        productInCart.quantity += 1;
        } else {
        cart.products.push({ product: pid, quantity: 1 });
        }
        await cart.save();
        res.status(200).json({ message: 'Producto agregado al carrito', cart });
    } catch (error) {
        res.status(500).json({ error: 'Error agregando producto al carrito', details: error.message });
    }
};