import express from 'express';
import { create as createUser, login } from './controllers/userController.js';
import { create as createProvider } from './controllers/providerController.js';

const router = express.Router();

router.post('/users', createUser);
router.post('/users/login', login);
router.post('/providers', createProvider);

export default router;
