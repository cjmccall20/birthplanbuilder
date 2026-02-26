import type { QuizState, TemplateStyle } from '@/types'
import { createDefaultBirthTeam } from '@/types'
import type { EditorState, EditorSectionId, PreferenceValue, EditorSectionState, BirthType, BirthVenue } from './editorTypes'
import { PREFERENCES, getPreferencesBySection } from './preferences'
import { SECTION_ORDER, VENUE_TITLE_OVERRIDES, EDITOR_SECTIONS } from './sections'
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
  when_to_birth_center: {
    preferenceId: 'when_to_birth_center',
    sectionId: 'pre_hospital',
    // Checklist - quiz and pref share: active_labor, emotional_signposts, water_breaks, provider_guidance, gbs_antibiotics
  },
  when_to_call_midwife: {
    preferenceId: 'when_to_call_midwife',
    sectionId: 'pre_hospital',
    // Checklist - quiz and pref share: active_labor, emotional_signposts, water_breaks, early_labor_support, provider_guidance
  },
  birth_photography: {
    preferenceId: 'photography_video',
    sectionId: 'during_labor',
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
  labor_augmentation: {
    preferenceId: 'labor_augmentation',
    sectionId: 'during_labor',
    // Quiz and pref share: wait_it_out, low_dose_pitocin, pitocin_stop_active, provider_recommends
  },
  labor_start: {
    preferenceId: 'labor_start_preference',
    sectionId: 'pre_hospital',
    // Checklist - quiz and pref share: wait_natural, nipple_stimulation, membrane_sweep, natural_methods, amniotomy, pitocin_induction
  },
  episiotomy: {
    preferenceId: 'episiotomy',
    sectionId: 'during_labor',
    // Quiz and pref share: avoid, only_consent, provider_judgment
  },
  cervical_checks: {
    preferenceId: 'cervical_checks',
    sectionId: 'during_labor',
    // Checklist - quiz and pref share: minimize, only_requested, no_after_water, routine_fine, consent_each
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
  placenta_delivery: {
    preferenceId: 'physiological_placenta',
    sectionId: 'at_birth',
    // Quiz and pref share: physiological, natural_with_pitocin, active_management, provider_standard
  },
  sex_announcement: {
    preferenceId: 'sex_announcement',
    sectionId: 'at_birth',
    // Quiz and pref share: discover_ourselves, partner_announces, provider_announces
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
  infant_pain_management: {
    preferenceId: 'infant_pain_management',
    sectionId: 'newborn_procedures',
    // Quiz and pref share: breastfeed_during, skin_to_skin_during, sugar_water, no_sugar_water, provider_choice
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
    // Now a checklist - quiz and pref share: breastfeed, formula, donor_milk, no_formula_without_consent, lactation_consultant, flexible
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
  baby_companion: {
    preferenceId: 'baby_companion',
    sectionId: 'hospital_stay',
    // Quiz and pref share: partner_always, someone_present, flexible
  },

  // C-Section
  // csection_approach removed - gentle_csection preference is covered by csection_details compound mapping
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

  // Water Birth & Birth Space (home/birth center)
  water_birth: {
    preferenceId: 'water_birth',
    sectionId: 'during_labor',
    // Quiz and pref share: water_birth, water_labor, no_water
  },
  birth_space_setup: {
    preferenceId: 'birth_space',
    sectionId: 'pre_hospital',
    // Checklist - quiz and pref share: dim_lighting, music, aromatherapy, minimal_people
  },

  // VBAC
  vbac_monitoring: {
    preferenceId: 'vbac_monitoring',
    sectionId: 'during_labor',
    // Quiz and pref share: continuous_wireless, continuous_standard, intermittent_request
  },

  // Transfer (home/birth center)
  transfer_logistics: {
    preferenceId: 'transfer_logistics',
    sectionId: 'hospital_stay',
    // Quiz and pref share: partner_drives, ambulance, midwife_decides
  },
}

// C-section details is a compound question that maps to multiple preferences
const CSECTION_DETAILS_MAP: Record<string, Array<{ preferenceId: string; sectionId: EditorSectionId; value: string }>> = {
  gentle_csection: [
    { preferenceId: 'gentle_csection', sectionId: 'csection', value: 'yes' },
  ],
  clear_drape: [
    { preferenceId: 'clear_drape', sectionId: 'csection', value: 'yes' },
  ],
  step_by_step_narration: [
    { preferenceId: 'csection_explanation', sectionId: 'csection', value: 'narrate' },
  ],

  no_students: [
    { preferenceId: 'medical_students', sectionId: 'during_labor', value: 'prefer_not' },
  ],
  standard_procedure: [],
}

// C-section comfort is a compound question that maps to individual comfort preferences
const CSECTION_COMFORT_MAP: Record<string, Array<{ preferenceId: string; sectionId: EditorSectionId; value: string }>> = {
  dim_quiet: [
    { preferenceId: 'csection_environment', sectionId: 'csection', value: 'dim_quiet' },
  ],
  music_in_or: [
    { preferenceId: 'csection_music', sectionId: 'csection', value: 'yes' },
  ],
  photos_video: [
    { preferenceId: 'csection_photos', sectionId: 'csection', value: 'yes' },
  ],
  partner_present: [
    { preferenceId: 'partner_presence_csection', sectionId: 'csection', value: 'required' },
  ],
  doula_present: [
    { preferenceId: 'doula_presence_csection', sectionId: 'csection', value: 'yes' },
  ],
  arms_free: [
    { preferenceId: 'csection_arm_mobility', sectionId: 'csection', value: 'not_strapped' },
  ],
  standard_fine: [],
}

// Hospital labor contingency is a checklist that maps to the transfer_labor_prefs preference
// Each checked value produces a birthPlanText bullet
const HOSPITAL_LABOR_CONTINGENCY_MAP: Record<string, { birthPlanText: string }> = {
  epidural_open: { birthPlanText: 'If transferred, we are open to an epidural for pain management.' },
  epidural_decline: { birthPlanText: 'If transferred, we prefer to continue without an epidural unless medically necessary.' },
  heplock: { birthPlanText: 'If transferred, we prefer a hep-lock for IV access rather than continuous fluids.' },
  intermittent_monitor: { birthPlanText: 'If transferred, we prefer intermittent fetal monitoring if the clinical situation allows.' },
  no_students: { birthPlanText: 'If transferred, we do not want medical students or observers present.' },
}

// Hospital newborn contingency is a checklist that maps to the transfer_newborn_prefs preference
const HOSPITAL_NEWBORN_CONTINGENCY_MAP: Record<string, { birthPlanText: string }> = {
  delayed_cord: { birthPlanText: 'We request delayed cord clamping even if in the hospital.' },
  skin_to_skin: { birthPlanText: 'We request immediate skin-to-skin contact if baby is stable.' },
  delay_bath: { birthPlanText: 'Please delay baby\'s first bath.' },
  delay_exams: { birthPlanText: 'We request that non-urgent newborn exams be delayed for bonding time.' },
  eye_ointment_delay: { birthPlanText: 'We request eye ointment be delayed to allow for initial bonding.' },
  vitamin_k_yes: { birthPlanText: 'Please administer the vitamin K injection.' },
  no_formula: { birthPlanText: 'Please do not give formula without discussing with us first.' },
}

// Hospital stay contingency is a checklist that maps to the transfer_stay_prefs preference
const HOSPITAL_STAY_CONTINGENCY_MAP: Record<string, { birthPlanText: string }> = {
  rooming_in: { birthPlanText: 'If at the hospital, we want baby to room in with us at all times.' },
  discharge_asap: { birthPlanText: 'If at the hospital, we would like to be discharged as soon as it is medically safe.' },
  breastfeeding_support: { birthPlanText: 'If at the hospital, we would like lactation consultant support.' },
  quiet_recovery: { birthPlanText: 'If at the hospital, we prefer a quiet recovery environment with minimal disruptions.' },
  visitor_limits: { birthPlanText: 'If at the hospital, we prefer limited visitors during our recovery.' },
  skin_to_skin_continue: { birthPlanText: 'If at the hospital, we want to continue skin-to-skin contact as much as possible.' },
}

// Engagement-only quiz questions that don't map to preferences
// Their answers are used for personalization, not editor preferences
const ENGAGEMENT_ONLY_QUESTIONS = new Set([
  'planned_birth_type',
  'baby_sex',
  'baby_name',
  'facility_name',
  'due_date',
  'mother_name',
  'birth_setting', // Handled specially for birthVenue
])

// Questions with special handling (not in QUIZ_TO_PREFERENCE but not engagement-only either)
const SPECIAL_HANDLING_QUESTIONS = new Set([
  'birth_philosophy',
  'medical_conditions',
  'transfer_plan',
  'vbac_history',
  'hospital_labor_contingency',
  'hospital_newborn_contingency',
  'hospital_stay_contingency',
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
    if (SPECIAL_HANDLING_QUESTIONS.has(questionId)) return

    // Check if the selected option has omitFromPlan flag
    const questionDef = quizQuestions.find(q => q.id === questionId)
    const selectedOption = questionDef?.options.find(o => o.value === answer)
    if (selectedOption?.omitFromPlan) return

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
      // Filter out omitFromPlan values
      const activePlanValues = checklistValues.filter(v => {
        const opt = questionDef?.options.find(o => o.value === v)
        return !opt?.omitFromPlan
      })
      if (activePlanValues.length === 0) return

      // Use first value as the primary selection
      const primaryValue = activePlanValues[0]
      const translatedPrimary = valueMap ? (valueMap[primaryValue] || primaryValue) : primaryValue
      // Build custom text from all selected options' birthPlanText
      const allTexts = activePlanValues
        .map(v => {
          const translatedV = valueMap ? (valueMap[v] || v) : v
          // Try to get birthPlanText from preference option (more accurate for editor)
          const prefDef = PREFERENCES.find(p => p.id === preferenceId)
          const prefOpt = prefDef?.options.find(o => o.value === translatedV)
          if (prefOpt?.birthPlanText) return prefOpt.birthPlanText
          // Fall back to quiz option birthPlanText
          return questionDef?.options.find(o => o.value === v)?.birthPlanText
        })
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

  // Build title and subtitle
  const motherName = quizState.answers?.mother_name
  const babyName = quizState.answers?.baby_name

  // Title: {{name}}'s Birth Plan or "My Birth Plan"
  let title = 'My Birth Plan'
  if (motherName && motherName !== 'has_name' && motherName !== 'prefer_not_to_say') {
    title = `${motherName}'s Birth Plan`
  }

  // Subtitle: Welcoming {{baby_name}} into the World
  let subtitle: string | undefined
  if (babyName && babyName !== 'not_yet' && babyName !== 'prefer_not_to_say' && babyName !== 'has_name') {
    subtitle = `Welcoming ${babyName} into the World`
  } else {
    subtitle = 'Welcoming My Baby Into the World'
  }

  // Map quiz birth type to editor birth type (VBAC treated as vaginal)
  const birthType: BirthType = quizState.plannedBirthType === 'csection'
    ? 'planned_csection'
    : 'vaginal' // 'vbac' is treated as vaginal for section visibility

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

  // Populate mother name from quiz
  const motherNameAnswer = quizState.answers?.mother_name
  if (motherNameAnswer && motherNameAnswer !== 'has_name' && motherNameAnswer !== 'prefer_not_to_say') {
    const motherField = birthTeam.fields.find(f => f.id === 'mother')
    if (motherField && !motherField.value) motherField.value = motherNameAnswer
  }

  // --- Special handling: birth philosophy ---
  let philosophyStatement: string | undefined
  let showPhilosophy: boolean | undefined
  const philosophyAnswer = quizState.answers?.birth_philosophy
  if (philosophyAnswer && philosophyAnswer !== 'unsure') {
    if (philosophyAnswer === 'no_philosophy') {
      showPhilosophy = false
    } else {
      const philosophyQ = quizQuestions.find(q => q.id === 'birth_philosophy')
      const philosophyOpt = philosophyQ?.options.find(o => o.value === philosophyAnswer)
      if (philosophyOpt?.birthPlanText) {
        philosophyStatement = philosophyOpt.birthPlanText
        showPhilosophy = true
      } else if (philosophyAnswer !== 'custom' && philosophyAnswer) {
        // Custom text entered by user
        philosophyStatement = philosophyAnswer
        showPhilosophy = true
      }
    }
  }

  // --- Special handling: medical conditions ---
  const medicalAnswer = quizState.answers?.medical_conditions
  if (medicalAnswer) {
    const medValues = parseChecklistAnswer(medicalAnswer)
    if (medValues && medValues.length > 0) {
      const medQ = quizQuestions.find(q => q.id === 'medical_conditions')
      const medTexts = medValues
        .map(v => medQ?.options.find(o => o.value === v))
        .filter(opt => opt && !opt.omitFromPlan && opt.birthPlanText)
        .map(opt => opt!.birthPlanText)

      if (medTexts.length > 0) {
        // Add as a "Medical Notes" field to birth team
        const existingMedField = birthTeam.fields.find(f => f.id === 'medical_notes')
        if (existingMedField) {
          existingMedField.value = medTexts.join(' ')
        } else {
          birthTeam.fields.push({
            id: 'medical_notes',
            label: 'Medical Notes',
            value: medTexts.join(' '),
            isDefault: false,
            sortOrder: birthTeam.fields.length,
          })
        }
      }
    }
  }

  // --- Special handling: transfer_plan (backup hospital name) ---
  const transferPlanAnswer = quizState.answers?.transfer_plan
  if (transferPlanAnswer && transferPlanAnswer !== 'unsure' && transferPlanAnswer !== 'discussing' && transferPlanAnswer !== 'has_plan') {
    // Free-text input: the user typed a hospital name
    const existingBackup = birthTeam.fields.find(f => f.id === 'backup_hospital')
    if (existingBackup) {
      if (!existingBackup.value) existingBackup.value = transferPlanAnswer
    } else {
      birthTeam.fields.push({
        id: 'backup_hospital',
        label: 'Backup Hospital',
        value: transferPlanAnswer,
        isDefault: false,
        sortOrder: birthTeam.fields.length,
      })
    }
  }

  // --- Special handling: vbac_history ---
  const vbacHistoryAnswer = quizState.answers?.vbac_history
  if (vbacHistoryAnswer && vbacHistoryAnswer !== 'unsure' && vbacHistoryAnswer !== 'need_records') {
    let vbacText = ''
    if (vbacHistoryAnswer === 'one_low_transverse') {
      vbacText = 'One prior cesarean with low-transverse incision'
    } else if (vbacHistoryAnswer !== 'has_details') {
      // Free-text input from the user
      vbacText = vbacHistoryAnswer
    }
    if (vbacText) {
      const existingVbacField = birthTeam.fields.find(f => f.id === 'vbac_history')
      if (existingVbacField) {
        if (!existingVbacField.value) existingVbacField.value = vbacText
      } else {
        birthTeam.fields.push({
          id: 'vbac_history',
          label: 'VBAC History',
          value: vbacText,
          isDefault: false,
          sortOrder: birthTeam.fields.length,
        })
      }
    }
  }

  // --- Special handling: hospital_labor_contingency (checklist -> transfer_labor_prefs) ---
  const laborContingencyAnswer = quizState.answers?.hospital_labor_contingency
  if (laborContingencyAnswer) {
    const values = parseChecklistAnswer(laborContingencyAnswer)
    if (values && values.length > 0) {
      const texts = values
        .map(v => HOSPITAL_LABOR_CONTINGENCY_MAP[v]?.birthPlanText)
        .filter(Boolean)
      if (texts.length > 0) {
        const primaryValue = values[0]
        const customText = texts.join('\n')
        applyQuizAnswer(sections, 'hospital_stay', 'transfer_labor_prefs', primaryValue, customText)
        activatedOrder['transfer_labor_prefs'] = activationCounter++
      }
    }
  }

  // --- Special handling: hospital_newborn_contingency (checklist -> transfer_newborn_prefs) ---
  const newbornContingencyAnswer = quizState.answers?.hospital_newborn_contingency
  if (newbornContingencyAnswer) {
    const values = parseChecklistAnswer(newbornContingencyAnswer)
    if (values && values.length > 0) {
      const texts = values
        .map(v => HOSPITAL_NEWBORN_CONTINGENCY_MAP[v]?.birthPlanText)
        .filter(Boolean)
      if (texts.length > 0) {
        const primaryValue = values[0]
        const customText = texts.join('\n')
        applyQuizAnswer(sections, 'hospital_stay', 'transfer_newborn_prefs', primaryValue, customText)
        activatedOrder['transfer_newborn_prefs'] = activationCounter++
      }
    }
  }

  // --- Special handling: hospital_stay_contingency (checklist -> transfer_stay_prefs) ---
  const stayContingencyAnswer = quizState.answers?.hospital_stay_contingency
  if (stayContingencyAnswer) {
    const values = parseChecklistAnswer(stayContingencyAnswer)
    if (values && values.length > 0) {
      const texts = values
        .map(v => HOSPITAL_STAY_CONTINGENCY_MAP[v]?.birthPlanText)
        .filter(Boolean)
      if (texts.length > 0) {
        const primaryValue = values[0]
        const customText = texts.join('\n')
        applyQuizAnswer(sections, 'hospital_stay', 'transfer_stay_prefs', primaryValue, customText)
        activatedOrder['transfer_stay_prefs'] = activationCounter++
      }
    }
  }

  // --- Set birthVenue from quiz birth_setting answer ---
  const birthSettingAnswer = quizState.answers?.birth_setting
  let birthVenue: BirthVenue | null = null
  if (birthSettingAnswer === 'hospital' || birthSettingAnswer === 'birth_center' || birthSettingAnswer === 'home') {
    birthVenue = birthSettingAnswer
  }

  // --- Set isVbac from quiz planned_birth_type answer ---
  // Note: plannedBirthType type doesn't include 'vbac' but the raw answer can be 'vbac'
  const isVbac = quizState.answers?.planned_birth_type === 'vbac'

  // --- Apply venue title overrides ---
  let customSectionTitles: Record<string, string> | undefined
  if (birthVenue && birthVenue !== 'hospital') {
    const overrides = VENUE_TITLE_OVERRIDES[birthVenue as 'birth_center' | 'home']
    if (overrides) {
      customSectionTitles = {}
      Object.entries(overrides).forEach(([sectionId, venueTitle]) => {
        customSectionTitles![sectionId] = venueTitle
      })
    }
  }

  // --- Add backup_hospital field for home/birth_center venues ---
  if ((birthVenue === 'home' || birthVenue === 'birth_center') && !birthTeam.fields.find(f => f.id === 'backup_hospital')) {
    birthTeam.fields.push({
      id: 'backup_hospital',
      label: 'Backup Hospital',
      value: '',
      isDefault: false,
      sortOrder: birthTeam.fields.length,
    })
  }

  // --- Re-initialize sections with venue filtering ---
  // Now that we know the venue, re-build sections so venue-filtered preferences are included/excluded
  if (birthVenue) {
    SECTION_ORDER.forEach(sectionId => {
      const prefs = getPreferencesBySection(sectionId, undefined, birthVenue)
      // Preserve any activated preferences from above, add any new venue-specific ones
      const existingPrefs = sections[sectionId].preferences
      const existingIds = new Set(existingPrefs.map(p => p.preferenceId))
      const filteredPrefIds = new Set(prefs.map(p => p.id))

      // Remove preferences that are now filtered out by venue
      const keptPrefs = existingPrefs.filter(p => filteredPrefIds.has(p.preferenceId))

      // Add any new venue-specific preferences that weren't in the original set
      prefs.forEach((pref, index) => {
        if (!existingIds.has(pref.id)) {
          const defaultOption = pref.options.find(o => o.isPopular) || pref.options[0]
          keptPrefs.push({
            preferenceId: pref.id,
            selectedOption: defaultOption?.value || null,
            isOmitted: true,
            sortOrder: keptPrefs.length,
          })
        }
      })

      sections[sectionId] = {
        ...sections[sectionId],
        preferences: keptPrefs,
      }
    })

    // Re-sort after venue filtering: activated first (in quiz order), then omitted
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
      sections[sectionId].preferences.forEach((p, i) => { p.sortOrder = i })
    })
  }

  return {
    birthTeam,
    templateStyle: (quizState.templateStyle || 'minimal') as TemplateStyle,
    birthType,
    birthVenue,
    isVbac: isVbac || undefined,
    sections,
    createdFromQuiz: true,
    title,
    subtitle,
    disclaimerText: 'This birth plan represents my preferences for labor and delivery. I understand that circumstances may change and medical decisions may need to be made for the safety of myself and my baby. I trust my care team to keep us informed and involve us in any decisions when possible.',
    ...(philosophyStatement ? { philosophyStatement, showPhilosophy } : showPhilosophy === false ? { showPhilosophy } : {}),
    ...(customSectionTitles ? { customSectionTitles } : {}),
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
  explicitStance?: 'desired' | 'declined' | 'cautious' | null,
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
  let stance: 'desired' | 'declined' | 'cautious' | undefined
  if (explicitStance !== undefined) {
    stance = explicitStance ?? undefined
  } else if (matchedOption.defaultStance) {
    stance = matchedOption.defaultStance
  } else if (prefDef.clinical && /^(accept|yes)/.test(value)) {
    // Only auto-infer accept/decline stance for clinical preferences
    stance = 'desired'
  } else if (prefDef.clinical && /^(decline|no$)/.test(value)) {
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
    if (SPECIAL_HANDLING_QUESTIONS.has(questionId)) {
      if (answer && answer !== 'unsure') importedCount++
      return
    }

    if (questionId === 'csection_details') {
      if (answer && answer !== 'unsure') {
        const values = parseChecklistAnswer(answer)
        if (values) {
          values.forEach(val => {
            const mappings = CSECTION_DETAILS_MAP[val]
            if (mappings) importedCount += mappings.length
          })
        } else {
          const mappings = CSECTION_DETAILS_MAP[answer]
          if (mappings) importedCount += mappings.length
        }
      }
      return
    }

    if (questionId === 'csection_comfort') {
      if (answer && answer !== 'unsure') {
        const values = parseChecklistAnswer(answer)
        if (values) {
          values.forEach(val => {
            const mappings = CSECTION_COMFORT_MAP[val]
            if (mappings) importedCount += mappings.length
          })
        } else {
          const mappings = CSECTION_COMFORT_MAP[answer]
          if (mappings) importedCount += mappings.length
        }
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
