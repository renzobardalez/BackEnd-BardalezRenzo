import express from 'express';
import { ProductModel } from '../models/product.model.js';

const router = express.Router();

// GET: Listar productos con paginación, búsqueda y ordenamiento
router.get('/', async (req, res) => {
    try {
        const {
            limit = 10,
            page = 1,
            sort,
        query // ejemplo: ?query=ropa
        } = req.query;

        const filter = query
            ? { $or: [{ category: query }, { title: { $regex: query, $options: 'i' } }] }
            : {};

        const options = {
            limit: parseInt(limit),
            page: parseInt(page),
            sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : undefined
        };

        const result = await ProductModel.paginate(filter, options);
        res.json(result);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener productos', details: err.message });
    }
    });

// GET: Producto por ID
router.get('/:pid', async (req, res) => {
    try {
        const product = await ProductModel.findById(req.params.pid);
        if (!product) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(product);
    } catch (err) {
        res.status(500).json({ error: 'Error al obtener el producto', details: err.message });
    }
});

// POST: Crear nuevo producto
router.post('/', async (req, res) => {
    try {
        const newProduct = await ProductModel.create(req.body);
        res.status(201).json(newProduct);
    } catch (err) {
        res.status(400).json({ error: 'Error al crear el producto', details: err.message });
    }
});

// PUT: Actualizar producto por ID
router.put('/:pid', async (req, res) => {
    try {
        const updated = await ProductModel.findByIdAndUpdate(req.params.pid, req.body, { new: true });
        if (!updated) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json(updated);
    } catch (err) {
        res.status(400).json({ error: 'Error al actualizar el producto', details: err.message });
    }
});

// DELETE: Eliminar producto por ID
router.delete('/:pid', async (req, res) => {
    try {
        const deleted = await ProductModel.findByIdAndDelete(req.params.pid);
        if (!deleted) return res.status(404).json({ error: 'Producto no encontrado' });
        res.json({ mensaje: 'Producto eliminado correctamente' });
    } catch (err) {
        res.status(500).json({ error: 'Error al eliminar el producto', details: err.message });
    }
});

export default router;
