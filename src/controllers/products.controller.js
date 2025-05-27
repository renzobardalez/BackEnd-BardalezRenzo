import { ProductModel } from "../models/product.model.js";

export const getProducts = async (req, res) => {
    const { limit = 10, page = 1, sort, query } = req.query;

    const filter = {};
    if (query) {
    const [field, value] = query.split(':');
    filter[field] = value;
    }

    const options = {
        limit: parseInt(limit),
        page: parseInt(page),
        sort: sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {}
    };

    const result = await ProductModel.paginate(filter, options);

    const buildLink = (p) => `${req.baseUrl}?limit=${limit}&page=${p}${sort ? `&sort=${sort}` : ''}${query ? `&query=${query}` : ''}`;

    res.json({
        status: "success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage ? buildLink(result.prevPage) : null,
        nextLink: result.hasNextPage ? buildLink(result.nextPage) : null
    });
};
