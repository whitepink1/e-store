import { Request, Response, NextFunction } from 'express';
import { Product } from "../models/Product";

export const getProducts = async (_req: Request, res: Response, next: NextFunction) => {

  try {
    const [totalItems, products] = await Promise.all([
      Product.countDocuments(),
      Product.find()
        .select('title price discount slug images category') 
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

