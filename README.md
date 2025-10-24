# BlogsApplication

## Tech Stack Used in this Application is 
  - Next.js , Tailwind CSS , PostgreSQL , TypeScript
  - for database interactions used Drizzle ORM (Object Relational Mapping)
  
## Features Implemented
  - A Create section for everyone to publish a along with image rendering, so that they can add images for the post
  - Update section for them to update the post based on the ID (for clean UI ID has't displayed in UI)
  - Delete Section for them to delete the post


 # How to Run this Application Locally 
 - you can download the ZIP file from this Repo or Clone the respository into your local Folder by using the following Command:
   git clone https://github.com/siddhu-1729/BlogsApplication.git 
 -After getting the project into your local folder install the required modules 
   npm install 

# Databse Setup 
- Install postgreSQL into your machine by the follwing link https://www.enterprisedb.com/downloads/postgres-postgresql-downloads
- Now create a server within the posgreSQL and a database named Blogs (I have used in this project)
- Check in Package.json file for the dependency drizzle-orm  "drizzle-orm": "^0.44.6",
  if you don't have just install drizzle orm by the command : npm install -D drizzle-kit (in your projects terminal)
  Now update the schema.ts file with all the required fields

RUN the migrations with the commands :
   - npx drizzle-kit generate
   - npx drizzle-kit  push (By this a table will be ready in your database{postgres})
Don't forget to update the .env file with database Credentials of yours.

# Run the dev 
  - by using the command : npm run dev


