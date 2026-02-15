import { useState, useEffect, useMemo } from "react";
import { mockEvents } from "@/lib/mockData";
import { eventsApi } from "@/lib/api";
import { MOCK_MODE } from "@/context/AuthContext";
import EventCard from "@/components/EventCard";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search } from "lucide-react";

export default function EventsPage() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [location, setLocation] = useState("all");

  useEffect(() => {
    const fetchEvents = async () => {
      setLoading(true);
      try {
        if (MOCK_MODE) {
          setEvents(mockEvents);
        } else {
          const data = await eventsApi.getAll();
          setEvents(data);
        }
      } catch (err) {
        console.error("Failed to fetch events:", err);
        // Fallback to mock data if backend is unreachable
        setEvents(mockEvents);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const categories = useMemo(() => Array.from(new Set(events.map((e) => e.category))), [events]);
  const locations = useMemo(() => Array.from(new Set(events.map((e) => e.location))), [events]);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) || e.description.toLowerCase().includes(search.toLowerCase());
      const matchCat = category === "all" || e.category === category;
      const matchLoc = location === "all" || e.location === location;
      return matchSearch && matchCat && matchLoc;
    });
  }, [events, search, category, location]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Loading events...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Discover Events</h1>
        <p className="mt-1 text-muted-foreground">Find and register for upcoming events</p>
      </div>

      <div className="mb-6 flex flex-col gap-3 sm:flex-row">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Search events..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9" />
        </div>
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-44"><SelectValue placeholder="Category" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((c) => <SelectItem key={c} value={c}>{c}</SelectItem>)}
          </SelectContent>
        </Select>
        <Select value={location} onValueChange={setLocation}>
          <SelectTrigger className="w-full sm:w-44"><SelectValue placeholder="Location" /></SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            {locations.map((l) => <SelectItem key={l} value={l}>{l}</SelectItem>)}
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <div className="py-20 text-center text-muted-foreground">No events found matching your criteria.</div>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((event) => <EventCard key={event._id} event={event} />)}
        </div>
      )}
    </div>
  );
}
