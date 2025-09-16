import z from 'zod';

export const editsuperheroTextFieldsSchema = z.object({
  nickname: z.string().min(1, 'nickname is required'),
  realName: z.string().min(1, 'real name is required'),
  originDescription: z.string().optional(),
  catchPhrase: z.string().optional(),
});

export type EditsuperheroTextFieldsFormData = z.infer<
  typeof editsuperheroTextFieldsSchema
>;
