"use client";

import React from "react";

export default function PrivacyPolicy() {
  return (
    <main className="mx-auto max-w-4xl px-4 py-10 text-gray-800 dark:text-gray-100">
      <h1 className="mb-6 text-3xl font-bold text-blue-800 dark:text-blue-300">
        Privacy Policy
      </h1>

      <section className="space-y-6 text-base leading-7">
        <p>
          At Swift AI Resume Builder, your privacy is important to us. This
          policy outlines how we collect, use, and protect your personal
          information.
        </p>

        <div>
          <h2 className="mb-2 text-xl font-semibold">
            1. Information We Collect
          </h2>
          <p>
            We collect basic information when you register, such as your name
            and email address. If you choose to create and edit resumes, your
            resume data is stored securely.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">
            2. How We Use Your Information
          </h2>
          <p>
            We use your information to provide services, personalize your
            experience, improve our platform, and communicate with you about
            your account or updates.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">
            3. Third-party Services
          </h2>
          <p>
            We may use third-party tools (e.g., authentication, analytics) that
            handle your data in accordance with their privacy policies. These
            tools help us deliver a smoother experience.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">4. Data Security</h2>
          <p>
            We implement technical and organizational measures to safeguard your
            information. While we strive to protect your data, no system can
            guarantee absolute security.
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">5. Your Rights</h2>
          <p>
            You may access, correct, or delete your personal data by contacting
            us at{" "}
            <a
              href="mailto:support@swiftresume.ai"
              className="text-blue-600 hover:underline"
            >
              support@swiftresume.ai
            </a>
            .
          </p>
        </div>

        <div>
          <h2 className="mb-2 text-xl font-semibold">6. Policy Updates</h2>
          <p>
            We may update this privacy policy from time to time. We encourage
            you to review it periodically. Continued use of the service implies
            your acceptance of the updates.
          </p>
        </div>
      </section>
    </main>
  );
}
