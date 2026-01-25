import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Preview Your Birth Plan | Birth Plan Builder',
  description: 'Review your birth plan choices, select a template style, and enter your birth team information.',
}

export default function PreviewLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
