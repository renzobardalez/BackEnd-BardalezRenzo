import express from 'express';
import { ProductModel } from '../models/product.model.js'; 
    
const router = express.Router();

const cartId = '68356b5969ec9ffb9d082041'

router.get('/', async (req, res) => {
    const { page = 1 } = req.query;
    const result = await ProductModel.paginate({}, { limit: 10, page, lean:true });
    res.render('products', {
        products: result.docs,
        cartId:'68356b5969ec9ffb9d082041',
        page: result.page,
        totalPages: result.totalPages,
        hasNextPage: result.hasNextPage,
        hasPrevPage: result.hasPrevPage,
        nextPage: result.nextPage,
        prevPage: result.prevPage,
        cartId:'68356b5969ec9ffb9d082041'
    });
});

router.get('/:pid', async (req, res) => {
    const product = await ProductModel.findById(req.params.pid).lean();
    res.render('productDetail', { product, cartId });
});

export default router;
