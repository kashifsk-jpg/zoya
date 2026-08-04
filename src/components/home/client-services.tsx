import { WHATSAPP_HREF } from "@/lib/constants";

const SERVICES = [
  {
    title: "Personal Styling",
    description: "A one-to-one session to build a considered wardrobe across occasions, in person or by video.",
  },
  {
    title: "Custom Sizing",
    description: "Every Atelier piece can be measured to your specification, not just a standard size chart.",
  },
  {
    title: "Private Appointment",
    description: "Book a private fitting at our studio, outside regular hours, by request.",
  },
  {
    title: "WhatsApp Consultation",
    description: "Message our styling team directly for fabric, sizing or occasion guidance.",
  },
];

export function ClientServices() {
  return (
    <section className="bg-warm-ivory py-24">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10">
        <span className="text-label uppercase tracking-[0.14em] text-stone">Client Services</span>
        <h2 className="mt-4 max-w-lg font-serif text-display-l">Attention, extended beyond the piece.</h2>

        <div className="mt-14 grid grid-cols-1 gap-10 border-t border-ink/10 pt-10 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((service) => (
            <div key={service.title}>
              <h3 className="font-serif text-h3">{service.title}</h3>
              <p className="mt-3 text-body text-stone">{service.description}</p>
            </div>
          ))}
        </div>
        <a
          href={WHATSAPP_HREF}
          target="_blank"
          rel="noreferrer"
          className="group mt-10 inline-flex items-center gap-2 text-label uppercase tracking-[0.14em]"
        >
          <span className="border-b border-ink pb-0.5">Message us on WhatsApp</span>
          <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
        </a>
      </div>
    </section>
  );
}
