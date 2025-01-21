import { Request, Response } from "express";
import { prisma } from "../db";

interface CustomRequest extends Request {}
interface CustomResponse extends Response {}

export const getEnrollments = async (req: CustomRequest, res: CustomResponse):Promise<any> => {
    try{
        const [rows] = await prisma.usersCourse.findMany();
        return res.send({ rows });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error", error });
    }
}

export const enrollStudent = async (req: CustomRequest, res: CustomResponse): Promise<any> => {
    const { studentId, courseId, statusId } = req.body;
    if (!studentId || !courseId || !statusId) {
        return res.status(400).send({ message: "Please provide all required fields" });
    }
    try{
        const rows = await prisma.usersCourse.create({
            data: {
                userId: studentId,
                courseId,
                inscriptionStatusId: statusId
            }
        });
        return res.send({rows});
    }catch (error) {
        if(error.sqlState === "45000") 
            return res.status(400).send({ message: "No hay cupos disponibles" });
        return res.status(500).send({ message: "Internal server error", error });
    }
}
export const removeStudent = async (req: CustomRequest, res: CustomResponse): Promise<any> => {
    const { transaction_id } = req.params
    try{
        const rows = await prisma.usersCourse.delete({
            where: {
                id: parseInt(transaction_id)
            }
        });
        return res.send({ rows });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error", error });
    }
}

export const updateEnrollment = async (req: CustomRequest, res: CustomResponse): Promise<any> => {
    const { studentId, courseId, statusId } = req.body;
    const parsedStudentId = parseInt(studentId);
    const parsedCourseId = parseInt(courseId);
    const parsedStatusId = parseInt(statusId);
    const { transaction_id } = req.params;
    if (!studentId || !courseId || !statusId) {
        return res.status(400).send({ message: "Please provide all required fields" });
    }
    try{
        const rows = await prisma.usersCourse.update({
            where: {
                id: parseInt(transaction_id)
            },
            data: {
                userId: parsedStudentId,
                courseId: parsedCourseId,
                inscriptionStatusId: parsedStatusId
            }
        });
        return res.send({ rows });
    } catch (error) {
        return res.status(500).send({ message: "Internal server error", error });
    }
}