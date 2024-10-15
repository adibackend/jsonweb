import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

export interface AuthenticatedRequest extends Request {
  user?: string | JwtPayload;
}
const auth = (req:AuthenticatedRequest, res:Response, next:NextFunction):void => {
    console.log(req.header('Authorization')?.split(' ')[1]);
    const token = req.header('Authorization')?.split(' ')[1];
    if (!token)  res.status(403).json({ message: 'Access denied' });
    
    try {
        const verified = jwt.verify(token as string, process.env.JWT_SECRET as string) as JwtPayload;
        req.user = verified;
        next();
    } catch (error) {
        console.log('incoorect jsonwebtoken ', error);
        res.status(400).json({ message: 'Invalid token' });
    }
};


export default auth;
