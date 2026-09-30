import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const objectIdSchema = z
  .string()
  .regex(objectIdRegex, 'ID harus berupa valid MongoDB ObjectId');

export const listSubmissionsQuerySchema = z.object({
  search: z.string().max(100, 'Search query maksimal 100 karakter').optional(),
  status: z.enum(['ALL', 'SUBMITTED', 'GRADED', 'RESUBMITTED', 'UNSUBMITTED']).optional().default('ALL'),
  isLate: z.enum(['ALL', 'true', 'false']).optional().default('ALL'),
  page: z.coerce.number().int().min(1, 'Halaman minimal 1').default(1),
  limit: z.coerce.number().int().min(1, 'Limit minimal 1').max(100, 'Limit maksimal 100').default(20),
  sort: z.string().max(50).optional().default('submittedAt:desc'),
});

export const submissionFileSchema = z.object({
  name: z.string().min(1, 'Nama file wajib diisi').max(255),
  url: z.string().min(1, 'URL file wajib diisi'),
  mimeType: z.string().min(1, 'MimeType file wajib diisi').max(100),
  size: z.number().int().nonnegative('Ukuran file harus non-negatif'),
});

export const submitAssignmentSchema = z.object({
  siswaId: z.string().regex(objectIdRegex, 'siswaId harus berupa valid MongoDB ObjectId'),
  files: z.array(submissionFileSchema).min(1, 'Minimal satu file dilampirkan'),
  catatanSiswa: z.string().trim().max(2000, 'Catatan maksimal 2000 karakter').optional(),
  submittedAt: z.coerce.date().optional(),
});
