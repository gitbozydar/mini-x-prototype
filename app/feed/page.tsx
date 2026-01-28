"use client";

import { Avatar, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

interface Post {
  id: number;
  author: string;
  content: string;
  createdAt: string;
}

const Feed = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const API_URL = "/api/posts";

  const loadPosts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data: Post[] = await response.json();
      setPosts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full p-12">
      {loading && (
        <p>
          <CircularProgress color="inherit" />
        </p>
      )}

      {!loading && posts.length === 0 && <p>Brak postów.</p>}

      <div className="flex flex-col  w-full max-w-xl gap-10">
        {posts.map(({ author, content, createdAt, id }) => (
          <div key={id} className="border rounded-2xl border-gray-900 ">
            <div className="border-b border-gray-900 p-3 flex items-center gap-2">
              <Avatar /> {author}
            </div>
            <section className="text-sm p-3 border-b border-gray-900">
              {content}
            </section>
            <p className="p-3 text-sm">
              Dodano: {new Date(createdAt).toLocaleDateString()}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Feed;
