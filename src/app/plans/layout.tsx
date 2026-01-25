import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'My Birth Plans | Birth Plan Builder',
  description: 'View and manage your saved birth plans. Create new plans or edit existing ones.',
}

export default function PlansLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
