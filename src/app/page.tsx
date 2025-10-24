// "use client";
// import { useEffect, useState } from "react";
// import Link from "next/link";

// export default function Home() {
//   const [posts, setPosts] = useState<any[]>([]);
//   const [currentPage, setCurrentPage] = useState<number>(1);
//   const postsPerPage = 6;
  

//   useEffect(() => {
//     async function fetchPosts() {
//       try {
//         const res = await fetch("/api/posts");
//         const data = await res.json();

//         // ✅ Ensure we always store an array
//         if (Array.isArray(data)) {
//           setPosts(data);
//         // } else if (data? && Array.isArray(data)) {
//         //   // Some Drizzle queries return { rows: [...] }
//         //   setPosts(data.rows);
//         } 
//         else {
//           console.error("Unexpected API response format:", data);
//           setPosts([]);
//         }
//       } catch (error) {
//         console.error("Error fetching posts:", error);
//         setPosts([]);
//       }
//     }

//     fetchPosts();
//   }, []);

//   // ✅ Safety: ensure posts is an array
//   const allPosts = Array.isArray(posts) ? posts : [];
//   const recentPosts = allPosts.slice(0, 3);

//   // Pagination logic
//   const indexOfLastPost = currentPage * postsPerPage;
//   const indexOfFirstPost = indexOfLastPost - postsPerPage;
//   const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);
//   const totalPages = Math.ceil(allPosts.length / postsPerPage);


//   return (
//     <main className="min-h-screen py-12 px-6 bg-gray-50">
//       <div className="max-w-6xl mx-auto text-gray-900">
//         {/* Header */}
//         <header className="flex flex-col sm:flex-row justify-between items-center mb-10">
//           <h3 className="text-4xl font-bold tracking-tight mb-4 sm:mb-0">
//             Blog Dashboard
//           </h3>
//           <div className="flex gap-3">
//             <Link
//               href="/create"
//               className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
//             >
//               ➕ New Post
//             </Link>
//             <Link
//               href="/update"
//               className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition"
//             >
//               ✏️ Update
//             </Link>
//             <Link
//               href="/delete"
//               className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
//             >
//               🗑️ Delete
//             </Link>
//           </div>
//         </header>

//         {/* Recent Blog Posts */}
//         <section className="mb-16">
//           <h4 className="text-2xl font-semibold mb-6">Recent Blog Posts</h4>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {recentPosts.length > 0 ? (
//               recentPosts.map((post) => (
//                 <Link key={post.id} href={`/post/${post.id}`}>
//                   <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 space-y-3">
//                     {/* <p>{post.id}</p> */}
//                     {post.imageUrl && (
//                       <img
//                         src={post.imageUrl}
//                         alt={post.title}
//                         className="w-full h-40 object-cover rounded-lg"
//                       />
//                     )}
//                     <h3 className="text-xl font-bold hover:text-blue-600 transition">
//                       {post.title}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       {new Date(post.createdAt).toLocaleDateString()}
//                     </p>
//                     <p className="">{post.categories =="Tech"?
//                       <span className="bg-red-200 rounded-4xl p-2">{post.categories}</span>:
//                       <span className="">{post.categories=="Education"?
//                       <span className="bg-green-200 rounded-4xl p-2">{post.categories}</span>:
//                       <span className="">{post.categories=="News"?
//                       <span className="bg-blue-200 rounded-4xl p-2">{post.categories}</span>:
//                       <span className="bg-orange-300 rounded-4xl p-2">{post.categories}</span>
//                       }</span>
//                       }</span>}</p> &#8594;
//                   </div>
//                 </Link>
//               ))
//             ) : (
//               <p className="text-gray-500">No recent posts found.</p>
//             )}
//           </div>
//         </section>

//         {/* All Blog Posts */}
//         <section>
//           <h4 className="text-2xl font-semibold mb-6">All Blog Posts</h4>
//           <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
//             {currentPosts.length > 0 ? (
//               currentPosts.map((post) => (
//                 <Link key={post.id} href={`/post/${post.id}`}>
//                   <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 space-y-3">
//                     {/* <p>{post.id}</p> */}
            
//                     {post.imageUrl && (
//                       <img
//                         src={post.imageUrl}
//                         alt={post.title}
//                         className="w-full h-40 object-cover rounded-lg"
//                       />
//                     )}
//                     <h3 className="text-xl font-bold hover:text-blue-600 transition">
//                       {post.title}
//                     </h3>
//                     <p className="text-sm text-gray-500">
//                       {new Date(post.createdAt).toLocaleDateString()}
//                     </p>
//                     <p className="">{post.categories =="Tech"?
//                       <span className="bg-red-200 rounded-4xl p-2">{post.categories}</span>:
//                       <span className="">{post.categories=="Education"?
//                       <span className="bg-green-200 rounded-4xl p-2">{post.categories}</span>:
//                       <span className="">{post.categories=="News"?
//                       <span className="bg-blue-200 rounded-4xl p-2">{post.categories}</span>:
//                       <span className="bg-orange-300 rounded-4xl p-2">{post.categories}</span>
//                       }</span>
//                       }</span>}</p> &#8594;
//                   </div>
//                 </Link>
                
//               ))
//             ) : (
//               <p className="text-gray-500">No posts found.</p>
//             )}
//           </div>

//           {/* Pagination */}
//           <div className="flex justify-center items-center gap-4 mt-8">
//             <button
//               onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//               disabled={currentPage === 1}
//               className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
//             >
//               &#8592;
//             </button>

//             <span className="text-gray-700 font-medium">
//               Page {currentPage} of {totalPages}
//             </span>

//             <button
//               onClick={() =>
//                 setCurrentPage((prev) => Math.min(prev + 1, totalPages))
//               }
//               disabled={currentPage === totalPages}
//               className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
//             >
//               &#8594;
//             </button>
//           </div>
//         </section>
//       </div>
//     </main>
//   );
// }

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

//  Define the Post type according to your DB schema
type PostType = {
  id: number;
  title: string;
  content: string;
  imageUrl?: string;
  categories: string; // Single category string
  createdAt: string;
};

export default function Home() {
  const [posts, setPosts] = useState<PostType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const postsPerPage = 6;

  // Fetch posts from API
  useEffect(() => {
    async function fetchPosts() {
      try {
        const res = await fetch("/api/posts");
        const data: PostType[] = await res.json();

        if (Array.isArray(data)) setPosts(data);
        else setPosts([]);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setPosts([]);
      }
    }

    fetchPosts();
  }, []);

  const allPosts = Array.isArray(posts) ? posts : [];
  const recentPosts = allPosts.slice(0, 3);

  // Pagination logic
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = allPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(allPosts.length / postsPerPage);

  // Map category to color classes
  const getCategoryClass = (category: string) => {
    switch (category) {
      case "Tech":
        return "bg-red-200";
      case "Education":
        return "bg-green-200";
      case "News":
        return "bg-blue-200";
      default:
        return "bg-orange-300";
    }
  };

  return (
    <main className="min-h-screen py-12 px-6 bg-gray-50">
      <div className="max-w-6xl mx-auto text-gray-900">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-center mb-10">
          <h3 className="text-4xl font-bold tracking-tight mb-4 sm:mb-0">
            Blog Dashboard
          </h3>
          <div className="flex gap-3">
            <Link
              href="/create"
              className="px-4 py-2 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
            >
              ➕ New Post
            </Link>
            <Link
              href="/update"
              className="px-4 py-2 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition"
            >
              ✏️ Update
            </Link>
            <Link
              href="/delete"
              className="px-4 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white font-medium transition"
            >
              🗑️ Delete
            </Link>
          </div>
        </header>

        {/* Recent Blog Posts */}
        <section className="mb-16">
          <h4 className="text-2xl font-semibold mb-6">Recent Blog Posts</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentPosts.length > 0 ? (
              recentPosts.map((post) => (
                <Link key={post.id} href={`/post/${post.id}`}>
                  <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 space-y-3">
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    )}
                    <h3 className="text-xl font-bold hover:text-blue-600 transition">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                      <span
                        className={`${getCategoryClass(
                          post.categories
                        )} rounded-4xl p-2`}
                      >
                        {post.categories}
                      </span>
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No recent posts found.</p>
            )}
          </div>
        </section>

        {/* All Blog Posts */}
        <section>
          <h4 className="text-2xl font-semibold mb-6">All Blog Posts</h4>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {currentPosts.length > 0 ? (
              currentPosts.map((post) => (
                <Link key={post.id} href={`/post/${post.id}`}>
                  <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-4 space-y-3">
                    {post.imageUrl && (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-40 object-cover rounded-lg"
                      />
                    )}
                    <h3 className="text-xl font-bold hover:text-blue-600 transition">
                      {post.title}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {new Date(post.createdAt).toLocaleDateString()}
                    </p>
                    <p>
                      <span
                        className={`${getCategoryClass(
                          post.categories
                        )} rounded-4xl p-2`}
                      >
                        {post.categories}
                      </span>
                    </p>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">No posts found.</p>
            )}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center gap-4 mt-8">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
            >
              &#8592;
            </button>

            <span className="text-gray-700 font-medium">
              Page {currentPage} of {totalPages}
            </span>

            <button
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className="p-2 rounded-full bg-gray-200 hover:bg-gray-300 transition disabled:opacity-50"
            >
              &#8594;
            </button>
          </div>
        </section>
      </div>
    </main>
  );
}
