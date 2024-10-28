import { createFileRoute } from '@tanstack/react-router'
import LoginForm from 'src/components/pages/LoginForm'

export const Route = createFileRoute('/account/login')({
  component: () => <LoginForm />,
})
