export default function AuthCodeError() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950">
            <div className="text-center p-8">
                <h1 className="text-2xl font-bold text-red-400 mb-4">Authentication Error</h1>
                <p className="text-gray-400 mb-6">
                    Something went wrong during sign in. Please try again.
                </p>
                <a
                    href="/"
                    className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 transition-colors font-medium"
                >
                    Go Back Home
                </a>
            </div>
        </div>
    );
}
