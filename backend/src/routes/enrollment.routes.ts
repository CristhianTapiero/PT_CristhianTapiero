import { Router } from "express";
import { getEnrollments, enrollStudent, removeStudent, getEnrollmentbyUser, getUsersbyCourse } from "../controllers/enrollment.controllers";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get('/enroll', authenticateToken, getEnrollments)
router.post('/enroll', authenticateToken, enrollStudent)
router.delete('/enroll/:transaction_id', authenticateToken, removeStudent)
router.get('/enroll/:userId', authenticateToken, getEnrollmentbyUser)
router.get('/enroll/bycourse/:courseId', authenticateToken, getUsersbyCourse)

export default router