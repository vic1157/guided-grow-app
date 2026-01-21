import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  Settings,
  Eye,
  ArrowRight,
  Camera,
  Check,
  ArrowLeft,
  ChevronRight,
  Coins,
  User,
  Mail,
  Lock,
  BookOpen,
  Type,
  Moon,
  HelpCircle,
  Shield,
  LogOut,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Switch } from "@/components/ui/switch";

const Profile = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isOnboarding = searchParams.get("onboarding") === "true";

  const [onboardingStep, setOnboardingStep] = useState(1);
  const [profilePhoto, setProfilePhoto] = useState<string>("");
  const [testimony, setTestimony] = useState("");
  const [showOnboardingModal, setShowOnboardingModal] = useState(isOnboarding);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [dailyReminderEnabled, setDailyReminderEnabled] = useState(true);
  const [streakReminderEnabled, setStreakReminderEnabled] = useState(true);
  const [achievementEnabled, setAchievementEnabled] = useState(false);
  const [darkModeEnabled, setDarkModeEnabled] = useState(false);

  useEffect(() => {
    if (isOnboarding) {
      setShowOnboardingModal(true);
    }
  }, [isOnboarding]);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNextStep = () => {
    if (onboardingStep === 1) {
      setOnboardingStep(2);
    } else if (onboardingStep === 2) {
      // Complete onboarding
      localStorage.setItem("profileOnboardingComplete", "true");

      // Dispatch custom event to update OnboardingProgress
      window.dispatchEvent(new Event("onboardingComplete"));

      setShowOnboardingModal(false);
      navigate("/home");
    }
  };

  const handleSkipStep = () => {
    setShowOnboardingModal(false);
    navigate("/home");
  };
  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Onboarding Modal */}
      {showOnboardingModal && (
        <div className="fixed inset-0 bg-background/95 z-50 flex items-center justify-center p-6">
          <Card className="w-full max-w-lg p-8 space-y-6">
            {/* Progress Indicator */}
            <div className="flex items-center justify-center gap-2 mb-4">
              <div
                className={`h-2 w-16 rounded-full ${
                  onboardingStep >= 1 ? "bg-foreground" : "bg-muted-foreground/30"
                }`}
              />
              <div
                className={`h-2 w-16 rounded-full ${
                  onboardingStep >= 2 ? "bg-foreground" : "bg-muted-foreground/30"
                }`}
              />
            </div>

            {/* Step 1: Upload Photo */}
            {onboardingStep === 1 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Add a Profile Photo</h2>
                  <p className="text-sm text-muted-foreground">
                    Help others recognize you by adding a photo
                  </p>
                </div>

                <div className="flex flex-col items-center gap-4">
                  <div className="relative">
                    <Avatar className="h-32 w-32">
                      <AvatarImage src={profilePhoto} />
                      <AvatarFallback className="bg-primary text-primary-foreground text-4xl">
                        {profilePhoto ? "" : "JD"}
                      </AvatarFallback>
                    </Avatar>
                    {profilePhoto && (
                      <div className="absolute bottom-0 right-0 bg-green-500 rounded-full p-2">
                        <Check className="h-4 w-4 text-white" />
                      </div>
                    )}
                  </div>

                  <label
                    htmlFor="photo-upload"
                    className="cursor-pointer flex items-center gap-2 px-6 py-3 bg-foreground text-background rounded-xl font-medium hover:bg-foreground/90 transition-colors"
                  >
                    <Camera className="h-4 w-4" />
                    Choose Photo
                  </label>
                  <input
                    id="photo-upload"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSkipStep}
                    variant="outline"
                    className="flex-1 h-12 rounded-xl"
                  >
                    Skip for Now
                  </Button>
                  <Button onClick={handleNextStep} className="flex-1 h-12 rounded-xl">
                    Next
                  </Button>
                </div>
              </div>
            )}

            {/* Step 2: Add Testimony */}
            {onboardingStep === 2 && (
              <div className="space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-2xl font-bold text-foreground">Share Your Testimony</h2>
                  <p className="text-sm text-muted-foreground">
                    Let others know about your spiritual journey and God's work in your life
                  </p>
                </div>

                <div className="space-y-3">
                  <label className="text-sm font-medium text-foreground">Your Testimony</label>
                  <Textarea
                    value={testimony}
                    onChange={(e) => setTestimony(e.target.value)}
                    placeholder="Share your story... How has God been working in your life? What drew you to Bible reading?"
                    className="min-h-[150px] resize-none"
                  />
                  <p className="text-xs text-muted-foreground">
                    {testimony.length}/500 characters
                  </p>
                </div>

                <div className="flex gap-3 pt-4">
                  <Button
                    onClick={handleSkipStep}
                    variant="outline"
                    className="flex-1 h-12 rounded-xl"
                  >
                    Skip for Now
                  </Button>
                  <Button onClick={handleNextStep} className="flex-1 h-12 rounded-xl">
                    Complete Profile
                  </Button>
                </div>
              </div>
            )}
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
            <Sheet open={settingsOpen} onOpenChange={setSettingsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="h-9 w-9">
                  <Settings className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-full sm:max-w-md p-0">
                <div className="flex h-full flex-col bg-background">
                  <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-9 w-9"
                      onClick={() => setSettingsOpen(false)}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                    <SheetHeader className="p-0">
                      <SheetTitle className="text-lg">Settings</SheetTitle>
                    </SheetHeader>
                  </div>

                  <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
                    <Card className="p-4 flex items-center justify-between bg-card">
                      <div className="flex items-center gap-3">
                        <div className="h-11 w-11 rounded-xl bg-accent flex items-center justify-center">
                          <Coins className="h-5 w-5 text-foreground" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Denarii Balance</p>
                          <p className="text-2xl font-bold text-foreground">150</p>
                        </div>
                      </div>
                      <Button variant="outline" className="rounded-full px-4">
                        Get More
                      </Button>
                    </Card>

                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Account
                      </p>
                      <Card className="divide-y divide-border">
                        <button
                          className="w-full flex items-center gap-3 p-4 text-left hover:bg-accent/40 transition-colors"
                          onClick={() => navigate("/change-password")}
                        >
                          <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                            <User className="h-5 w-5 text-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">Edit Profile</p>
                            <p className="text-xs text-muted-foreground">Name, photo, bio</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-accent/40 transition-colors">
                          <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                            <Mail className="h-5 w-5 text-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">Email</p>
                            <p className="text-xs text-muted-foreground">john.doe@email.com</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-accent/40 transition-colors">
                          <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                            <Lock className="h-5 w-5 text-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">Change Password</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </Card>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Reading Preferences
                      </p>
                      <Card className="divide-y divide-border">
                        <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-accent/40 transition-colors">
                          <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                            <BookOpen className="h-5 w-5 text-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">Default Translation</p>
                            <p className="text-xs text-muted-foreground">NIV</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-accent/40 transition-colors">
                          <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                            <Type className="h-5 w-5 text-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">Font Size</p>
                            <p className="text-xs text-muted-foreground">Medium</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </Card>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        Notifications
                      </p>
                      <Card className="divide-y divide-border">
                        <div className="flex items-center gap-3 p-4">
                          <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                            <Bell className="h-5 w-5 text-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                              Daily Reading Reminder
                            </p>
                            <p className="text-xs text-muted-foreground">9:00 AM</p>
                          </div>
                          <Switch
                            checked={dailyReminderEnabled}
                            onCheckedChange={setDailyReminderEnabled}
                          />
                        </div>
                        <div className="flex items-center gap-3 p-4">
                          <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                            <Bell className="h-5 w-5 text-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">Streak Reminders</p>
                            <p className="text-xs text-muted-foreground">Keep your streak alive</p>
                          </div>
                          <Switch
                            checked={streakReminderEnabled}
                            onCheckedChange={setStreakReminderEnabled}
                          />
                        </div>
                        <div className="flex items-center gap-3 p-4">
                          <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                            <Bell className="h-5 w-5 text-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">
                              Achievement Notifications
                            </p>
                          </div>
                          <Switch
                            checked={achievementEnabled}
                            onCheckedChange={setAchievementEnabled}
                          />
                        </div>
                      </Card>
                    </div>

                    <div className="space-y-2">
                      <p className="text-xs uppercase tracking-wide text-muted-foreground">
                        App
                      </p>
                      <Card className="divide-y divide-border">
                        <div className="flex items-center gap-3 p-4">
                          <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                            <Moon className="h-5 w-5 text-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">Dark Mode</p>
                          </div>
                          <Switch
                            checked={darkModeEnabled}
                            onCheckedChange={setDarkModeEnabled}
                          />
                        </div>
                        <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-accent/40 transition-colors">
                          <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                            <HelpCircle className="h-5 w-5 text-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">Help & Support</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                        <button className="w-full flex items-center gap-3 p-4 text-left hover:bg-accent/40 transition-colors">
                          <div className="h-10 w-10 rounded-xl bg-accent flex items-center justify-center">
                            <Shield className="h-5 w-5 text-foreground" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium text-foreground">Privacy Policy</p>
                          </div>
                          <ChevronRight className="h-4 w-4 text-muted-foreground" />
                        </button>
                      </Card>
                    </div>

                    <Card className="p-4 bg-destructive/10 border-destructive/30">
                      <button className="w-full flex items-center gap-3 text-left">
                        <div className="h-10 w-10 rounded-xl bg-destructive/15 flex items-center justify-center">
                          <LogOut className="h-5 w-5 text-destructive" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-destructive">Sign Out</p>
                        </div>
                      </button>
                    </Card>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
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
            <Card className="p-6 relative">
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute top-4 right-4 h-8 w-8"
              >
                <Settings className="h-4 w-4" />
              </Button>
              
              <div className="border-l-4 border-foreground pl-4">
                <h3 className="text-xl font-bold text-foreground mb-4">What's Your Testimony?</h3>
                
                <p className="text-sm text-foreground leading-relaxed mb-4 italic">
                  This section is used to declare your testimony. Whenever a user comes and views your profile, what do you want them to know about your spiritual journey and the goodness that God is doing in your life?
                </p>
                
                <p className="text-sm text-foreground leading-relaxed italic">
                  To update your testimony, toggle the edit icon to the top right to edit this section!
                </p>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
