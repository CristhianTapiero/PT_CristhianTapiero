import { Router } from "express";
import { getInscriptionStatus } from "../controllers/inscriptionStatus.controller";

const router = Router();

router.get('/inscriptionStatus', getInscriptionStatus);

export default router