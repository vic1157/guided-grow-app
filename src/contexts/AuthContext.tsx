import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/lib/supabaseClient";

export type Profile = {
  id: string;
  first_name: string | null;
  last_name: string | null;
  username: string | null;
  onboarding_step: number | null;
  onboarding_completed_at: string | null;
  plan_status: "free" | "pro" | "cancelled" | null;
};

type AuthContextValue = {
  session: Session | null;
  user: User | null;
  profile: Profile | null;
  loading: boolean;
  authEvent: string | null;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [authEvent, setAuthEvent] = useState<string | null>(null);

  const fetchProfile = useCallback(async (userId?: string) => {
    if (!userId) {
      setProfile(null);
      return;
    }

    const { data, error } = await supabase
      .from("profiles")
      .select(
        "id, first_name, last_name, username, onboarding_step, onboarding_completed_at, plan_status",
      )
      .eq("id", userId)
      .single();

    if (error) {
      setProfile(null);
      return;
    }

    setProfile(data as Profile);
  }, []);

  const refreshProfile = useCallback(async () => {
    await fetchProfile(user?.id);
  }, [fetchProfile, user?.id]);

  useEffect(() => {
    let mounted = true;

    const init = async () => {
      const { data } = await supabase.auth.getSession();
      if (!mounted) return;

      const currentSession = data.session ?? null;
      setSession(currentSession);
      setUser(currentSession?.user ?? null);
      if (currentSession?.user) {
        await fetchProfile(currentSession.user.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    };

    init();

    const { data: subscription } = supabase.auth.onAuthStateChange(async (event, nextSession) => {
      if (!mounted) return;
      setAuthEvent(event);
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      if (nextSession?.user) {
        await fetchProfile(nextSession.user.id);
      } else {
        setProfile(null);
      }
    });

    return () => {
      mounted = false;
      subscription.subscription.unsubscribe();
    };
  }, [fetchProfile]);

  const value = useMemo(
    () => ({
      session,
      user,
      profile,
      loading,
      authEvent,
      refreshProfile,
    }),
    [session, user, profile, loading, authEvent, refreshProfile],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
