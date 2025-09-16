import z from 'zod';

export const createSuperheroSchema = z.object({
  nickname: z.string().min(1, 'nickname is required'),
  realName: z.string().min(1, 'real name is required'),
  originDescription: z.string().optional(),
  catchPhrase: z.string().optional(),
  images: z.array(
    z.object({
      file: z.instanceof(File),
    })
  ),
  superpowers: z.array(
    z.object({
      name: z.string().min(1, 'name for superpower is required'),
    })
  ),
});

export type CreatesuperHeroFormData = z.infer<typeof createSuperheroSchema>;
