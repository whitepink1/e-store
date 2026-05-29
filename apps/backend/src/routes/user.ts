const express = require('express');
const router = express.Router();
import * as userController from '../controllers/user';
import { requireAuth } from '../middleware/auth';

router.post('/sign-up', userController.createUser);
router.post('/login', userController.loginUser);
router.post('/update-name', requireAuth, userController.updateName);
router.post('/create-address', requireAuth, userController.createAddress);
router.post('/delete-address', requireAuth, userController.deleteAddress);
router.get('/profile', requireAuth, userController.getUser);
router.get('/favourites', requireAuth, userController.getFavourite);
router.post('/favourites/toggle', requireAuth, userController.postFavourite);
router.post('/cart/toggle', requireAuth, userController.postCart);
router.get('/cart', requireAuth, userController.getCart);

export default router;
