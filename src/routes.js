import express from 'express';
import { create as createUser, login } from './controllers/userController.js';
import { create as createProvider } from './controllers/providerController.js';
import { create as createService } from './controllers/serviceController.js';

const router = express.Router();

router.post('/users', createUser);
router.post('/users/login', login);
router.post('/providers', createProvider);
router.post('/services', createService);

export default router;
