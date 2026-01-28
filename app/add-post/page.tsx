"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { PostSchema } from "@/lib/validators/post.schema";
import { Alert, Button, CircularProgress, Snackbar } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddPost = () => {
  const router = useRouter();
  const [author, setAuthor] = useState("");
  const [content, setContent] = useState("");
  const [authorError, setAuthorError] = useState("");
  const [contentError, setContentError] = useState("");
  const [loading, setLoading] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const validateField = (field: "author" | "content", value: string) => {
    const result = PostSchema.shape[field].safeParse(value);

    if (!result.success) {
      field === "author"
        ? setAuthorError(result.error.issues[0].message)
        : setContentError(result.error.issues[0].message);
    } else {
      field === "author" ? setAuthorError("") : setContentError("");
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const result = PostSchema.safeParse({ author, content });
    if (!result.success) {
      validateField("author", author);
      validateField("content", content);
      return;
    }

    setLoading(true);

    await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(result.data),
    });

    setSnackbarOpen(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/feed");
    }, 3000);
  }

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
          sx={{ width: "100%" }}
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
        <div className="p-3 border-b border-gray-900">
          <input
            value={author}
            onChange={(e) => {
              setAuthor(e.target.value);
              validateField("author", e.target.value);
            }}
            placeholder="Wpisz nazwę użytkownika"
            className="w-full bg-transparent outline-none text-sm"
          />
          {authorError && (
            <p className="text-xs text-red-500 mt-1">{authorError}</p>
          )}
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
          {contentError && (
            <p className="text-xs text-red-500 mt-1">{contentError}</p>
          )}
        </div>
        <div className="p-3 border-t border-gray-900 flex justify-end">
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
