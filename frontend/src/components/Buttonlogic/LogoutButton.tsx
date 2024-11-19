import React, { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const LogoutButton: React.FC = () => {
  const [showConfirm, setShowConfirm] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    setShowConfirm(false);
    navigate({ to: "/account/login" });
    window.location.reload();
  };

  const openConfirmation = () => setShowConfirm(true);
  const closeConfirmation = () => setShowConfirm(false);

  return (
    <div>
      <Button onClick={openConfirmation} variant="outline" className="text-white mt-4 bg-[#B71313]">
        Logga ut
      </Button>

      {showConfirm && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <Card className="w-full max-w-sm bg-[#121D3B] text-white">
            <CardHeader>
              <CardTitle>Bekräftelse</CardTitle>
            </CardHeader>
            <CardContent>
              <p>Är du säker på att du vill logga ut?</p>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" className="bg-gray-500 text-white" onClick={closeConfirmation}>
                  Avbryt
                </Button>
                <Button variant="outline" className="bg-[#B71313] text-white" onClick={handleLogout}>
                  Logga ut
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default LogoutButton;
