import { Request, Response, NextFunction } from 'express';
import { Product } from "../models/Product";

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {

  try {
    const { category, brand, order, screen_type } = req.query;
    const filterObject: any = {};

    let sortObject: any = { createdAt: -1 };
    if (order === 'price_asc') sortObject = { price: 1 };
    if (order === 'price_desc') sortObject = { price: -1 };
    if (order === 'name') sortObject = { title: -1 };


    if (category) filterObject.category = category;
    if (brand) filterObject.brand = brand;
    const [totalItems, products] = await Promise.all([
      Product.find(filterObject).sort(sortObject).countDocuments(),
      Product.find().find(filterObject).sort(sortObject)
        .select('title slug category variants') 
        .sort({ createdAt: -1 })                  
        //.skip((page - 1) * perPage)
        //.limit(perPage)
    ]);
    res.status(200).json({
      message: 'Fetched products successfully.',
      products: products,
      totalItems: totalItems,
      //currentPage: page,
      //hasNextPage: perPage * page < totalItems,
      //totalPages: Math.ceil(totalItems / perPage)
    });
  } catch (err: any) {
    if (!err.statusCode) err.statusCode = 500;
    return next(err);
  }
};

export const createProduct = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { slug } = req.body;
        const existingProduct = await Product.findOne({ slug: slug });

        if (existingProduct) {
            return res.status(409).json({ 
            message: 'Product with this slug/title already exist.' 
            });
        }
        const product = new Product(req.body);
        await product.save();

        return res.status(201).json({ message: 'Success' });
    } catch (err) {
        return next(err);
    }
}

