import { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BookOpen, Mail, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

const VerifyEmail = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const email = location.state?.email || "user@example.com";
  
  const [code, setCode] = useState(["", "", "", "", "", ""]);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const [showResendAlert, setShowResendAlert] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const handleCodeChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.slice(-1);
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newCode = [...code];
    pastedData.split("").forEach((digit, index) => {
      if (index < 6) newCode[index] = digit;
    });
    setCode(newCode);

    const nextEmptyIndex = newCode.findIndex((digit) => !digit);
    if (nextEmptyIndex !== -1) {
      inputRefs.current[nextEmptyIndex]?.focus();
    } else {
      inputRefs.current[5]?.focus();
    }
  };

  const handleVerifyEmail = () => {
    const verificationCode = code.join("");
    if (verificationCode.length === 6) {
      // TODO: Implement verification logic
      navigate("/home");
    }
  };

  const handleResendCode = () => {
    // TODO: Implement resend logic
    setShowResendAlert(true);
    setTimeLeft(900);
    setCode(["", "", "", "", "", ""]);
    setTimeout(() => setShowResendAlert(false), 3000);
  };

  const handleChangeEmail = () => {
    navigate("/signup");
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
          Verify Your Email
        </h2>
        <p className="text-sm text-muted-foreground text-center mb-2">
          We've sent a 6-digit verification code to:
        </p>
        <p className="text-sm font-semibold text-foreground mb-6">{email}</p>

        {showResendAlert && (
          <Alert className="mb-6 border-border bg-accent">
            <Mail className="h-4 w-4" />
            <AlertDescription className="text-sm">
              A new verification code has been sent. Please try again.
            </AlertDescription>
          </Alert>
        )}

        <div className="w-full mb-4">
          <div className="flex gap-2 justify-center mb-4" onPaste={handlePaste}>
            {code.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleCodeChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 text-center text-lg font-semibold bg-accent border-border rounded-xl"
              />
            ))}
          </div>

          <p className="text-sm text-center text-muted-foreground mb-6">
            Code expires in {formatTime(timeLeft)}
          </p>

          <Button
            onClick={handleVerifyEmail}
            disabled={code.some((digit) => !digit)}
            className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-medium disabled:opacity-50"
          >
            Verify Email
          </Button>
        </div>

        <div className="text-center space-y-3 mt-6">
          <p className="text-sm text-muted-foreground">
            Didn't receive the code?
          </p>
          <button
            onClick={handleResendCode}
            className="text-sm font-semibold text-foreground"
          >
            Resend Code
          </button>
        </div>

        <button
          onClick={handleChangeEmail}
          className="flex items-center gap-2 text-sm text-muted-foreground mt-6"
        >
          <ArrowLeft className="h-4 w-4" />
          Change email address
        </button>
      </div>

      <div className="h-1 w-32 bg-foreground rounded-full" />
    </div>
  );
};

export default VerifyEmail;
