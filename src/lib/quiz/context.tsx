'use client'

import { createContext, useContext, useReducer, useEffect, ReactNode } from 'react'
import { QuizState, BirthTeam, createDefaultBirthTeam } from '@/types'
import { quizQuestions, getOrderedQuestions, QuizQuestion } from './questions'

const STORAGE_KEY = 'birthplan_quiz_state'

function generateSessionId(): string {
  return `bp_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`
}

const initialState: QuizState = {
  currentStep: 0,
  answers: {},
  customNotes: {},
  stances: {},
  birthTeam: createDefaultBirthTeam(),
  templateStyle: 'minimal',
  sessionId: '',
}

type QuizAction =
  | { type: 'SET_ANSWER'; questionId: string; answer: string }
  | { type: 'SET_CUSTOM_NOTE'; questionId: string; note: string }
  | { type: 'SET_STANCE'; questionId: string; stance: 'desired' | 'declined' | null }
  | { type: 'SET_BIRTH_TEAM'; birthTeam: Partial<BirthTeam> }
  | { type: 'SET_TEMPLATE_STYLE'; style: string }
  | { type: 'NEXT_STEP' }
  | { type: 'PREV_STEP' }
  | { type: 'GO_TO_STEP'; step: number }
  | { type: 'LOAD_STATE'; state: QuizState }
  | { type: 'RESET' }

function quizReducer(state: QuizState, action: QuizAction): QuizState {
  switch (action.type) {
    case 'SET_ANSWER': {
      const newAnswers = { ...state.answers, [action.questionId]: action.answer }
      const oldQuestions = getOrderedQuestions(state.answers)
      const currentQuestionId = oldQuestions[state.currentStep]?.id
      const newQuestions = getOrderedQuestions(newAnswers)
      let newStep = state.currentStep
      if (currentQuestionId) {
        const idx = newQuestions.findIndex(q => q.id === currentQuestionId)
        if (idx !== -1) newStep = idx
      }
      return { ...state, answers: newAnswers, currentStep: newStep }
    }
    case 'SET_CUSTOM_NOTE':
      return {
        ...state,
        customNotes: {
          ...state.customNotes,
          [action.questionId]: action.note,
        },
      }
    case 'SET_STANCE':
      return {
        ...state,
        stances: {
          ...state.stances,
          [action.questionId]: action.stance,
        },
      }
    case 'SET_BIRTH_TEAM':
      return {
        ...state,
        birthTeam: {
          ...state.birthTeam,
          ...action.birthTeam,
        },
      }
    case 'SET_TEMPLATE_STYLE':
      return {
        ...state,
        templateStyle: action.style,
      }
    case 'NEXT_STEP': {
      const orderedQuestions = getOrderedQuestions(state.answers)
      return {
        ...state,
        currentStep: Math.min(state.currentStep + 1, orderedQuestions.length),
      }
    }
    case 'PREV_STEP':
      return {
        ...state,
        currentStep: Math.max(state.currentStep - 1, 0),
      }
    case 'GO_TO_STEP':
      return {
        ...state,
        currentStep: action.step,
      }
    case 'LOAD_STATE':
      return { ...action.state, stances: action.state.stances ?? {} }
    case 'RESET':
      return {
        ...initialState,
        sessionId: generateSessionId(),
      }
    default:
      return state
  }
}

interface QuizContextType {
  state: QuizState
  setAnswer: (questionId: string, answer: string) => void
  setCustomNote: (questionId: string, note: string) => void
  setStance: (questionId: string, stance: 'desired' | 'declined' | null) => void
  setBirthTeam: (birthTeam: Partial<BirthTeam>) => void
  setTemplateStyle: (style: string) => void
  nextStep: () => void
  prevStep: () => void
  goToStep: (step: number) => void
  reset: () => void
  currentQuestion: QuizQuestion | null
  visibleQuestions: QuizQuestion[]
  progress: number
  isComplete: boolean
  unsureTopics: string[]
}

const QuizContext = createContext<QuizContextType | null>(null)

export function QuizProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(quizReducer, initialState)

  // Load state from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved) {
      try {
        const parsed = JSON.parse(saved)
        dispatch({ type: 'LOAD_STATE', state: parsed })
      } catch {
        // Invalid saved state, generate new session
        dispatch({ type: 'LOAD_STATE', state: { ...initialState, sessionId: generateSessionId() } })
      }
    } else {
      dispatch({ type: 'LOAD_STATE', state: { ...initialState, sessionId: generateSessionId() } })
    }
  }, [])

  // Save state to localStorage on change
  useEffect(() => {
    if (state.sessionId) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
    }
  }, [state])

  const setAnswer = (questionId: string, answer: string) => {
    dispatch({ type: 'SET_ANSWER', questionId, answer })
  }

  const setCustomNote = (questionId: string, note: string) => {
    dispatch({ type: 'SET_CUSTOM_NOTE', questionId, note })
  }

  const setStance = (questionId: string, stance: 'desired' | 'declined' | null) => {
    dispatch({ type: 'SET_STANCE', questionId, stance })
  }

  const setBirthTeam = (birthTeam: Partial<BirthTeam>) => {
    dispatch({ type: 'SET_BIRTH_TEAM', birthTeam })
  }

  const setTemplateStyle = (style: string) => {
    dispatch({ type: 'SET_TEMPLATE_STYLE', style })
  }

  const nextStep = () => dispatch({ type: 'NEXT_STEP' })
  const prevStep = () => dispatch({ type: 'PREV_STEP' })
  const goToStep = (step: number) => dispatch({ type: 'GO_TO_STEP', step })
  const reset = () => dispatch({ type: 'RESET' })

  // Get ordered questions based on current answers
  const visibleQuestions = getOrderedQuestions(state.answers)

  const currentQuestion = state.currentStep < visibleQuestions.length
    ? visibleQuestions[state.currentStep]
    : null

  const progress = (Object.keys(state.answers).length / visibleQuestions.length) * 100
  const isComplete = Object.keys(state.answers).length === visibleQuestions.length

  // Get list of topics where user selected "unsure"
  const unsureTopics = Object.entries(state.answers)
    .filter(([, answer]) => answer === 'unsure')
    .map(([questionId]) => questionId)

  return (
    <QuizContext.Provider
      value={{
        state,
        setAnswer,
        setCustomNote,
        setStance,
        setBirthTeam,
        setTemplateStyle,
        nextStep,
        prevStep,
        goToStep,
        reset,
        currentQuestion,
        visibleQuestions,
        progress,
        isComplete,
        unsureTopics,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

export function useQuiz() {
  const context = useContext(QuizContext)
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider')
  }
  return context
}
