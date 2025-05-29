import express from 'express';
import {
  getCartById,
  addProductToCart,
  updateCartProductQty,
  updateAllCartProducts,
  deleteProductFromCart,
  deleteAllCartProducts
} from '../controllers/carts.controller.js';

const router = express.Router();

router.get('/:cid', getCartById);
router.post('/:cid/products/:pid', addProductToCart);
router.put('/:cid/products/:pid', updateCartProductQty);
router.put('/:cid', updateAllCartProducts);
router.delete('/:cid/products/:pid', deleteProductFromCart);
router.delete('/:cid', deleteAllCartProducts);

export default router;
