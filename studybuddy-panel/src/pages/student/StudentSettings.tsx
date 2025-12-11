import { useState } from "react";
import { User, Bell, Shield, Palette, Save } from "lucide-react";

export default function StudentSettings() {
  const [activeTab, setActiveTab] = useState("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User },
    { id: "notifications", label: "Notifications", icon: Bell },
    { id: "security", label: "Security", icon: Shield },
    { id: "preferences", label: "Preferences", icon: Palette },
  ];

  return (
    <div className="animate-fade-in">
      {/* Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Settings</h1>
          <p className="text-muted-foreground mt-1">
            Manage your account preferences
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
                  <span className="text-3xl font-semibold text-primary">J</span>
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
                  <input type="text" defaultValue="John" className="input-field" />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Last Name</label>
                  <input type="text" defaultValue="Doe" className="input-field" />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Email Address</label>
                <input type="email" defaultValue="john.doe@email.com" className="input-field" />
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium mb-2">Bio</label>
                <textarea
                  rows={4}
                  placeholder="Tell us about yourself..."
                  defaultValue="Passionate learner interested in web development and data science."
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
                  { label: "Course Updates", description: "Get notified when your enrolled courses are updated" },
                  { label: "Quiz Reminders", description: "Receive reminders about upcoming and due quizzes" },
                  { label: "New Certificates", description: "Notification when you earn a new certificate" },
                  { label: "Learning Streaks", description: "Daily reminders to maintain your learning streak" },
                  { label: "AI Chat Tips", description: "Receive personalized learning suggestions from AI" },
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
                  Add an extra layer of security to your account.
                </p>
                <button className="btn-outline">Enable 2FA</button>
              </div>

              <div className="border-t border-border pt-6 mt-6">
                <h3 className="font-medium mb-4">Active Sessions</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Chrome on Windows</p>
                      <p className="text-xs text-muted-foreground">Current session • Last active now</p>
                    </div>
                    <span className="badge badge-success">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-sm">Safari on iPhone</p>
                      <p className="text-xs text-muted-foreground">Last active 2 hours ago</p>
                    </div>
                    <button className="text-sm text-destructive hover:underline">Revoke</button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === "preferences" && (
            <div className="dashboard-card p-6">
              <h2 className="text-lg font-semibold mb-6">Learning Preferences</h2>

              <div className="space-y-6 max-w-md">
                <div>
                  <label className="block text-sm font-medium mb-2">Daily Learning Goal</label>
                  <select className="input-field">
                    <option>15 minutes</option>
                    <option>30 minutes</option>
                    <option>1 hour</option>
                    <option>2 hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Preferred Learning Time</label>
                  <select className="input-field">
                    <option>Morning (6 AM - 12 PM)</option>
                    <option>Afternoon (12 PM - 6 PM)</option>
                    <option>Evening (6 PM - 12 AM)</option>
                    <option>Flexible</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Interests</label>
                  <div className="flex flex-wrap gap-2">
                    {["Web Development", "Data Science", "Design", "Mobile", "AI/ML", "DevOps"].map((interest) => (
                      <button
                        key={interest}
                        className="px-3 py-1.5 text-sm rounded-full border border-border hover:bg-primary hover:text-primary-foreground hover:border-primary transition-colors"
                      >
                        {interest}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <select className="input-field">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
              </div>

              <button className="btn-primary mt-6">
                <Save className="w-4 h-4" />
                Save Preferences
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
