ALTER TABLE "posts" RENAME TO "Post";--> statement-breakpoint
ALTER TABLE "Post" ADD COLUMN "imageUrl" text;--> statement-breakpoint
ALTER TABLE "Post" ADD COLUMN "createdAt" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "Post" ADD COLUMN "categories" text[] NOT NULL;--> statement-breakpoint
ALTER TABLE "Post" DROP COLUMN "image_url";--> statement-breakpoint
ALTER TABLE "Post" DROP COLUMN "published";--> statement-breakpoint
ALTER TABLE "Post" DROP COLUMN "created_at";