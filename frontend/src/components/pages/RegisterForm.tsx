import React, { useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "@radix-ui/react-label";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useNavigate } from "@tanstack/react-router";

const RegisterForm = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstname: "",
    lastname: "",
    phone: "",
    role: "user", // default role
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
      const response = await fetch("/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "An error occurred");
        return;
      }

      setSuccess(true);

      navigate({ to: "/account/login" });

    } catch (error) {
      setError("Failed to register user");
      console.error("Registration error:", error);
    }
  };

  return (
    <Card className="bg-primary w-full max-w-lg mx-auto">
      <CardHeader>
        <CardTitle className="text-white">Registrera som medlem.</CardTitle>
      </CardHeader>
      <CardContent>
        {error && <p className="text-red-500">{error}</p>}
        {success && <p className="text-green-500">User registered successfully!</p>}
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <Label htmlFor="firstname" className="text-white">Förnamn</Label>
              <Input className="bg-white"
                id="firstname"
                type="text"
                name="firstname"
                placeholder="Förnamn"
                value={formData.firstname}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="lastname" className="text-white">Efternamn</Label>
              <Input className="bg-white"
                id="lastname"
                type="text"
                name="lastname"
                placeholder="Efternamn"
                value={formData.lastname}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="email" className="text-white">Mail</Label>
              <Input className="bg-white"
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
              <Label htmlFor="phone" className="text-white">Telefon</Label>
              <Input className="bg-white"
                id="phone"
                type="tel"
                name="phone"
                placeholder="Telefon"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <Label htmlFor="password" className="text-white">Lösenord</Label>
              <Input className="bg-white"
                id="password"
                type="password"
                name="password"
                placeholder="Lösenord"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <Button variant="outline" className="text-white">Registrera</Button>

          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default RegisterForm;
