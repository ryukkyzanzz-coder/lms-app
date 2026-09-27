import mongoose, { Document, Schema } from 'mongoose';

export interface IMataPelajaran extends Document {
  kode: string;
  nama: string;
  kelompok: string;
  kurikulumId?: mongoose.Types.ObjectId;
  status: 'Aktif' | 'Non-Aktif';
}

const mataPelajaranSchema = new Schema<IMataPelajaran>(
  {
    kode: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    nama: {
      type: String,
      required: true,
    },
    kelompok: {
      type: String,
      required: true,
    },
    kurikulumId: {
      type: Schema.Types.ObjectId,
      ref: 'Kurikulum', // Optional if Kurikulum is not yet defined
    },
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

export const MataPelajaran = mongoose.model<IMataPelajaran>('MataPelajaran', mataPelajaranSchema);
