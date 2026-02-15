import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { CalendarDays, LogOut, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setOpen(false);
  };

  return (
    <nav className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl tracking-tight" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>
          <CalendarDays className="h-6 w-6 text-primary" />
          <span>Bellcorp Events</span>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-2 md:flex">
          <Link to="/events">
            <Button variant="ghost" size="sm">Discover</Button>
          </Link>
          {user ? (
            <>
              <Link to="/dashboard">
                <Button variant="ghost" size="sm"><LayoutDashboard className="mr-1 h-4 w-4" />Dashboard</Button>
              </Link>
              <span className="ml-2 text-sm text-muted-foreground">Hi, {user.name}</span>
              <Button variant="outline" size="sm" onClick={handleLogout}><LogOut className="mr-1 h-4 w-4" />Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login"><Button variant="ghost" size="sm">Login</Button></Link>
              <Link to="/register"><Button size="sm">Sign Up</Button></Link>
            </>
          )}
        </div>

        {/* Mobile toggle */}
        <button className="md:hidden" onClick={() => setOpen(!open)}>
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="flex flex-col gap-2 border-t bg-card px-4 py-4 md:hidden">
          <Link to="/events" onClick={() => setOpen(false)}>
            <Button variant="ghost" className="w-full justify-start">Discover</Button>
          </Link>
          {user ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start"><LayoutDashboard className="mr-2 h-4 w-4" />Dashboard</Button>
              </Link>
              <Button variant="outline" className="w-full justify-start" onClick={handleLogout}><LogOut className="mr-2 h-4 w-4" />Logout</Button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)}>
                <Button variant="ghost" className="w-full justify-start">Login</Button>
              </Link>
              <Link to="/register" onClick={() => setOpen(false)}>
                <Button className="w-full justify-start">Sign Up</Button>
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
}
