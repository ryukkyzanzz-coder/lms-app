import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const objectIdSchema = z
  .string()
  .regex(objectIdRegex, 'ID harus berupa valid MongoDB ObjectId');

export const listAssignmentsQuerySchema = z.object({
  search: z.string().max(100, 'Search query maksimal 100 karakter').optional(),
  babId: z.string().regex(objectIdRegex, 'babId harus berupa valid MongoDB ObjectId').optional(),
  status: z.enum(['draft', 'published', 'closed']).optional(),
  deadlineFrom: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}/)).optional(),
  deadlineTo: z.string().datetime({ offset: true }).or(z.string().regex(/^\d{4}-\d{2}-\d{2}/)).optional(),
  page: z.coerce.number().int().min(1, 'Halaman minimal 1').default(1),
  limit: z.coerce.number().int().min(1, 'Limit minimal 1').max(50, 'Limit maksimal 50').default(10),
  sort: z.string().max(50).optional().default('deadline'),
});

const attachmentMetadataSchema = z.object({
  name: z.string().min(1, 'Nama file wajib diisi').max(255),
  url: z.string().min(1, 'URL file wajib diisi').url('URL file harus valid'),
  mimeType: z.string().min(1, 'MimeType wajib diisi').max(100),
  size: z.number().int().nonnegative('Ukuran file harus non-negatif'),
});

export const createAssignmentSchema = z.object({
  judul: z.string().trim().min(1, 'Judul tugas wajib diisi').max(200, 'Judul maksimal 200 karakter'),
  deskripsi: z.string().trim().min(1, 'Deskripsi tugas wajib diisi').max(5000, 'Deskripsi maksimal 5000 karakter'),
  instruksi: z.string().trim().max(10000, 'Instruksi maksimal 10.000 karakter').optional(),
  babId: z.string().regex(objectIdRegex, 'babId harus berupa valid MongoDB ObjectId').optional(),
  deadline: z.coerce.date({
    required_error: 'Batas waktu (deadline) wajib ditentukan',
    invalid_type_error: 'Format deadline tidak valid',
  }),
  maxScore: z.number().int().min(1, 'Nilai maksimal minimal 1').max(1000, 'Nilai maksimal 1000').optional().default(100),
  status: z.enum(['draft', 'published', 'closed']).optional().default('draft'),
  lampiran: z.array(attachmentMetadataSchema).optional(),
});

export const updateAssignmentSchema = z.object({
  version: z.number().int().min(1, 'Version wajib disertakan untuk optimistic concurrency'),
  judul: z.string().trim().min(1, 'Judul tugas wajib diisi').max(200, 'Judul maksimal 200 karakter').optional(),
  deskripsi: z.string().trim().min(1, 'Deskripsi tugas wajib diisi').max(5000, 'Deskripsi maksimal 5000 karakter').optional(),
  instruksi: z.string().trim().max(10000, 'Instruksi maksimal 10.000 karakter').optional(),
  babId: z.string().regex(objectIdRegex, 'babId harus berupa valid MongoDB ObjectId').optional(),
  deadline: z.coerce.date({ invalid_type_error: 'Format deadline tidak valid' }).optional(),
  maxScore: z.number().int().min(1, 'Nilai maksimal minimal 1').max(1000, 'Nilai maksimal 1000').optional(),
  status: z.enum(['draft', 'published', 'closed']).optional(),
  lampiran: z.array(attachmentMetadataSchema).optional(),
});
