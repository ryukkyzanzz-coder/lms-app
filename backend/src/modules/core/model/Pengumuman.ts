import mongoose, { Schema, Document } from 'mongoose';

export interface IPengumuman extends Document {
  pengampuId: mongoose.Types.ObjectId;
  judul: string;
  konten: string;
  status: 'Draft' | 'Terjadwal' | 'Dipublikasikan';
  tipe: 'Resmi Penting' | 'Tenggat & Asesmen' | 'Umum';
  tanggalRilis?: Date;
  isPinned: boolean;
  lampiran?: Array<{
    nama: string;
    url: string;
    ukuran: string;
    tipe: string;
  }>;
  aksesSiswa?: {
    total: number;
    membaca: number;
    belumMembaca: mongoose.Types.ObjectId[];
  };
}

const pengumumanSchema = new Schema<IPengumuman>(
  {
    pengampuId: { type: Schema.Types.ObjectId, ref: 'Pengampu', required: true },
    judul: { type: String, required: true },
    konten: { type: String, required: true },
    status: { type: String, enum: ['Draft', 'Terjadwal', 'Dipublikasikan'], default: 'Draft' },
    tipe: { type: String, enum: ['Resmi Penting', 'Tenggat & Asesmen', 'Umum'], default: 'Umum' },
    tanggalRilis: { type: Date },
    isPinned: { type: Boolean, default: false },
    lampiran: [
      {
        nama: String,
        url: String,
        ukuran: String,
        tipe: String
      }
    ],
    aksesSiswa: {
      total: { type: Number, default: 0 },
      membaca: { type: Number, default: 0 },
      belumMembaca: [{ type: Schema.Types.ObjectId, ref: 'Siswa' }]
    }
  },
  { timestamps: true }
);

export const Pengumuman = mongoose.models.Pengumuman || mongoose.model<IPengumuman>('Pengumuman', pengumumanSchema);
