import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
    user?: {
        userId: string;
        email: string;
    };
};

export const requireAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ message: 'Authorization token required.' });
        }

        const token = authHeader.split(' ')[1];
        const jwtSecret = process.env.JWT_SECRET!;

        const decoded = jwt.verify(token, jwtSecret) as { userId: string; email: string };
        
        req.user = decoded;
        
        next();
    } catch (err) {
        return res.status(401).json({ message: 'Invalid or expired token.' });
    }
};