import { useState, useEffect } from "react";
import { Card, CardContent } from "../ui/card";
import LogoutButton from "../Buttonlogic/LogoutButton";
import RemoveBookingButton from "../Buttonlogic/DeleteBooking";

const Profile = () => {
  const [profile, setProfile] = useState<any>(null);
  const [activeTab, setActiveTab] = useState("profile");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch("/auth/profile", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (response.ok) {
          const data = await response.json();
          setProfile(data.user);
        } else {
          console.error("Failed to fetch profile");
        }
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) {
    return <p className="text-white">Loading profile...</p>;
  }

  return (
    <Card className="bg-primary w-full max-w-lg mx-auto">
      
      <div className="flex justify-around bg-primary text-white m-2">
        <button
          className={`py-2 px-4 ${activeTab === "profile" ? "font-bold border-b-2" : ""}`}
          onClick={() => setActiveTab("profile")}
        >
          Profil
        </button>
        <button
          className={`py-2 px-4 ${activeTab === "bookings" ? "font-bold border-b-2" : ""}`}
          onClick={() => setActiveTab("bookings")}
        >
          Bokningar
        </button>
        <button
          className={`py-2 px-4 ${activeTab === "bookingHistory" ? "font-bold border-b-2" : ""}`}
          onClick={() => setActiveTab("bookingHistory")}
        >
          Bokningshistorik
        </button>
      </div>
      <CardContent className="">
        {activeTab === "profile" && (
          <div className="text-white p-2">
            <p>Namn: {profile.firstname} {profile.lastname}</p>
            <p>Mail: {profile.email}</p>
            <p>Roll: {profile.role}</p>
            <LogoutButton />
          </div>
        )}
        {activeTab === "bookings" && (
          <div className="text-white p-2">
            <p>Bokningar.</p>
            <RemoveBookingButton bookingId={0} />
            <LogoutButton />
          </div>
        )}
        {activeTab === "bookingHistory" && (
          <div className="text-white p-2">
            <p>Bokningshistorik.</p>
            <LogoutButton />
          </div>
        )}
      </CardContent>
    </Card>
  );
};
export default Profile;
