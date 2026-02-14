import { createClient } from "@/lib/supabase/server";
import LoginButton from "@/components/LoginButton";
import AddBookmarkForm from "@/components/AddBookmarkForm";
import BookmarkList from "@/components/BookmarkList";
import UserNav from "@/components/UserNav";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Not logged in — show landing page
  if (!user) {
    return (
      <main className="min-h-screen bg-mesh relative overflow-hidden flex items-center justify-center">
        {/* Decorative elements */}
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 rounded-full blur-[120px] animate-float" />
        <div
          className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[120px] animate-float"
          style={{ animationDelay: "3s" }}
        />

        <div className="relative z-10 w-full max-w-5xl px-6 py-20 flex flex-col items-center">
          <div className="animate-fade-in text-center flex flex-col items-center">
            {/* Logo Group */}
            <div className="mb-12 relative">
              <div className="w-24 h-24 rounded-[2rem] bg-gradient-to-br from-indigo-500 via-indigo-600 to-purple-700 flex items-center justify-center shadow-[0_0_50px_-12px_rgba(99,102,241,0.5)] rotate-6 hover:rotate-0 transition-all duration-700 ease-out cursor-default group">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white drop-shadow-lg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                  />
                </svg>
              </div>
              <div className="absolute -inset-4 bg-indigo-500/20 blur-2xl rounded-full -z-10 group-hover:bg-indigo-500/30 transition-colors duration-700" />
            </div>

            {/* Headline */}
            <h1 className="text-6xl sm:text-7xl md:text-8xl font-black mb-8 leading-[1.1] tracking-tight">
              <span className="bg-gradient-to-b from-white to-gray-400 bg-clip-text text-transparent">
                Keep your
              </span>
              <br />
              <span className="bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                best links.
              </span>
            </h1>

            <p className="text-xl sm:text-2xl text-gray-400/80 mb-12 max-w-xl mx-auto leading-relaxed font-medium">
              A private, real-time sanctuary for your digital discoveries.
              <span className="text-gray-200"> No noise, just your bookmarks.</span>
            </p>

            {/* Action Group */}
            <div className="flex flex-col items-center gap-8 mb-16 w-full">
              <LoginButton />

              {/* Feature Chips */}
              <div className="flex flex-wrap justify-center gap-3">
                {[
                  { icon: "🛡️", text: "Private" },
                  { icon: "⚡", text: "Instant Sync" },
                  { icon: "✨", text: "Beautiful UI" },
                ].map((feature) => (
                  <div
                    key={feature.text}
                    className="flex items-center gap-2 px-5 py-2.5 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-sm font-semibold text-gray-400 hover:bg-white/[0.06] hover:text-gray-200 transition-all duration-300"
                  >
                    <span>{feature.icon}</span>
                    <span>{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-sm font-medium text-gray-600 flex items-center gap-2">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              Secure Google Authentication
            </p>
          </div>
        </div>
      </main>
    );
  }

  // Logged in — show dashboard
  return (
    <main className="min-h-screen bg-mesh">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-950/80 border-b border-white/5">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/20">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                />
              </svg>
            </div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
              Smart Bookmark
            </h1>
          </div>
          <UserNav
            email={user.email || ""}
            avatarUrl={user.user_metadata?.avatar_url}
          />
        </div>
      </header>

      {/* Dashboard */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 animate-fade-in">
        {/* Add Bookmark Section */}
        <section className="mb-8">
          <div className="p-6 bg-white/[0.02] border border-white/[0.06] rounded-2xl backdrop-blur-sm">
            <h2 className="text-lg font-semibold text-gray-200 mb-4 flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-indigo-400"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                  clipRule="evenodd"
                />
              </svg>
              Add New Bookmark
            </h2>
            <AddBookmarkForm userId={user.id} />
          </div>
        </section>

        {/* Bookmarks List Section */}
        <section>
          <BookmarkList userId={user.id} />
        </section>
      </div>
    </main>
  );
}
