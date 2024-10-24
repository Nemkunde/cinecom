import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/screenings/')({
  component: () => <div>Hello /screenings/!</div>,
})
