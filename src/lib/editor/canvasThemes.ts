import type { TemplateStyle } from './editorTypes'

export interface CanvasTheme {
  fontFamily: string
  primaryColor: string
  textColor: string
  backgroundColor: string
  sectionHeaderBg: string
  borderColor: string
  decorative?: boolean
  /** SVG markup for corner/edge decorations, rendered as absolute overlays */
  cornerSvg?: {
    topLeft?: string
    topRight?: string
    bottomLeft?: string
    bottomRight?: string
  }
  /** Repeating subtle background pattern (CSS background-image value) */
  backgroundPattern?: string
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
    sectionHeaderBg: 'rgba(139, 90, 90, 0.08)',
    borderColor: '#e8d4d4',
    decorative: true,
    cornerSvg: {
      topLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none"><path d="M10 80 C20 60 40 40 60 30 C50 50 35 55 25 70 Z" fill="#d4a5a5" opacity="0.12"/><path d="M5 60 C15 40 30 25 50 15 C40 35 25 40 15 55 Z" fill="#c48b8b" opacity="0.10"/><circle cx="18" cy="25" r="8" fill="#d4a5a5" opacity="0.08"/><circle cx="35" cy="12" r="5" fill="#c48b8b" opacity="0.08"/><path d="M8 45 C12 35 22 28 32 22" stroke="#d4a5a5" stroke-width="0.5" opacity="0.15" fill="none"/><circle cx="8" cy="50" r="3" fill="#d4a5a5" opacity="0.1"/><path d="M2 70 Q10 55 20 50 Q12 58 8 68 Z" fill="#c48b8b" opacity="0.08"/></svg>`,
      topRight: `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none"><path d="M110 80 C100 60 80 40 60 30 C70 50 85 55 95 70 Z" fill="#d4a5a5" opacity="0.12"/><path d="M115 60 C105 40 90 25 70 15 C80 35 95 40 105 55 Z" fill="#c48b8b" opacity="0.10"/><circle cx="102" cy="25" r="8" fill="#d4a5a5" opacity="0.08"/><circle cx="85" cy="12" r="5" fill="#c48b8b" opacity="0.08"/><path d="M112 45 C108 35 98 28 88 22" stroke="#d4a5a5" stroke-width="0.5" opacity="0.15" fill="none"/></svg>`,
      bottomLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none"><path d="M10 40 C20 55 35 65 50 75 C35 68 22 58 15 48 Z" fill="#d4a5a5" opacity="0.10"/><circle cx="20" cy="80" r="6" fill="#c48b8b" opacity="0.07"/><path d="M5 55 Q15 65 25 72" stroke="#d4a5a5" stroke-width="0.5" opacity="0.12" fill="none"/></svg>`,
      bottomRight: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none"><path d="M90 40 C80 55 65 65 50 75 C65 68 78 58 85 48 Z" fill="#d4a5a5" opacity="0.10"/><circle cx="80" cy="80" r="6" fill="#c48b8b" opacity="0.07"/><path d="M95 55 Q85 65 75 72" stroke="#d4a5a5" stroke-width="0.5" opacity="0.12" fill="none"/></svg>`,
    },
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
    primaryColor: '#b8960c',
    textColor: '#3d3d3d',
    backgroundColor: '#fffef9',
    sectionHeaderBg: 'rgba(184, 150, 12, 0.06)',
    borderColor: '#e8e4d4',
    decorative: true,
    cornerSvg: {
      topLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none"><path d="M0 0 L40 0 L40 3 L3 3 L3 40 L0 40 Z" fill="#d4af37" opacity="0.18"/><path d="M0 0 L20 0 L20 1.5 L1.5 1.5 L1.5 20 L0 20 Z" fill="#d4af37" opacity="0.12"/><circle cx="6" cy="6" r="2" fill="#d4af37" opacity="0.15"/></svg>`,
      topRight: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none"><path d="M80 0 L40 0 L40 3 L77 3 L77 40 L80 40 Z" fill="#d4af37" opacity="0.18"/><path d="M80 0 L60 0 L60 1.5 L78.5 1.5 L78.5 20 L80 20 Z" fill="#d4af37" opacity="0.12"/><circle cx="74" cy="6" r="2" fill="#d4af37" opacity="0.15"/></svg>`,
      bottomLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none"><path d="M0 80 L40 80 L40 77 L3 77 L3 40 L0 40 Z" fill="#d4af37" opacity="0.18"/><circle cx="6" cy="74" r="2" fill="#d4af37" opacity="0.15"/></svg>`,
      bottomRight: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none"><path d="M80 80 L40 80 L40 77 L77 77 L77 40 L80 40 Z" fill="#d4af37" opacity="0.18"/><circle cx="74" cy="74" r="2" fill="#d4af37" opacity="0.15"/></svg>`,
    },
  },
  rustic: {
    fontFamily: 'Georgia, Times New Roman, serif',
    primaryColor: '#a0522d',
    textColor: '#5a4a3a',
    backgroundColor: '#f5f0e1',
    sectionHeaderBg: 'rgba(160, 82, 45, 0.08)',
    borderColor: '#d4c4a8',
    backgroundPattern: `radial-gradient(circle at 20% 80%, rgba(160, 82, 45, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(160, 82, 45, 0.03) 0%, transparent 50%)`,
  },
  botanical: {
    fontFamily: 'Georgia, Times New Roman, serif',
    primaryColor: '#4a7c59',
    textColor: '#3a4a3a',
    backgroundColor: '#f8fbf8',
    sectionHeaderBg: 'rgba(74, 124, 89, 0.07)',
    borderColor: '#c8d8c8',
    decorative: true,
    cornerSvg: {
      topLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" viewBox="0 0 130 130" fill="none"><path d="M15 90 C25 70 40 50 55 40 C50 55 35 60 25 75 Z" fill="#6b9e7a" opacity="0.10"/><path d="M5 70 C12 50 25 35 45 20 C38 40 22 48 12 60 Z" fill="#4a7c59" opacity="0.08"/><path d="M20 65 C28 48 40 38 55 28" stroke="#4a7c59" stroke-width="0.8" opacity="0.10" fill="none"/><ellipse cx="10" cy="40" rx="4" ry="8" transform="rotate(-30 10 40)" fill="#6b9e7a" opacity="0.07"/><ellipse cx="30" cy="18" rx="3" ry="7" transform="rotate(-20 30 18)" fill="#4a7c59" opacity="0.06"/><ellipse cx="48" cy="10" rx="3" ry="6" transform="rotate(-10 48 10)" fill="#6b9e7a" opacity="0.06"/></svg>`,
      topRight: `<svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" viewBox="0 0 130 130" fill="none"><path d="M115 90 C105 70 90 50 75 40 C80 55 95 60 105 75 Z" fill="#6b9e7a" opacity="0.10"/><path d="M125 70 C118 50 105 35 85 20 C92 40 108 48 118 60 Z" fill="#4a7c59" opacity="0.08"/><ellipse cx="120" cy="40" rx="4" ry="8" transform="rotate(30 120 40)" fill="#6b9e7a" opacity="0.07"/><ellipse cx="100" cy="18" rx="3" ry="7" transform="rotate(20 100 18)" fill="#4a7c59" opacity="0.06"/></svg>`,
      bottomLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none"><ellipse cx="15" cy="75" rx="4" ry="8" transform="rotate(30 15 75)" fill="#6b9e7a" opacity="0.07"/><path d="M8 60 Q18 70 22 82" stroke="#4a7c59" stroke-width="0.6" opacity="0.10" fill="none"/></svg>`,
      bottomRight: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none"><ellipse cx="85" cy="75" rx="4" ry="8" transform="rotate(-30 85 75)" fill="#6b9e7a" opacity="0.07"/><path d="M92 60 Q82 70 78 82" stroke="#4a7c59" stroke-width="0.6" opacity="0.10" fill="none"/></svg>`,
    },
  },
  ocean: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    primaryColor: '#3d7a9e',
    textColor: '#2a3a4a',
    backgroundColor: '#f5f9fc',
    sectionHeaderBg: 'rgba(61, 122, 158, 0.06)',
    borderColor: '#c4d8e8',
    decorative: true,
    backgroundPattern: `radial-gradient(ellipse at 10% 90%, rgba(61, 122, 158, 0.04) 0%, transparent 60%), radial-gradient(ellipse at 90% 10%, rgba(61, 122, 158, 0.03) 0%, transparent 60%)`,
    cornerSvg: {
      topRight: `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="60" viewBox="0 0 140 60" fill="none"><path d="M140 35 C120 25 100 30 80 25 C60 20 50 28 30 22" stroke="#3d7a9e" stroke-width="1" opacity="0.08" fill="none"/><path d="M140 48 C115 38 95 45 70 38 C50 32 35 40 15 34" stroke="#3d7a9e" stroke-width="0.8" opacity="0.06" fill="none"/></svg>`,
      bottomLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="60" viewBox="0 0 140 60" fill="none"><path d="M0 25 C20 35 40 30 60 35 C80 40 90 32 110 38" stroke="#3d7a9e" stroke-width="1" opacity="0.08" fill="none"/><path d="M0 12 C25 22 45 15 70 22 C90 28 105 20 125 26" stroke="#3d7a9e" stroke-width="0.8" opacity="0.06" fill="none"/></svg>`,
    },
  },
  boho: {
    fontFamily: 'Georgia, Times New Roman, serif',
    primaryColor: '#c4724e',
    textColor: '#4a3a2a',
    backgroundColor: '#fdf8f4',
    sectionHeaderBg: 'rgba(196, 114, 78, 0.07)',
    borderColor: '#e0cec0',
    decorative: true,
    cornerSvg: {
      topLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none"><circle cx="15" cy="15" r="12" stroke="#c4724e" stroke-width="0.8" opacity="0.10" fill="none"/><circle cx="15" cy="15" r="6" stroke="#c4724e" stroke-width="0.5" opacity="0.08" fill="none"/><circle cx="15" cy="15" r="2" fill="#c4724e" opacity="0.10"/><path d="M15 3 L15 27 M3 15 L27 15" stroke="#c4724e" stroke-width="0.4" opacity="0.06"/></svg>`,
      topRight: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none"><circle cx="85" cy="15" r="12" stroke="#c4724e" stroke-width="0.8" opacity="0.10" fill="none"/><circle cx="85" cy="15" r="6" stroke="#c4724e" stroke-width="0.5" opacity="0.08" fill="none"/><circle cx="85" cy="15" r="2" fill="#c4724e" opacity="0.10"/></svg>`,
      bottomLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none"><path d="M5 60 Q20 50 35 55 Q20 58 10 65" stroke="#c4724e" stroke-width="0.6" opacity="0.08" fill="none"/></svg>`,
      bottomRight: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none"><path d="M75 60 Q60 50 45 55 Q60 58 70 65" stroke="#c4724e" stroke-width="0.6" opacity="0.08" fill="none"/></svg>`,
    },
    backgroundPattern: `radial-gradient(circle at 50% 50%, rgba(196, 114, 78, 0.02) 0%, transparent 70%)`,
  },
}
