import React from "react";
import { Card, CardHeader} from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { useNavigate } from "@tanstack/react-router";


const Header: React.FC = () => {
  const navigate = useNavigate();
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
              <DropdownMenuItem onClick={() => navigate({to: "/screenings"})}>
                VISNINGAR
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({to: "/movies"})}>
                FILMER
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <img
            src="../img/Logo.png"
            alt="Cinecom Logo"
            className="h-12"
          />
          

        <div className="flex space-x-6 items-center">
          

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="text-white">
                MEDLEM
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => navigate({to: "/account/profile"})}>
                PROFIL
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({to: "/account/register"})}>
                REGISTRERA ANVÄNDARE
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({to: "/account/login"})}>
                LOGGA IN
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          
        </div>
      </CardHeader>
    </Card>
  );
};

export default Header;
