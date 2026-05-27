const express = require('express');
const router = express.Router();
import * as productController from '../controllers/product';
import { requireAuth } from '../middleware/auth';

router.get('/my-products', requireAuth, productController.getMyProducts);
router.get('/', productController.getProducts);
router.post('/batch', productController.getProductsByBatch);
router.post('/add-product', requireAuth, productController.createProduct);
router.get('/:slug', productController.getProduct);
router.post('/delete-product', requireAuth, productController.deleteProduct);


export default router;
