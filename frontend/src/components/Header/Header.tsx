import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useLocation, useNavigate } from "@tanstack/react-router";

const Header: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  const updateLoginStatus = () => {
    setIsLoggedIn(!!localStorage.getItem("token"));
  };
  
  useEffect(() => {
    window.addEventListener("storage", updateLoginStatus);
    return () => window.removeEventListener("storage", updateLoginStatus);
  }, []);

  useEffect(() => {
    const protectedRoutes = ["/account/profile", "/account/bookings"];
    if (!isLoggedIn && protectedRoutes.includes(location.pathname)) {
      navigate({ to: "/account/login" });
    }
  }, [isLoggedIn, location.pathname, navigate]);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Är du säker på att du vill logga ut?");
    if (confirmLogout) {
      localStorage.removeItem("token");
      setIsLoggedIn(false); 
      window.location.reload();
      navigate({ to: "/account/login" }); 
    }
  };

  return (
    <Card className="w-full bg-black text-white mb-6">
      <CardHeader className="flex-row justify-between items-center px-4 py-6">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <Button variant="ghost" className="text-white">
              MENY
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigate({ to: "/homepage" })}>
              HEM
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate({ to: "/screenings/1" })}>
              VISNINGAR
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate({ to: "/movies/2" })}>
              FILMER
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate({ to: "/search" })}>
              SÖK
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <img src="../img/Logo.png" alt="Cinecom Logo" className="h-12 cursor-pointer" onClick={() => navigate({ to: "/homepage"})} />

        <div className="flex space-x-6 items-center">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="text-white">
                MEDLEM
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => navigate({ to: "/account/profile" })}>
                PROFIL
              </DropdownMenuItem>
              {!isLoggedIn ? (
                <>
                  <DropdownMenuItem onClick={() => navigate({ to: "/account/register" })}>
                    REGISTRERA ANVÄNDARE
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => navigate({ to: "/account/login" })}>
                    LOGGA IN
                  </DropdownMenuItem>
                </>
              ) : (
                <DropdownMenuItem onClick={handleLogout}>
                  LOGGA UT
                </DropdownMenuItem>
              )}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
    </Card>
  );
};

export default Header;
