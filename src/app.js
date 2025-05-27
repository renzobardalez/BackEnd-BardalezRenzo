import express from 'express';
import mongoose from 'mongoose';
import handlebars from 'express-handlebars';
import productsRouter from './routes/products.routes.js';
import cartsRouter from './routes/carts.routes.js';
import viewsRouter from './routes/views.routes.js';
import { __dirname } from './utils.js';

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);
app.use('/products', viewsRouter);
app.get('/', (req, res) => {
    res.redirect('/products');
});

await mongoose.connect('mongodb+srv://rbardalez:b866PFdyZu3Mw1Qj@cluster0.mxvcufk.mongodb.net/entregaFinal?retryWrites=true&w=majority&appName=Cluster0');

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
