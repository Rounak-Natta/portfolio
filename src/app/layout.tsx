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
      <body className="bg-background text-foreground antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScroll>
            {/* 🔥 3D CURSOR */}
            <CustomCursor />

            {/* 🔥 NAVBAR */}
            <Navbar />

            {children}
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  );
}