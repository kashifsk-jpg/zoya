"use client";

import { useId, useState } from "react";

export function NewsletterForm() {
  const [status, setStatus] = useState<"idle" | "submitted">("idle");
  const id = useId();

  if (status === "submitted") {
    return <p className="mt-6 max-w-xs text-body">You&rsquo;re on the list. Welcome to Zoya Fashion.</p>;
  }

  return (
    <form
      className="mt-6 flex max-w-xs border-b border-ink/20 pb-2"
      onSubmit={(event) => {
        event.preventDefault();
        setStatus("submitted");
      }}
      aria-label="Newsletter signup"
    >
      <label htmlFor={id} className="sr-only">
        Email address
      </label>
      <input
        id={id}
        type="email"
        required
        placeholder="Email address"
        className="w-full bg-transparent text-body outline-none placeholder:text-stone/70"
      />
      <button type="submit" className="text-label uppercase tracking-[0.1em]" aria-label="Subscribe">
        Join
      </button>
    </form>
  );
}
