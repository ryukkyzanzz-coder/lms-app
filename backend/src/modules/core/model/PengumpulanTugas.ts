import mongoose, { Schema, Document } from 'mongoose';

export interface IPengumpulanTugas extends Document {
  tugasId: mongoose.Types.ObjectId;
  siswaId: mongoose.Types.ObjectId;
  status: 'Belum' | 'Dikumpulkan' | 'Dinilai' | 'Terlambat';
  nilai?: number;
  waktuKumpul?: Date;
}

const pengumpulanTugasSchema = new Schema<IPengumpulanTugas>(
  {
    tugasId: { type: Schema.Types.ObjectId, ref: 'Tugas', required: true },
    siswaId: { type: Schema.Types.ObjectId, ref: 'Siswa', required: true },
    status: { type: String, enum: ['Belum', 'Dikumpulkan', 'Dinilai', 'Terlambat'], default: 'Belum' },
    nilai: { type: Number },
    waktuKumpul: { type: Date }
  },
  { timestamps: true }
);

pengumpulanTugasSchema.index({ tugasId: 1, siswaId: 1 }, { unique: true });

export const PengumpulanTugas = mongoose.models.PengumpulanTugas || mongoose.model<IPengumpulanTugas>('PengumpulanTugas', pengumpulanTugasSchema);
