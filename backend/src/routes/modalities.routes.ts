import { Router } from "express";
import { getModalities } from "../controllers/modalities.controller";

const router = Router();

router.get('/modalities', getModalities);

export default router