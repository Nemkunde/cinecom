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
        setError(errorData.error || "Inloggning misslyckades, vänligen försök igen.");
        return;
      }

      const result = await response.json();
      localStorage.setItem("token", result.token); 
      setSuccess(true);

      
      window.dispatchEvent(new Event("storage")); 

      navigate({ to: "/" });
      setTimeout(() => window.location.reload(), 0);


      

    } catch (error) {
      setError("Inloggning misslyckades, vänligen försök igen.");
      console.error("Login error:", error);
    }
  };

  return (
    <Card className="bg-[#121D3B] w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-white">Logga in</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">Inloggning lyckades!</p>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="email" className="text-white">Mail</Label>
              <Input
                className="bg-white"
                id="email"
                type="email"
                name="email"
                placeholder="Mail"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div>
  <Label htmlFor="password" className="text-white">Lösenord</Label>
  <Input
    className="bg-white"
    id="password"
    type="password"
    name="password"
    placeholder="Lösenord"
    value={formData.password}
    onChange={handleChange}
    required
    pattern="^(?=.*[A-Za-z])(?=.*[\d\W])[A-Za-z\d\W]{8,}$"
    title="Lösenord måste vara minst 8 tecken långt och innehålla en bokstav samt antingen en siffra eller ett specialtecken." 
  />
</div>


            <Button variant="outline" className="text-white bg-[#B71313]" type="submit">
              Logga in
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
