"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Button, CircularProgress, Snackbar } from "@mui/material";
import { RegisterSchema } from "@/lib/validators/register.schema";
import Link from "next/link";

const Register = () => {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const validateField = (
    field: "username" | "email" | "password",
    value: string,
  ) => {
    const result = RegisterSchema.shape[field].safeParse(value);
    if (!result.success) {
      if (field === "username")
        setUsernameError(result.error.issues[0].message);
      if (field === "email") setEmailError(result.error.issues[0].message);
      if (field === "password")
        setPasswordError(result.error.issues[0].message);
    } else {
      if (field === "username") setUsernameError("");
      if (field === "email") setEmailError("");
      if (field === "password") setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = RegisterSchema.safeParse({ username, email, password });
    if (!result.success) {
      validateField("username", username);
      validateField("email", email);
      validateField("password", password);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      await res.json();

      setSnackbarOpen(true);
      setTimeout(() => {
        setLoading(false);
        router.push("/login");
      }, 1500);
    } catch {
      alert("Coś poszło nie tak!");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center w-full p-12 gap-4">
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
        >
          Rejestracja zakończona!
        </Alert>
      </Snackbar>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl border border-gray-900 rounded-2xl"
      >
        <div className="border-b border-gray-900 p-3 text-lg font-semibold">
          Rejestracja
        </div>

        <div className="p-3 border-b border-gray-900">
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              validateField("username", e.target.value);
            }}
            placeholder="Nazwa użytkownika"
            className="w-full bg-transparent outline-none text-sm"
          />
          {usernameError && (
            <p className="text-xs text-red-500 mt-1">{usernameError}</p>
          )}
        </div>

        <div className="p-3 border-b border-gray-900">
          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              validateField("email", e.target.value);
            }}
            placeholder="Email"
            type="email"
            className="w-full bg-transparent outline-none text-sm"
          />
          {emailError && (
            <p className="text-xs text-red-500 mt-1">{emailError}</p>
          )}
        </div>

        <div className="p-3 border-gray-900">
          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              validateField("password", e.target.value);
            }}
            placeholder="Hasło"
            type="password"
            className="w-full bg-transparent outline-none text-sm"
          />
          {passwordError && (
            <p className="text-xs text-red-500 mt-1">{passwordError}</p>
          )}
        </div>

        <div className="p-3 border-t border-gray-900 flex justify-end">
          <Button variant="contained" type="submit" color="success">
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Zarejestruj"
            )}
          </Button>
        </div>
      </form>
      <Link className="text-sm" href={"/login"}>
        Masz już konto? Zaloguj się
      </Link>
    </div>
  );
};

export default Register;
