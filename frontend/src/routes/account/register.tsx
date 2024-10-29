import { createFileRoute } from '@tanstack/react-router'
import RegisterForm from 'src/components/pages/RegisterForm'

export const Route = createFileRoute('/account/register')({
  component: () => <RegisterForm />,
})
