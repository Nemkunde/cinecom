import { createFileRoute } from '@tanstack/react-router'
import Hero from 'src/components/Hero/Hero'

export const Route = createFileRoute('/homepage')({
  component: () => <Hero />,
})
