import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Users } from "lucide-react";

export default function EventCard({ event }) {
  const isSoldOut = event.availableSeats === 0;
  const eventDate = new Date(event.date);
  const isPast = eventDate < new Date();

  return (
    <Link to={`/event/${event._id}`}>
      <Card className="group overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
        <div className="relative h-44 overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <Badge className="bg-primary text-primary-foreground">{event.category}</Badge>
            {isSoldOut && <Badge variant="destructive">Sold Out</Badge>}
            {isPast && <Badge variant="secondary">Past</Badge>}
          </div>
        </div>
        <CardContent className="p-4">
          <h3 className="mb-2 text-lg font-semibold leading-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            {event.name}
          </h3>
          <div className="flex flex-col gap-1 text-sm text-muted-foreground">
            <span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{eventDate.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
            <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{event.location}</span>
            <span className="flex items-center gap-1"><Users className="h-3.5 w-3.5" />{event.availableSeats} / {event.capacity} seats</span>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
