import express from 'express';
import { login, checkAuth, logout } from '../controllers/auth.controller';

const router = express.Router();

router.get('/check-auth', checkAuth);
router.post('/logout', logout);
router.post('/login', login);


export default router;
