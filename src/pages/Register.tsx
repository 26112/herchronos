
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Register = () => {
  const [userId, setUserId] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    if (!userId || !email || !password) {
      toast({ title: "All fields are required", description: "Please fill in all fields." });
      return;
    }

    // Store in localStorage (for demo purposes)
    localStorage.setItem("demoUserRegistration", JSON.stringify({ userId, email, password }));
    toast({ title: "Registered!", description: "Registration data stored locally for demo." });

    setUserId("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted px-4">
      <Card className="max-w-md w-full shadow-lg border-2">
        <CardHeader>
          <CardTitle>Create an Account</CardTitle>
          <CardDescription>
            Register with your User ID, Email, and Password
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="space-y-4">
            <div>
              <Label htmlFor="user-id">User ID</Label>
              <Input
                id="user-id"
                value={userId}
                onChange={e => setUserId(e.target.value)}
                placeholder="Enter User ID"
                autoComplete="username"
                required
              />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
                required
              />
            </div>
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="Enter Password"
                autoComplete="new-password"
                required
              />
            </div>
            <Button type="submit" className="w-full mt-2">Register</Button>
            <div className="text-center text-sm mt-3 text-muted-foreground">
              Already have an account? <Link to="/" className="text-periodpal-primary hover:underline">Go Home</Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default Register;
