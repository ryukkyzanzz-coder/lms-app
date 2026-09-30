import mongoose, { Schema, Document } from 'mongoose';

export interface ITugasDocument extends Document {
  _id: mongoose.Types.ObjectId;

  guruId: mongoose.Types.ObjectId;
  kelasId: mongoose.Types.ObjectId;
  mapelId: mongoose.Types.ObjectId;

  babId?: mongoose.Types.ObjectId;

  judul: string;
  deskripsi: string;
  instruksi?: string;

  lampiran?: {
    name: string;
    url: string;
    mimeType: string;
    size: number;
  }[];

  deadline: Date;

  maxScore: number;

  status: 'draft' | 'published' | 'closed';

  version: number;

  publishedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const tugasSchema = new Schema<ITugasDocument>(
  {
    guruId: { type: Schema.Types.ObjectId, ref: 'Guru', required: true },
    kelasId: { type: Schema.Types.ObjectId, ref: 'Kelas', required: true },
    mapelId: { type: Schema.Types.ObjectId, ref: 'MataPelajaran', required: true },

    babId: { type: Schema.Types.ObjectId, ref: 'Bab' },

    judul: { type: String, required: true, trim: true },
    deskripsi: { type: String, required: true, trim: true },
    instruksi: { type: String, trim: true },

    lampiran: [
      {
        name: { type: String, required: true },
        url: { type: String, required: true },
        mimeType: { type: String, required: true },
        size: { type: Number, required: true },
      },
    ],

    deadline: { type: Date, required: true },

    maxScore: { type: Number, required: true, default: 100 },

    status: {
      type: String,
      enum: ['draft', 'published', 'closed'],
      default: 'draft',
      required: true,
    },

    version: { type: Number, required: true, default: 1 },

    publishedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

// Indexes matching blueprint specification
tugasSchema.index({
  kelasId: 1,
  mapelId: 1,
  status: 1,
  deadline: 1,
});

export const Tugas =
  mongoose.models.Tugas || mongoose.model<ITugasDocument>('Tugas', tugasSchema);
