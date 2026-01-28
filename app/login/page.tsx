"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Alert, Button, CircularProgress, Snackbar } from "@mui/material";
import { LoginSchema } from "@/lib/validators/login.schema";
import Link from "next/link";
import { useAuth } from "@/lib/context/AuthContext";

const Login = () => {
  const router = useRouter();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const validateField = (field: "email" | "password", value: string) => {
    const result = LoginSchema.shape[field].safeParse(value);
    if (!result.success) {
      field === "email"
        ? setEmailError(result.error.issues[0].message)
        : setPasswordError(result.error.issues[0].message);
    } else {
      field === "email" ? setEmailError("") : setPasswordError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const result = LoginSchema.safeParse({ email, password });
    if (!result.success) {
      validateField("email", email);
      validateField("password", password);
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(result.data),
      });

      const data = await res.json();
      console.log(data);
      login(data.user);
      setSnackbarOpen(true);
      setTimeout(() => {
        setLoading(false);
        router.push("/feed");
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
          Logowanie udane!
        </Alert>
      </Snackbar>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl border border-gray-900 rounded-2xl"
      >
        <div className="border-b border-gray-900 p-3 text-lg font-semibold">
          Logowanie
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
              "Zaloguj"
            )}
          </Button>
        </div>
      </form>
      <Link className="text-sm" href={"/register"}>
        Nie masz konta? Zarejestruj się
      </Link>
    </div>
  );
};

export default Login;
