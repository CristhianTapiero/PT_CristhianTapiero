import { Router } from "express";
import { getEnrollments, enrollStudent, removeStudent } from "../controllers/enrollment.controllers";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get('/enroll', authenticateToken, getEnrollments)
router.post('/enroll', authenticateToken, enrollStudent)
router.delete('/enroll/:transaction_id', authenticateToken, removeStudent)

export default router