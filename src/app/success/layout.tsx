import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Birth Plan Sent! | Birth Plan Builder',
  description: 'Your birth plan has been sent to your email. Check your inbox for your personalized PDF.',
}

export default function SuccessLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
