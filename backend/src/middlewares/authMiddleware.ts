import jwt from 'jsonwebtoken';
import express, { Request, Response, NextFunction } from 'express';
import { config } from '../config';



const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  try {
    const decodedToken = jwt.verify(token, config.jwt.secret) as { userId: string };
    console.log('Decoded Token:', decodedToken);
    req.userId = decodedToken.userId;
    next();
  } catch (error) {
    res.status(401).json({ error: 'Unauthorized' });
  }
};



export default authMiddleware;
