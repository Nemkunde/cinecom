import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/bookings/bookingconditions')({
  component: () => <div className='text-white'>Hello /bookings/bookingconditions!</div>,
})
