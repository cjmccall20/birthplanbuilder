import type { QuizState } from '@/types'
import type { EditorState, EditorSectionId, PreferenceValue, EditorSectionState } from './editorTypes'
import { PREFERENCES, getQuizMappedPreferences } from './preferences'
import { SECTION_ORDER } from './sections'

// Maps quiz question IDs to editor preference IDs
// This is built from the preferences that have quizQuestionId defined
const QUIZ_TO_EDITOR_MAP: Record<string, { sectionId: EditorSectionId; preferenceId: string }> = {}

// Build the mapping dynamically from preferences
getQuizMappedPreferences().forEach(pref => {
  if (pref.quizQuestionId) {
    QUIZ_TO_EDITOR_MAP[pref.quizQuestionId] = {
      sectionId: pref.sectionId,
      preferenceId: pref.id
    }
  }
})

export function mapQuizToEditorState(quizState: QuizState): Partial<EditorState> {
  // Create empty section states
  const sections = {} as Record<EditorSectionId, EditorSectionState>
  SECTION_ORDER.forEach(id => {
    sections[id] = {
      sectionId: id,
      preferences: [],
      customItems: [],
      notes: '',
    }
  })

  // Map each quiz answer to editor preference
  Object.entries(quizState.answers).forEach(([questionId, answer]) => {
    const mapping = QUIZ_TO_EDITOR_MAP[questionId]
    if (mapping && answer && answer !== 'unsure') {
      const { sectionId, preferenceId } = mapping

      // Find the preference definition to validate the option exists
      const prefDef = PREFERENCES.find(p => p.id === preferenceId)
      if (prefDef) {
        const optionExists = prefDef.options.some(opt => opt.value === answer)

        if (optionExists) {
          const preference: PreferenceValue = {
            preferenceId,
            selectedOption: answer,
            customText: quizState.customNotes?.[questionId],
            isOmitted: false,
            sortOrder: sections[sectionId].preferences.length,
          }
          sections[sectionId].preferences.push(preference)
        }
      }
    }
  })

  return {
    birthTeam: quizState.birthTeam,
    templateStyle: (quizState.templateStyle || 'minimal') as any,
    sections,
    createdFromQuiz: true,
    title: quizState.birthTeam.mother_name
      ? `${quizState.birthTeam.mother_name}'s Birth Plan`
      : 'My Birth Plan',
  }
}

// Helper function to get list of quiz questions that weren't answered or were marked "unsure"
export function getUnansweredQuizTopics(quizState: QuizState): string[] {
  const unanswered: string[] = []

  getQuizMappedPreferences().forEach(pref => {
    if (pref.quizQuestionId) {
      const answer = quizState.answers[pref.quizQuestionId]
      if (!answer || answer === 'unsure') {
        unanswered.push(pref.title)
      }
    }
  })

  return unanswered
}
