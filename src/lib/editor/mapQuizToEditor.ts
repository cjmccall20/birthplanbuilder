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
  birth_setting: {
    preferenceId: 'birth_location',
    sectionId: 'pre_hospital',
    // Quiz and pref share: hospital, birth_center, home
  },
  medical_provider: {
    preferenceId: 'medical_provider',
    sectionId: 'pre_hospital',
    // Quiz and pref share: ob, cnm, midwife
  },
  support_people: {
    preferenceId: 'support_people',
    sectionId: 'pre_hospital',
    valueMap: {
      partner_only: 'partner',
      partner_doula: 'partner_doula',
      partner_family: 'partner_family',
      doula_only: 'doula_only',
    },
  },

  // Pre-Hospital (new)
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
      delay_max: 'yes',
      brief_delay: 'yes',
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
])

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

    // Handle support_people checklist JSON answer
    if (questionId === 'support_people' && answer.startsWith('[')) {
      try {
        const people = JSON.parse(answer) as Array<{ role: string; name: string }>
        if (Array.isArray(people) && people.length > 0) {
          const roles = people.map(p => p.role)
          const names = people.filter(p => p.name).map(p => {
            const label = p.role === 'partner' ? 'Partner' : p.role === 'doula' ? 'Doula' : p.role === 'family' ? 'Family' : 'Support Person'
            return `${label}: ${p.name}`
          })
          let prefValue = 'partner'
          if (roles.includes('partner') && roles.includes('doula')) prefValue = 'partner_doula'
          else if (roles.includes('partner') && roles.includes('family')) prefValue = 'partner_family'
          else if (roles.includes('doula') && !roles.includes('partner')) prefValue = 'doula_only'

          const mapping = QUIZ_TO_PREFERENCE[questionId]
          if (mapping) {
            const customText = names.length > 0
              ? `We would like the following people present: ${names.join(', ')}.`
              : undefined
            applyQuizAnswer(sections, mapping.sectionId, mapping.preferenceId, prefValue, customText)
            activatedOrder[mapping.preferenceId] = activationCounter++
          }
          return
        }
      } catch {
        // Fall through to standard handling for legacy string answers
      }
    }

    // Handle golden_hour -> also set skin_to_skin preference
    if (questionId === 'golden_hour') {
      if (answer === 'protected') {
        applyQuizAnswer(sections, 'at_birth', 'skin_to_skin', 'immediate')
        activatedOrder['skin_to_skin'] = activationCounter++
      } else if (answer === 'partner_backup') {
        applyQuizAnswer(sections, 'at_birth', 'skin_to_skin', 'partner_backup')
        activatedOrder['skin_to_skin'] = activationCounter++
      }
      // Don't return - let the standard mapping handle the golden_hour preference itself
    }

    // Handle medical_provider checklist JSON answer
    if (questionId === 'medical_provider' && answer.startsWith('[')) {
      try {
        const providers = JSON.parse(answer) as Array<{ role: string; name: string }>
        if (Array.isArray(providers) && providers.length > 0) {
          const roles = providers.map(p => p.role)
          const names = providers.filter(p => p.name).map(p => {
            const label = p.role === 'ob' ? 'OB/GYN' : p.role === 'cnm' ? 'CNM' : 'Midwife'
            return `${label}: ${p.name}`
          })
          // Use first selected role as the preference value
          let prefValue = roles[0] || 'ob'

          const mapping = QUIZ_TO_PREFERENCE[questionId]
          if (mapping) {
            const customText = names.length > 0
              ? `Our medical provider(s): ${names.join(', ')}.`
              : undefined
            applyQuizAnswer(sections, mapping.sectionId, mapping.preferenceId, prefValue, customText)
            activatedOrder[mapping.preferenceId] = activationCounter++
          }
          return
        }
      } catch {
        // Fall through to standard handling
      }
    }

    // Determine if this is a custom/free-text answer (doesn't match any option value)
    const isCustomText = questionDef && !questionDef.options.some(o => o.value === answer)

    // Handle csection_details compound question
    if (questionId === 'csection_details') {
      if (isCustomText) {
        // Custom text for C-section details - apply as custom text on gentle_csection preference
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

    // Handle csection_comfort compound question
    if (questionId === 'csection_comfort') {
      const mappings = CSECTION_COMFORT_MAP[answer]
      if (mappings) {
        mappings.forEach(({ preferenceId, sectionId, value }) => {
          applyQuizAnswer(sections, sectionId, preferenceId, value)
          activatedOrder[preferenceId] = activationCounter++
        })
      }
      return
    }

    // Standard single-preference mapping
    const mapping = QUIZ_TO_PREFERENCE[questionId]
    if (!mapping) return

    const { preferenceId, sectionId, valueMap } = mapping

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
  if (babyName && babyName !== 'not_yet' && babyName !== 'prefer_not_to_say') {
    title = `Welcoming ${babyName} into the World`
  } else if (motherName) {
    title = `${motherName}'s Birth Plan`
  }

  // Map quiz birth type to editor birth type
  const birthType: BirthType = quizState.plannedBirthType === 'csection'
    ? 'planned_csection'
    : 'vaginal'

  return {
    birthTeam: quizState.birthTeam || createDefaultBirthTeam(),
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
