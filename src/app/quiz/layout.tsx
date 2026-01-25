import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Birth Plan Quiz | Birth Plan Builder',
  description: 'Answer questions about your birth preferences to create a personalized birth plan in minutes.',
  keywords: 'birth plan quiz, pregnancy planning, birth preferences, labor preferences, delivery plan',
}

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
