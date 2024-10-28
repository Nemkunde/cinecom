import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

   const handleLogout = () => {
    const confirmLogout = window.confirm("Är du säker på att du vill logga ut?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate({ to: "/account/login" });
    }
  };

  return (
    <Button onClick={handleLogout} variant="outline" className="text-white mt-4">
      Logga ut
    </Button>
  );
};

export default LogoutButton;
