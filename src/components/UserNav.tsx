"use client";

import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

interface UserNavProps {
    email: string;
    avatarUrl?: string;
}

export default function UserNav({ email, avatarUrl }: UserNavProps) {
    const supabase = createClient();
    const router = useRouter();

    const handleSignOut = async () => {
        await supabase.auth.signOut();
        router.refresh();
    };

    return (
        <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-9 h-9 rounded-full ring-2 ring-indigo-500/30"
                    />
                ) : (
                    <div className="w-9 h-9 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center text-white text-sm font-bold">
                        {email.charAt(0).toUpperCase()}
                    </div>
                )}
                <span className="text-sm text-gray-400 hidden sm:block">{email}</span>
            </div>
            <button
                id="sign-out-button"
                onClick={handleSignOut}
                className="px-4 py-2 text-sm text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/10 rounded-lg transition-all duration-200 cursor-pointer"
            >
                Sign Out
            </button>
        </div>
    );
}
