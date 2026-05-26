const express = require('express');
const router = express.Router();
import * as userController from '../controllers/user';
import { requireAuth } from '../middleware/auth';

router.post('/sign-up', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/profile', requireAuth, userController.getUser);
router.get('/favourites', requireAuth, userController.getFavourite);
router.post('/favourites/toggle', requireAuth, userController.postFavourite);

export default router;
