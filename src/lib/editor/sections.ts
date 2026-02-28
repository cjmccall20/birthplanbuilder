import type { EditorSection, EditorSectionId, BirthType, BirthVenue } from './editorTypes'

export const EDITOR_SECTIONS: EditorSection[] = [
  {
    id: 'pre_hospital',
    title: 'Pre-Hospital Arrival',
    description: 'Preferences for before you arrive at the hospital or birth center',
    icon: 'Home',
  },
  {
    id: 'during_labor',
    title: 'During Labor',
    description: 'How you want your labor to be managed',
    icon: 'Activity',
  },
  {
    id: 'at_birth',
    title: 'At & Immediately After Birth',
    description: 'Preferences for the moment of birth and the first hour',
    icon: 'Baby',
  },
  {
    id: 'newborn_procedures',
    title: 'Newborn Procedures',
    description: 'Medical procedures and tests for your baby',
    icon: 'Stethoscope',
  },
  {
    id: 'hospital_stay',
    title: 'Hospital Stay',
    description: 'Preferences for your time in the hospital after birth',
    icon: 'Building',
  },
  {
    id: 'csection',
    title: 'In Case of C-Section',
    description: 'Preferences if a cesarean becomes necessary',
    icon: 'Heart',
  },
]

export const SECTION_ORDER: EditorSectionId[] = [
  'pre_hospital',
  'during_labor',
  'at_birth',
  'newborn_procedures',
  'hospital_stay',
  'csection',
]

// Per-birth-type section overrides: visibility, display title, and display order
interface SectionOverride {
  visible: boolean
  title?: string
  order: number
}

export const BIRTH_TYPE_SECTIONS: Record<BirthType, Record<EditorSectionId, SectionOverride>> = {
  vaginal: {
    pre_hospital: { visible: true, order: 0 },
    during_labor: { visible: true, order: 1 },
    at_birth: { visible: true, order: 2 },
    newborn_procedures: { visible: true, order: 3 },
    hospital_stay: { visible: true, order: 4 },
    csection: { visible: true, title: 'In Case of C-Section', order: 5 },
  },
  planned_csection: {
    pre_hospital: { visible: true, order: 0 },
    during_labor: { visible: false, order: 99 },
    csection: { visible: true, title: 'My C-Section', order: 1 },
    at_birth: { visible: true, title: 'After Delivery', order: 2 },
    newborn_procedures: { visible: true, order: 3 },
    hospital_stay: { visible: true, order: 4 },
  },
}

// Venue-based section title overrides (applied on top of birth-type titles)
export const VENUE_TITLE_OVERRIDES: Record<'birth_center' | 'home', Partial<Record<EditorSectionId, string>>> = {
  birth_center: {
    pre_hospital: 'Pre-Birth Center Arrival',
    hospital_stay: 'If You Transfer to Hospital',
  },
  home: {
    pre_hospital: 'Pre-Birth Preparations',
    hospital_stay: 'If You Transfer to Hospital',
    csection: 'In Case of Hospital Transfer / C-Section',
  },
}

// Get visible sections in order for a given birth type
export function getSectionsForBirthType(
  birthType: BirthType,
  birthVenue?: BirthVenue | null
): Array<EditorSection & { displayTitle: string }> {
  const overrides = BIRTH_TYPE_SECTIONS[birthType]
  const venueOverrides = birthVenue && birthVenue !== 'hospital'
    ? VENUE_TITLE_OVERRIDES[birthVenue] : undefined
  return EDITOR_SECTIONS
    .filter(s => overrides[s.id].visible)
    .sort((a, b) => overrides[a.id].order - overrides[b.id].order)
    .map(s => ({
      ...s,
      displayTitle: venueOverrides?.[s.id] || overrides[s.id].title || s.title,
    }))
}

export function getSectionById(id: EditorSectionId): EditorSection | undefined {
  return EDITOR_SECTIONS.find(s => s.id === id)
}
