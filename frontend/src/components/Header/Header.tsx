import React from "react";
import { Card, CardHeader, CardTitle } from "../ui/card";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { Search } from "lucide-react"; 
import { useNavigate } from "@tanstack/react-router";

const Header: React.FC = () => {
  const navigate = useNavigate();
  return (
    <Card className="w-full bg-black text-white mb-6">
      <CardHeader className="flex-row justify-between items-center px-4 py-6">
        <div className="flex items-center space-x-4">
          <img
            src="/path-to-logo.png"
            alt="Cinecom Logo"
            className="h-8"
          />
          <CardTitle className="text-2xl font-bold tracking-wide">CINECOM</CardTitle>
          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="text-white">
                MENY
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => console.log("Action 1")}>Action 1</DropdownMenuItem>
              <DropdownMenuItem onClick={() => console.log("Action 2")}>Action 2</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        <div className="flex space-x-6 items-center">
          

          <DropdownMenu>
            <DropdownMenuTrigger>
              <Button variant="ghost" className="text-white">
                MEDLEMSINLOGGNING
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => navigate({to: "/account/profile"})}>
                PROFILE
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({to: "/account/register"})}>
                REGISTER
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate({to: "/account/login"})}>
                LOGIN
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          <Search className="h-6 w-6 cursor-pointer" />
        </div>
      </CardHeader>
    </Card>
  );
};

export default Header;
