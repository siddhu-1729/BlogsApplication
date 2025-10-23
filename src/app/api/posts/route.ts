import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db"; 
import { Post } from "../../../lib/schema"; 
import { eq, desc } from "drizzle-orm";

//  GET all posts

 export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      // Fetch single post
      const result = await db.select().from(Post).where(eq(Post.id, Number(id)));
      if (result.length === 0) {
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      }
      return NextResponse.json(result[0]);  // Return single post object
    } else {
      // Fetch all posts
      const allPosts = await db.select().from(Post).orderBy(desc(Post.createdAt));
      return NextResponse.json(allPosts);  // Return array of posts
    }
  } catch (error: any) {
    console.error("GET Error:", error);
    return NextResponse.json({ error: error.message || "Failed to fetch posts" }, { status: 500 });
  }
}



//  POST a new post
export async function POST(req: NextRequest) {
  try {
    const { title, content, imageUrl,categories } = await req.json();

    const result = await db
      .insert(Post)
      .values({
        title,
        content,
        imageUrl,
        createdAt: new Date(), //  ensure timestamp of data
        categories: categories?.length ? categories : [],
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error) {
    console.error("POST Error:", error);
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}

//  DELETE a post
export async function DELETE(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const deleted = await db.delete(Post).where(eq(Post.id, Number(id))).returning();

    if (deleted.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error("DELETE Error:", error);
    return NextResponse.json({ error: "Failed to delete post" }, { status: 500 });
  }
}

//  UPDATE a post
export async function PUT(req: NextRequest) {
  try {
    const { id, title, content, imageUrl, published } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Post ID is required" }, { status: 400 });
    }

    const updated = await db
      .update(Post)
      .set({
        ...(title && { title }),
        ...(content && { content }),
        ...(imageUrl !== undefined && { imageUrl }),
        ...(published !== undefined && { published }),
        updatedAt: new Date(), // ✅ optional: track modification time
      })
      .where(eq(Post.id, Number(id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json({ error: "Failed to update post" }, { status: 500 });
  }
}
