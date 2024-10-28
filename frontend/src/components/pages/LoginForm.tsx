import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "@tanstack/react-router";

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Login failed");
        return;
      }

      const result = await response.json();
      setSuccess(true);
      navigate({ to: "/account/profile" }); 

      localStorage.setItem("token", result.token);
    } catch (error) {
      setError("Failed to log in");
      console.error("Login error:", error);
    }
  };

  return (
    <Card className="w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle>Login</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Login successful!</p>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

            <Button variant="outline">Login</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
