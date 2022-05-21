import express from 'express';
import { create as createUser, login } from './controllers/userController.js';
import { create as createProvider } from './controllers/providerController.js';
import { list as listProvider } from './controllers/providerController.js';
import { create as createService } from './controllers/serviceController.js';
import { list as listServices } from './controllers/serviceController.js';

const router = express.Router();

router.post('/users', createUser);
router.post('/users/login', login);

router.post('/providers', createProvider);
router.get('/providers/:userID', listProvider);

router.post('/services', createService);
router.get('/services/:userID', listServices);

export default router;
