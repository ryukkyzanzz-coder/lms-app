import mongoose, { Document, Schema } from 'mongoose';

export interface ISiswa extends Document {
  userId: mongoose.Types.ObjectId;
  nisn: string;
  nama: string;
  jenisKelamin?: 'L' | 'P';
  status: 'Aktif' | 'Lulus' | 'Pindah' | 'Drop Out';
}

const siswaSchema = new Schema<ISiswa>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    nisn: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nama: {
      type: String,
      required: true,
    },
    jenisKelamin: {
      type: String,
      enum: ['L', 'P'],
      default: 'L',
    },
    status: {
      type: String,
      enum: ['Aktif', 'Lulus', 'Pindah', 'Drop Out'],
      default: 'Aktif',
    },
  },
  {
    timestamps: true,
  }
);

export const Siswa = mongoose.model<ISiswa>('Siswa', siswaSchema);
