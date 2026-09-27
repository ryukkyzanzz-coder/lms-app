import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, Role } from '../../core/model/User';
import { Guru } from '../../core/model/Guru';
import { env } from '../../../config/env';
import { sendSuccess } from '../../../shared/utils/response';
import { AppError } from '../../../shared/errors/AppError';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = loginSchema.parse(req.body);

    const user = await User.findOne({ username }).select('+passwordHash');
    
    if (!user || !user.isActive) {
      return next(new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS'));
    }

    const isMatch = await user.comparePassword(password);
    
    if (!isMatch) {
      return next(new AppError('Invalid credentials', 401, 'INVALID_CREDENTIALS'));
    }

    const token = jwt.sign(
      { userId: user._id.toString(), role: user.role },
      env.JWT_SECRET,
      { expiresIn: '1d' }
    );

    let profile = null;
    
    if (user.role === Role.GURU) {
      profile = await Guru.findOne({ userId: user._id });
    }
    // Also fetch Siswa profile if role is SISWA...

    sendSuccess(res, {
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        profile,
      },
      accessToken: token,
    });
  } catch (error) {
    next(error);
  }
};
