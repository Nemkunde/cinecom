import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "src/components/Context/AuthContext";
import RemoveBookingButton from "../Buttonlogic/DeleteBooking";

interface Booking {
  booking_id: number;
  customer_name: string;
  customer_email: string;
  screening_id: number;
  booking_date: string;
  status: string;
  total_price: number;
  booking_reference: string;
}

const BookingsList = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const { data, error, isLoading } = useQuery({
    queryKey: ["bookings"],
    queryFn: async () => {
      const response = await fetch("/api/bookings/allbookings");
      if (!response.ok) throw new Error("Failed to fetch bookings");
      return await response.json();
    },
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const bookings: Booking[] = data?.bookings || [];
  const userBookings = bookings.filter(
    (booking) => booking.customer_email === user?.email
  );

  return (
    <div>
      <h2>Mina Bokningar</h2>
      {userBookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <ul>
          {userBookings.map((booking) => (
            <li key={booking.booking_id} className="border p-4 mb-4">
              <p>Visning: {booking.screening_id}</p>
              <p>Date: {new Date(booking.booking_date).toLocaleDateString()}</p>
              <p>Totalpris: {booking.total_price}</p>
              <p>Status: {booking.status}</p>
              <p>Bokningsnummer: {booking.booking_reference}</p>


              <RemoveBookingButton
                bookingId={booking.booking_id}
                onDelete={() => queryClient.invalidateQueries({ queryKey: ["bookings"] })}
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default BookingsList;
