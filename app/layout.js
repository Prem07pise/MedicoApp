import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/header";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "sonner";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata = {
  title: "Medico Friend",
  description: "Medico Friend is a platform for doctors & patients to connect with each other.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider appearance={{
      baseTheme: "dark",
    }}
    >
      <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >

        {/* Header */}
        <Header />

        <main className="min-h-screen">
          {children}
        </main>
        <Toaster richColors />

        {/* Footer */}
        <footer className="bg-muted/50 py-6">
          <div className="container mx-auto px-4 text-center text-gray-500">
            <p>Made with ❤️ by Medico Friend</p>
          </div>
        </footer>

      </body>
    </html>
    </ClerkProvider>
    
  );
}
