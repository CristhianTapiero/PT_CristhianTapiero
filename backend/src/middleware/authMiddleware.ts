import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: Request, res: Response, next: NextFunction): void => {
    const token = req.cookies.access_token;

    if (!token) {
        res.status(401).send({ message: "Access token is required" });
        return;
    }

    try {
        const data = jwt.verify(token, process.env.SECRET_KEY);
        req.body.user = data;
        next()
    } catch (error) {
        console.log(process.env.SECRET_KEY);
        console.log(token)
        res.status(403).send({ message: "Invalid or expired token" });
    }
};
