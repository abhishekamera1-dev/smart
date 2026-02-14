"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

interface AddBookmarkFormProps {
    userId: string;
}

export default function AddBookmarkForm({ userId }: AddBookmarkFormProps) {
    const [url, setUrl] = useState("");
    const [title, setTitle] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const supabase = createClient();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!url.trim() || !title.trim()) return;

        setLoading(true);
        setError(null);

        try {
            const { error: insertError } = await supabase
                .from("bookmarks")
                .insert({
                    url: url.trim(),
                    title: title.trim(),
                    user_id: userId,
                });

            if (insertError) throw insertError;

            setUrl("");
            setTitle("");
        } catch (err: unknown) {
            const message = err instanceof Error ? err.message : "Failed to add bookmark";
            setError(message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4" id="add-bookmark-form">
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 group relative">
                    <input
                        id="bookmark-title-input"
                        type="text"
                        placeholder="Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:bg-white/[0.06] transition-all duration-300"
                        required
                    />
                </div>
                <div className="flex-[2] group relative">
                    <input
                        id="bookmark-url-input"
                        type="url"
                        placeholder="Paste your URL here..."
                        value={url}
                        onChange={(e) => setUrl(e.target.value)}
                        className="w-full px-5 py-4 bg-white/[0.03] border border-white/[0.08] rounded-2xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/40 focus:bg-white/[0.06] transition-all duration-300"
                        required
                    />
                </div>
                <button
                    id="add-bookmark-button"
                    type="submit"
                    disabled={loading}
                    className="px-8 py-4 bg-white text-gray-950 rounded-2xl font-bold hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:scale-[1.03] active:scale-[0.97] shadow-xl shadow-indigo-500/10 whitespace-nowrap cursor-pointer flex items-center justify-center min-w-[140px]"
                >
                    {loading ? (
                        <div className="flex items-center gap-2">
                            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            <span>Saving...</span>
                        </div>
                    ) : (
                        <span className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                            </svg>
                            Save Link
                        </span>
                    )}
                </button>
            </div>
            {error && (
                <p className="text-red-400 text-sm font-medium animate-fade-in pl-2" id="bookmark-error">
                    ⚠️ {error}
                </p>
            )}
        </form>
    );
}
