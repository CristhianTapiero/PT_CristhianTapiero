import { Router } from "express";
import { getUsers, createUser, updateUser, deleteUser, getMatchedUsers } from "../controllers/users.controllers";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get('/users', authenticateToken, getUsers)

router.get('/users/match/:fetch', authenticateToken, getMatchedUsers)

router.post('/users', authenticateToken, createUser)

router.put('/users/:id', authenticateToken, updateUser)

router.delete('/users/:id', authenticateToken, deleteUser)

export default router