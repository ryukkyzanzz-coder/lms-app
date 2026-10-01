import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { User, Role, IUser } from '../../core/model/User';
import { Guru } from '../../core/model/Guru';
import { Siswa } from '../../core/model/Siswa';
import { env } from '../../../config/env';
import { sendSuccess } from '../../../shared/utils/response';
import { AppError } from '../../../shared/errors/AppError';
import { z } from 'zod';

const loginSchema = z.object({
  username: z.string().min(1, 'Username is required'),
  password: z.string().min(1, 'Password is required'),
});

const USERNAME_ALIASES: Record<string, string> = {
  guru: '198504122010011014',
  guru1: '198504122010011014',
  budi: '198504122010011014',
  guru2: '198907232014032005',
  siti: '198907232014032005',
  siswa: '0061234567',
  siswa1: '0061234567',
  dafiand: '0061234567',
  siswa2: '0061234568',
  andi: '0061234568',
  siswa3: '0061234569',
  dewi: '0061234569',
  kepsek: '196803151993031004',
  kepalasekolah: '196803151993031004',
  wardoyo: '196803151993031004',
  kurikulum: '197508202000121002',
  wakakurikulum: '197508202000121002',
  hidayat: '197508202000121002',
};

export const resolveUserProfile = async (user: IUser) => {
  if (user.role === Role.GURU) {
    const profile = await Guru.findOne({ userId: user._id });
    if (profile) return profile;
    return {
      nama: 'Budi Pratama, S.Kom.',
      nip: user.username,
      roleSub: 'Guru Pengampu',
    };
  }
  if (user.role === Role.SISWA) {
    const profile = await Siswa.findOne({ userId: user._id });
    if (profile) return profile;
    return {
      nama: 'Dafiand',
      nisn: user.username,
      roleSub: 'Siswa Aktif',
    };
  }
  if (user.role === Role.ADMIN) {
    return {
      nama: 'Bambang Sudarmono, S.AP.',
      nip: user.username === 'admin' ? '19780514 200501 1 003' : user.username,
      roleSub: 'Kepala Tata Usaha',
    };
  }
  if (user.role === Role.KEPALA_SEKOLAH) {
    return {
      nama: 'Drs. H. Wardoyo, M.Pd.',
      nip: user.username,
      roleSub: 'Kepala Sekolah',
    };
  }
  if (user.role === Role.KURIKULUM) {
    return {
      nama: 'Ahmad Hidayat, M.Kom',
      nip: user.username,
      roleSub: 'Waka Kurikulum',
    };
  }
  return null;
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { username, password } = loginSchema.parse(req.body);
    const trimmed = username.trim();
    const cleanLower = trimmed.toLowerCase();
    const resolvedUsername = USERNAME_ALIASES[cleanLower] || trimmed;

    const user = await User.findOne({
      $or: [
        { username: trimmed },
        { username: resolvedUsername },
      ],
    }).select('+passwordHash');
    
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

    const profile = await resolveUserProfile(user);

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

export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) {
      return next(new AppError('Not authorized', 401, 'UNAUTHORIZED'));
    }

    const user = await User.findById(req.user.userId);
    if (!user || !user.isActive) {
      return next(new AppError('The user belonging to this token no longer exists.', 401, 'UNAUTHORIZED'));
    }

    const profile = await resolveUserProfile(user);

    sendSuccess(res, {
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        profile,
      },
    });
  } catch (error) {
    next(error);
  }
};

