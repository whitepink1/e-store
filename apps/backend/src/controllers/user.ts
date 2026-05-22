import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const existingUser = await User.findOne({ email: email });

        if (existingUser) {
            return res.status(409).json({ 
            message: 'User with this email already exist.' 
            });
        }
        
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({email, password: hashedPassword});
        await user.save();

        return res.status(201).json({ message: 'Success' });
    } catch (err) {
        return next(err);
    }
};

export const loginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { email, password } = req.body;
        const jwtSecret = process.env.JWT_SECRET;

        if (!jwtSecret) {
            throw new Error('JWT_SECRET is not defined in environment variables');
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        const token = jwt.sign(
            { userId: user._id, email: user.email },
            jwtSecret,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Success',
            token,
            user: {
                id: user._id,
                email: user.email,
            }
        });
    } catch(err) {
        return next(err);
    }
};

export const getUser = (req: Request, res: Response, next: NextFunction) => {

};