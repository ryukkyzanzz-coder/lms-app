import mongoose, { Document, Schema } from 'mongoose';

export interface IKelas extends Document {
  nama: string;
  tingkat: string;
  program: string;
  tahunAjaranId: mongoose.Types.ObjectId;
  waliKelasId?: mongoose.Types.ObjectId;
  siswaIds: mongoose.Types.ObjectId[];
  status: 'Aktif' | 'Non-Aktif';
}

const kelasSchema = new Schema<IKelas>(
  {
    nama: {
      type: String,
      required: true,
      trim: true,
    },
    tingkat: {
      type: String,
      required: true,
    },
    program: {
      type: String,
      required: true,
    },
    tahunAjaranId: {
      type: Schema.Types.ObjectId,
      ref: 'TahunAjaran',
      required: true,
    },
    waliKelasId: {
      type: Schema.Types.ObjectId,
      ref: 'Guru',
    },
    siswaIds: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Siswa',
      },
    ],
    status: {
      type: String,
      enum: ['Aktif', 'Non-Aktif'],
      default: 'Aktif',
    },
  },
  {
    timestamps: true,
  }
);

kelasSchema.index({ tahunAjaranId: 1 });

export const Kelas = mongoose.model<IKelas>('Kelas', kelasSchema);
