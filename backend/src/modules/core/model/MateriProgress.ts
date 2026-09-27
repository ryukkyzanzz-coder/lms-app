import mongoose, { Schema, Document } from 'mongoose';

export interface IMateriProgress extends Document {
  materiId: mongoose.Types.ObjectId;
  siswaId: mongoose.Types.ObjectId;
  status: 'Belum' | 'Selesai';
  terakhirAkses?: Date;
}

const materiProgressSchema = new Schema<IMateriProgress>(
  {
    materiId: { type: Schema.Types.ObjectId, ref: 'Materi', required: true },
    siswaId: { type: Schema.Types.ObjectId, ref: 'Siswa', required: true },
    status: { type: String, enum: ['Belum', 'Selesai'], default: 'Belum' },
    terakhirAkses: { type: Date }
  },
  { timestamps: true }
);

materiProgressSchema.index({ materiId: 1, siswaId: 1 }, { unique: true });

export const MateriProgress = mongoose.models.MateriProgress || mongoose.model<IMateriProgress>('MateriProgress', materiProgressSchema);
