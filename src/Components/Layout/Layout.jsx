import React from "react";
import { Header } from "./Header";
import { Footer } from "./Footer"; // Import your Footer component

export function Layout({ children }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      <main className="flex-1 pt-4">
        <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 pb-8">
          {children}
        </div>
      </main>
      <Footer /> {/* Add the Footer component at the bottom */}
    </div>
  );
}
