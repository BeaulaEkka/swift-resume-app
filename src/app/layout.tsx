import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
} from "@clerk/nextjs";
import { ThemeProvider } from "next-themes";



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
      <html lang="en"suppressHydrationWarning>
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
          {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
