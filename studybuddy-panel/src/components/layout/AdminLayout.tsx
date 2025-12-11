import { Outlet } from "react-router-dom";
import { AdminSidebar } from "./AdminSidebar";
import { TopNav } from "./TopNav";

export function AdminLayout() {
  return (
    <div className="min-h-screen bg-background">
      <AdminSidebar />
      <div className="pl-64">
        <TopNav userName="Admin User" userRole="Administrator" />
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
