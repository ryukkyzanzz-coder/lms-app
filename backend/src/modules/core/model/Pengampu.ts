import mongoose, { Document, Schema } from 'mongoose';

export interface IPengampu extends Document {
  guruId: mongoose.Types.ObjectId;
  mataPelajaranId: mongoose.Types.ObjectId;
  kelasId: mongoose.Types.ObjectId;
  tahunAjaranId: mongoose.Types.ObjectId;
  semesterId: mongoose.Types.ObjectId;
  status: 'Aktif' | 'Non-Aktif';
}

const pengampuSchema = new Schema<IPengampu>(
  {
    guruId: {
      type: Schema.Types.ObjectId,
      ref: 'Guru',
      required: true,
    },
    mataPelajaranId: {
      type: Schema.Types.ObjectId,
      ref: 'MataPelajaran',
      required: true,
    },
    kelasId: {
      type: Schema.Types.ObjectId,
      ref: 'Kelas',
      required: true,
    },
    tahunAjaranId: {
      type: Schema.Types.ObjectId,
      ref: 'TahunAjaran',
      required: true,
    },
    semesterId: {
      type: Schema.Types.ObjectId,
      ref: 'Semester',
      required: true,
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

// Unique compound index preventing duplicate assignment
pengampuSchema.index(
  { guruId: 1, mataPelajaranId: 1, kelasId: 1, tahunAjaranId: 1, semesterId: 1 },
  { unique: true }
);

// Other useful indexes
pengampuSchema.index({ guruId: 1 });
pengampuSchema.index({ kelasId: 1 });
pengampuSchema.index({ mataPelajaranId: 1 });
pengampuSchema.index({ tahunAjaranId: 1 });
pengampuSchema.index({ semesterId: 1 });

export const Pengampu = mongoose.model<IPengampu>('Pengampu', pengampuSchema);
