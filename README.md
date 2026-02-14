# 🔖 Smart Bookmark Manager

A stunning, real-time bookmark sanctuary built using **Next.js**, **Supabase**, and **Tailwind CSS**, developed through high-velocity **AI-Autonomous Pair Programming**.

---

## 🚀 High-Speed Development (AI-Powered)

This project was built in record time using **Antigravity**, a next-generation AI coding agent. 

### How it was built:
1.  **Project Architecting**: The AI generated the full project structure, choosing the most stable App Router patterns and Supabase SSR utilities.
2.  **Autonomous Logic**: The AI implemented complex features like **Supabase Realtime** and **RLS (Row Level Security)** policies from scratch.
3.  **Visual Excellence**: I asked the AI to "WOW" me with the design. It generated the custom mesh gradients, glassmorphism components, and the metallic shimmer button animations you see on the dashboard.
4.  **Self-Correction**: During the build, the AI detected Next.js 16 deprecated features (like `middleware.ts` moving to `proxy.ts`) and automatically performed the migration to keep the build clean.

---

## ✨ Features

- 🔑 **Google OAuth Only** – Seamless, secure login without passwords.
- ⚡ **Real-time Sync** – Add a bookmark in one tab, see it appear in another instantly.
- 🛡️ **Private & Secure** – Your bookmarks are yours alone. Row Level Security (RLS) ensures absolute privacy.
- 🎨 **Premium Aesthetics** – Stunning dark mode UI with interactive mesh gradients and shimmer effects.
- 🗑️ **Management** – One-click delete and instant favicon fetching for easy link identification.

---

## 🛠 Tech Stack

| Component | Technology |
| :--- | :--- |
| **Framework** | Next.js 16 (App Router) |
| **Backend** | Supabase (Auth, Postgres, Realtime) |
| **Styling** | Tailwind CSS v4 (Vanilla CSS + Mesh Gradients) |
| **Icons & Fonts** | Google Fonts (Inter) & Google Favicon Service |
| **Deployment** | Vercel |

---

## 🛠️ Setup Instructions

### 1. Environment Variables
Create a `.env.local` file in the root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 2. Database Schema
Run this in your **Supabase SQL Editor**:
```sql
CREATE TABLE public.bookmarks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  title TEXT NOT NULL,
  url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

-- Security Policies
CREATE POLICY "Users can view their own bookmarks" ON public.bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert their own" ON public.bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete their own" ON public.bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Enable Realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.bookmarks;
```

---

## 🧠 Development Insights & "AI Hacks"

### Challenge: Next.js 16 Deprecations
*   **Insight**: The `middleware.ts` convention was deprecated mid-development.
*   **Solution**: Moved logic to `proxy.ts` and updated the export to the new `proxy` function format, ensuring the app stays future-proof.

### Challenge: Real-time Across Tabs
*   **Insight**: Standard database queries don't update stale UI in other tabs.
*   **Solution**: Implemented Supabase Realtime `postgres_changes`. The logic intelligently merges live events (INSERT/DELETE) into the local React state without requiring a full page refresh.

---

