import { Request, Response, NextFunction } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { AuthenticatedRequest } from '../middleware/auth';
import { SavedAddressSchema, UpdateNameSchema } from '../validators/user';

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

export const getUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthenticatedRequest;
        const userId = authReq.user?.userId; 
            
        if (!userId) {
            return res.status(401).json({
                message: 'Unauthorized: User authentication failed or token is missing.'
            });
        };
            
        const user = await User.findById(userId);
        if (!user) {
          return res.status(404).json({ message: 'User not found.' });
        };
        res.status(200).json({
            message: 'Fetched user successfully.',
            user: user,
        });
        } catch(err) {
            return next(err);
        }
};

export const getFavourite = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthenticatedRequest;
        const userId = authReq.user?.userId; 
            
        if (!userId) {
            return res.status(401).json({
                message: 'Unauthorized: User authentication failed or token is missing.'
            });
        };
            
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        };

        return res.status(200).json({
            message: 'Success',
            favourites: user.favourite || []
        });
        } catch (err) {
            return next(err);
        }
};

export const updateName = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthenticatedRequest;
        const userId = authReq.user?.userId; 
            
        if (!userId) {
            return res.status(401).json({
                message: 'Unauthorized: User authentication failed or token is missing.'
            });
        };

        const partialCheck = UpdateNameSchema.partial();
        const validatedData = partialCheck.parse(req.body);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { $set: validatedData },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found.'
            });
        };

        return res.status(200).json({ success: true});
        } catch (err) {
            return res.status(400).json({ message: "Validation failed" });
        }
};

export const postFavourite = async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.body;

    if (!productId) {
        return res.status(400).json({ message: 'Bad Request: Product ID is required.' });
    }

    try {
        const authReq = req as AuthenticatedRequest;
        const userId = authReq.user?.userId; 
            
        if (!userId) {
            return res.status(401).json({
                message: 'Unauthorized: User authentication failed or token is missing.'
            });
        };
            
        const user = await User.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({
                message: 'User not found.'
            });
        };

        const favouriteIds = user.favourite.map((id: any) => id.toString());

        if (favouriteIds.includes(productId)) {
            user.favourite = favouriteIds.filter((id: string) => id !== productId);
        } else {
            user.favourite.push(productId);
        };

        await user.save();

        return res.status(200).json({
            message: 'Success',
        });
        } catch (err) {
            return next(err);
        }
};

export const createAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthenticatedRequest;
        const userId = authReq.user?.userId; 
            
        if (!userId) {
            return res.status(401).json({
                message: 'Unauthorized: User authentication failed or token is missing.'
            });
        };

        const validatedAddress = SavedAddressSchema.parse(req.body);

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { 
                $push: { address: validatedAddress } 
            },
            { 
                new: true,
                runValidators: true
            }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found.'
            });
        };

        return res.status(200).json({
            success: true,
            message: 'Address successfully added.',
        });
        } catch (err) {
            return next(err);
        }
};
export const deleteAddress = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authReq = req as AuthenticatedRequest;
        const userId = authReq.user?.userId; 
            
        if (!userId) {
            return res.status(401).json({
                message: 'Unauthorized: User authentication failed or token is missing.'
            });
        };

        const {id} = req.body;
        if (!id) {
            return res.status(400).json({
                message: 'Bad Request: Address ID is required.'
            });
        };

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            {
                $pull: { address: { _id: id } }
            },
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({
                message: 'User not found.'
            });
        }

        return res.status(200).json({
            success: true,
            message: 'Address successfully deleted.',
        });
        } catch (err) {
            return next(err);
        }
};

