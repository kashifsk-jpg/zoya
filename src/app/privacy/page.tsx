import type { Metadata } from "next";

export const metadata: Metadata = { title: "Privacy" };

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-24 md:px-10">
      <h1 className="font-serif text-h1">Privacy</h1>
      <p className="mt-6 text-body text-stone">
        Zoya Fashion is an educational visualization project. This build does not operate real accounts, does
        not process payment information, and does not transmit form submissions (including the newsletter
        signup and WhatsApp consultation links) to a live backend — all commerce state lives in your browser&rsquo;s
        local storage and can be cleared at any time by clearing your browser data.
      </p>
      <p className="mt-4 text-body text-stone">
        A production deployment would replace this page with a full privacy policy covering data collection,
        cookies, and third-party processors, in line with UAE and GCC data protection requirements.
      </p>
    </div>
  );
}
