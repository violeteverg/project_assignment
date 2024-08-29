
# Project Assignment Expense Tracker

## Installation

1.Installation:

```bash
    git clone https://github.com/yourusername/yourprojectname.git
    cd yourprojectname
```

2.Install dependencies:

Make sure you have Node.js installed, then run:
```bash
    npm install
```


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`DATABASE_URL="postgresql://user:password@localhost:5432/yourdatabase"`

`JWT_SECRET="your_jwt_secret_key"`



## Database setup


   1. **Set Up Neon Database**

      Sign up or log in to [Neon](https://neon.tech) and create a PostgreSQL database instance. Obtain the connection string from the Neon dashboard.

   2. **Update `.env` File**

      In your project, configure the database connection in the `.env` file as follows:

      ```env
      DATABASE_URL="postgresql://username:password@hostname:port/dbname?schema=public"
      JWT_SECRET="your_jwt_secret"


   3. **Update Prisma Configuration**

      Prisma uses the `DATABASE_URL` from your `.env` file to connect to the database. Ensure your `prisma/schema.prisma` file is configured to use PostgreSQL:

      ```prisma
      datasource db {
        provider = "postgresql"
        url      = env("DATABASE_URL")
      }

      generator client {
        provider = "prisma-client-js"
      }
      ```

   4. **Push Prisma Schema to Database**

      If you have already defined your Prisma models and you just want to sync them with your database, you can use the `npx prisma db push` command. This command pushes your Prisma schema to the database, creating or updating tables and columns as defined in your Prisma schema.

      ```bash
      npx prisma db push
      ```

      This command is useful when you have already created the schema and just need to ensure that the database schema matches the Prisma schema without creating migration files.


## Running the Application
Development
To start the development server, run:

```bash
    npm run dev
```
The application will be available at http://localhost:3000.

## Live Development

You can view the live deployment of this application at the following link:

[Project Assignment](project-assignment-sooty.vercel.app)

This link will direct you to the live version of the application, where you can explore all the features and functionality in a production environment.
