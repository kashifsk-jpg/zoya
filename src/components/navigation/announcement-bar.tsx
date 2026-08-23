import { WHATSAPP_DISPLAY, WHATSAPP_HREF } from "@/lib/constants";

function WhatsAppGlyph() {
  return (
    <svg width="14" height="14" viewBox="0 0 18 18" fill="none" aria-hidden="true">
      <path
        d="M9 2.6a6.4 6.4 0 0 0-5.5 9.6L2.6 15.4l3.3-.9A6.4 6.4 0 1 0 9 2.6Z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path
        d="M6.7 6.4c.1-.3.3-.3.5-.3h.4c.1 0 .3 0 .4.3.2.4.6 1.3.6 1.4.1.1.1.3 0 .4l-.3.4c-.1.1-.2.2-.1.4.2.3.6.9 1.2 1.4.6.5 1 .6 1.2.7.2 0 .3 0 .4-.1l.4-.5c.1-.2.3-.2.4-.1l1.2.6c.1.1.2.1.2.3 0 .8-.3 1.3-1 1.5-.6.2-1.3.3-2.9-.6-1.5-.9-2.4-2.4-2.5-2.5-.1-.1-.8-1.1-.8-2.1s.5-1.5.6-1.6Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function AnnouncementBar() {
  return (
    <div className="fixed inset-x-0 top-20 z-50 flex h-8 items-center justify-center bg-ink text-alabaster sm:top-24 lg:top-28">
      <a
        href={WHATSAPP_HREF}
        target="_blank"
        rel="noreferrer"
        className="flex items-center gap-1.5 text-micro uppercase tracking-[0.1em]"
      >
        <WhatsAppGlyph />
        <span className="hidden sm:inline">WhatsApp: {WHATSAPP_DISPLAY}</span>
        <span className="sm:hidden">WhatsApp Us</span>
      </a>
    </div>
  );
}
