import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import {
  ClerkProvider,
  // SignedIn,
  // SignedOut,
  // SignInButton,
  // UserButton,
} from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/toaster";
import AppWrapper from "@/components/AppWrapper";
import Header from "@/components/Header";

const inter = Inter({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Swift Resume Builder",
  description: "AI ResumeBuilder",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={inter.className}>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {/* <SignedOut>
              <SignInButton />{" "}
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn> */}
            <AppWrapper>
              <Header />
              {children}
              <Toaster />{" "}
            </AppWrapper>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
