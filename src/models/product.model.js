import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

const productSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    thumbnail: String,
    code: String,
    stock: Number,
    category: String
});

productSchema.plugin(mongoosePaginate);

export const ProductModel = mongoose.model('Product', productSchema);
