import { useQuery, useQueryClient } from "@tanstack/react-query";
import RemoveBookingButton from "../Buttonlogic/DeleteBooking";

interface Booking {
  booking_id: number;
  customer_name: string;
  customer_email: string;
  screening_id: number;
  booking_date: string;
  status: string;
  total_price: number;
}

const BookingsList = () => {
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

  return (
    <div>
      <h2>Bookings</h2>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.booking_id} className="border p-4 mb-4">
            <p>Customer: {booking.customer_name}</p>
            <p>Email: {booking.customer_email}</p>
            <p>Screening: {booking.screening_id}</p>
            <p>Date: {new Date(booking.booking_date).toLocaleDateString()}</p>
            <p>Total Price: {booking.total_price}</p>
            <p>Status: {booking.status}</p>
            <RemoveBookingButton 
              bookingId={booking.booking_id} 
              onDelete={() => queryClient.invalidateQueries({ queryKey: ["bookings"] })} 
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookingsList;
