import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { supabase } from "@/lib/supabaseClient";

const ChangePassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (!data?.user) {
        navigate("/login");
        return;
      }
      setEmail(data.user.email ?? "");
    });
  }, [navigate]);

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!currentPassword || !newPassword) {
      setErrorMessage("Please complete all fields.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setErrorMessage("New passwords do not match.");
      return;
    }

    if (!email) {
      setErrorMessage("Unable to verify current user.");
      return;
    }

    setSubmitting(true);
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password: currentPassword,
    });

    if (signInError) {
      setErrorMessage("Current password is incorrect.");
      setSubmitting(false);
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setErrorMessage(updateError.message);
      setSubmitting(false);
      return;
    }

    setSubmitting(false);
    setSuccessMessage("Password updated successfully.");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between px-8 py-12">
      <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center">
        <div className="bg-accent rounded-3xl p-6 mb-4">
          <BookOpen className="h-12 w-12 text-foreground" strokeWidth={1.5} />
        </div>

        <h1 className="text-2xl font-bold text-foreground mb-1">RYB</h1>
        <p className="text-sm text-muted-foreground mb-8">Read Your Bible</p>

        <h2 className="text-2xl font-bold text-foreground mb-3">Change Password</h2>
        <p className="text-sm text-muted-foreground text-center mb-6">
          Enter your current password to set a new one.
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

        <form onSubmit={handleChangePassword} className="w-full space-y-4">
          <Input
            type="password"
            placeholder="Current password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="h-12 bg-accent border-0 rounded-xl"
            required
          />
          <Input
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
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

        <button
          onClick={() => navigate("/profile")}
          className="flex items-center gap-2 text-sm text-muted-foreground mt-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to profile
        </button>
      </div>

      <div className="h-1 w-32 bg-foreground rounded-full" />
    </div>
  );
};

export default ChangePassword;
