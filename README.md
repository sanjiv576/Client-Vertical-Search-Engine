# Coventry Publications Vertical Search Engine (Client)

A beautifully designed, modern web application serving as the frontend interface for the Coventry Publications Vertical Search Engine. This project is built as part of a Master's degree assignment in Information Retrieval (IR). 

The search engine allows users to rapidly search through academic papers, journals, and authors, providing highly relevant results ranked by algorithmic scoring.

## 🚀 Live Demo & API
- **Live Frontend**: `https://assignment-cu-vse-client.vercel.app/`
- **Backend API**: `https://assignment-cu-publications-vse-api.onrender.com/search/`
- **Local API Environment**: `http://localhost:8000/search/`

---

## 🛠️ Tech Stack & Tools Used

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/) for robust data modeling and type safety.
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/) configured with a custom, premium dark-mode aesthetic.
- **Iconography**: [Lucide React](https://lucide.dev/) for unified, lightweight SVGs.

---

## 🏗️ Project Architecture

The application is structured using the **Next.js App Router** architecture, ensuring a fast, client-side navigational experience while keeping code strictly modular.

### Directory Structure:
- `src/app/page.tsx`: The primary landing page (View A). Acts as a Google-style, center-aligned search gateway.
- `src/app/search/page.tsx`: The core search engine interface (View B & C). Handles fetching, state management, pagination, and empty state rendering.
- `src/app/layout.tsx`: Global layout wrapper injecting the custom `Inter` font, dark-mode body styles, and the global application footer.
- `src/app/globals.css`: Global stylesheet defining CSS variables and Tailwind theme parameters.
- `src/types/index.ts`: Strongly-typed TypeScript interfaces mapping directly to the backend API models (`RankingResponse`, `AuthorModel`, etc.).

---

## ✨ Core Functionalities

### 1. High-Performance Search Execution
- Submits `POST` requests directly to the Python indexing backend.
- Captures query execution time locally using `performance.now()` to measure round-trip latency (displayed as e.g., `0.34 seconds`).

### 2. Intelligent Results Rendering
- Parses complex, nested JSON responses representing academic papers.
- Conditionally renders distinct UI elements based on data availability (e.g., hyperlinked titles, author links vs standard text).
- Visually distinguishes authors with external profiles using custom cyan-tinted link badges.
- Extracts and neatly formats metadata: Publish Date, Journal Name, Journal Volume, and Page Numbers.

### 3. Visual Relevance Scoring
- Converts the raw backend relevance score into a beautiful visual progress bar.
- Allows users to visually grasp the relevance tier of a given document at a glance.

### 4. Advanced Pagination
- Implements purely client-side pagination over the returned dataset.
- Safely slices the result array to render strictly **10 results per page**.
- Features an intelligent moving pagination window (1, 2, 3, 4, 5...) that adapts based on the current active page.

### 5. Graceful Empty States
- If the search engine finds zero matches, the UI transitions to a beautifully illustrated empty state (featuring a glowing telescope).
- Provides actionable search suggestions and spelling checks for the user.

---

## 💻 Local Setup & Development

First, clone the repository and navigate into the `client` directory.

### 1. Install Dependencies
```bash
npm install
```

### 2. Start the Development Server
```bash
npm run dev
```

### 3. Open the Application
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

---

## 👨‍💻 Developer

Developed by **Sanjiv Shrestha**  
*MSc Information Retrieval Assignment*
