import { Request, Response, NextFunction } from 'express';
import { AppError } from '../shared/errors/AppError';
import { env } from '../config/env';
import { sendError } from '../shared/utils/response';
import { ZodError } from 'zod';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return sendError(res, err.message, err.errorCode, err.statusCode);
  }

  if (err instanceof ZodError) {
    const message = err.issues.map((e: any) => `${e.path.join('.')}: ${e.message}`).join(', ');
    return sendError(res, message, 'VALIDATION_ERROR', 400);
  }

  // Handle Mongoose cast error (invalid ObjectId)
  if (err.name === 'CastError') {
    return sendError(res, 'Invalid ID format', 'INVALID_ID', 400);
  }

  // Handle Mongoose duplicate key error
  if ((err as any).code === 11000) {
    return sendError(res, 'Duplicate field value entered', 'DUPLICATE_FIELD', 409);
  }

  console.error('Unhandled Error:', err);

  const message = env.NODE_ENV === 'production' ? 'Something went wrong!' : err.message;
  return sendError(res, message, 'INTERNAL_SERVER_ERROR', 500);
};
