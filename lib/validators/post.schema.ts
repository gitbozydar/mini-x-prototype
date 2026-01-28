import { z } from "zod";

export const PostSchema = z.object({
  author: z.string().min(2, "Zbyt krótka nazwa.").max(30, "Za długa nazwa."),

  content: z
    .string()
    .min(20, "Post musi mieć przynajmniej 20 znaków.")
    .max(500, "Post jest za długi."),
});

export type PostInput = z.infer<typeof PostSchema>;
