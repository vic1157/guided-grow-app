import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Bell, Settings, Eye, ArrowRight } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
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
              <Settings className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="h-9 w-9">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-4 py-6">
        {/* Profile Section */}
        <div className="flex flex-col items-center text-center mb-6">
          <Avatar className="h-32 w-32 mb-4">
            <AvatarImage src="" />
            <AvatarFallback className="bg-primary text-primary-foreground text-4xl">MC</AvatarFallback>
          </Avatar>
          
          <h1 className="text-2xl font-bold text-foreground mb-1">Michael Chen</h1>
          <p className="text-muted-foreground mb-2">@michael_reads</p>
          <p className="text-sm text-muted-foreground mb-3">Reading Since January 2025</p>
          
          <p className="text-sm text-muted-foreground max-w-md mb-4 leading-relaxed">
            Walking with Christ through His Word daily. Passionate about studying Psalms and Proverbs.
          </p>
          
          <Button className="rounded-full px-6">
            <Eye className="h-4 w-4 mr-2" />
            View Friends
          </Button>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">89</p>
            <p className="text-xs text-muted-foreground">Days Read</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">12d</p>
            <p className="text-xs text-muted-foreground">Longest Streak</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-foreground">28h</p>
            <p className="text-xs text-muted-foreground">Total Time</p>
          </div>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="scrolls" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="scrolls">Scrolls</TabsTrigger>
            <TabsTrigger value="testimonies">My Testimonies</TabsTrigger>
          </TabsList>
          
          <TabsContent value="scrolls" className="mt-6">
            <Card className="p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">No Scrolls Yet!</h3>
              <p className="text-sm text-muted-foreground mb-6">
                Bible Reading activity is displayed once a scroll is submitted.
              </p>
              <Button variant="ghost" className="gap-2">
                <ArrowRight className="h-4 w-4" />
                Begin Bible Reading
              </Button>
            </Card>
          </TabsContent>
          
          <TabsContent value="testimonies" className="mt-6">
            <Card className="p-8 text-center">
              <h3 className="text-xl font-bold text-foreground mb-2">No Testimonies Yet!</h3>
              <p className="text-sm text-muted-foreground">
                Share your faith journey and experiences with the community.
              </p>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
