import type { QuizState, TemplateStyle } from '@/types'
import { createDefaultBirthTeam } from '@/types'
import type { EditorState, EditorSectionId, PreferenceValue, EditorSectionState, BirthType } from './editorTypes'
import { PREFERENCES, getPreferencesBySection } from './preferences'
import { SECTION_ORDER } from './sections'
import { quizQuestions } from '@/lib/quiz/questions'

// ---------------------------------------------------------------------------
// Quiz-to-preference mapping table
// Maps each quiz question ID to the editor preference it sets.
// `valueMap` translates quiz option values to preference option values when they differ.
// ---------------------------------------------------------------------------

interface QuizMapping {
  preferenceId: string
  sectionId: EditorSectionId
  valueMap?: Record<string, string>
}

const QUIZ_TO_PREFERENCE: Record<string, QuizMapping> = {
  // Pre-Hospital
  when_to_hospital: {
    preferenceId: 'when_to_hospital',
    sectionId: 'pre_hospital',
  },
  birth_photography: {
    preferenceId: 'photography_video',
    sectionId: 'pre_hospital',
    valueMap: {
      photos_video: 'partner',
      photos_only: 'partner',
      after_only: 'partner',
      no: 'none',
    },
  },
  csection_photography: {
    preferenceId: 'csection_photos',
    sectionId: 'csection',
    valueMap: {
      photos_video: 'yes',
      photos_only: 'yes',
      after_only: 'yes',
      no: 'no',
    },
  },

  // During Labor
  pain_approach: {
    preferenceId: 'pain_management',
    sectionId: 'during_labor',
    // Quiz: natural/open/epidural -> Pref has same values plus 'nitrous'
  },
  fetal_monitoring: {
    preferenceId: 'fetal_monitoring',
    sectionId: 'during_labor',
  },
  movement_labor: {
    preferenceId: 'movement_positions',
    sectionId: 'during_labor',
    valueMap: {
      very_important: 'freedom',
      somewhat: 'upright',
      not_priority: 'bed',
    },
  },

  // During Labor (new)
  iv_preference: {
    preferenceId: 'iv_preference',
    sectionId: 'during_labor',
    // Quiz and pref share: iv, heplock, neither
  },
  eating_drinking: {
    preferenceId: 'eating_drinking',
    sectionId: 'during_labor',
    // Quiz and pref share: yes, clear_liquids, follow_policy
  },
  labor_environment: {
    preferenceId: 'labor_environment',
    sectionId: 'during_labor',
    // Quiz and pref share: dim_quiet, music, aromatherapy, standard
  },
  medical_students: {
    preferenceId: 'medical_students',
    sectionId: 'during_labor',
    // Quiz and pref share: welcome, prefer_not, ask_first
  },
  gbs_antibiotics: {
    preferenceId: 'gbs_antibiotics',
    sectionId: 'during_labor',
    // Quiz and pref share: accept, decline, natural
  },
  pushing_positions: {
    preferenceId: 'pushing_position',
    sectionId: 'during_labor',
    // Quiz and pref share: freedom, upright, standard
  },

  // At Birth
  golden_hour: {
    preferenceId: 'golden_hour',
    sectionId: 'at_birth',
    valueMap: {
      protected: 'protected',
      partner_backup: 'protected', // Maps to golden hour protected; skin_to_skin handled separately below
      flexible: 'flexible',
    },
  },
  cord_clamping: {
    preferenceId: 'cord_clamping',
    sectionId: 'at_birth',
    // Quiz and pref share: 1min, 3-5min, until_stops, immediate
  },
  who_cuts_cord: {
    preferenceId: 'who_cuts_cord',
    sectionId: 'at_birth',
    // Quiz and pref share: partner, mother, provider
  },
  cord_blood: {
    preferenceId: 'cord_blood_banking',
    sectionId: 'at_birth',
    // Quiz and pref share: private, public, no
  },
  placenta: {
    preferenceId: 'placenta',
    sectionId: 'at_birth',
    // Quiz and pref share: dispose, encapsulate, keep
  },

  // Newborn Procedures
  vitamin_k: {
    preferenceId: 'vitamin_k',
    sectionId: 'newborn_procedures',
  },
  eye_ointment: {
    preferenceId: 'eye_ointment',
    sectionId: 'newborn_procedures',
  },
  hep_b_vaccine: {
    preferenceId: 'hep_b_vaccine',
    sectionId: 'newborn_procedures',
  },
  // Newborn Procedures (new)
  newborn_screening: {
    preferenceId: 'newborn_screening',
    sectionId: 'newborn_procedures',
    // Quiz and pref share: accept, decline
  },
  hearing_test: {
    preferenceId: 'hearing_test',
    sectionId: 'newborn_procedures',
    // Quiz and pref share: accept, decline
  },
  procedure_timing: {
    preferenceId: 'procedure_timing',
    sectionId: 'newborn_procedures',
    // Quiz and pref share: delay_golden_hour, ask_first, standard
  },

  bath_timing: {
    preferenceId: 'bath_timing',
    sectionId: 'newborn_procedures',
    valueMap: {
      '24hrs': '24hrs',
      '48hrs': '48hrs',
      parents_give: 'parents_only',
      hospital_timing: 'hospital_recommend',
    },
  },
  circumcision: {
    preferenceId: 'circumcision',
    sectionId: 'newborn_procedures',
    valueMap: {
      yes_hospital: 'yes',
      yes_provider: 'delayed',
      no: 'no',
    },
  },

  // Hospital Stay
  feeding: {
    preferenceId: 'feeding_support',
    sectionId: 'hospital_stay',
    valueMap: {
      breastfeed: 'breastfeed_only',
      open_supplement: 'lactation',
      combo: 'combo',
      formula: 'formula',
    },
  },
  rooming_in: {
    preferenceId: 'rooming_in',
    sectionId: 'hospital_stay',
    // Quiz has: 24_7, nursery_option, flexible (flexible won't match, but 24_7 and nursery_option do)
  },
  pacifier: {
    preferenceId: 'pacifier',
    sectionId: 'hospital_stay',
  },
  // Hospital Stay (new)
  length_of_stay: {
    preferenceId: 'length_of_stay',
    sectionId: 'hospital_stay',
    // Quiz and pref share: minimum, standard, extended
  },
  visitors: {
    preferenceId: 'visitors',
    sectionId: 'hospital_stay',
    valueMap: {
      welcome: 'open',
      limited: 'limited',
      after_home: 'no_visitors',
      case_by_case: 'limited',
    },
  },

  // C-Section
  csection_approach: {
    preferenceId: 'gentle_csection',
    sectionId: 'csection',
    valueMap: {
      gentle_family_centered: 'yes',
      standard_with_preferences: 'discuss',
      follow_medical_team: 'standard',
    },
  },
  csection_cord_clamping: {
    preferenceId: 'csection_delayed_cord',
    sectionId: 'csection',
    valueMap: {
      '60_seconds': 'yes',
      '90_seconds': 'yes',
      '5_minutes': 'yes',
      until_stops: 'yes',
      surgeon_protocol: 'standard',
    },
  },
  csection_vaginal_seeding: {
    preferenceId: 'vaginal_seeding',
    sectionId: 'csection',
    valueMap: {
      yes_plan: 'yes',
      interested_discuss: 'discuss',
      no: 'no',
    },
  },
}

// C-section details is a compound question that maps to multiple preferences
const CSECTION_DETAILS_MAP: Record<string, Array<{ preferenceId: string; sectionId: EditorSectionId; value: string }>> = {
  clear_drape_skin_to_skin: [
    { preferenceId: 'clear_drape', sectionId: 'csection', value: 'yes' },
    { preferenceId: 'csection_skin_to_skin', sectionId: 'csection', value: 'immediate' },
  ],
  partner_present_photos: [
    { preferenceId: 'partner_presence_csection', sectionId: 'csection', value: 'required' },
    { preferenceId: 'csection_photos', sectionId: 'csection', value: 'yes' },
  ],
  music_narration: [
    { preferenceId: 'csection_music', sectionId: 'csection', value: 'yes' },
  ],
  standard_procedure: [],
}

// C-section comfort is a compound question that maps to individual comfort preferences
const CSECTION_COMFORT_MAP: Record<string, Array<{ preferenceId: string; sectionId: EditorSectionId; value: string }>> = {
  arms_free: [
    { preferenceId: 'csection_arm_mobility', sectionId: 'csection', value: 'not_strapped' },
  ],
  music_in_or: [
    { preferenceId: 'csection_music', sectionId: 'csection', value: 'yes' },
  ],
  surgeon_narrates: [
    { preferenceId: 'csection_explanation', sectionId: 'csection', value: 'narrate' },
  ],
  standard_fine: [],
}

// Engagement-only quiz questions that don't map to preferences
// Their answers are used for personalization, not editor preferences
const ENGAGEMENT_ONLY_QUESTIONS = new Set([
  'planned_birth_type',
  'baby_sex',
  'baby_name',
  'facility_name',
  'due_date',
])

// Try to parse a JSON array checklist answer; returns null if not a checklist
function parseChecklistAnswer(answer: string): string[] | null {
  if (!answer.startsWith('[')) return null
  try {
    const parsed = JSON.parse(answer)
    if (Array.isArray(parsed) && parsed.every(v => typeof v === 'string')) return parsed
  } catch { /* not a checklist */ }
  return null
}

// ---------------------------------------------------------------------------
// Main mapping function
// ---------------------------------------------------------------------------

export function mapQuizToEditorState(quizState: QuizState): Partial<EditorState> {
  // Initialize ALL sections with ALL preferences (everything omitted by default)
  const sections = {} as Record<EditorSectionId, EditorSectionState>
  SECTION_ORDER.forEach(sectionId => {
    const prefs = getPreferencesBySection(sectionId)
    sections[sectionId] = {
      sectionId,
      preferences: prefs.map((pref, index) => {
        const defaultOption = pref.options.find(o => o.isPopular) || pref.options[0]
        return {
          preferenceId: pref.id,
          selectedOption: defaultOption?.value || null,
          isOmitted: true, // Start omitted, quiz answers will un-omit
          sortOrder: index,
        }
      }),
      customItems: [],
      notes: '',
    }
  })

  // Track which preferences were activated by the quiz for sort ordering
  const activatedOrder: Record<string, number> = {}
  let activationCounter = 0

  // Process each quiz answer
  Object.entries(quizState.answers).forEach(([questionId, answer]) => {
    if (!answer || answer === 'unsure') return
    if (ENGAGEMENT_ONLY_QUESTIONS.has(questionId)) return

    // Check if the selected option has omitFromPlan flag
    const questionDef = quizQuestions.find(q => q.id === questionId)
    const selectedOption = questionDef?.options.find(o => o.value === answer)
    if (selectedOption?.omitFromPlan) return

    // Handle golden_hour -> also set skin_to_skin preference
    if (questionId === 'golden_hour') {
      const ghValues = parseChecklistAnswer(answer)
      const ghAnswers = ghValues || [answer]
      if (ghAnswers.includes('protected')) {
        applyQuizAnswer(sections, 'at_birth', 'skin_to_skin', 'immediate')
        activatedOrder['skin_to_skin'] = activationCounter++
      } else if (ghAnswers.includes('partner_backup')) {
        applyQuizAnswer(sections, 'at_birth', 'skin_to_skin', 'partner_backup')
        activatedOrder['skin_to_skin'] = activationCounter++
      }
      // Don't return - let the standard mapping handle the golden_hour preference itself
    }

    // Determine if this is a custom/free-text answer (doesn't match any option value)
    const isCustomText = questionDef && !questionDef.options.some(o => o.value === answer)

    // Handle csection_details compound question (now multi-select)
    if (questionId === 'csection_details') {
      const values = parseChecklistAnswer(answer)
      if (values) {
        values.forEach(val => {
          const mappings = CSECTION_DETAILS_MAP[val]
          if (mappings) {
            mappings.forEach(({ preferenceId, sectionId, value }) => {
              applyQuizAnswer(sections, sectionId, preferenceId, value)
              activatedOrder[preferenceId] = activationCounter++
            })
          }
        })
      } else if (isCustomText) {
        const quizStance = quizState.stances?.[questionId]
        applyQuizAnswer(sections, 'csection', 'gentle_csection', 'yes', answer, quizStance)
        activatedOrder['gentle_csection'] = activationCounter++
      } else {
        const mappings = CSECTION_DETAILS_MAP[answer]
        if (mappings) {
          mappings.forEach(({ preferenceId, sectionId, value }) => {
            applyQuizAnswer(sections, sectionId, preferenceId, value)
            activatedOrder[preferenceId] = activationCounter++
          })
        }
      }
      return
    }

    // Handle csection_comfort compound question (now multi-select)
    if (questionId === 'csection_comfort') {
      const values = parseChecklistAnswer(answer)
      if (values) {
        values.forEach(val => {
          const mappings = CSECTION_COMFORT_MAP[val]
          if (mappings) {
            mappings.forEach(({ preferenceId, sectionId, value }) => {
              applyQuizAnswer(sections, sectionId, preferenceId, value)
              activatedOrder[preferenceId] = activationCounter++
            })
          }
        })
      } else {
        const mappings = CSECTION_COMFORT_MAP[answer]
        if (mappings) {
          mappings.forEach(({ preferenceId, sectionId, value }) => {
            applyQuizAnswer(sections, sectionId, preferenceId, value)
            activatedOrder[preferenceId] = activationCounter++
          })
        }
      }
      return
    }

    // Standard single-preference mapping
    const mapping = QUIZ_TO_PREFERENCE[questionId]
    if (!mapping) return

    const { preferenceId, sectionId, valueMap } = mapping

    // Handle multi-select checklist answers (JSON arrays)
    const checklistValues = parseChecklistAnswer(answer)
    if (checklistValues && checklistValues.length > 0) {
      // Use first value as the primary selection
      const primaryValue = checklistValues[0]
      const translatedPrimary = valueMap ? (valueMap[primaryValue] || primaryValue) : primaryValue
      // Build custom text from all selected options' birthPlanText
      const allTexts = checklistValues
        .map(v => questionDef?.options.find(o => o.value === v)?.birthPlanText)
        .filter(Boolean)
      const customText = allTexts.length > 1 ? allTexts.join('\n') : undefined
      applyQuizAnswer(sections, sectionId, preferenceId, translatedPrimary, customText)
      activatedOrder[preferenceId] = activationCounter++
      return
    }

    if (isCustomText) {
      // Free-text answer: use the first non-unsure option as the selected value, set customText
      const defaultOption = questionDef?.options.find(o => !o.isUnsure && o.value !== 'custom')
      const fallbackValue = defaultOption?.value || 'custom'
      const translatedFallback = valueMap ? (valueMap[fallbackValue] || fallbackValue) : fallbackValue
      const quizStance = quizState.stances?.[questionId]
      applyQuizAnswer(sections, sectionId, preferenceId, translatedFallback, answer, quizStance)
    } else {
      const translatedValue = valueMap ? (valueMap[answer] || answer) : answer
      applyQuizAnswer(sections, sectionId, preferenceId, translatedValue, quizState.customNotes?.[questionId])
    }
    activatedOrder[preferenceId] = activationCounter++
  })

  // Sort: quiz-activated preferences first (in quiz order), then omitted ones
  SECTION_ORDER.forEach(sectionId => {
    sections[sectionId].preferences.sort((a, b) => {
      const aActive = !a.isOmitted
      const bActive = !b.isOmitted
      if (aActive && !bActive) return -1
      if (!aActive && bActive) return 1
      if (aActive && bActive) {
        return (activatedOrder[a.preferenceId] ?? 999) - (activatedOrder[b.preferenceId] ?? 999)
      }
      return a.sortOrder - b.sortOrder
    })
    // Re-assign sortOrder after sorting
    sections[sectionId].preferences.forEach((p, i) => { p.sortOrder = i })
  })

  // Build title from baby name or mother's name
  const babyName = quizState.answers?.baby_name
  const motherName = quizState.birthTeam?.fields?.[0]?.value
  let title = 'My Birth Plan'
  if (babyName && babyName !== 'not_yet' && babyName !== 'prefer_not_to_say' && babyName !== 'has_name') {
    title = `Welcoming ${babyName} into the World`
  } else if (motherName) {
    title = `${motherName}'s Birth Plan`
  }

  // Map quiz birth type to editor birth type
  const birthType: BirthType = quizState.plannedBirthType === 'csection'
    ? 'planned_csection'
    : 'vaginal'

  // Populate birth team fields from quiz answers (support_people and medical_provider names)
  const birthTeam = quizState.birthTeam ? { ...quizState.birthTeam, fields: [...(quizState.birthTeam.fields || [])] } : createDefaultBirthTeam()
  const supportAnswer = quizState.answers?.support_people
  if (supportAnswer && supportAnswer.startsWith('[')) {
    try {
      const people = JSON.parse(supportAnswer) as Array<{ role: string; name: string }>
      people.forEach(p => {
        if (!p.name) return
        const fieldId = p.role === 'partner' ? 'partner' : p.role === 'doula' ? 'doula' : null
        if (fieldId) {
          const field = birthTeam.fields.find(f => f.id === fieldId)
          if (field && !field.value) field.value = p.name
        }
      })
    } catch { /* ignore parse errors */ }
  }
  // Populate facility name from quiz
  const facilityAnswer = quizState.answers?.facility_name
  if (facilityAnswer && facilityAnswer !== 'has_facility' && facilityAnswer !== 'still_deciding' && facilityAnswer !== 'prefer_not_to_say') {
    const field = birthTeam.fields.find(f => f.id === 'hospital')
    if (field && !field.value) field.value = facilityAnswer
  }

  // Populate due date from quiz
  const dueDateAnswer = quizState.answers?.due_date
  if (dueDateAnswer && dueDateAnswer !== 'has_date' && dueDateAnswer !== 'prefer_not_to_say') {
    if (!birthTeam.due_date) birthTeam.due_date = dueDateAnswer
  }

  const providerAnswer = quizState.answers?.medical_provider
  if (providerAnswer && providerAnswer.startsWith('[')) {
    try {
      const providers = JSON.parse(providerAnswer) as Array<{ role: string; name: string }>
      const firstNamed = providers.find(p => p.name)
      if (firstNamed) {
        const field = birthTeam.fields.find(f => f.id === 'provider')
        if (field && !field.value) field.value = firstNamed.name
      }
    } catch { /* ignore parse errors */ }
  }

  return {
    birthTeam,
    templateStyle: (quizState.templateStyle || 'minimal') as TemplateStyle,
    birthType,
    sections,
    createdFromQuiz: true,
    title,
    disclaimerText: 'This birth plan represents my preferences for labor and delivery. I understand that circumstances may change and medical decisions may need to be made for the safety of myself and my baby. I trust my care team to keep us informed and involve us in any decisions when possible.',
  }
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function applyQuizAnswer(
  sections: Record<EditorSectionId, EditorSectionState>,
  sectionId: EditorSectionId,
  preferenceId: string,
  value: string,
  customNote?: string,
  explicitStance?: 'desired' | 'declined' | null,
) {
  const section = sections[sectionId]
  if (!section) return

  const prefIndex = section.preferences.findIndex(p => p.preferenceId === preferenceId)
  if (prefIndex === -1) return

  // Validate the option exists on the preference definition
  const prefDef = PREFERENCES.find(p => p.id === preferenceId)
  if (!prefDef) return

  const matchedOption = prefDef.options.find(opt => opt.value === value)
  if (!matchedOption) return

  // Use explicit stance from quiz if provided, otherwise infer from option
  let stance: 'desired' | 'declined' | undefined
  if (explicitStance !== undefined) {
    stance = explicitStance ?? undefined
  } else if (matchedOption.defaultStance) {
    stance = matchedOption.defaultStance as 'desired' | 'declined'
  } else if (/^(accept|yes)/.test(value)) {
    stance = 'desired'
  } else if (/^(decline|no$)/.test(value)) {
    stance = 'declined'
  }

  section.preferences[prefIndex] = {
    ...section.preferences[prefIndex],
    selectedOption: value,
    isOmitted: false,
    ...(customNote ? { customText: customNote } : {}),
    ...(stance ? { stance } : {}),
  }
}

// ---------------------------------------------------------------------------
// Import metadata (for the quiz import toast)
// ---------------------------------------------------------------------------

export interface QuizImportMetadata {
  importedCount: number
  unsurePreferenceIds: string[]
}

export function getQuizImportMeta(quizState: QuizState): QuizImportMetadata {
  let importedCount = 0
  const unsurePreferenceIds: string[] = []

  Object.entries(quizState.answers).forEach(([questionId, answer]) => {
    if (ENGAGEMENT_ONLY_QUESTIONS.has(questionId)) return

    if (questionId === 'csection_details') {
      if (answer && answer !== 'unsure') {
        const mappings = CSECTION_DETAILS_MAP[answer]
        if (mappings) importedCount += mappings.length
      }
      return
    }

    if (questionId === 'csection_comfort') {
      if (answer && answer !== 'unsure') {
        const mappings = CSECTION_COMFORT_MAP[answer]
        if (mappings) importedCount += mappings.length
      }
      return
    }

    const mapping = QUIZ_TO_PREFERENCE[questionId]
    if (!mapping) return

    if (answer && answer !== 'unsure') {
      importedCount++
    } else if (answer === 'unsure') {
      unsurePreferenceIds.push(mapping.preferenceId)
    }
  })

  return { importedCount, unsurePreferenceIds }
}

// ---------------------------------------------------------------------------
// Unanswered topics (for quiz results page)
// ---------------------------------------------------------------------------

export function getUnansweredQuizTopics(quizState: QuizState): string[] {
  const unanswered: string[] = []

  Object.entries(QUIZ_TO_PREFERENCE).forEach(([quizId, mapping]) => {
    const answer = quizState.answers[quizId]
    if (!answer || answer === 'unsure') {
      const prefDef = PREFERENCES.find(p => p.id === mapping.preferenceId)
      if (prefDef) unanswered.push(prefDef.title)
    }
  })

  return unanswered
}
