const HomePage = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="container mx-auto px-4 py-16">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">
                        Welcome to Book Your Trip
                    </h1>
                    <p className="text-xl text-gray-600 mb-8">
                        Book your ultimate travel planning companion
                    </p>
                    <div className="space-x-4">
                        <a 
                            href="/dashboard" 
                            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Go to Dashboard
                        </a>
                        <a 
                            href="/all-users" 
                            className="inline-block bg-gray-600 text-white px-6 py-3 rounded-lg hover:bg-gray-700 transition-colors"
                        >
                            View Users
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage; 