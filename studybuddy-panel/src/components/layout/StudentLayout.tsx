import { Outlet } from "react-router-dom";
import { StudentSidebar } from "./StudentSidebar";
import { TopNav } from "./TopNav";
import { useAuth } from "@/contexts/AuthContext";

export function StudentLayout() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      <StudentSidebar />
      <div className="pl-64">
        <TopNav
          userName={user?.email.split('@')[0] || "Student"}
          userRole={user?.role || "Student"}
        />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
