import express from 'express';
import { create, login } from './controllers/userController.js';

const router = express.Router();

router.post('/users', create);
router.post('/users/login', login);

export default router;
