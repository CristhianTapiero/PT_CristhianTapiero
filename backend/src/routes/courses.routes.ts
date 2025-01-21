import { Router } from "express";
import { getCourses, createCourse, updateCourse, deleteCourse, getCourseById } from "../controllers/courses.controllers";
import { authenticateToken } from "../middleware/authMiddleware";

const router = Router();

router.get('/courses', authenticateToken, getCourses)

router.get('/courses/:id', authenticateToken, getCourseById)

router.post('/courses', authenticateToken, createCourse)

router.put('/courses/:id', authenticateToken, updateCourse)

router.delete('/courses/:id', authenticateToken, deleteCourse)

export default router