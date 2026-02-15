import { useState, useEffect, useMemo } from "react";
import { mockEvents, mockRegistrations } from "@/lib/mockData";
import { registrationApi } from "@/lib/api";
import { useAuth, MOCK_MODE } from "@/context/AuthContext";
import EventCard from "@/components/EventCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function DashboardPage() {
  const { user } = useAuth();
  const [myEvents, setMyEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRegistrations = async () => {
      setLoading(true);
      try {
        if (MOCK_MODE) {
          const regEventIds = mockRegistrations.filter((r) => r.userId === "u1").map((r) => r.eventId);
          setMyEvents(mockEvents.filter((e) => regEventIds.includes(e._id)));
        } else {
          const regs = await registrationApi.getMyRegistrations();
          // Backend populates eventId with the full event object
          const events = regs.map((r) => r.eventId).filter(Boolean);
          setMyEvents(events);
        }
      } catch (err) {
        console.error("Failed to fetch registrations:", err);
        // Fallback to mock
        const regEventIds = mockRegistrations.filter((r) => r.userId === "u1").map((r) => r.eventId);
        setMyEvents(mockEvents.filter((e) => regEventIds.includes(e._id)));
      } finally {
        setLoading(false);
      }
    };
    fetchRegistrations();
  }, []);

  const now = new Date();
  const upcoming = useMemo(() => myEvents.filter((e) => new Date(e.date) >= now), [myEvents]);
  const past = useMemo(() => myEvents.filter((e) => new Date(e.date) < now), [myEvents]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Loading your events...</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>My Dashboard</h1>
      <p className="mt-1 text-muted-foreground">Welcome back, {user?.name}! Here are your registered events.</p>

      <Tabs defaultValue="upcoming" className="mt-8">
        <TabsList>
          <TabsTrigger value="upcoming">Upcoming ({upcoming.length})</TabsTrigger>
          <TabsTrigger value="past">Past ({past.length})</TabsTrigger>
        </TabsList>
        <TabsContent value="upcoming" className="mt-4">
          {upcoming.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">No upcoming events. <a href="/events" className="text-primary underline">Discover events</a></p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{upcoming.map((e) => <EventCard key={e._id} event={e} />)}</div>
          )}
        </TabsContent>
        <TabsContent value="past" className="mt-4">
          {past.length === 0 ? (
            <p className="py-12 text-center text-muted-foreground">No past events.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{past.map((e) => <EventCard key={e._id} event={e} />)}</div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
