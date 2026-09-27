import mongoose, { Schema, Document } from 'mongoose';

export interface IMateri extends Document {
  babId: mongoose.Types.ObjectId;
  urutan: number;
  judul: string;
  tipe: 'Dokumen PDF' | 'Teks & Kode' | 'Teks & Dokumen' | 'Video';
  status: 'Draft' | 'Terjadwal' | 'Dipublikasikan';
  tanggalRilis?: Date;
  fileSize?: string;
  aksesSiswa?: {
    total: number;
    membaca: number;
  };
}

const materiSchema = new Schema<IMateri>(
  {
    babId: { type: Schema.Types.ObjectId, ref: 'Bab', required: true },
    urutan: { type: Number, required: true },
    judul: { type: String, required: true },
    tipe: { type: String, enum: ['Dokumen PDF', 'Teks & Kode', 'Teks & Dokumen', 'Video'], required: true },
    status: { type: String, enum: ['Draft', 'Terjadwal', 'Dipublikasikan'], default: 'Draft' },
    tanggalRilis: { type: Date },
    fileSize: { type: String },
    aksesSiswa: {
      total: { type: Number, default: 0 },
      membaca: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

materiSchema.index({ babId: 1, urutan: 1 }, { unique: true });

export const Materi = mongoose.models.Materi || mongoose.model<IMateri>('Materi', materiSchema);
