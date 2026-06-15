import { Request, Response, NextFunction } from 'express';
import { Product } from "../models/Product";
import { User } from '../models/User';
import { deleteImagesFromCloud } from '../utils/actions';
import { catalogFilter } from '../utils/data';

interface AuthenticatedRequest extends Request {
  user?: {
    userId: string;
    email?: string;
  };
}

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  const perPage = Number(process.env.PUBLIC_PRODUCTS_PER_PAGE);
  try {
    const { category, brand, order, page, ...dynamicFilters } = req.query;
    const actualPage = page ? Number(page) : 1;
    const filterObject: any = {};

    let sortObject: any = { createdAt: -1 };
    if (order === 'price_asc') sortObject = { 'variants.0.finalPrice': 1 };
    if (order === 'price_desc') sortObject = { 'variants.0.finalPrice': -1 };
    if (order === 'name') sortObject = { title: 1 };


    if (category) filterObject.category = category;
    const ensureArray = (val: any): string[] => {
      if (!val) return [];
      if (Array.isArray(val)) return val.map(String);
      if (typeof val === 'string') return val.split(',');
      return [String(val)];
    };

    if (brand) {
      const brandArray = ensureArray(brand);
      filterObject.brand = { $in: brandArray };
    }

    const parseFilterValue = (val: any) => {
      if (typeof val === 'string' && val.includes('-')) {
        const [min, max] = val.split('-').map(Number);
        
        if (!isNaN(min) && !isNaN(max)) {
          return { $gte: min, $lte: max };
        }
      }
      
      if (typeof val === 'string' && !isNaN(Number(val)) && val.trim() !== '') {
        return Number(val);
      }

      return val;
    };

    if (category && typeof category === 'string' && catalogFilter[category]) {
      const allowedFilters = catalogFilter[category].map(filter => filter.type);

      Object.entries(dynamicFilters).forEach(([key, value]) => {
        if (allowedFilters.includes(key) && value) {
          const dbPath = `filterAttributes.${key}`;
  
          if (Array.isArray(value)) {
            const hasRange = value.some(v => typeof v === 'string' && v.includes('-'));
            if (hasRange) {
              if (!filterObject.$or) filterObject.$or = [];
              value.forEach(v => {
                filterObject.$or.push({[dbPath]: parseFilterValue(v)})
              });
            } else {
              filterObject[dbPath] = {$in: value.map(parseFilterValue)}
            }
          } else {
            filterObject[dbPath] = parseFilterValue(value);
          }
        }
      })
    };

    const [totalItems, products] = await Promise.all([
      Product.find(filterObject).sort(sortObject).countDocuments(),
      Product.find(filterObject).sort(sortObject)
        .select('title slug category variants')                
        .skip((actualPage - 1) * perPage)
        .limit(perPage)
    ]);
    res.status(200).json({
      message: 'Fetched products successfully.',
      products: products,
      totalItems: totalItems,
      currentPage: actualPage,
      hasNextPage: perPage * actualPage < totalItems,
      totalPages: Math.ceil(totalItems / perPage),
      perPage: perPage,
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
};

export const getProduct = async (req: Request, res: Response, next: NextFunction) => {
  const slug = req.params.slug;
  try {
    const product = await Product.findOne({slug: slug});
    res.status(200).json({
      message: 'Fetched products successfully.',
      product: product,
    });
  } catch (err: any) {
    if (!err.statusCode) err.statusCode = 500;
    return next(err);
  }
};

export const getSearchProduct = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const {search} = req.body;
    if (!search || typeof search !== 'string' || search.trim() === '' || search.trim().length < 2) {
      return res.status(200).json({products: []})
    };

    const searchRegex = new RegExp(search.trim(), 'i');

    const products = await Product.find({title: {$regex: searchRegex}})
      .select('_id title slug category variants')
      .limit(5);

    res.status(200).json({
      message: 'Fetched products successfully.',
      products: products,
    });
  } catch (err: any) {
    if (!err.statusCode) err.statusCode = 500;
    return next(err);
  }
};

export const getMyProducts = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthenticatedRequest;
        const userId = authReq.user?.userId; 
        
        if (!userId) {
            return res.status(401).json({
                message: 'Unauthorized: User authentication failed or token is missing.'
            });
        }
        
        const products = await Product.find({ userId: userId });

        return res.status(200).json({
            message: 'Success',
            products
        });
    } catch (err) {
        return next(err);
    }
};

export const deleteProduct = async (req: Request, res: Response, next: NextFunction) => {
  const {id} = req.body;
  try {
        const authReq = req as AuthenticatedRequest;
        const userId = authReq.user?.userId; 
        
        if (!userId) {
          return res.status(401).json({
            message: 'Unauthorized: User authentication failed or token is missing.'
          });
        };
        
        const product = await Product.findById(id);

        if (!product) {
          return res.status(404).json({ message: 'Product not found.' });
        };

        if(product.userId.toString() !== userId.toString()){
          return res.status(403).json({ 
            message: 'Forbidden: You are not allowed to delete this product.' 
          });
        };

        const allImages = product.variants?.flatMap((variant: any) => variant.images) || [];

        if (allImages.length > 0) {
          try {
            await deleteImagesFromCloud(allImages);
          } catch (cloudErr) {
            console.error("Cloudinary delete failed:", cloudErr);
          }
        }

        await User.updateMany(
            {},
            {
                $pull: {
                    favourite: id,
                    "cart.items": { productId: id }
                }
            }
        );

        await Product.findByIdAndDelete(id);

        return res.status(200).json({
            message: 'Product successfully deleted.',
        });
    } catch (err) {
        return next(err);
    }
};

export const getProductsByBatch = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { ids } = req.body; 
    if (!ids || !Array.isArray(ids)) {
      return res.status(400).json({ message: "Invalid or missing ids array" });
    }

    const products = await Product.find({
      _id: { $in: ids }
    });

    return res.status(200).json({
      success: true,
      data: products
    });
    } catch (err) {
      return next(err);
    }
};

