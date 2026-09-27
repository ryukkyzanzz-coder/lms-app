import mongoose, { Document, Schema } from 'mongoose';

export interface ISemester extends Document {
  tahunAjaranId: mongoose.Types.ObjectId;
  nama: 'Ganjil' | 'Genap';
  status: 'Aktif' | 'Non-Aktif';
}

const semesterSchema = new Schema<ISemester>(
  {
    tahunAjaranId: {
      type: Schema.Types.ObjectId,
      ref: 'TahunAjaran',
      required: true,
    },
    nama: {
      type: String,
      enum: ['Ganjil', 'Genap'],
      required: true,
    },
    status: {
      type: String,
      enum: ['Aktif', 'Non-Aktif'],
      default: 'Non-Aktif',
    },
  },
  {
    timestamps: true,
  }
);

export const Semester = mongoose.model<ISemester>('Semester', semesterSchema);
