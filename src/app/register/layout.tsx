import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Complete Your Birth Plan | Birth Plan Builder',
  description: 'Create your account to receive your personalized birth plan PDF via email.',
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
