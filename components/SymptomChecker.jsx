'use client';

import SymptomChecker from '../../../components/SymptomChecker';

export default function CheckerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-blue-500 flex items-center justify-center font-sans">
      <main className="w-full flex items-center justify-center">
        <section className="bg-white/90 shadow-2xl rounded-3xl px-6 py-8 max-w-lg w-full animate-fade-in">
          <h1 className="text-3xl md:text-4xl font-extrabold text-blue-700 text-center mb-2 tracking-tight drop-shadow">
            🩺 Symptom Checker
          </h1>
          <p className="text-center text-gray-700 mb-6 text-base md:text-lg">
            Get quick insights into possible conditions based on your symptoms.<br />
            <span className="block text-sm text-red-500 mt-1">
              (This tool does not replace professional medical advice.)
            </span>
          </p>
          <SymptomChecker />
        </section>
      </main>
      <style jsx global>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(30px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-fade-in {
          animation: fade-in 1s;
        }
      `}</style>
    </div>
  );
}