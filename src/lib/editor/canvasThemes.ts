import type { TemplateStyle } from './editorTypes'

export interface CanvasTheme {
  fontFamily: string
  primaryColor: string
  textColor: string
  backgroundColor: string
  sectionHeaderBg: string
  borderColor: string
  decorative?: boolean
}

export const canvasThemes: Record<TemplateStyle, CanvasTheme> = {
  minimal: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    primaryColor: '#d4a5a5',
    textColor: '#333333',
    backgroundColor: '#ffffff',
    sectionHeaderBg: 'rgba(212, 165, 165, 0.1)',
    borderColor: '#e5e5e5',
  },
  floral: {
    fontFamily: 'Georgia, Times New Roman, serif',
    primaryColor: '#8b5a5a',
    textColor: '#6a5a5a',
    backgroundColor: '#fff9f9',
    sectionHeaderBg: 'rgba(139, 90, 90, 0.1)',
    borderColor: '#e8d4d4',
    decorative: true,
  },
  professional: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    primaryColor: '#2c3e50',
    textColor: '#333333',
    backgroundColor: '#ffffff',
    sectionHeaderBg: 'rgba(44, 62, 80, 0.05)',
    borderColor: '#d1d5db',
  },
  elegant: {
    fontFamily: 'Georgia, Times New Roman, serif',
    primaryColor: '#d4af37',
    textColor: '#3d3d3d',
    backgroundColor: '#fffef9',
    sectionHeaderBg: 'rgba(212, 175, 55, 0.1)',
    borderColor: '#e8e4d4',
    decorative: true,
  },
  rustic: {
    fontFamily: 'Georgia, Times New Roman, serif',
    primaryColor: '#a0522d',
    textColor: '#5a4a3a',
    backgroundColor: '#f5f0e1',
    sectionHeaderBg: 'rgba(160, 82, 45, 0.1)',
    borderColor: '#d4c4a8',
  },
}
