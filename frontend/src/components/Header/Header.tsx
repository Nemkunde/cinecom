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
  const [showConfirm, setShowConfirm] = useState(false);

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
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate({ to: "/account/login" });
    window.location.reload();
  };

  return (
    <Card className="w-full bg-black text-white mb-6">
      <CardHeader className="flex-row justify-evenly items-center px-4 py-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-[#F8C496] mt-1.5">
              MENY
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem onClick={() => navigate({ to: "/" })}>
              HEM
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate({ to: "/search" })}>
              SÖK
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => navigate({ to: "/bookings/bookingconditions" })}
            >
              BOKNINGSVILLKOR
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate({ to: "/giftcard" })}>
              PRESENTKORT
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate({ to: "/about" })}>
              OM OSS
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <img
          src="../img/Logo.png"
          alt="Cinecom Logo"
          className="h-12 cursor-pointer"
          onClick={() => navigate({ to: "/" })}
        />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="text-[#F8C496]">
              MEDLEM
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onClick={() => navigate({ to: "/account/profile" })}
            >
              PROFIL
            </DropdownMenuItem>
            {!isLoggedIn ? (
              <>
                <DropdownMenuItem
                  onClick={() => navigate({ to: "/account/register" })}
                >
                  REGISTRERA ANVÄNDARE
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => navigate({ to: "/account/login" })}
                >
                  LOGGA IN
                </DropdownMenuItem>
              </>
            ) : (
              <DropdownMenuItem onClick={() => setShowConfirm(true)}>
                LOGGA UT
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Card className="w-full max-w-sm bg-[#121D3B] text-white">
            <CardHeader>
              <p className="text-center">
                Är du säker på att du vill logga ut?
              </p>
            </CardHeader>
            <div className="flex justify-end gap-2 mt-4 p-4">
              <Button
                variant="outline"
                className="bg-gray-500 text-white"
                onClick={() => setShowConfirm(false)}
              >
                Avbryt
              </Button>
              <Button
                variant="outline"
                className="bg-[#B71313] text-white"
                onClick={handleLogout}
              >
                Logga ut
              </Button>
            </div>
          </Card>
        </div>
      )}
    </Card>
  );
};

export default Header;
