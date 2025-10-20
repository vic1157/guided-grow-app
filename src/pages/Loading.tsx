import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BookOpen } from "lucide-react";

const Loading = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/login");
    }, 2500);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-between px-8 py-12">
      <div className="flex-1 flex flex-col items-center justify-center gap-8">
        <div className="bg-accent rounded-3xl p-8 mb-4">
          <BookOpen className="h-16 w-16 text-foreground" strokeWidth={1.5} />
        </div>
        
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold tracking-tight text-foreground">
            RYB
          </h1>
          <p className="text-lg text-muted-foreground">
            Read Your Bible
          </p>
        </div>

        <p className="text-center text-foreground max-w-xs mt-4">
          <span className="italic">Transform</span> Your Bible Reading Experience
        </p>

        <div className="mt-8 w-16 h-1 bg-foreground rounded-full" />
      </div>

      <p className="text-sm text-muted-foreground">
        Version 1.0.0
      </p>
    </div>
  );
};

export default Loading;
