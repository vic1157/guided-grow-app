import { useState } from "react";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings, UserPlus, ChevronRight, Heart, MessageCircle, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Community = () => {
  const [showOverlay, setShowOverlay] = useState(true);
  const activeFriends = [
    { name: "Sarah", avatar: "S", active: true },
    { name: "Mike", avatar: "M", active: true },
    { name: "Emma", avatar: "E", active: true },
  ];

  const readingGroups = [
    { name: "Morning Prayer Group", members: 8, icon: "👥" },
    { name: "Sunday School", members: 12, icon: "⛪" },
  ];

  const recentActivity = [
    {
      user: "Sarah M.",
      avatar: "SM",
      action: "Completed 30-day streak!",
      badge: "30 Days Scripture Champion",
      encouragements: 0,
      comments: 0,
      timestamp: "2h ago",
    },
    {
      user: "John D.",
      avatar: "JD",
      action: "Added new reflection",
      content: '"Today\'s reading from Psalms really spoke to me about trust and patience..."',
      encouragements: 0,
      comments: 0,
      timestamp: "5h ago",
    },
    {
      user: "Sarah M.",
      avatar: "SM",
      action: "Read Psalms 23 • 10 min read",
      encouragements: 12,
      comments: 0,
      timestamp: "15m ago",
    },
    {
      user: "Mark R.",
      avatar: "MR",
      action: "Read John 3 • 20 min read",
      encouragements: 8,
      comments: 0,
      timestamp: "1h ago",
    },
  ];


  return (
    <div className="min-h-screen bg-muted pb-20">
      {/* Coming Soon Overlay */}
      {showOverlay && (
        <div className="fixed inset-0 bg-background/60 backdrop-blur-sm z-40 flex items-center justify-center p-6">
          <Card className="p-8 max-w-md text-center space-y-4">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-foreground/10 mb-2">
              <Award className="h-8 w-8 text-foreground" />
            </div>
            <h2 className="text-2xl font-bold text-foreground">Community Coming Soon!</h2>
            <p className="text-sm text-muted-foreground leading-relaxed">
              We're building an amazing community experience where you can connect with friends,
              join reading groups, and encourage each other in your spiritual journey. Iron sharpens iron!
            </p>
            <div className="pt-4">
              <Button
                variant="secondary"
                className="text-xs px-6 py-2"
                onClick={() => setShowOverlay(false)}
              >
                Stay tuned for updates
              </Button>
            </div>
          </Card>
        </div>
      )}

      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="max-w-2xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src="" />
              <AvatarFallback className="bg-primary text-primary-foreground">JD</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-foreground">John D.</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Settings className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        {/* Friends Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-foreground">Friends</h2>
            <Button variant="ghost" size="sm" className="gap-2 text-foreground">
              <UserPlus className="h-4 w-4" />
              Add Friends
            </Button>
          </div>

          {/* Active Now */}
          <div className="space-y-3">
            <h3 className="text-sm font-semibold text-muted-foreground">Active Now</h3>
            <div className="flex gap-4">
              {activeFriends.map((friend, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <div className="relative">
                    <Avatar className="h-16 w-16 border-2 border-card">
                      <AvatarImage src="" />
                      <AvatarFallback className="bg-accent text-foreground">
                        {friend.avatar}
                      </AvatarFallback>
                    </Avatar>
                    {friend.active && (
                      <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 rounded-full border-2 border-card" />
                    )}
                  </div>
                  <span className="text-xs font-medium text-foreground">{friend.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Your Reading Groups */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">Your Reading Groups</h2>
          <div className="space-y-2">
            {readingGroups.map((group, index) => (
              <Card
                key={index}
                className="p-4 flex items-center justify-between hover:bg-accent transition-colors cursor-pointer"
              >
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-accent rounded-lg flex items-center justify-center text-2xl">
                    {group.icon}
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">{group.name}</p>
                    <p className="text-sm text-muted-foreground">{group.members} members</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-3">
          <h2 className="text-xl font-bold text-foreground">Recent Activity</h2>
          <div className="space-y-3">
            {recentActivity.map((activity, index) => (
              <Card key={index} className="p-4 space-y-3">
                <div className="flex items-start gap-3">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src="" />
                    <AvatarFallback className="bg-accent text-foreground text-sm">
                      {activity.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-baseline gap-2">
                      <p className="font-semibold text-foreground">{activity.user}</p>
                      {activity.timestamp && (
                        <p className="text-xs text-muted-foreground">{activity.timestamp}</p>
                      )}
                    </div>
                    <p className="text-sm text-foreground mt-1">{activity.action}</p>
                  </div>
                </div>

                {activity.badge && (
                  <div className="flex items-center gap-2 py-2">
                    <Award className="h-5 w-5 text-foreground" />
                    <span className="text-sm font-medium text-foreground">{activity.badge}</span>
                  </div>
                )}

                {activity.content && (
                  <p className="text-sm text-foreground italic pl-2 border-l-2 border-border">
                    {activity.content}
                  </p>
                )}

                <div className="flex items-center gap-4 pt-2">
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <Heart className="h-4 w-4" />
                    {activity.encouragements > 0 ? `${activity.encouragements} Encouragements` : 'Encourage'}
                  </button>
                  <button className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    Comment
                  </button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Community;
