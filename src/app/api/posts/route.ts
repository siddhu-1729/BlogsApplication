import { NextRequest, NextResponse } from "next/server";
import { db } from "../../../lib/db";
import { Post } from "../../../lib/schema";
import { eq, desc } from "drizzle-orm";

// ✅ Type for POST body
type PostBody = {
  title: string;
  content: string;
  imageUrl?: string;
  categories: string; // Single category
};

// GET all posts or single post
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (id) {
      const result = await db.select().from(Post).where(eq(Post.id, Number(id)));
      if (result.length === 0)
        return NextResponse.json({ error: "Post not found" }, { status: 404 });
      return NextResponse.json(result[0]);
    } else {
      const allPosts = await db.select().from(Post).orderBy(desc(Post.createdAt));
      return NextResponse.json(allPosts);
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to fetch posts";
    console.error("GET Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// POST a new post
export async function POST(req: NextRequest) {
  try {
    const { title, content, imageUrl, categories }: PostBody = await req.json();

    const result = await db
      .insert(Post)
      .values({
        title,
        content,
        imageUrl,
        categories: categories || "Uncategorized",
        createdAt: new Date(),
      })
      .returning();

    return NextResponse.json(result[0]);
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create post";
    console.error("POST Error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// DELETE and PUT routes remain same as before

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
//  UPDATE a post
export async function PUT(req: NextRequest) {
  try {
    const { id, title, content, imageUrl, published } = await req.json();

    if (!id) {
      return NextResponse.json(
        { error: "Post ID is required" },
        { status: 400 }
      );
    }

    // Build the object of fields to update
    const fieldsToUpdate: Record<string, any> = {
      ...(title && { title }),
      ...(content && { content }),
      ...(imageUrl !== undefined && { imageUrl }),
      ...(published !== undefined && { published }),
      updatedAt: new Date(),
    };

    // Prevent empty updates
    if (Object.keys(fieldsToUpdate).length === 1) {
      // Only updatedAt is present, so no actual data update
      return NextResponse.json(
        { error: "No fields provided to update" },
        { status: 400 }
      );
    }

    const updated = await db
      .update(Post)
      .set(fieldsToUpdate)
      .where(eq(Post.id, Number(id)))
      .returning();

    if (updated.length === 0) {
      return NextResponse.json({ error: "Post not found" }, { status: 404 });
    }

    return NextResponse.json(updated[0]);
  } catch (error) {
    console.error("PUT Error:", error);
    return NextResponse.json(
      { error: "Failed to update post" },
      { status: 500 }
    );
  }
}
