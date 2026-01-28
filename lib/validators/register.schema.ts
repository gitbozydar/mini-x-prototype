import { z } from "zod";

export const RegisterSchema = z.object({
  username: z
    .string()
    .min(3, "Nazwa użytkownika musi mieć co najmniej 3 znaki")
    .max(20, "Nazwa użytkownika nie może mieć więcej niż 20 znaków"),
  email: z.string().email("Nieprawidłowy adres email"),
  password: z
    .string()
    .min(6, "Hasło musi mieć co najmniej 6 znaków")
    .max(100, "Hasło nie może być dłuższe niż 100 znaków"),
});
