import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '../db';

export const login = async (req: Request, res: Response): Promise<void> => {
    const { email, user_password } = req.body;

    if (!email || !user_password) {
        res.status(400).send({ message: "Please provide email and password" });
        return;
    }

    try {
        const user: any = await prisma.users.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            res.status(401).send({ message: "Invalid email or password" });
            return;
        }

        // user is already defined

        const isPasswordValid = await bcrypt.compare(user_password, user.password);
        if (!isPasswordValid) {
            res.status(401).send({ message: "Invalid email or password" });
            return;
        }

        const token = jwt.sign(
            { id: user.id, email: user.email },
            process.env.SECRET_KEY,
            { expiresIn: "1h" }
        );

        res.cookie('access_token', token,{
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 3600000
        }).send({ message: "Login successful", token });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).send({ message: "Internal server error" });
    }
};

export const checkAuth = async (req: Request, res: Response): Promise<any> => {
    const token = req.cookies.access_token;
    if (!token) {
        return res.status(401).json({ message: "Not authenticated" });
    }

    try {
        jwt.verify(token, process.env.SECRET_KEY);
        return res.status(200).json({ message: "Authenticated" });
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}

export const logout = async (req: Request, res: Response): Promise<void> => {
    res.clearCookie("access_token", {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
    });
    res.status(200).json({ message: "Logout successful" });
}