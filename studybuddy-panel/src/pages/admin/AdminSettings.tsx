import { useState } from "react";
import { User, Bell, Shield, Palette, Globe, Save } from "lucide-react";

export default function AdminSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "appearance", label: "Appearance", icon: Palette },
    { id: "general", label: "General", icon: Globe },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account and platform settings
          </p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 flex-shrink-0">
          <div className="dashboard-card p-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-colors ${
                  activeTab === tab.id
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted"
                }`}
              >
                <tab.icon className="w-5 h-5" />
                <span className="font-medium text-sm">{tab.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1">
          {activeTab === "profile" && (
            <div className="dashboard-card p-6">
              <h2 className="text-lg font-semibold mb-6">Profile Settings</h2>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center">
                  <User className="w-12 h-12 text-primary" />
                </div>
                <div>
                  <button className="btn-outline mb-2">Upload Photo</button>
                  <p className="text-sm text-muted-foreground">
                    JPG, PNG or GIF. Max size 2MB.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <label className="block text-sm font-medium mb-2">First Name</label>
                  <input type="text" defaultValue="Admin" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input type="text" defaultValue="User" className="input-field" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input type="email" defaultValue="admin@studybuddy.com" className="input-field" />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about yourself..."
                  className="input-field resize-none"
                />
              </div>

              <button className="btn-primary">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "notifications" && (
            <div className="dashboard-card p-6">
              <h2 className="text-lg font-semibold mb-6">Notification Preferences</h2>
              
              <div className="space-y-4">
                {[
                  { label: "Email Notifications", description: "Receive email updates about platform activity" },
                  { label: "New Course Submissions", description: "Get notified when new courses are submitted for review" },
                  { label: "Student Activity", description: "Alerts about student enrollments and completions" },
                  { label: "Quiz Completions", description: "Notifications when students complete quizzes" },
                  { label: "AI Chat Alerts", description: "Get notified about unusual chat patterns" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div>
                      <p className="font-medium">{item.label}</p>
                      <p className="text-sm text-muted-foreground">{item.description}</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" defaultChecked className="sr-only peer" />
                      <div className="w-11 h-6 bg-muted rounded-full peer peer-checked:bg-primary peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-card after:rounded-full after:h-5 after:w-5 after:transition-all"></div>
                    </label>
                  </div>
                ))}
              </div>

              <button className="btn-primary mt-6">
                <Save className="w-4 h-4" />
                Save Preferences
              </button>
            </div>
          )}

          {activeTab === "security" && (
            <div className="dashboard-card p-6">
              <h2 className="text-lg font-semibold mb-6">Security Settings</h2>

              <div className="mb-8">
                <h3 className="font-medium mb-4">Change Password</h3>
                <div className="space-y-4 max-w-md">
                  <div>
                    <label className="block text-sm font-medium mb-2">Current Password</label>
                    <input type="password" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">New Password</label>
                    <input type="password" className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                    <input type="password" className="input-field" />
                  </div>
                  <button className="btn-primary">Update Password</button>
                </div>
              </div>

              <div className="border-t border-border pt-6">
                <h3 className="font-medium mb-4">Two-Factor Authentication</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Add an extra layer of security to your account by enabling two-factor authentication.
                </p>
                <button className="btn-outline">Enable 2FA</button>
              </div>
            </div>
          )}

          {activeTab === "appearance" && (
            <div className="dashboard-card p-6">
              <h2 className="text-lg font-semibold mb-6">Appearance Settings</h2>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-4">Theme</label>
                <div className="flex gap-4">
                  <button className="flex-1 p-4 border-2 border-primary rounded-lg bg-card">
                    <div className="w-full h-20 bg-background rounded mb-2 border border-border" />
                    <p className="text-sm font-medium text-center">Light</p>
                  </button>
                  <button className="flex-1 p-4 border border-border rounded-lg">
                    <div className="w-full h-20 bg-foreground rounded mb-2" />
                    <p className="text-sm font-medium text-center">Dark</p>
                  </button>
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Sidebar Position</label>
                <select className="input-field max-w-xs">
                  <option>Left</option>
                  <option>Right</option>
                </select>
              </div>

              <button className="btn-primary">
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          )}

          {activeTab === "general" && (
            <div className="dashboard-card p-6">
              <h2 className="text-lg font-semibold mb-6">General Settings</h2>

              <div className="space-y-6 max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-2">Platform Name</label>
                  <input type="text" defaultValue="StudyBuddy" className="input-field" />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Default Language</label>
                  <select className="input-field">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Timezone</label>
                  <select className="input-field">
                    <option>UTC</option>
                    <option>EST (UTC-5)</option>
                    <option>PST (UTC-8)</option>
                    <option>GMT (UTC+0)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Date Format</label>
                  <select className="input-field">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>

              <button className="btn-primary mt-6">
                <Save className="w-4 h-4" />
                Save Settings
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
