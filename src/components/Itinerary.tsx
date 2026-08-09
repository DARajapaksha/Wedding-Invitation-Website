const EVENTS = [
  {
    time: "4:00 PM",
    title: "Welcome Drinks",
    description: "Join us for a refreshing beverage before the ceremony begins.",
  },
  {
    time: "5:00 PM",
    title: "The Ceremony",
    description: "The exchange of vows at the Rosewood Garden.",
  },
  {
    time: "6:30 PM",
    title: "Cocktail Hour",
    description: "Canapés and signature cocktails on the terrace.",
  },
  {
    time: "8:00 PM",
    title: "Dinner & Dancing",
    description: "A night of celebration, good food, and great music in the Grand Pavilion.",
  },
];

export default function Itinerary() {
  return (
    <section className="bg-background px-6 py-24">
      <div className="mx-auto max-w-xl">
        <div className="mb-16 text-center">
          <h2 className="mb-4 font-serif text-3xl font-light text-foreground md:text-4xl">
            Order of Events
          </h2>
          <div className="mx-auto h-px w-16 bg-primary/40" />
        </div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute top-2 bottom-2 left-[27px] w-px bg-border md:left-1/2 md:-ml-[0.5px]" />

          <div className="space-y-12">
            {EVENTS.map((event, idx) => (
              <div
                key={event.title}
                className={`relative flex items-start gap-8 md:justify-between ${
                  idx % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-[24px] top-1 h-2 w-2 rounded-full bg-primary ring-4 ring-background md:left-1/2 md:-ml-1 md:top-2" />

                {/* Desktop time spacer */}
                <div className="hidden w-1/2 text-right md:block md:w-[calc(50%-3rem)]">
                  <p
                    className={`font-serif text-2xl italic text-primary ${
                      idx % 2 === 0 ? "text-left" : "text-right"
                    }`}
                  >
                    {event.time}
                  </p>
                </div>

                {/* Content */}
                <div
                  className={`flex-1 pl-16 md:w-[calc(50%-3rem)] md:flex-none md:pl-0 ${
                    idx % 2 === 0 ? "md:text-right" : "md:text-left"
                  }`}
                >
                  <p className="mb-2 block font-serif text-2xl italic text-primary md:hidden">
                    {event.time}
                  </p>
                  <h3 className="mb-3 font-serif text-2xl text-foreground">
                    {event.title}
                  </h3>
                  <p className="text-[13px] font-light leading-relaxed tracking-wide text-muted-foreground">
                    {event.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
