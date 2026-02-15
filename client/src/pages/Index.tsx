import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { CalendarDays, Search, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex min-h-[85vh] flex-col">
      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 text-center">
        <div className="mx-auto max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border bg-card px-4 py-1.5 text-sm text-muted-foreground">
            <CalendarDays className="h-4 w-4 text-primary" /> Event Management Platform
          </div>
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
            Discover & Join <br />
            <span className="text-primary">Amazing Events</span>
          </h1>
          <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
            Browse upcoming events, register with one click, and manage all your bookings from a single dashboard.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link to="/events">
              <Button size="lg" className="text-base">
                <Search className="mr-2 h-5 w-5" /> Browse Events
              </Button>
            </Link>
            <Link to="/register">
              <Button size="lg" variant="outline" className="text-base">
                <Users className="mr-2 h-5 w-5" /> Create Account
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features strip */}
      <section className="border-t bg-card">
        <div className="mx-auto grid max-w-4xl gap-6 px-4 py-10 sm:grid-cols-3">
          {[
            { icon: Search, title: "Search & Filter", desc: "Find events by name, category, or location" },
            { icon: CalendarDays, title: "One-Click Register", desc: "Secure your spot instantly" },
            { icon: Users, title: "Personal Dashboard", desc: "Track upcoming and past events" },
          ].map((f) => (
            <div key={f.title} className="flex flex-col items-center text-center">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <f.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{f.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
