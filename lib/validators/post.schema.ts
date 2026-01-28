import { z } from "zod";

export const PostSchema = z.object({
  title: z.string().min(2, "Zbyt krótki tytuł.").max(30, "Zbyt długi tytuł."),

  content: z
    .string()
    .min(20, "Post musi mieć przynajmniej 20 znaków.")
    .max(500, "Post jest za długi."),
});

export type PostInput = z.infer<typeof PostSchema>;
