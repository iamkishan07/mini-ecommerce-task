import React from "react";
import Dashboard from "../pages/Dashboard";
import MainPage from "../pages/MainPage";

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-[#0b0b0b] text-white">
            <Dashboard />

            <main className="max-w-7xl mx-auto px-6 py-6">
                <MainPage />
            </main>
        </div>
    );
};

export default MainLayout;