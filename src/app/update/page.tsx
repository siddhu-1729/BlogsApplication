"use client"
import { useState } from "react";
// import { useRouter } from "next/navigation";
export default function UpdatePage() {
  // const router = useRouter();
  const [postId, setPostId] = useState<number>(0);
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageUrl, setimageUrl] = useState<string>("");
    return (
      
    <div className="p-6 max-w-2xl mx-auto flex flex-col">
        <h4>Update the records based on the ID's</h4>
        <h1 className="text-2xl font-bold mb-4">Update a Post</h1>
        <input
            type="number"
            className="border p-2 rounded mb-4" 
            placeholder="Post ID"
            value={postId}
            onChange={(e) => setPostId(Number(e.target.value))}
            required
        />
        <input
            className="border p-2 rounded mb-4"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
        />
        <textarea
            className="border p-1 rounded mb-4"
            placeholder="Content"
            rows={5}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
        />
        <input type="file" name="imageUrl" value={imageUrl} className="file:mr-4 file:font-semibold w-full border-2 mb-2 file:bg-gray-400 rounded-2xl"
        onChange={(e)=>setimageUrl(e.target.value)}/>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => updatePost(postId, title, content)}
        >
          Update Post
        </button>
    </div>
  );
}

const updatePost = async (id: number, title: string, content: string) => {
  const res = await fetch(`/api/posts`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id, title, content }),
  });

  const data = await res.json();

  if (res.ok) {
    alert("Post updated successfully!");
  } else {
    alert(`Error: ${data.error}`);
  }
};
