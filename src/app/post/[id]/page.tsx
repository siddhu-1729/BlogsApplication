"use client";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";

interface Post {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  // published: boolean;
  createdAt: string;
}

export default function PostPage() {
  const params = useParams();
  const postId = params.id;
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPost() {
      try {
        const res = await fetch(`/api/posts?id=${postId}`);
        const data = await res.json();

        if (!data.error) {
          setPost(data);
        } else {
          console.error("Failed to fetch post:", data.error);
        }
      } catch (error) {
        console.error("Error fetching post:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchPost();
  }, [postId]);

  if (loading) return <p className="text-center mt-8">Loading...</p>;
  if (!post) return <p className="text-center mt-8">Post not found</p>;

  return (
    <main className="max-w-4xl mx-auto p-6">
      <Link href="/" className="text-blue-500 hover:underline mb-4 inline-block">
        ← Back to all posts
      </Link>

      <h1 className="text-3xl font-bold mb-4">{post.title}</h1>
      {post.imageUrl && (
        <img
          src={post.imageUrl}
          alt={post.title}
          className="w-full h-80 object-cover rounded-lg mb-6"
        />
      )}
      <p className="text-gray-700 mb-4">{post.content}</p>
      <p className="text-sm text-gray-500">
         {new Date(post.createdAt).toLocaleDateString()}
      </p>
    </main>
  );
}
