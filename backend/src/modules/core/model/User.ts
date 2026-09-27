import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcrypt';

export enum Role {
  ADMIN = 'ADMIN',
  GURU = 'GURU',
  SISWA = 'SISWA',
  KEPALA_SEKOLAH = 'KEPALA_SEKOLAH',
  KURIKULUM = 'KURIKULUM',
}

export interface IUser extends Document {
  username: string; // Bisa NIP atau NISN
  passwordHash: string;
  role: Role;
  isActive: boolean;
  comparePassword(password: string): Promise<boolean>;
}

const userSchema = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: Object.values(Role),
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', async function () {
  if (!this.isModified('passwordHash')) return;
  const salt = await bcrypt.genSalt(10);
  this.passwordHash = await bcrypt.hash(this.passwordHash, salt);
});

userSchema.methods.comparePassword = async function (password: string) {
  return bcrypt.compare(password, this.passwordHash);
};

export const User = mongoose.model<IUser>('User', userSchema);
