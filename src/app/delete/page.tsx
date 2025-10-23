"use client";
// import router from "next/navigation";
import React from "react";

export default function DeletePage() {
  const [postId, setPostId] = React.useState<number>(0);
    return (
    <div className="p-6 max-w-2xl mx-auto">
      <h4>By specifying the ID of a post you can delete the BLOG</h4>
        <h1 className="text-2xl font-bold mb-4">Delete a Post</h1>
        <input
          type="number"
          className="border p-2 rounded mb-4 mr-1"
            placeholder="Post ID"
            value={postId}
            onChange={(e) => setPostId(Number(e.target.value))}
            required
        />
        <button
          className="bg-red-600 text-white px-6 py-2 rounded"
          onClick={() => deletePost(postId)}
        >
          Delete Post
        </button>
    </div>
  );
}


const deletePost = async (id: number) => {
  const res = await fetch(`/api/posts?id=${id}`, { method: "DELETE" });
  const data = await res.json();
  if (res.ok) {
    alert(data.message);
    // refresh or redirect after deletion
    // router.push("/");
  } else {
    alert(data.error);
  }
};
