import { ProductModel } from '../models/product.model.js';

export const getProducts = async (filter, options) => {
    return await ProductModel.paginate(filter, options);
};

export const getProductById = async (id) => {
    return await ProductModel.findById(id);
};

export const createProduct = async (productData) => {
    return await ProductModel.create(productData);
};

export const updateProduct = async (id, updateData) => {
    return await ProductModel.findByIdAndUpdate(id, updateData, { new: true });
};

export const deleteProduct = async (id) => {
    return await ProductModel.findByIdAndDelete(id);
};
