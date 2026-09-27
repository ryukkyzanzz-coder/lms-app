import mongoose, { Schema, Document } from 'mongoose';

export interface IBab extends Document {
  pengampuId: mongoose.Types.ObjectId;
  urutan: number;
  judul: string;
  deskripsi?: string;
  status: 'Sedang Berjalan' | 'Selesai' | 'Belum';
}

const babSchema = new Schema<IBab>(
  {
    pengampuId: { type: Schema.Types.ObjectId, ref: 'Pengampu', required: true },
    urutan: { type: Number, required: true },
    judul: { type: String, required: true },
    deskripsi: { type: String },
    status: { type: String, enum: ['Sedang Berjalan', 'Selesai', 'Belum'], default: 'Belum' }
  },
  { timestamps: true }
);

// Index to ensure 'urutan' is unique per Pengampu
babSchema.index({ pengampuId: 1, urutan: 1 }, { unique: true });

export const Bab = mongoose.models.Bab || mongoose.model<IBab>('Bab', babSchema);
