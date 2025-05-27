import express from 'express';
import {
    deleteProductFromCart,
    updateAllCartProducts,
    updateCartProductQty,
    deleteAllCartProducts,
    getCartById,
    addProductToCart
} from '../controllers/carts.controller.js';

const router = express.Router();

router.delete('/:cid/products/:pid', deleteProductFromCart);
router.put('/:cid', updateAllCartProducts);
router.put('/:cid/products/:pid', updateCartProductQty);
router.delete('/:cid', deleteAllCartProducts);
router.get('/:cid', getCartById);
router.post('/:cid/products/:pid', addProductToCart);

export default router;
