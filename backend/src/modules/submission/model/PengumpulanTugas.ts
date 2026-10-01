import mongoose, { Schema, Document } from 'mongoose';

export interface IPengumpulanTugasDocument extends Document {
  _id: mongoose.Types.ObjectId;
  tugasId: mongoose.Types.ObjectId;
  siswaId: mongoose.Types.ObjectId;

  status: 'SUBMITTED' | 'GRADED' | 'RESUBMITTED' | 'Dikumpulkan' | 'Belum';
  isLate: boolean;
  submittedAt: Date;

  files: {
    name: string;
    url: string;
    mimeType: string;
    size: number;
  }[];

  linkUrl?: string;
  catatanSiswa?: string;

  nilai?: number;
  catatanGuru?: string;
  gradedAt?: Date;
  gradedBy?: mongoose.Types.ObjectId;

  createdAt: Date;
  updatedAt: Date;
}

const pengumpulanTugasSchema = new Schema<IPengumpulanTugasDocument>(
  {
    tugasId: { type: Schema.Types.ObjectId, ref: 'Tugas', required: true },
    siswaId: { type: Schema.Types.ObjectId, ref: 'Siswa', required: true },

    status: {
      type: String,
      enum: ['SUBMITTED', 'GRADED', 'RESUBMITTED', 'Dikumpulkan', 'Belum'],
      default: 'SUBMITTED',
      required: true,
    },

    isLate: { type: Boolean, default: false, required: true },

    submittedAt: { type: Date, default: Date.now, required: true },

    files: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        mimeType: { type: String, required: true },
        size: { type: Number, required: true },
      },
    ],

    linkUrl: { type: String, trim: true },
    catatanSiswa: { type: String, trim: true },

    nilai: { type: Number, min: 0 },
    catatanGuru: { type: String, trim: true },
    gradedAt: { type: Date },
    gradedBy: { type: Schema.Types.ObjectId, ref: 'Guru' },
  },
  {
    timestamps: true,
  }
);

// Compound indexes matching blueprint specification
pengumpulanTugasSchema.index({ tugasId: 1, siswaId: 1 }, { unique: true });
pengumpulanTugasSchema.index({ tugasId: 1, status: 1 });

export const PengumpulanTugas =
  mongoose.models.PengumpulanTugas ||
  mongoose.model<IPengumpulanTugasDocument>('PengumpulanTugas', pengumpulanTugasSchema);

