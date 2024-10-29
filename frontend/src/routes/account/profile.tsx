import { createFileRoute } from '@tanstack/react-router'
import Profile from 'src/components/pages/Profile'

export const Route = createFileRoute('/account/profile')({
  component: () => <Profile />,
})
