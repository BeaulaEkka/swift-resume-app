import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t bg-gray-50 text-sm text-gray-600 dark:bg-gray-900 dark:text-gray-300">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:flex sm:items-center sm:justify-between">
        <div className="mb-4 sm:mb-0">
          <p className="font-semibold text-gray-700 dark:text-gray-100">
            © {new Date().getFullYear()} Swift AI Resume Builder. All rights
            reserved.
          </p>
        </div>

        <div className="flex flex-wrap gap-4">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:underline">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
