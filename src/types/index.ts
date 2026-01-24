export interface User {
  id: string
  email: string
  name: string | null
  due_date: string | null
  lifecycle_stage: string | null
  marketing_consent: boolean
  created_at: string
  updated_at: string
}

export interface BirthPlan {
  id: string
  user_id: string | null
  session_id: string
  template_style: string
  birth_team: BirthTeam | null
  custom_notes: Record<string, string> | null
  status: 'draft' | 'completed' | 'sent'
  created_at: string
  updated_at: string
}

export interface BirthTeam {
  mother_name: string
  partner_name?: string
  provider_name?: string
  provider_type?: string
  doula_name?: string
  hospital_name?: string
  due_date?: string
}

export interface Decision {
  id: string
  birth_plan_id: string
  decision_key: string
  answer: string
  custom_note: string | null
  created_at: string
}

export interface QuizState {
  currentStep: number
  answers: Record<string, string>
  customNotes: Record<string, string>
  birthTeam: BirthTeam
  templateStyle: string
  sessionId: string
  plannedBirthType?: 'csection' | 'vaginal' | 'unsure'
}

export type TemplateStyle = 'minimal' | 'floral' | 'professional' | 'elegant' | 'rustic'

export const templateStyles: { id: TemplateStyle; name: string; description: string }[] = [
  { id: 'minimal', name: 'Minimal', description: 'Clean, modern design with lots of whitespace' },
  { id: 'floral', name: 'Floral', description: 'Soft colors with delicate floral accents' },
  { id: 'professional', name: 'Professional', description: 'Formal, medical-style formatting' },
  { id: 'elegant', name: 'Elegant', description: 'Sophisticated with subtle gold accents' },
  { id: 'rustic', name: 'Rustic', description: 'Earth tones with a natural feel' },
]
