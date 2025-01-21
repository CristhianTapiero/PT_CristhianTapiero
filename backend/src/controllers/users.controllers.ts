import { Request, Response } from "express";
import { prisma } from "../db";
import bcrypt from 'bcryptjs';

interface CustomRequest extends Request {}
interface CustomResponse extends Response {}

export const getUsers = async (req: CustomRequest, res: CustomResponse) => {
    try{
        const result = await prisma.users.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                password: false,
                Roles: {
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

export const getMatchedUsers = async (req: CustomRequest, res: CustomResponse) => {
    const searchQuery = req.params.fetch;
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;  

    const offset = (page - 1) * pageSize;

    try {
        const rows = await prisma.users.findMany({
            where: {
                OR: [
                    { firstName: { contains: searchQuery } },
                    { email: { contains: searchQuery } },
                ],
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                Roles: {
                    select: {
                        name: true
                    }
                }
            },
            skip: offset,
            take: pageSize,
        }
        );

        const countRows = await prisma.users.count()

        const totalUsers = (countRows as any)[0].total;
        const totalPages = Math.ceil(totalUsers / pageSize);

        res.json({
            users: rows,
            pagination: {
                currentPage: page,
                pageSize: pageSize,
                totalPages: totalPages,
                totalUsers: totalUsers,
            },
        });
    } catch (err) {
        console.error(err);
        res.status(500).send("Server error");
    }
}

export const createUser = async (req: CustomRequest, res: CustomResponse): Promise<any> => {
    const { firstName, lastName, email, phone, roleId, user_password } = req.body;
    try{
        if (user_password === null) {
            const rows = await prisma.users.create({
                data: {
                    firstName: firstName,
                    lastName: lastName,
                    email,
                    phone,
                    roleId: roleId,
            }
        });
            return res.send({ rows });
        }
        const encryptedPass = await bcrypt.hash(user_password, 10);
        const rows = await prisma.users.create({
            data: {
                firstName,
                lastName,
                email,
                phone,
                roleId,
                password: encryptedPass,
            }
        });
        return res.send({ rows });
    }catch(err){
        if (err.sqlMessage.includes("Duplicate entry")) {
            if (err.sqlMessage.includes("cedula")) {
            return res.status(400).send({ message: "Cedula already exists" });
            } else if (err.sqlMessage.includes("email")) {
            return res.status(400).send({ message: "Email already exists" });
            } else if (err.sqlMessage.includes("phone")) {
            return res.status(400).send({ message: "Phone already exists" });
            }
        }
        console.error(err);
        res.status(500).send("Server error");
    }
};

export const updateUser = async (req: CustomRequest, res: CustomResponse): Promise<any> => {
    const { firstName, lastName, email, phone, roleId, user_password } = req.body;
    const { id } = req.params;
    try{
        if(user_password === null) {
            const rows = await prisma.users.update({
                where: {
                    id: parseInt(id)
                },
                data: {
                    firstName,
                    lastName,
                    email,
                    phone,
                    roleId
            }
        });
            return res.send({ rows });
        }
    
        const encryptedPass = await bcrypt.hash(user_password, 10);
        const rows = await prisma.users.update({
            where: {
                id: parseInt(id)
            },
            data: {
                firstName,
                lastName,
                email,
                phone,
                roleId,
                password: encryptedPass,
            }
        });
        return res.send({ rows });
    }catch(err){
        console.log(err);
        res.status(500).send("Server error");
    }
}

export const deleteUser = async (req: CustomRequest, res: CustomResponse): Promise<any> => {
    const { id } = req.params;
    try{
        const rows = await prisma.users.delete({
            where: {
                id: parseInt(id)
            }
        });
        return res.send({ rows });
    }catch(err){
        console.log(err);
        res.status(500).send("Server error");
    }
}