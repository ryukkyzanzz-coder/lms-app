import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { env } from '../config/env';
import { AppError } from '../shared/errors/AppError';
import { User, Role } from '../modules/core/model/User';

export interface AuthPayload {
  userId: string;
  role: Role;
}

declare global {
  namespace Express {
    interface Request {
      user?: AuthPayload;
    }
  }
}

export const requireAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(new AppError('Not authorized to access this route', 401, 'UNAUTHORIZED'));
    }

    const decoded = jwt.verify(token, env.JWT_SECRET) as AuthPayload;

    const currentUser = await User.findById(decoded.userId).select('+isActive');
    if (!currentUser || !currentUser.isActive) {
      return next(new AppError('The user belonging to this token no longer exist.', 401, 'UNAUTHORIZED'));
    }

    req.user = decoded;
    next();
  } catch (err) {
    return next(new AppError('Not authorized to access this route', 401, 'UNAUTHORIZED'));
  }
};

export const requireRole = (...roles: Role[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new AppError('Not authorized', 401, 'UNAUTHORIZED'));
    }

    if (!roles.includes(req.user.role)) {
      return next(new AppError('Forbidden. You do not have permission to perform this action.', 403, 'FORBIDDEN'));
    }

    next();
  };
};
