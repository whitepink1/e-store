const express = require('express');
const router = express.Router();
import * as userController from '../controllers/user';
import { requireAuth } from '../middleware/auth';

router.post('/sign-up', userController.createUser);
router.post('/login', userController.loginUser);
router.get('/profile', requireAuth, userController.getUser);

export default router;
