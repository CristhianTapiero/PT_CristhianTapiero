import { Request, Response } from "express";
import { prisma } from "../db";

interface CustomRequest extends Request {}
interface CustomResponse extends Response {}

export const getInscriptionStatus = async (req: CustomRequest, res: CustomResponse) => {
    try{
        const result = await prisma.inscriptionStatus.findMany();
        res.json(result);
    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
};