import { useParams, useNavigate } from "react-router-dom";
import { mockEvents, mockRegistrations } from "@/lib/mockData";
import { eventsApi, registrationApi } from "@/lib/api";
import { useAuth, MOCK_MODE } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { toast } from "sonner";
import { useState, useEffect } from "react";
import { CalendarDays, MapPin, Users, ArrowLeft, Building2 } from "lucide-react";

export default function EventDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registered, setRegistered] = useState(false);
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      setLoading(true);
      try {
        if (MOCK_MODE) {
          const found = mockEvents.find((e) => e._id === id);
          setEvent(found || null);
          setRegistered(mockRegistrations.some((r) => r.eventId === id && r.userId === "u1"));
        } else {
          const data = await eventsApi.getById(id);
          setEvent(data);
          // Check registration status
          if (user) {
            try {
              const regs = await registrationApi.getMyRegistrations();
              const isReg = regs.some((r) => (r.eventId?._id || r.eventId) === id);
              setRegistered(isReg);
            } catch {
              setRegistered(false);
            }
          }
        }
      } catch (err) {
        console.error("Failed to fetch event:", err);
        // Fallback to mock
        const found = mockEvents.find((e) => e._id === id);
        setEvent(found || null);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id, user]);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-muted-foreground">Loading event...</p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-20 text-center">
        <h2 className="text-2xl font-bold">Event not found</h2>
        <Button variant="outline" className="mt-4" onClick={() => navigate("/events")}>Back to Events</Button>
      </div>
    );
  }

  const isSoldOut = event.availableSeats === 0;
  const isPast = new Date(event.date) < new Date();

  const handleRegister = async () => {
    setActionLoading(true);
    try {
      if (MOCK_MODE) {
        if (registered) {
          setRegistered(false);
          toast.success("Registration cancelled");
        } else {
          if (isSoldOut) { toast.error("This event is sold out"); return; }
          setRegistered(true);
          toast.success("Successfully registered!");
        }
      } else {
        if (registered) {
          await registrationApi.cancel(event._id);
          setRegistered(false);
          setEvent({ ...event, availableSeats: event.availableSeats + 1 });
          toast.success("Registration cancelled");
        } else {
          if (isSoldOut) { toast.error("This event is sold out"); return; }
          await registrationApi.register(event._id);
          setRegistered(true);
          setEvent({ ...event, availableSeats: event.availableSeats - 1 });
          toast.success("Successfully registered!");
        }
      }
    } catch (err) {
      toast.error(err.message || "Action failed");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl px-4 py-8">
      <Button variant="ghost" className="mb-4" onClick={() => navigate("/events")}>
        <ArrowLeft className="mr-2 h-4 w-4" />Back to Events
      </Button>

      <div className="overflow-hidden rounded-xl">
        <img src={event.image} alt={event.name} className="h-64 w-full object-cover sm:h-80" />
      </div>

      <div className="mt-6 flex flex-wrap items-start justify-between gap-4">
        <div>
          <div className="mb-2 flex gap-2">
            <Badge className="bg-primary text-primary-foreground">{event.category}</Badge>
            {isSoldOut && <Badge variant="destructive">Sold Out</Badge>}
            {isPast && <Badge variant="secondary">Past Event</Badge>}
          </div>
          <h1 className="text-3xl font-bold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>{event.name}</h1>
        </div>

        {user && !isPast ? (
          <Button
            size="lg"
            variant={registered ? "outline" : "default"}
            onClick={handleRegister}
            disabled={(isSoldOut && !registered) || actionLoading}
          >
            {actionLoading ? "Processing..." : registered ? "Cancel Registration" : isSoldOut ? "Sold Out" : "Register Now"}
          </Button>
        ) : !user && !isPast ? (
          <Button size="lg" onClick={() => navigate("/login")}>Login to Register</Button>
        ) : null}
      </div>

      <Card className="mt-6">
        <CardContent className="grid gap-4 p-6 sm:grid-cols-2">
          <div className="flex items-center gap-3">
            <CalendarDays className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Date</p>
              <p className="font-medium">{new Date(event.date).toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric", year: "numeric" })}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-medium">{event.location}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Users className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Capacity</p>
              <p className="font-medium">{event.availableSeats} / {event.capacity} seats available</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Building2 className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Organizer</p>
              <p className="font-medium">{event.organizer}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6">
        <h2 className="mb-3 text-xl font-semibold" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>About This Event</h2>
        <p className="leading-relaxed text-muted-foreground">{event.description}</p>
      </div>
    </div>
  );
}
