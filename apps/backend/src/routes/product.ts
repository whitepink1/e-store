const express = require('express');
const router = express.Router();
import * as productController from '../controllers/product';

router.get('/', productController.getProducts);
router.post('/add-product', productController.createProduct);

export default router;
