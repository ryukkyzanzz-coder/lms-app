import mongoose, { Schema, Document } from 'mongoose';

export interface INilaiDocument extends Document {
  _id: mongoose.Types.ObjectId;
  tugasId: mongoose.Types.ObjectId;
  siswaId: mongoose.Types.ObjectId;
  guruId: mongoose.Types.ObjectId;
  pengumpulanId?: mongoose.Types.ObjectId;
  nilai: number;
  feedback?: string;
  gradedAt: Date;
  version: number;
  createdAt: Date;
  updatedAt: Date;
}

const nilaiSchema = new Schema<INilaiDocument>(
  {
    tugasId: { type: Schema.Types.ObjectId, ref: 'Tugas', required: true },
    siswaId: { type: Schema.Types.ObjectId, ref: 'Siswa', required: true },
    guruId: { type: Schema.Types.ObjectId, ref: 'Guru', required: true },
    pengumpulanId: { type: Schema.Types.ObjectId, ref: 'PengumpulanTugas' },
    nilai: { type: Number, required: true, min: 0 },
    feedback: { type: String, trim: true },
    gradedAt: { type: Date, default: Date.now },
    version: { type: Number, default: 1 },
  },
  {
    timestamps: true,
  }
);

nilaiSchema.index({ tugasId: 1, siswaId: 1 }, { unique: true });
nilaiSchema.index({ siswaId: 1, gradedAt: -1 });

export const Nilai =
  mongoose.models.Nilai || mongoose.model<INilaiDocument>('Nilai', nilaiSchema);
