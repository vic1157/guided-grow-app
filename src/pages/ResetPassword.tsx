import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/lib/supabaseClient";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"request" | "update">("request");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    const hash = window.location.hash;
    const search = window.location.search;
    const isRecovery =
      hash.includes("type=recovery") ||
      search.includes("type=recovery") ||
      hash.includes("access_token");

    if (isRecovery) {
      setMode("update");
      supabase.auth.getSession().finally(() => {
        window.history.replaceState({}, document.title, window.location.pathname);
      });
    }
  }, []);

  const handleSendReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!email) {
      setErrorMessage("Please enter your email address.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });

    if (error) {
      setErrorMessage(error.message);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setSuccessMessage("Check your email for a password reset link.");
  };

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!password || password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setSubmitting(true);
    const { error } = await supabase.auth.updateUser({ password });

    if (error) {
      setErrorMessage(error.message);
      setSubmitting(false);
      return;
    }

    await supabase.auth.signOut();
    setSubmitting(false);
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between px-8 py-12">
      <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center">
        <div className="bg-accent rounded-3xl p-6 mb-4">
          <BookOpen className="h-12 w-12 text-foreground" strokeWidth={1.5} />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-1">RYB</h1>
        <p className="text-sm text-muted-foreground mb-8">Read Your Bible</p>

        <h2 className="text-2xl font-bold text-foreground mb-3">
          {mode === "request" ? "Reset Password" : "Create New Password"}
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          {mode === "request"
            ? "Enter your email and we’ll send you a reset link."
            : "Set a new password for your account."}
        </p>

        {errorMessage && (
          <Alert className="mb-6 border-border bg-accent">
            <AlertDescription className="text-sm">{errorMessage}</AlertDescription>
          </Alert>
        )}

        {successMessage && (
          <Alert className="mb-6 border-border bg-accent">
            <AlertDescription className="text-sm">{successMessage}</AlertDescription>
          </Alert>
        )}

        {mode === "request" ? (
          <form onSubmit={handleSendReset} className="w-full space-y-4">
            <Input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 bg-accent border-0 rounded-xl"
              required
            />
            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-medium"
            >
              {submitting ? "Sending..." : "Send Reset Link"}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleUpdatePassword} className="w-full space-y-4">
            <Input
              type="password"
              placeholder="New password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="h-12 bg-accent border-0 rounded-xl"
              required
            />
            <Input
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="h-12 bg-accent border-0 rounded-xl"
              required
            />
            <Button
              type="submit"
              disabled={submitting}
              className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-medium"
            >
              {submitting ? "Saving..." : "Update Password"}
            </Button>
          </form>
        )}

        <button
          onClick={() => navigate("/login")}
          className="flex items-center gap-2 text-sm text-muted-foreground mt-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to sign in
        </button>
      </div>

      <div className="h-1 w-32 bg-foreground rounded-full" />
    </div>
  );
};

export default ResetPassword;
