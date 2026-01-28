"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Alert, Button, CircularProgress, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useAuth } from "@/lib/context/AuthContext";
import { PostSchema } from "@/lib/validators/post.schema";

const AddPost = () => {
  const router = useRouter();
  const { user, isLoggedIn } = useAuth();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [titleError, setTitleError] = useState("");
  const [contentError, setContentError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) router.push("/login");
  }, [isLoggedIn, router]);

  const handleSnackbarClose = () => setSnackbarOpen(false);

  const validateField = (field: "title" | "content", value: string) => {
    const result = PostSchema.shape[field].safeParse(value);
    if (!result.success) {
      field === "title"
        ? setTitleError(result.error.issues[0].message)
        : setContentError(result.error.issues[0].message);
    } else {
      field === "title" ? setTitleError("") : setContentError("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    const result = PostSchema.safeParse({ title, content });
    if (!result.success) {
      validateField("title", title);
      validateField("content", content);
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...result.data, authorId: user.id }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert("Błąd: " + data.error);
        setLoading(false);
        return;
      }

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

  if (!isLoggedIn) return null;

  return (
    <div className="flex flex-col justify-center items-center w-full p-12">
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
          Post dodany!
        </Alert>
      </Snackbar>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-xl border border-gray-900 rounded-2xl"
      >
        <div className="border-b border-gray-900 p-3 text-lg font-semibold">
          Nowy post
        </div>

        <div className="p-3 text-sm text-gray-500">Autor: {user?.username}</div>
        <div className="p-3 border-b border-gray-900">
          <input
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              validateField("title", e.target.value);
            }}
            placeholder="Wpisz tytuł posta"
            className="w-full bg-transparent outline-none text-sm"
          />
        </div>

        <div className="p-3 border-gray-900">
          <textarea
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
              validateField("content", e.target.value);
            }}
            placeholder="Wprowadź treść..."
            rows={5}
            className="w-full bg-transparent outline-none resize-none text-sm"
          />
        </div>

        <div className="p-3 border-t border-gray-900 flex justify-between">
          <div className="flex gap-3">
            {titleError && (
              <p className="text-xs text-red-500 mt-1">{titleError}</p>
            )}
            {contentError && (
              <p className="text-xs text-red-500 mt-1">{contentError}</p>
            )}
          </div>

          <Button variant="contained" type="submit" color="success">
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              <AddIcon />
            )}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddPost;
