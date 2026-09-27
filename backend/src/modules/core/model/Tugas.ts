import mongoose, { Schema, Document } from 'mongoose';

export interface ITugas extends Document {
  pengampuId: mongoose.Types.ObjectId;
  judul: string;
  deskripsi?: string;
  tenggatWaktu: Date;
  status: 'Aktif' | 'Selesai' | 'Draft';
}

const tugasSchema = new Schema<ITugas>(
  {
    pengampuId: { type: Schema.Types.ObjectId, ref: 'Pengampu', required: true },
    judul: { type: String, required: true },
    deskripsi: { type: String },
    tenggatWaktu: { type: Date, required: true },
    status: { type: String, enum: ['Aktif', 'Selesai', 'Draft'], default: 'Draft' }
  },
  { timestamps: true }
);

export const Tugas = mongoose.models.Tugas || mongoose.model<ITugas>('Tugas', tugasSchema);
