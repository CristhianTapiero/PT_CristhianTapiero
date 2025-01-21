import { Request, Response } from "express";
import { prisma } from "../db";

interface CustomRequest extends Request {}
interface CustomResponse extends Response {}

export const getCourses = async (req: CustomRequest, res: CustomResponse) => {
    try{
        const result = await prisma.courses.findMany({
            select: {
                id: true,
                name: true,
                duration: true,
                quota: true,
                Modalities: {
                    select: {
                        name: true
                    }
                }
            }
        });
        res.json(result);
    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
};

export const createCourse = async (req: CustomRequest, res: CustomResponse): Promise<any> => {
    const { name, duration, quota, modalityId } = req.body;
    try{
        const rows = await prisma.courses.create({
            data: {
                name,
                duration,
                quota: quota,
                modalityId
            }
        });
        return res.send({ rows });
    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
};

export const updateCourse = async (req: CustomRequest, res: CustomResponse): Promise<any> => {
    const { name, duration, quota, modalityId } = req.body;
    const { id } = req.params;
    try{
        const rows = await prisma.courses.update({
            where: {
                id: parseInt(id)
            },
            data: {
                name,
                duration,
                quota,
                modalityId
            }
        });
        return res.send({ rows });
    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
}

export const deleteCourse = async (req: CustomRequest, res: CustomResponse): Promise<any> => {
    const { id } = req.params;
    try{
        const rows = await prisma.courses.delete({
            where: {
                id: parseInt(id)
            }
        });
        return res.send({ rows });
    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
}

export const getCourseById = async (req: CustomRequest, res: CustomResponse): Promise<any> => {
    const { id } = req.params;
    try{
        const result = await prisma.courses.findUnique({
            where: {
                id: parseInt(id)
            },
            select: {
                id: true,
                name: true,
                duration: true,
                quota: true,
                modalityId: true
            }
        });
        res.json(result);
    }catch(err){
        console.error(err);
        res.status(500).send("Server error");
    }
};