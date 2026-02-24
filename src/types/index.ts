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

export interface BirthTeamField {
  id: string        // 'mother', 'partner', 'provider', 'hospital', 'doula', or generated UUID
  label: string     // User-editable: "Mother", "Partner", "Provider", "Hospital", "Doula", or custom
  value: string
  isDefault: boolean  // true for the 5 standard fields, false for user-added
  sortOrder: number
}

export interface BirthTeam {
  fields: BirthTeamField[]
  due_date?: string
  // Backward-compatible flat accessors (deprecated - use fields array instead)
  // Populated by migrateBirthTeam for existing consumers.
  // Will be removed once all consumers migrate to fields array.
  mother_name?: string
  partner_name?: string
  provider_name?: string
  provider_type?: string
  doula_name?: string
  hospital_name?: string
}

// Migration function to convert old flat BirthTeam format to new field array format
export function migrateBirthTeam(old: any): BirthTeam {
  // If already new format, return as-is
  if (old && Array.isArray(old.fields)) return old as BirthTeam

  // Convert flat format to field array
  const fields: BirthTeamField[] = [
    { id: 'mother', label: 'Mother', value: old?.mother_name || '', isDefault: true, sortOrder: 0 },
    { id: 'partner', label: 'Partner', value: old?.partner_name || '', isDefault: true, sortOrder: 1 },
    { id: 'provider', label: 'Provider', value: old?.provider_name || '', isDefault: true, sortOrder: 2 },
    { id: 'hospital', label: 'Facility', value: old?.hospital_name || '', isDefault: true, sortOrder: 3 },
    { id: 'doula', label: 'Doula', value: old?.doula_name || '', isDefault: true, sortOrder: 4 },
  ]

  return {
    fields,
    due_date: old?.due_date,
    // Populate backward-compatible flat properties
    mother_name: old?.mother_name || '',
    partner_name: old?.partner_name || '',
    provider_name: old?.provider_name || '',
    provider_type: old?.provider_type || '',
    doula_name: old?.doula_name || '',
    hospital_name: old?.hospital_name || '',
  }
}

// Helper to create a default empty BirthTeam
export function createDefaultBirthTeam(): BirthTeam {
  return migrateBirthTeam({})
}

// Helper to get a field value by ID (for backward-compatible access)
export function getBirthTeamFieldValue(team: BirthTeam, fieldId: string): string {
  return team.fields.find(f => f.id === fieldId)?.value || ''
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
  stances?: Record<string, 'desired' | 'declined' | 'cautious' | null>
  birthTeam: BirthTeam
  templateStyle: string
  sessionId: string
  plannedBirthType?: 'csection' | 'vaginal' | 'unsure'
  babyName?: string
  babySex?: string
  isMultiples?: boolean
}

export type TemplateStyle = 'minimal' | 'floral' | 'professional' | 'elegant' | 'rustic' | 'botanical' | 'ocean' | 'boho' | 'printer'

export const templateStyles: { id: TemplateStyle; name: string; description: string }[] = [
  { id: 'minimal', name: 'Minimal', description: 'Clean, modern design with lots of whitespace' },
  { id: 'floral', name: 'Floral', description: 'Soft colors with delicate floral accents' },
  { id: 'professional', name: 'Professional', description: 'Formal, medical-style formatting' },
  { id: 'elegant', name: 'Elegant', description: 'Sophisticated with subtle gold accents' },
  { id: 'rustic', name: 'Rustic', description: 'Earth tones with a natural feel' },
  { id: 'botanical', name: 'Botanical', description: 'Fresh greens with leafy watercolor touches' },
  { id: 'ocean', name: 'Ocean', description: 'Calming coastal blues and soft waves' },
  { id: 'boho', name: 'Boho', description: 'Warm terracotta tones with modern flair' },
  { id: 'printer', name: 'Print-Friendly', description: 'Black & white with clean lines for printing' },
]
