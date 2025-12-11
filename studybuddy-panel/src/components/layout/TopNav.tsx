import { Bell, Search, ChevronDown, User } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface TopNavProps {
  userName: string;
  userRole: string;
  userAvatar?: string;
}

export function TopNav({ userName, userRole, userAvatar }: TopNavProps) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const notifications = [
    { id: 1, text: "New course submission: React Fundamentals", time: "5 min ago" },
    { id: 2, text: "Student completed: JavaScript Basics", time: "1 hour ago" },
    { id: 3, text: "Quiz attempt by John Doe", time: "2 hours ago" },
  ];

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="h-16 bg-card border-b border-border flex items-center justify-between px-6">
      {/* Search */}
      <div className="relative w-96">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
        <input
          type="text"
          placeholder="Search courses, students, quizzes..."
          className="input-field pl-10 py-2"
        />
      </div>

      {/* Right Side */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="relative p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
          </button>

          {showNotifications && (
            <div className="nav-dropdown w-80">
              <div className="px-4 py-2 border-b border-border">
                <h3 className="font-semibold text-sm">Notifications</h3>
              </div>
              {notifications.map((notif) => (
                <div key={notif.id} className="nav-dropdown-item">
                  <p className="text-sm">{notif.text}</p>
                  <p className="text-xs text-muted-foreground mt-1">{notif.time}</p>
                </div>
              ))}
              <div className="px-4 py-2 border-t border-border">
                <button className="text-sm text-primary hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted transition-colors"
          >
            <div className="w-9 h-9 bg-primary/10 rounded-full flex items-center justify-center">
              {userAvatar ? (
                <img src={userAvatar} alt={userName} className="w-full h-full rounded-full object-cover" />
              ) : (
                <User className="w-5 h-5 text-primary" />
              )}
            </div>
            <div className="text-left hidden md:block">
              <p className="text-sm font-medium">{userName}</p>
              <p className="text-xs text-muted-foreground">{userRole}</p>
            </div>
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>

          {showDropdown && (
            <div className="nav-dropdown">
              <div className="nav-dropdown-item">Profile Settings</div>
              <div className="nav-dropdown-item">Account</div>
              <div className="nav-dropdown-item">Help & Support</div>
              <div className="border-t border-border my-1" />
              <button onClick={handleLogout} className="nav-dropdown-item text-destructive w-full text-left">
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
