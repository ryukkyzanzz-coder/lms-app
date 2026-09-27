import mongoose, { Document, Schema } from 'mongoose';

export interface ITahunAjaran extends Document {
  nama: string; // e.g., "2026/2027"
  tahunMulai: number;
  tahunSelesai: number;
  status: 'Aktif' | 'Non-Aktif';
}

const tahunAjaranSchema = new Schema<ITahunAjaran>(
  {
    nama: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    tahunMulai: {
      type: Number,
      required: true,
    },
    tahunSelesai: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['Aktif', 'Non-Aktif'],
      default: 'Non-Aktif',
    },
  },
  {
    timestamps: true,
  }
);

export const TahunAjaran = mongoose.model<ITahunAjaran>('TahunAjaran', tahunAjaranSchema);
