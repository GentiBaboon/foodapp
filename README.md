# Food Tracker App

This project is a small Next.js application for tracking food-related goals. It includes a login page and a dashboard with pages for viewing progress and setting monthly targets. The code lives inside the `pages/` directory of this repository.

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

   The app will be available at `http://localhost:3000`.

## Dashboard Pages

- **`/dashboard/progress`** – Displays a bar chart comparing your progress with your monthly targets.
- **`/dashboard/settings`** – Lets you configure monthly target values for sugar, carbs and alcohol.

Both pages use browser storage to persist your data locally.
