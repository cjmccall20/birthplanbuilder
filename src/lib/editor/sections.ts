import type { EditorSection, EditorSectionId } from './editorTypes'

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

export function getSectionById(id: EditorSectionId): EditorSection | undefined {
  return EDITOR_SECTIONS.find(s => s.id === id)
}
