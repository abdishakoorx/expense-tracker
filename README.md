Expense Tracker

Expense Tracker is a modern, full-stack application built with the latest technologies, designed for tracking expenses efficiently. This project is open to all, encouraging learning and collaboration.

⚙ Tech Stack

  1. Bun: A fast and efficient JavaScript runtime for powering the backend.
  2. TypeScript: Enhances JavaScript with static types, improving code quality and developer experience.
  3. Drizzle ORM: A lightweight, TypeScript-first ORM for seamless database interactions.
  4. Neon PostgreSQL: A serverless, scalable Postgres database solution with advanced features.
  5. Tailwind CSS: A utility-first CSS framework for crafting custom, responsive UIs quickly.
  6. Shadcn UI: A flexible, themable UI component library built on top of Tailwind CSS.
  7. Tanstack: A set of powerful tools for state management and data-fetching in React applications.
  8. Hono: An ultrafast web framework designed for Bun, perfect for building APIs.
  9. Fly.io: A global deployment platform that scales your app effortlessly.

Getting Started
Prerequisites

Before you begin, ensure you have the following installed on your local machine:

    Bun v1.1.18 or later
    Node.js
    Flyctl

Installation

    Clone the Repository:

    bash

git clone https://github.com/abdishakoorx/expense-tracker.git
cd expense-tracker

Install Dependencies:

Install all the necessary dependencies using Bun:

bash

bun install

Configure Environment Variables:

Create a .env file in the root directory by copying the provided example:

bash

    cp .env.example .env

    Update the .env file with your database credentials and any other necessary environment variables.

Database Setup

Expense Tracker uses Drizzle ORM with Neon PostgreSQL for database management. Make sure you have a Neon PostgreSQL instance set up.

    Run Database Migrations:

    Synchronize your database schema with the application models:

    bash

    bun run drizzle:sync

Running the Application

    Start the Development Server:

    bash

    bun run dev

    This will start the Hono server with live reloading enabled.

    Access the Application:

    Open your browser and navigate to http://localhost:3000 to start using the app.

Building for Production

    Build the Project:

    Prepare your application for deployment by running:

    bash

bun run build

Deploy to Fly.io:

Ensure your fly.toml configuration file is set up correctly, then deploy the application:

bash

    flyctl deploy

    Fly.io will handle the global deployment, ensuring your app is available with minimal latency worldwide.

Forking and Customizing

If you wish to use this project as a base for your own work:

    Fork the Repository:

    Fork this repository on GitHub to create your own copy.

    Clone Your Fork:

    bash

git clone https://github.com/yourusername/your-forked-repo.git
cd your-forked-repo

Make Your Changes:

Modify the code to suit your needs, whether it’s updating the UI with Shadcn UI components, changing the backend logic, or adding new features.

Push Your Changes:

Commit your changes and push them to your GitHub repository:

bash

    git add .
    git commit -m "Customized for my use case"
    git push origin main

    Deploy Your Custom Version:

    Use Fly.io or another deployment platform to host your customized application.


Additional Resources

  Bun Documentation
  Drizzle ORM Documentation
  Neon PostgreSQL Documentation
  Tailwind CSS Documentation
  Shadcn UI Documentation
  Tanstack Documentation
  Hono Documentation
  Fly.io Documentation

    

Credit

Inspiration for this project came from Sam Meech-Ward - https://www.youtube.com/@SamMeechWard. Check out the YouTube video (https://youtu.be/jXyTIQOfTTk?si=N_l96kmhTaGzD8xB) that inspired this project.
