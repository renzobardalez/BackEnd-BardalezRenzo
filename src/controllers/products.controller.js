import * as productService from '../services/product.service.js';

export const getProducts = async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, query } = req.query;

        const filter = query
        ? { $or: [{ category: query }, { title: { $regex: query, $options: 'i' } }] }
        : {};

        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            lean: true,
            sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : undefined
        };

        const result = await productService.getProducts(filter, options);

        res.render('products', {
            products: result.docs,
            hasPrevPage: result.hasPrevPage,
            hasNextPage: result.hasNextPage,
            prevPage: result.prevPage,
            nextPage: result.nextPage,
            currentPage: result.page,
            totalPages: result.totalPages,
            query,
            sort,
            limit
        });
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener productos', details: err.message });
    }
};

export const getProductById = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.pid);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el producto', details: err.message });
    }
};

export const createProduct = async (req, res) => {
    try {
        const newProduct = await productService.createProduct(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: 'Error al crear el producto', details: err.message });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const updated = await productService.updateProduct(req.params.pid, req.body);
        if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: 'Error al actualizar el producto', details: err.message });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const deleted = await productService.deleteProduct(req.params.pid);
        if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el producto', details: err.message });
    }
};
