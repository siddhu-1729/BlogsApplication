CREATE TABLE "posts" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" text NOT NULL,
	"image_url" text,
	"published" boolean DEFAULT false,
	"created_at" timestamp DEFAULT now() NOT NULL
);
