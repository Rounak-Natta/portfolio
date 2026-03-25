import "./globals.css";
import { ThemeProvider } from "next-themes";
import SmoothScroll from "@/components/SmoothScroll";
import Navbar from "@/components/Navbar";
import CustomCursor from "@/components/CustomCursor";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Remix Icons */}
        <link
          href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
          rel="stylesheet"
        />
      </head>

      <body className="bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {/* 🎯 Global Cursor */}
          <CustomCursor />

          {/* 🎯 Navbar */}
          <Navbar />

          {/* 🔥 MAIN WRAPPER (IMPORTANT FIX) */}
          <SmoothScroll>
            <main >
              {children}
            </main>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}