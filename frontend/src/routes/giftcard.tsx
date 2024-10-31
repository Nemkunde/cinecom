import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/giftcard')({
  component: () => <div>Hello /giftcard!</div>,
})
