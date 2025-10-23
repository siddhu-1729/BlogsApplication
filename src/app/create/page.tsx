"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CreatePost() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const categories = ["All", "Tech", "Lifestyle", "News", "Education"];


  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await fetch("/api/posts", {
      method: "POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({ title, content ,imageUrl ,categories}),
    });
    router.push("/");
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-3xl">
        <div className="bg-white shadow-xl rounded-2xl border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-r from-amber-500 to-orange-600 px-8 py-6">
            <h2 className="text-3xl font-serif font-semibold text-white text-center">
               Create Your Blog Post
            </h2>
          </div>

          {/* Form Content */}
          <div className="px-8 py-10 space-y-8">
            {/* Title */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">
                Post Title
              </label>
              <input
                type="text"
                className="w-full border-2 border-gray-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 
                         rounded-lg px-4 py-3 outline-none text-gray-800 font-medium placeholder-gray-400 
                         transition-all duration-200"
                placeholder="Enter an engaging title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">
                Content
              </label>
              <textarea
                className="w-full border-2 border-gray-300 focus:border-amber-500 focus:ring-4 focus:ring-amber-100 
                         rounded-lg px-4 py-3 outline-none text-gray-700 leading-relaxed placeholder-gray-400 
                         transition-all duration-200 resize-none"
                placeholder="Start writing your story..."
                rows={10}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                required
              />
            </div>

            {/* Image Upload */}
            <div>
              <label className="block text-gray-700 font-semibold mb-3 text-sm uppercase tracking-wide">
                Cover Image
              </label>
              <input
                type="file"
                name="imageUrl"
                accept="image/*"
                className="w-full border-2 border-gray-300 rounded-lg px-3 py-2.5 text-sm cursor-pointer
                         file:mr-4 file:py-2.5 file:px-5 file:rounded-lg file:border-0 file:text-sm 
                         file:font-semibold file:bg-amber-600 file:text-white hover:file:bg-amber-700 
                         file:cursor-pointer file:transition-all file:duration-200
                          focus:ring-4 focus:ring-amber-100 outline-none transition-all duration-200"
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 pt-6">
              {/* Submit Button */}
              <button
                type="button"
                onClick={handleSubmit}
                className="w-full bg-linear-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 
                         text-white font-semibold py-4 rounded-lg shadow-lg hover:shadow-xl 
                         transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]
                         flex items-center justify-center gap-2"
              >
                Publish Post ✨
              </button>
            </div>
            <div className="mb-6">
  <label className="mr-2 font-medium">Filter by Category:</label>
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    className="border rounded px-2 py-1"
  >
    {categories.map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
  </select>
</div>
          </div>

          {/* Footer */}
          <div className="bg-gray-50 px-8 py-5 border-t border-gray-200">
            <p className="text-center text-gray-600 text-sm italic">
              "Your words matter — share them with the world."
            </p>
          </div>
        </div>
      </div>
    </div>


  );
}
