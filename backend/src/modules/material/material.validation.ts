import { z } from 'zod';

const objectIdRegex = /^[0-9a-fA-F]{24}$/;

export const objectIdSchema = z
  .string()
  .regex(objectIdRegex, 'ID harus berupa valid MongoDB ObjectId');

export const listMaterialsQuerySchema = z.object({
  search: z.string().max(100, 'Search query maksimal 100 karakter').optional(),
  babId: z.string().regex(objectIdRegex, 'babId harus berupa valid MongoDB ObjectId').optional(),
  tipe: z.enum(['TEXT', 'PDF', 'VIDEO', 'LINK', 'DOCUMENT']).optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
  page: z.coerce.number().int().min(1, 'Halaman minimal 1').default(1),
  limit: z.coerce.number().int().min(1, 'Limit minimal 1').max(50, 'Limit maksimal 50').default(10),
  sort: z.string().max(50).optional().default('urutan'),
});

const fileMetadataSchema = z.object({
  name: z.string().min(1, 'Nama file wajib diisi').max(255),
  url: z.string().min(1, 'URL file wajib diisi').url('URL file harus valid'),
  mimeType: z.string().min(1, 'MimeType wajib diisi').max(100),
  size: z.number().int().nonnegative('Ukuran file harus non-negatif'),
});

export const createMaterialSchema = z.object({
  judul: z.string().trim().min(1, 'Judul materi wajib diisi').max(200, 'Judul maksimal 200 karakter'),
  deskripsi: z.string().trim().max(2000, 'Deskripsi maksimal 2000 karakter').optional(),
  tipe: z.enum(['TEXT', 'PDF', 'VIDEO', 'LINK', 'DOCUMENT'], {
    required_error: 'Tipe materi wajib dipilih',
  }),
  babId: z.string().regex(objectIdRegex, 'babId harus berupa valid MongoDB ObjectId').optional(),
  konten: z.string().max(50000, 'Konten maksimal 50.000 karakter').optional(),
  file: fileMetadataSchema.optional(),
  urutan: z.number().int().nonnegative('Urutan tidak boleh negatif').optional(),
  status: z.enum(['draft', 'published', 'archived']).optional().default('draft'),
});

export const updateMaterialSchema = z.object({
  version: z.number().int().min(1, 'Version wajib disertakan untuk optimistic concurrency'),
  judul: z.string().trim().min(1, 'Judul materi wajib diisi').max(200, 'Judul maksimal 200 karakter').optional(),
  deskripsi: z.string().trim().max(2000, 'Deskripsi maksimal 2000 karakter').optional(),
  tipe: z.enum(['TEXT', 'PDF', 'VIDEO', 'LINK', 'DOCUMENT']).optional(),
  babId: z.string().regex(objectIdRegex, 'babId harus berupa valid MongoDB ObjectId').optional(),
  konten: z.string().max(50000, 'Konten maksimal 50.000 karakter').optional(),
  file: fileMetadataSchema.optional(),
  urutan: z.number().int().nonnegative('Urutan tidak boleh negatif').optional(),
  status: z.enum(['draft', 'published', 'archived']).optional(),
});
