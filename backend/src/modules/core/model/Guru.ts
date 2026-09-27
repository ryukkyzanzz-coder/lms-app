import mongoose, { Document, Schema } from 'mongoose';

export interface IGuru extends Document {
  userId: mongoose.Types.ObjectId;
  nip: string;
  nama: string;
  email?: string;
  nomorTelepon?: string;
  status: 'Aktif' | 'Cuti' | 'Pensiun';
}

const guruSchema = new Schema<IGuru>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    nip: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nama: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      trim: true,
    },
    nomorTelepon: {
      type: String,
      trim: true,
    },
    status: {
      type: String,
      enum: ['Aktif', 'Cuti', 'Pensiun'],
      default: 'Aktif',
    },
  },
  {
    timestamps: true,
  }
);

export const Guru = mongoose.model<IGuru>('Guru', guruSchema);
