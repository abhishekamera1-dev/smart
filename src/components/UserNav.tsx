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
            <div className="flex items-center gap-3 group cursor-default">
                {avatarUrl ? (
                    <img
                        src={avatarUrl}
                        alt="Avatar"
                        className="w-10 h-10 rounded-full ring-2 ring-indigo-500/30 group-hover:ring-indigo-500/50 transition-all duration-300 object-cover"
                    />
                ) : (
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-base font-bold shadow-lg shadow-indigo-500/20 group-hover:scale-110 transition-all duration-300 rotate-3 group-hover:rotate-0">
                        {email.charAt(0).toUpperCase()}
                    </div>
                )}
                <div className="hidden sm:flex flex-col text-left">
                    <span className="text-sm font-semibold text-gray-200 group-hover:text-white transition-colors">
                        {email.split("@")[0]}
                    </span>
                    <span className="text-[10px] text-gray-500 font-medium tracking-wider uppercase">
                        Pro Account
                    </span>
                </div>
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
