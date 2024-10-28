import React from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";

const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to log out?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      navigate({ to: "/account/login" }); 
; 
    }
  };

  return (
    <Button onClick={handleLogout} variant="outline">
      Logout
    </Button>
  );
};

export default LogoutButton;
