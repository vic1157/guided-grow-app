import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Implement sign-up logic
    navigate("/verify-email", { state: { email: formData.email } });
  };

  const handleGoogleSignUp = () => {
    // TODO: Implement Google authentication
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between px-8 py-12">
      <div className="w-full max-w-md flex-1 flex flex-col items-center justify-center">
        <div className="bg-accent rounded-3xl p-6 mb-4">
          <BookOpen className="h-12 w-12 text-foreground" strokeWidth={1.5} />
        </div>
        
        <h1 className="text-2xl font-bold text-foreground mb-1">RYB</h1>
        <p className="text-sm text-muted-foreground mb-8">Read Your Bible</p>

        <form onSubmit={handleCreateAccount} className="w-full space-y-4">
          <Input
            type="text"
            name="firstName"
            placeholder="First Name"
            value={formData.firstName}
            onChange={handleChange}
            className="h-12 bg-accent border-0 rounded-xl"
            required
          />
          
          <Input
            type="text"
            name="lastName"
            placeholder="Last Name"
            value={formData.lastName}
            onChange={handleChange}
            className="h-12 bg-accent border-0 rounded-xl"
            required
          />
          
          <Input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="h-12 bg-accent border-0 rounded-xl"
            required
          />
          
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="h-12 bg-accent border-0 rounded-xl"
            required
          />
          
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="h-12 bg-accent border-0 rounded-xl"
            required
          />
          
          <Input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="h-12 bg-accent border-0 rounded-xl"
            required
          />

          <Button
            type="submit"
            className="w-full h-12 bg-foreground text-background hover:bg-foreground/90 rounded-xl font-medium"
          >
            Create Account
          </Button>
        </form>

        <div className="w-full flex items-center gap-4 my-6">
          <div className="flex-1 h-px bg-border" />
          <span className="text-sm text-muted-foreground">or</span>
          <div className="flex-1 h-px bg-border" />
        </div>

        <Button
          onClick={handleGoogleSignUp}
          variant="outline"
          className="w-full h-12 border-border rounded-xl font-medium"
        >
          <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
            <path
              fill="currentColor"
              d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            />
            <path
              fill="currentColor"
              d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            />
            <path
              fill="currentColor"
              d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            />
            <path
              fill="currentColor"
              d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            />
          </svg>
          Continue with Google
        </Button>
      </div>

      <div className="h-1 w-32 bg-foreground rounded-full" />
    </div>
  );
};

export default SignUp;
