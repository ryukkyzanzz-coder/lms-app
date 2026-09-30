import mongoose, { Schema, Document } from 'mongoose';

export interface IMateriDocument extends Document {
  _id: mongoose.Types.ObjectId;
  guruId: mongoose.Types.ObjectId;
  kelasId: mongoose.Types.ObjectId;
  mapelId: mongoose.Types.ObjectId;
  babId?: mongoose.Types.ObjectId;

  judul: string;
  deskripsi?: string;

  tipe: 'TEXT' | 'PDF' | 'VIDEO' | 'LINK' | 'DOCUMENT';

  konten?: string;

  file?: {
    name: string;
    url: string;
    mimeType: string;
    size: number;
  };

  urutan: number;

  status: 'draft' | 'published' | 'archived';

  version: number;

  publishedAt?: Date;

  createdAt: Date;
  updatedAt: Date;
}

const materiSchema = new Schema<IMateriDocument>(
  {
    guruId: { type: Schema.Types.ObjectId, ref: 'Guru', required: true },
    kelasId: { type: Schema.Types.ObjectId, ref: 'Kelas', required: true },
    mapelId: { type: Schema.Types.ObjectId, ref: 'MataPelajaran', required: true },
    babId: { type: Schema.Types.ObjectId, ref: 'Bab' },

    judul: { type: String, required: true, trim: true },
    deskripsi: { type: String, trim: true },

    tipe: {
      type: String,
      enum: ['TEXT', 'PDF', 'VIDEO', 'LINK', 'DOCUMENT'],
      required: true,
      default: 'DOCUMENT',
    },

    konten: { type: String },

    file: {
      name: { type: String },
      url: { type: String },
      mimeType: { type: String },
      size: { type: Number },
    },

    urutan: { type: Number, required: true, default: 1 },

    status: {
      type: String,
      enum: ['draft', 'published', 'archived'],
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
materiSchema.index({ kelasId: 1, mapelId: 1, status: 1, urutan: 1 });
materiSchema.index({ kelasId: 1, mapelId: 1, createdAt: -1 });

export const Materi =
  mongoose.models.Materi || mongoose.model<IMateriDocument>('Materi', materiSchema);
