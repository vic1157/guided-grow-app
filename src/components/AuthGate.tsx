import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Loading from "@/pages/Loading";
import { useAuth } from "@/contexts/AuthContext";

const onboardingPaths = new Set([
  "/survey",
  "/persona-wheel",
  "/survey-results",
  "/paywall",
]);

const unauthPaths = new Set([
  "/",
  "/login",
  "/signup",
  "/verify-email",
  "/email-confirmed",
  "/reset-password",
]);

const stepToPath = (step: number) => {
  switch (step) {
    case 0:
      return "/survey";
    case 1:
      return "/persona-wheel";
    case 2:
      return "/survey-results";
    case 3:
      return "/paywall";
    default:
      return "/survey";
  }
};

const AuthGate = ({ children }: { children: React.ReactNode }) => {
  const { session, profile, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (loading) return;

    const path = location.pathname;
    const isAuthed = Boolean(session);
    const hasPendingSignup = Boolean(localStorage.getItem("pendingSignup"));
    const isRecovery =
      path === "/reset-password" &&
      (location.search.includes("type=recovery") ||
        location.hash.includes("type=recovery") ||
        location.search.includes("access_token") ||
        location.hash.includes("access_token"));

    if (!isAuthed) {
      if (unauthPaths.has(path)) return;
      navigate("/login", { replace: true });
      return;
    }

    if (path === "/login" || path === "/signup") {
      navigate("/home", { replace: true });
      return;
    }

    if (path === "/verify-email" && !hasPendingSignup) {
      navigate("/home", { replace: true });
      return;
    }

    if (path === "/reset-password" && !isRecovery) {
      navigate("/home", { replace: true });
      return;
    }

    if (path === "/email-confirmed" || path === "/") return;

    const onboardingStep = profile?.onboarding_step ?? 0;
    const isComplete = onboardingStep >= 4;

    if (!isComplete) {
      if (onboardingPaths.has(path)) return;
      navigate(stepToPath(onboardingStep), { replace: true });
      return;
    }

    if (path === "/persona-wheel") {
      navigate("/home", { replace: true });
      return;
    }

    if (path === "/survey" || path === "/survey-results" || path === "/paywall") return;
  }, [
    loading,
    session,
    profile,
    location.pathname,
    location.search,
    location.hash,
    navigate,
  ]);

  if (loading) {
    return <Loading />;
  }

  return <>{children}</>;
};

export default AuthGate;
