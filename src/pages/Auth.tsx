import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { PhoneShell } from "@/components/PhoneShell";
import { BharLogo } from "@/components/BharLogo";
import { Loader2 } from "lucide-react";

const Auth = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: `${window.location.origin}/role`,
            data: { full_name: name },
          },
        });
        if (error) throw error;
        toast.success("Welcome to BHAR!");
        navigate("/role", { replace: true });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success("Welcome back!");
        navigate("/app", { replace: true });
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: { redirectTo: `${window.location.origin}/app` },
    });
    if (error) toast.error(error.message);
  };

  return (
    <PhoneShell>
      <div className="flex flex-col h-full min-h-screen md:min-h-[820px] bg-gradient-to-b from-secondary to-background">
        <div className="bg-gradient-hero pt-12 pb-10 px-7 text-secondary-foreground rounded-b-[2.5rem]">
          <BharLogo size={48} />
          <h1 className="mt-6 font-display text-3xl font-bold leading-tight">
            {mode === "login" ? "Welcome back," : "Create account,"}
            <br />
            <span className="text-primary">{mode === "login" ? "ride on." : "join BHAR."}</span>
          </h1>
          <p className="mt-2 text-sm text-white/60">
            {mode === "login" ? "Sign in to manage your BHAR EV." : "Start earning or subscribing in minutes."}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="flex-1 flex flex-col px-7 pt-7 pb-8 gap-4">
          {mode === "signup" && (
            <div className="space-y-1.5">
              <Label htmlFor="name">Full name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Rajesh Kumar"
                className="h-12 rounded-xl"
                required
              />
            </div>
          )}
          <div className="space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@bhar.in"
              className="h-12 rounded-xl"
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              className="h-12 rounded-xl"
              minLength={6}
              required
            />
          </div>

          <Button
            type="submit"
            disabled={loading}
            size="lg"
            className="mt-2 h-14 rounded-full bg-gradient-primary text-primary-foreground shadow-glow hover:opacity-95"
          >
            {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : mode === "login" ? "Sign In" : "Create Account"}
          </Button>

          <div className="flex items-center gap-3 my-1">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">OR</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          <Button type="button" variant="outline" className="h-12 rounded-full" onClick={handleGoogle}>
            <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.97 10.97 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </Button>

          <p className="text-center text-sm text-muted-foreground mt-2">
            {mode === "login" ? "New to BHAR?" : "Already have an account?"}{" "}
            <button
              type="button"
              className="font-semibold text-primary hover:underline"
              onClick={() => setMode(mode === "login" ? "signup" : "login")}
            >
              {mode === "login" ? "Create account" : "Sign in"}
            </button>
          </p>
        </form>
      </div>
    </PhoneShell>
  );
};

export default Auth;
