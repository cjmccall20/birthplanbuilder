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
      topLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
        <!-- Main stem curving from corner -->
        <path d="M2 2 C8 20, 15 40, 30 55 C38 63, 48 68, 55 80" stroke="#8b5a5a" stroke-width="0.8" opacity="0.12" fill="none"/>
        <!-- Secondary stem branching up -->
        <path d="M18 35 C25 28, 35 22, 48 18" stroke="#8b5a5a" stroke-width="0.6" opacity="0.10" fill="none"/>
        <!-- Tertiary stem branching right -->
        <path d="M35 55 C45 50, 55 48, 65 50" stroke="#8b5a5a" stroke-width="0.5" opacity="0.08" fill="none"/>
        <!-- Large 5-petal rose near corner -->
        <path d="M18 18 C14 12, 8 10, 10 16 C6 14, 4 8, 10 12 C8 6, 14 4, 14 10 C18 6, 22 8, 18 14 C24 10, 24 16, 18 18 Z" fill="#d4a5a5" opacity="0.12"/>
        <circle cx="15" cy="13" r="2.5" fill="#c48b8b" opacity="0.10"/>
        <!-- Medium 5-petal flower on upper branch -->
        <path d="M45 16 C43 11, 48 8, 48 13 C51 9, 54 12, 50 15 C54 16, 53 20, 49 18 C50 22, 46 21, 46 17 C42 19, 42 15, 45 16 Z" fill="#d4a5a5" opacity="0.10"/>
        <circle cx="47" cy="15" r="1.8" fill="#c48b8b" opacity="0.08"/>
        <!-- Small bud on right branch -->
        <path d="M62 48 C60 44, 64 42, 64 46 C66 43, 68 46, 64 48 Z" fill="#d4a5a5" opacity="0.09"/>
        <!-- Leaf shapes along main stem -->
        <path d="M10 30 C6 24, 3 20, 6 26 Q8 28, 10 30 Z" fill="#c48b8b" opacity="0.10"/>
        <path d="M22 45 Q16 40, 14 34 Q18 38, 22 45 Z" fill="#8b5a5a" opacity="0.08"/>
        <path d="M38 60 Q32 56, 28 50 Q34 54, 38 60 Z" fill="#c48b8b" opacity="0.08"/>
        <!-- Leaf on upper branch -->
        <path d="M30 25 Q26 20, 28 16 Q30 20, 34 22 Q32 24, 30 25 Z" fill="#8b5a5a" opacity="0.08"/>
        <path d="M38 20 Q40 14, 44 12 Q42 16, 38 20 Z" fill="#c48b8b" opacity="0.07"/>
        <!-- Small flower on main stem midway -->
        <path d="M28 52 C26 49, 29 47, 29 50 C31 48, 32 50, 30 52 C32 53, 30 55, 28 53 C27 55, 25 53, 28 52 Z" fill="#d4a5a5" opacity="0.08"/>
        <!-- Tiny buds/dots scattered -->
        <circle cx="6" cy="10" r="1.5" fill="#d4a5a5" opacity="0.08"/>
        <circle cx="50 " cy="30" r="1" fill="#c48b8b" opacity="0.06"/>
        <circle cx="60" cy="55" r="1.2" fill="#d4a5a5" opacity="0.06"/>
      </svg>`,
      topRight: `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
        <!-- Main stem curving from right corner -->
        <path d="M118 2 C112 20, 105 40, 90 55 C82 63, 72 68, 65 80" stroke="#8b5a5a" stroke-width="0.8" opacity="0.12" fill="none"/>
        <!-- Secondary stem branching left-up -->
        <path d="M102 35 C95 28, 85 22, 72 18" stroke="#8b5a5a" stroke-width="0.6" opacity="0.10" fill="none"/>
        <!-- Tertiary stem branching left -->
        <path d="M85 55 C75 50, 65 48, 55 50" stroke="#8b5a5a" stroke-width="0.5" opacity="0.08" fill="none"/>
        <!-- Large 5-petal rose near corner -->
        <path d="M102 18 C106 12, 112 10, 110 16 C114 14, 116 8, 110 12 C112 6, 106 4, 106 10 C102 6, 98 8, 102 14 C96 10, 96 16, 102 18 Z" fill="#d4a5a5" opacity="0.12"/>
        <circle cx="105" cy="13" r="2.5" fill="#c48b8b" opacity="0.10"/>
        <!-- Medium flower on upper-left branch -->
        <path d="M75 16 C77 11, 72 8, 72 13 C69 9, 66 12, 70 15 C66 16, 67 20, 71 18 C70 22, 74 21, 74 17 C78 19, 78 15, 75 16 Z" fill="#d4a5a5" opacity="0.10"/>
        <circle cx="73" cy="15" r="1.8" fill="#c48b8b" opacity="0.08"/>
        <!-- Small bud on left branch -->
        <path d="M58 48 C60 44, 56 42, 56 46 C54 43, 52 46, 56 48 Z" fill="#d4a5a5" opacity="0.09"/>
        <!-- Leaf shapes along main stem -->
        <path d="M110 30 C114 24, 117 20, 114 26 Q112 28, 110 30 Z" fill="#c48b8b" opacity="0.10"/>
        <path d="M98 45 Q104 40, 106 34 Q102 38, 98 45 Z" fill="#8b5a5a" opacity="0.08"/>
        <path d="M82 60 Q88 56, 92 50 Q86 54, 82 60 Z" fill="#c48b8b" opacity="0.08"/>
        <!-- Leaves on upper branch -->
        <path d="M90 25 Q94 20, 92 16 Q90 20, 86 22 Q88 24, 90 25 Z" fill="#8b5a5a" opacity="0.08"/>
        <path d="M82 20 Q80 14, 76 12 Q78 16, 82 20 Z" fill="#c48b8b" opacity="0.07"/>
        <!-- Tiny scattered dots -->
        <circle cx="114" cy="10" r="1.5" fill="#d4a5a5" opacity="0.08"/>
        <circle cx="70" cy="30" r="1" fill="#c48b8b" opacity="0.06"/>
      </svg>`,
      bottomLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
        <!-- Vine trailing from bottom-left corner -->
        <path d="M2 98 C8 85, 18 75, 30 70 C38 67, 48 68, 55 65" stroke="#8b5a5a" stroke-width="0.6" opacity="0.10" fill="none"/>
        <!-- Small leaf shapes -->
        <path d="M10 90 Q6 85, 5 80 Q8 84, 12 88 Q11 89, 10 90 Z" fill="#c48b8b" opacity="0.09"/>
        <path d="M20 78 Q16 74, 15 70 Q18 73, 22 76 Q21 77, 20 78 Z" fill="#8b5a5a" opacity="0.08"/>
        <path d="M35 70 Q30 67, 28 63 Q32 66, 36 68 Z" fill="#c48b8b" opacity="0.07"/>
        <!-- Tiny bud -->
        <path d="M48 66 C46 63, 49 62, 49 64 C51 62, 51 65, 48 66 Z" fill="#d4a5a5" opacity="0.08"/>
        <!-- Small leaf pair -->
        <path d="M42 68 Q38 64, 40 60 Q42 64, 44 66 Z" fill="#8b5a5a" opacity="0.07"/>
        <circle cx="5" cy="95" r="1.5" fill="#d4a5a5" opacity="0.07"/>
      </svg>`,
      bottomRight: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
        <!-- Vine trailing from bottom-right corner -->
        <path d="M98 98 C92 85, 82 75, 70 70 C62 67, 52 68, 45 65" stroke="#8b5a5a" stroke-width="0.6" opacity="0.10" fill="none"/>
        <!-- Small leaf shapes -->
        <path d="M90 90 Q94 85, 95 80 Q92 84, 88 88 Q89 89, 90 90 Z" fill="#c48b8b" opacity="0.09"/>
        <path d="M80 78 Q84 74, 85 70 Q82 73, 78 76 Q79 77, 80 78 Z" fill="#8b5a5a" opacity="0.08"/>
        <path d="M65 70 Q70 67, 72 63 Q68 66, 64 68 Z" fill="#c48b8b" opacity="0.07"/>
        <!-- Tiny bud -->
        <path d="M52 66 C54 63, 51 62, 51 64 C49 62, 49 65, 52 66 Z" fill="#d4a5a5" opacity="0.08"/>
        <circle cx="95" cy="95" r="1.5" fill="#d4a5a5" opacity="0.07"/>
      </svg>`,
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
      topLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
        <!-- Outer L-frame -->
        <path d="M0 0 L40 0 L40 3 L3 3 L3 40 L0 40 Z" fill="#d4af37" opacity="0.18"/>
        <!-- Inner L-frame -->
        <path d="M0 0 L20 0 L20 1.5 L1.5 1.5 L1.5 20 L0 20 Z" fill="#d4af37" opacity="0.12"/>
        <!-- Diamond accent at corner point -->
        <path d="M6 6 L9 3 L12 6 L9 9 Z" fill="#d4af37" opacity="0.15"/>
        <!-- Filigree scroll along top bar -->
        <path d="M14 5 C16 2, 20 2, 22 5 C24 2, 28 2, 30 5" stroke="#d4af37" stroke-width="0.6" opacity="0.12" fill="none"/>
        <path d="M22 5 C22 8, 26 8, 26 5" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M14 5 C14 8, 18 8, 18 5" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <!-- Filigree scroll along left bar -->
        <path d="M5 14 C2 16, 2 20, 5 22 C2 24, 2 28, 5 30" stroke="#d4af37" stroke-width="0.6" opacity="0.12" fill="none"/>
        <path d="M5 22 C8 22, 8 26, 5 26" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M5 14 C8 14, 8 18, 5 18" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <!-- Small flourish curls at frame ends -->
        <path d="M38 5 C40 3, 42 4, 40 6" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M5 38 C3 40, 4 42, 6 40" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <!-- Tiny dots along frame edges -->
        <circle cx="34" cy="1.5" r="0.6" fill="#d4af37" opacity="0.12"/>
        <circle cx="1.5" cy="34" r="0.6" fill="#d4af37" opacity="0.12"/>
      </svg>`,
      topRight: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
        <!-- Outer L-frame -->
        <path d="M80 0 L40 0 L40 3 L77 3 L77 40 L80 40 Z" fill="#d4af37" opacity="0.18"/>
        <!-- Inner L-frame -->
        <path d="M80 0 L60 0 L60 1.5 L78.5 1.5 L78.5 20 L80 20 Z" fill="#d4af37" opacity="0.12"/>
        <!-- Diamond accent at corner point -->
        <path d="M74 6 L71 3 L68 6 L71 9 Z" fill="#d4af37" opacity="0.15"/>
        <!-- Filigree scroll along top bar -->
        <path d="M66 5 C64 2, 60 2, 58 5 C56 2, 52 2, 50 5" stroke="#d4af37" stroke-width="0.6" opacity="0.12" fill="none"/>
        <path d="M58 5 C58 8, 54 8, 54 5" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M66 5 C66 8, 62 8, 62 5" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <!-- Filigree scroll along right bar -->
        <path d="M75 14 C78 16, 78 20, 75 22 C78 24, 78 28, 75 30" stroke="#d4af37" stroke-width="0.6" opacity="0.12" fill="none"/>
        <path d="M75 22 C72 22, 72 26, 75 26" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M75 14 C72 14, 72 18, 75 18" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <!-- Small flourish curls at frame ends -->
        <path d="M42 5 C40 3, 38 4, 40 6" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M75 38 C77 40, 76 42, 74 40" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <!-- Tiny dots -->
        <circle cx="46" cy="1.5" r="0.6" fill="#d4af37" opacity="0.12"/>
        <circle cx="78.5" cy="34" r="0.6" fill="#d4af37" opacity="0.12"/>
      </svg>`,
      bottomLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
        <!-- Outer L-frame -->
        <path d="M0 80 L40 80 L40 77 L3 77 L3 40 L0 40 Z" fill="#d4af37" opacity="0.18"/>
        <!-- Inner L-frame -->
        <path d="M0 80 L20 80 L20 78.5 L1.5 78.5 L1.5 60 L0 60 Z" fill="#d4af37" opacity="0.12"/>
        <!-- Diamond accent at corner point -->
        <path d="M6 74 L9 71 L12 74 L9 77 Z" fill="#d4af37" opacity="0.15"/>
        <!-- Filigree scroll along bottom bar -->
        <path d="M14 75 C16 78, 20 78, 22 75 C24 78, 28 78, 30 75" stroke="#d4af37" stroke-width="0.6" opacity="0.12" fill="none"/>
        <path d="M22 75 C22 72, 26 72, 26 75" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <!-- Filigree scroll along left bar -->
        <path d="M5 66 C2 64, 2 60, 5 58 C2 56, 2 52, 5 50" stroke="#d4af37" stroke-width="0.6" opacity="0.12" fill="none"/>
        <path d="M5 58 C8 58, 8 54, 5 54" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <!-- Flourish curls -->
        <path d="M38 75 C40 77, 42 76, 40 74" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M5 42 C3 40, 4 38, 6 40" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <circle cx="34" cy="78.5" r="0.6" fill="#d4af37" opacity="0.12"/>
        <circle cx="1.5" cy="46" r="0.6" fill="#d4af37" opacity="0.12"/>
      </svg>`,
      bottomRight: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
        <!-- Outer L-frame -->
        <path d="M80 80 L40 80 L40 77 L77 77 L77 40 L80 40 Z" fill="#d4af37" opacity="0.18"/>
        <!-- Inner L-frame -->
        <path d="M80 80 L60 80 L60 78.5 L78.5 78.5 L78.5 60 L80 60 Z" fill="#d4af37" opacity="0.12"/>
        <!-- Diamond accent at corner point -->
        <path d="M74 74 L71 71 L68 74 L71 77 Z" fill="#d4af37" opacity="0.15"/>
        <!-- Filigree scroll along bottom bar -->
        <path d="M66 75 C64 78, 60 78, 58 75 C56 78, 52 78, 50 75" stroke="#d4af37" stroke-width="0.6" opacity="0.12" fill="none"/>
        <path d="M58 75 C58 72, 54 72, 54 75" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <!-- Filigree scroll along right bar -->
        <path d="M75 66 C78 64, 78 60, 75 58 C78 56, 78 52, 75 50" stroke="#d4af37" stroke-width="0.6" opacity="0.12" fill="none"/>
        <path d="M75 58 C72 58, 72 54, 75 54" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <!-- Flourish curls -->
        <path d="M42 75 C40 77, 38 76, 40 74" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M75 42 C77 40, 76 38, 74 40" stroke="#d4af37" stroke-width="0.5" opacity="0.10" fill="none"/>
        <circle cx="46" cy="78.5" r="0.6" fill="#d4af37" opacity="0.12"/>
        <circle cx="78.5" cy="46" r="0.6" fill="#d4af37" opacity="0.12"/>
      </svg>`,
    },
  },
  rustic: {
    fontFamily: 'Georgia, Times New Roman, serif',
    primaryColor: '#a0522d',
    textColor: '#5a4a3a',
    backgroundColor: '#f5f0e1',
    sectionHeaderBg: 'rgba(160, 82, 45, 0.08)',
    borderColor: '#d4c4a8',
    decorative: true,
    backgroundPattern: `radial-gradient(circle at 20% 80%, rgba(160, 82, 45, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(160, 82, 45, 0.03) 0%, transparent 50%)`,
    cornerSvg: {
      topLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
        <!-- Wildflower sprig - main stem -->
        <path d="M8 95 C10 75, 14 55, 20 40 C24 30, 28 22, 30 12" stroke="#a0522d" stroke-width="0.7" opacity="0.12" fill="none"/>
        <!-- Branch stems -->
        <path d="M16 55 C22 48, 30 44, 40 42" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M20 40 C14 34, 8 30, 4 22" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <!-- Daisy flower 1 at top of main stem -->
        <path d="M30 12 C28 7, 30 4, 32 8" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M30 12 C25 10, 24 7, 28 8" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M30 12 C33 8, 36 8, 34 11" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M30 12 C27 8, 25 5, 27 5" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M30 12 C34 9, 36 6, 34 6" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <circle cx="30" cy="11" r="2" fill="#a0522d" opacity="0.10"/>
        <!-- Daisy flower 2 on left branch -->
        <path d="M4 22 C2 17, 4 14, 6 18" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M4 22 C0 20, -1 17, 2 18" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M4 22 C6 18, 9 17, 8 20" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M4 22 C1 18, 0 15, 2 15" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M4 22 C7 19, 9 16, 7 16" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <circle cx="4" cy="21" r="1.5" fill="#a0522d" opacity="0.10"/>
        <!-- Small bud on right branch -->
        <path d="M40 42 C42 38, 44 36, 42 40" fill="#a0522d" opacity="0.08"/>
        <path d="M40 42 C38 38, 40 36, 42 40" fill="#a0522d" opacity="0.08"/>
        <!-- Pinecone shape -->
        <path d="M50 30 C48 28, 48 25, 50 24 C52 25, 52 28, 50 30 Z" fill="#a0522d" opacity="0.08"/>
        <path d="M50 26 C48 24, 48 21, 50 20 C52 21, 52 24, 50 26 Z" fill="#a0522d" opacity="0.06"/>
        <path d="M50 22 C49 21, 49 19, 50 18 C51 19, 51 21, 50 22 Z" fill="#a0522d" opacity="0.05"/>
        <!-- Tiny stem to pinecone -->
        <path d="M50 30 L50 34" stroke="#a0522d" stroke-width="0.4" opacity="0.08"/>
        <!-- Small leaves along main stem -->
        <path d="M12 70 Q8 66, 7 62 Q10 65, 14 68 Z" fill="#a0522d" opacity="0.07"/>
        <path d="M14 60 Q18 56, 20 52 Q17 55, 14 60 Z" fill="#a0522d" opacity="0.07"/>
      </svg>`,
      topRight: `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="120" viewBox="0 0 120 120" fill="none">
        <!-- Wildflower sprig - main stem, mirrored -->
        <path d="M112 95 C110 75, 106 55, 100 40 C96 30, 92 22, 90 12" stroke="#a0522d" stroke-width="0.7" opacity="0.12" fill="none"/>
        <!-- Branch stems -->
        <path d="M104 55 C98 48, 90 44, 80 42" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M100 40 C106 34, 112 30, 116 22" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <!-- Daisy flower at top -->
        <path d="M90 12 C92 7, 90 4, 88 8" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M90 12 C95 10, 96 7, 92 8" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M90 12 C87 8, 84 8, 86 11" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M90 12 C93 8, 95 5, 93 5" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M90 12 C86 9, 84 6, 86 6" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <circle cx="90" cy="11" r="2" fill="#a0522d" opacity="0.10"/>
        <!-- Daisy on right branch -->
        <path d="M116 22 C118 17, 116 14, 114 18" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M116 22 C120 20, 121 17, 118 18" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M116 22 C114 18, 111 17, 112 20" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <path d="M116 22 C119 18, 120 15, 118 15" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <circle cx="116" cy="21" r="1.5" fill="#a0522d" opacity="0.10"/>
        <!-- Small bud on left branch -->
        <path d="M80 42 C78 38, 76 36, 78 40" fill="#a0522d" opacity="0.08"/>
        <path d="M80 42 C82 38, 80 36, 78 40" fill="#a0522d" opacity="0.08"/>
        <!-- Pinecone shape -->
        <path d="M70 30 C72 28, 72 25, 70 24 C68 25, 68 28, 70 30 Z" fill="#a0522d" opacity="0.08"/>
        <path d="M70 26 C72 24, 72 21, 70 20 C68 21, 68 24, 70 26 Z" fill="#a0522d" opacity="0.06"/>
        <path d="M70 22 C71 21, 71 19, 70 18 C69 19, 69 21, 70 22 Z" fill="#a0522d" opacity="0.05"/>
        <path d="M70 30 L70 34" stroke="#a0522d" stroke-width="0.4" opacity="0.08"/>
        <!-- Small leaves -->
        <path d="M108 70 Q112 66, 113 62 Q110 65, 106 68 Z" fill="#a0522d" opacity="0.07"/>
        <path d="M106 60 Q102 56, 100 52 Q103 55, 106 60 Z" fill="#a0522d" opacity="0.07"/>
      </svg>`,
      bottomLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
        <!-- Wheat stalk 1 -->
        <path d="M10 98 C12 85, 14 72, 18 62" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <!-- Wheat grains on stalk 1 -->
        <path d="M18 62 Q16 58, 14 55 Q18 57, 20 60 Z" fill="#a0522d" opacity="0.08"/>
        <path d="M18 62 Q20 58, 22 55 Q19 57, 17 60 Z" fill="#a0522d" opacity="0.08"/>
        <path d="M16 57 Q14 53, 12 50 Q16 52, 18 55 Z" fill="#a0522d" opacity="0.07"/>
        <path d="M16 57 Q18 53, 20 50 Q17 52, 15 55 Z" fill="#a0522d" opacity="0.07"/>
        <!-- Wheat stalk 2 -->
        <path d="M20 98 C22 88, 25 78, 30 70" stroke="#a0522d" stroke-width="0.4" opacity="0.08" fill="none"/>
        <path d="M30 70 Q28 66, 26 63 Q30 65, 32 68 Z" fill="#a0522d" opacity="0.07"/>
        <path d="M30 70 Q32 66, 34 63 Q31 65, 29 68 Z" fill="#a0522d" opacity="0.07"/>
        <!-- Grass blade -->
        <path d="M5 98 Q3 80, 6 68 Q7 80, 5 98 Z" fill="#a0522d" opacity="0.06"/>
        <!-- Tiny grass -->
        <path d="M30 98 Q32 88, 35 82 Q33 88, 30 98 Z" fill="#a0522d" opacity="0.05"/>
      </svg>`,
      bottomRight: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
        <!-- Wheat stalk 1 -->
        <path d="M90 98 C88 85, 86 72, 82 62" stroke="#a0522d" stroke-width="0.5" opacity="0.10" fill="none"/>
        <!-- Wheat grains -->
        <path d="M82 62 Q84 58, 86 55 Q82 57, 80 60 Z" fill="#a0522d" opacity="0.08"/>
        <path d="M82 62 Q80 58, 78 55 Q81 57, 83 60 Z" fill="#a0522d" opacity="0.08"/>
        <path d="M84 57 Q86 53, 88 50 Q84 52, 82 55 Z" fill="#a0522d" opacity="0.07"/>
        <path d="M84 57 Q82 53, 80 50 Q83 52, 85 55 Z" fill="#a0522d" opacity="0.07"/>
        <!-- Wheat stalk 2 -->
        <path d="M80 98 C78 88, 75 78, 70 70" stroke="#a0522d" stroke-width="0.4" opacity="0.08" fill="none"/>
        <path d="M70 70 Q72 66, 74 63 Q70 65, 68 68 Z" fill="#a0522d" opacity="0.07"/>
        <path d="M70 70 Q68 66, 66 63 Q69 65, 71 68 Z" fill="#a0522d" opacity="0.07"/>
        <!-- Grass blade -->
        <path d="M95 98 Q97 80, 94 68 Q93 80, 95 98 Z" fill="#a0522d" opacity="0.06"/>
        <!-- Tiny grass -->
        <path d="M70 98 Q68 88, 65 82 Q67 88, 70 98 Z" fill="#a0522d" opacity="0.05"/>
      </svg>`,
    },
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
      topLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" viewBox="0 0 130 130" fill="none">
        <!-- Main eucalyptus branch curving from top-left -->
        <path d="M5 5 C12 15, 20 30, 28 50 C34 65, 38 80, 45 95" stroke="#4a7c59" stroke-width="0.8" opacity="0.12" fill="none"/>
        <!-- Secondary branch splitting right -->
        <path d="M20 35 C30 38, 42 42, 55 48 C65 52, 72 58, 80 65" stroke="#4a7c59" stroke-width="0.6" opacity="0.10" fill="none"/>
        <!-- Small twig up-left -->
        <path d="M12 20 C6 16, 3 10, 2 5" stroke="#4a7c59" stroke-width="0.4" opacity="0.08" fill="none"/>
        <!-- Round eucalyptus leaves along main branch - pairs on alternating sides -->
        <ellipse cx="10" cy="14" rx="5" ry="6" transform="rotate(-20 10 14)" fill="#6b9e7a" opacity="0.09"/>
        <ellipse cx="16" cy="12" rx="4" ry="5" transform="rotate(15 16 12)" fill="#4a7c59" opacity="0.07"/>
        <ellipse cx="18" cy="28" rx="5.5" ry="6.5" transform="rotate(-25 18 28)" fill="#6b9e7a" opacity="0.08"/>
        <ellipse cx="24" cy="25" rx="4.5" ry="5.5" transform="rotate(20 24 25)" fill="#4a7c59" opacity="0.07"/>
        <ellipse cx="25" cy="45" rx="5" ry="6" transform="rotate(-15 25 45)" fill="#6b9e7a" opacity="0.08"/>
        <ellipse cx="31" cy="42" rx="4.5" ry="5.5" transform="rotate(25 31 42)" fill="#4a7c59" opacity="0.06"/>
        <ellipse cx="30" cy="60" rx="5" ry="6.5" transform="rotate(-20 30 60)" fill="#6b9e7a" opacity="0.07"/>
        <ellipse cx="36" cy="57" rx="4" ry="5" transform="rotate(15 36 57)" fill="#4a7c59" opacity="0.06"/>
        <ellipse cx="36" cy="78" rx="4.5" ry="5.5" transform="rotate(-25 36 78)" fill="#6b9e7a" opacity="0.06"/>
        <!-- Leaves along secondary branch -->
        <ellipse cx="32" cy="38" rx="4" ry="5" transform="rotate(30 32 38)" fill="#6b9e7a" opacity="0.07"/>
        <ellipse cx="45" cy="44" rx="4.5" ry="5.5" transform="rotate(20 45 44)" fill="#4a7c59" opacity="0.06"/>
        <ellipse cx="42" cy="48" rx="3.5" ry="5" transform="rotate(-15 42 48)" fill="#6b9e7a" opacity="0.07"/>
        <ellipse cx="58" cy="50" rx="4" ry="5" transform="rotate(25 58 50)" fill="#4a7c59" opacity="0.06"/>
        <ellipse cx="55" cy="55" rx="3.5" ry="4.5" transform="rotate(-20 55 55)" fill="#6b9e7a" opacity="0.06"/>
        <ellipse cx="68" cy="56" rx="3.5" ry="4.5" transform="rotate(15 68 56)" fill="#4a7c59" opacity="0.05"/>
        <!-- Fern frond - small feathery shape near top -->
        <path d="M6 8 C4 5, 2 2, 3 1" stroke="#4a7c59" stroke-width="0.4" opacity="0.08" fill="none"/>
        <path d="M4 5 C2 4, 1 3, 1 2" stroke="#6b9e7a" stroke-width="0.3" opacity="0.06" fill="none"/>
        <path d="M4 5 C5 3, 6 2, 7 2" stroke="#6b9e7a" stroke-width="0.3" opacity="0.06" fill="none"/>
        <path d="M5 7 C3 6, 2 5, 1 4" stroke="#6b9e7a" stroke-width="0.3" opacity="0.06" fill="none"/>
        <path d="M5 7 C6 5, 7 4, 8 4" stroke="#6b9e7a" stroke-width="0.3" opacity="0.06" fill="none"/>
      </svg>`,
      topRight: `<svg xmlns="http://www.w3.org/2000/svg" width="130" height="130" viewBox="0 0 130 130" fill="none">
        <!-- Main eucalyptus branch curving from top-right -->
        <path d="M125 5 C118 15, 110 30, 102 50 C96 65, 92 80, 85 95" stroke="#4a7c59" stroke-width="0.8" opacity="0.12" fill="none"/>
        <!-- Secondary branch splitting left -->
        <path d="M110 35 C100 38, 88 42, 75 48 C65 52, 58 58, 50 65" stroke="#4a7c59" stroke-width="0.6" opacity="0.10" fill="none"/>
        <!-- Small twig up-right -->
        <path d="M118 20 C124 16, 127 10, 128 5" stroke="#4a7c59" stroke-width="0.4" opacity="0.08" fill="none"/>
        <!-- Round eucalyptus leaves along main branch -->
        <ellipse cx="120" cy="14" rx="5" ry="6" transform="rotate(20 120 14)" fill="#6b9e7a" opacity="0.09"/>
        <ellipse cx="114" cy="12" rx="4" ry="5" transform="rotate(-15 114 12)" fill="#4a7c59" opacity="0.07"/>
        <ellipse cx="112" cy="28" rx="5.5" ry="6.5" transform="rotate(25 112 28)" fill="#6b9e7a" opacity="0.08"/>
        <ellipse cx="106" cy="25" rx="4.5" ry="5.5" transform="rotate(-20 106 25)" fill="#4a7c59" opacity="0.07"/>
        <ellipse cx="105" cy="45" rx="5" ry="6" transform="rotate(15 105 45)" fill="#6b9e7a" opacity="0.08"/>
        <ellipse cx="99" cy="42" rx="4.5" ry="5.5" transform="rotate(-25 99 42)" fill="#4a7c59" opacity="0.06"/>
        <ellipse cx="100" cy="60" rx="5" ry="6.5" transform="rotate(20 100 60)" fill="#6b9e7a" opacity="0.07"/>
        <ellipse cx="94" cy="57" rx="4" ry="5" transform="rotate(-15 94 57)" fill="#4a7c59" opacity="0.06"/>
        <ellipse cx="94" cy="78" rx="4.5" ry="5.5" transform="rotate(25 94 78)" fill="#6b9e7a" opacity="0.06"/>
        <!-- Leaves along secondary branch -->
        <ellipse cx="98" cy="38" rx="4" ry="5" transform="rotate(-30 98 38)" fill="#6b9e7a" opacity="0.07"/>
        <ellipse cx="85" cy="44" rx="4.5" ry="5.5" transform="rotate(-20 85 44)" fill="#4a7c59" opacity="0.06"/>
        <ellipse cx="88" cy="48" rx="3.5" ry="5" transform="rotate(15 88 48)" fill="#6b9e7a" opacity="0.07"/>
        <ellipse cx="72" cy="50" rx="4" ry="5" transform="rotate(-25 72 50)" fill="#4a7c59" opacity="0.06"/>
        <ellipse cx="75" cy="55" rx="3.5" ry="4.5" transform="rotate(20 75 55)" fill="#6b9e7a" opacity="0.06"/>
        <ellipse cx="62" cy="56" rx="3.5" ry="4.5" transform="rotate(-15 62 56)" fill="#4a7c59" opacity="0.05"/>
        <!-- Fern frond near top -->
        <path d="M124 8 C126 5, 128 2, 127 1" stroke="#4a7c59" stroke-width="0.4" opacity="0.08" fill="none"/>
        <path d="M126 5 C128 4, 129 3, 129 2" stroke="#6b9e7a" stroke-width="0.3" opacity="0.06" fill="none"/>
        <path d="M126 5 C125 3, 124 2, 123 2" stroke="#6b9e7a" stroke-width="0.3" opacity="0.06" fill="none"/>
      </svg>`,
      bottomLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
        <!-- Small leaf sprig from bottom-left -->
        <path d="M5 95 C10 82, 16 72, 25 65" stroke="#4a7c59" stroke-width="0.5" opacity="0.10" fill="none"/>
        <!-- Small round leaves -->
        <ellipse cx="8" cy="88" rx="3.5" ry="4.5" transform="rotate(-20 8 88)" fill="#6b9e7a" opacity="0.07"/>
        <ellipse cx="13" cy="85" rx="3" ry="4" transform="rotate(15 13 85)" fill="#4a7c59" opacity="0.06"/>
        <ellipse cx="14" cy="78" rx="3.5" ry="4.5" transform="rotate(-25 14 78)" fill="#6b9e7a" opacity="0.07"/>
        <ellipse cx="19" cy="74" rx="3" ry="4" transform="rotate(20 19 74)" fill="#4a7c59" opacity="0.06"/>
        <ellipse cx="20" cy="68" rx="3" ry="3.5" transform="rotate(-15 20 68)" fill="#6b9e7a" opacity="0.06"/>
      </svg>`,
      bottomRight: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
        <!-- Small leaf sprig from bottom-right -->
        <path d="M95 95 C90 82, 84 72, 75 65" stroke="#4a7c59" stroke-width="0.5" opacity="0.10" fill="none"/>
        <!-- Small round leaves -->
        <ellipse cx="92" cy="88" rx="3.5" ry="4.5" transform="rotate(20 92 88)" fill="#6b9e7a" opacity="0.07"/>
        <ellipse cx="87" cy="85" rx="3" ry="4" transform="rotate(-15 87 85)" fill="#4a7c59" opacity="0.06"/>
        <ellipse cx="86" cy="78" rx="3.5" ry="4.5" transform="rotate(25 86 78)" fill="#6b9e7a" opacity="0.07"/>
        <ellipse cx="81" cy="74" rx="3" ry="4" transform="rotate(-20 81 74)" fill="#4a7c59" opacity="0.06"/>
        <ellipse cx="80" cy="68" rx="3" ry="3.5" transform="rotate(15 80 68)" fill="#6b9e7a" opacity="0.06"/>
      </svg>`,
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
      topRight: `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="80" viewBox="0 0 140 80" fill="none">
        <!-- Wave 1 - largest, flowing from right edge -->
        <path d="M140 20 C130 16, 122 22, 112 18 C102 14, 95 20, 85 17 C75 14, 68 19, 58 16 C48 13, 42 18, 35 15" stroke="#3d7a9e" stroke-width="1.2" opacity="0.10" fill="none" stroke-linecap="round"/>
        <!-- Wave 2 -->
        <path d="M140 32 C128 28, 118 35, 106 30 C94 25, 86 33, 74 28 C62 23, 55 30, 45 26" stroke="#3d7a9e" stroke-width="1" opacity="0.08" fill="none" stroke-linecap="round"/>
        <!-- Wave 3 -->
        <path d="M140 44 C126 40, 114 47, 100 42 C88 37, 78 44, 66 40 C54 36, 46 42, 38 38" stroke="#3d7a9e" stroke-width="0.8" opacity="0.06" fill="none" stroke-linecap="round"/>
        <!-- Wave 4 - smallest, fading -->
        <path d="M140 55 C124 51, 110 57, 96 53 C82 49, 72 55, 60 51" stroke="#3d7a9e" stroke-width="0.6" opacity="0.05" fill="none" stroke-linecap="round"/>
        <!-- Starfish silhouette -->
        <path d="M125 10 L126.5 5 L128 10 L133 11 L129 13.5 L130 18 L126.5 15 L123 18 L124 13.5 L120 11 Z" fill="#3d7a9e" opacity="0.08"/>
        <!-- Small dots like sea foam -->
        <circle cx="50" cy="20" r="0.8" fill="#3d7a9e" opacity="0.06"/>
        <circle cx="70" cy="24" r="0.6" fill="#3d7a9e" opacity="0.05"/>
        <circle cx="90" cy="12" r="0.7" fill="#3d7a9e" opacity="0.06"/>
        <circle cx="110" cy="26" r="0.5" fill="#3d7a9e" opacity="0.05"/>
      </svg>`,
      bottomLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="140" height="80" viewBox="0 0 140 80" fill="none">
        <!-- Wave 1 - flowing from left edge -->
        <path d="M0 60 C10 64, 18 58, 28 62 C38 66, 45 60, 55 63 C65 66, 72 61, 82 64 C92 67, 98 62, 105 65" stroke="#3d7a9e" stroke-width="1.2" opacity="0.10" fill="none" stroke-linecap="round"/>
        <!-- Wave 2 -->
        <path d="M0 48 C12 52, 22 45, 34 50 C46 55, 54 47, 66 52 C78 57, 85 50, 95 54" stroke="#3d7a9e" stroke-width="1" opacity="0.08" fill="none" stroke-linecap="round"/>
        <!-- Wave 3 -->
        <path d="M0 36 C14 40, 26 33, 40 38 C52 43, 62 36, 74 40 C86 44, 94 38, 102 42" stroke="#3d7a9e" stroke-width="0.8" opacity="0.06" fill="none" stroke-linecap="round"/>
        <!-- Wave 4 - smallest -->
        <path d="M0 25 C16 29, 30 23, 44 27 C58 31, 68 25, 80 29" stroke="#3d7a9e" stroke-width="0.6" opacity="0.05" fill="none" stroke-linecap="round"/>
        <!-- Seashell silhouette - scallop shape -->
        <path d="M15 72 C12 66, 14 60, 18 58 C20 56, 22 58, 22 60 C24 58, 26 58, 26 62 C30 60, 30 66, 26 70 C22 74, 18 74, 15 72 Z" fill="#3d7a9e" opacity="0.08"/>
        <!-- Shell ridges -->
        <path d="M20 70 C19 66, 20 62, 22 60" stroke="#3d7a9e" stroke-width="0.3" opacity="0.06" fill="none"/>
        <path d="M17 70 C16 66, 17 62, 19 59" stroke="#3d7a9e" stroke-width="0.3" opacity="0.06" fill="none"/>
        <path d="M23 70 C22 66, 23 62, 24 60" stroke="#3d7a9e" stroke-width="0.3" opacity="0.06" fill="none"/>
        <!-- Sea foam dots -->
        <circle cx="50" cy="58" r="0.8" fill="#3d7a9e" opacity="0.06"/>
        <circle cx="70" cy="46" r="0.6" fill="#3d7a9e" opacity="0.05"/>
        <circle cx="30" cy="40" r="0.7" fill="#3d7a9e" opacity="0.06"/>
      </svg>`,
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
      topLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
        <!-- Crescent moon -->
        <path d="M22 8 C18 12, 16 18, 16 24 C16 34, 22 42, 30 46 C20 44, 12 36, 10 26 C8 16, 12 8, 22 8 Z" fill="#c4724e" opacity="0.10"/>
        <!-- Radiating lines from upper area -->
        <line x1="30" y1="4" x2="34" y2="1" stroke="#c4724e" stroke-width="0.5" opacity="0.10"/>
        <line x1="36" y1="6" x2="42" y2="2" stroke="#c4724e" stroke-width="0.5" opacity="0.09"/>
        <line x1="40" y1="10" x2="48" y2="6" stroke="#c4724e" stroke-width="0.5" opacity="0.08"/>
        <line x1="42" y1="16" x2="50" y2="12" stroke="#c4724e" stroke-width="0.5" opacity="0.07"/>
        <line x1="42" y1="22" x2="50" y2="20" stroke="#c4724e" stroke-width="0.5" opacity="0.06"/>
        <line x1="40" y1="28" x2="48" y2="28" stroke="#c4724e" stroke-width="0.5" opacity="0.06"/>
        <!-- Dot arc pattern - upper -->
        <circle cx="28" cy="2" r="1" fill="#c4724e" opacity="0.10"/>
        <circle cx="34" cy="3" r="0.8" fill="#c4724e" opacity="0.08"/>
        <circle cx="40" cy="5" r="0.8" fill="#c4724e" opacity="0.08"/>
        <circle cx="45" cy="9" r="0.8" fill="#c4724e" opacity="0.07"/>
        <circle cx="48" cy="14" r="0.8" fill="#c4724e" opacity="0.06"/>
        <!-- Dot arc pattern - lower -->
        <circle cx="6" cy="8" r="1" fill="#c4724e" opacity="0.08"/>
        <circle cx="4" cy="14" r="0.8" fill="#c4724e" opacity="0.07"/>
        <circle cx="3" cy="20" r="0.8" fill="#c4724e" opacity="0.07"/>
        <circle cx="4" cy="26" r="0.8" fill="#c4724e" opacity="0.06"/>
        <!-- Small star accent -->
        <path d="M50 4 L51 2 L52 4 L54 5 L52 6 L51 8 L50 6 L48 5 Z" fill="#c4724e" opacity="0.08"/>
      </svg>`,
      topRight: `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100" fill="none">
        <!-- Sun with radiating lines -->
        <circle cx="85" cy="15" r="8" stroke="#c4724e" stroke-width="0.7" opacity="0.10" fill="none"/>
        <circle cx="85" cy="15" r="4" fill="#c4724e" opacity="0.08"/>
        <!-- Sun rays -->
        <line x1="85" y1="3" x2="85" y2="0" stroke="#c4724e" stroke-width="0.5" opacity="0.10"/>
        <line x1="85" y1="27" x2="85" y2="30" stroke="#c4724e" stroke-width="0.5" opacity="0.08"/>
        <line x1="73" y1="15" x2="70" y2="15" stroke="#c4724e" stroke-width="0.5" opacity="0.08"/>
        <line x1="97" y1="15" x2="100" y2="15" stroke="#c4724e" stroke-width="0.5" opacity="0.10"/>
        <line x1="76.5" y1="6.5" x2="74" y2="4" stroke="#c4724e" stroke-width="0.5" opacity="0.09"/>
        <line x1="93.5" y1="6.5" x2="96" y2="4" stroke="#c4724e" stroke-width="0.5" opacity="0.09"/>
        <line x1="76.5" y1="23.5" x2="74" y2="26" stroke="#c4724e" stroke-width="0.5" opacity="0.07"/>
        <line x1="93.5" y1="23.5" x2="96" y2="26" stroke="#c4724e" stroke-width="0.5" opacity="0.07"/>
        <!-- Shorter intermediate rays -->
        <line x1="78" y1="10" x2="76" y2="8" stroke="#c4724e" stroke-width="0.4" opacity="0.06"/>
        <line x1="92" y1="10" x2="94" y2="8" stroke="#c4724e" stroke-width="0.4" opacity="0.06"/>
        <line x1="80" y1="5" x2="79" y2="2" stroke="#c4724e" stroke-width="0.4" opacity="0.07"/>
        <line x1="90" y1="5" x2="91" y2="2" stroke="#c4724e" stroke-width="0.4" opacity="0.07"/>
        <!-- Dot arc below sun -->
        <circle cx="75" cy="32" r="0.8" fill="#c4724e" opacity="0.07"/>
        <circle cx="80" cy="34" r="0.8" fill="#c4724e" opacity="0.06"/>
        <circle cx="85" cy="35" r="0.8" fill="#c4724e" opacity="0.06"/>
        <circle cx="90" cy="34" r="0.8" fill="#c4724e" opacity="0.06"/>
        <circle cx="95" cy="32" r="0.8" fill="#c4724e" opacity="0.07"/>
      </svg>`,
      bottomLeft: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
        <!-- Macrame hanging fringe pattern -->
        <!-- Top mounting line -->
        <path d="M3 55 L45 55" stroke="#c4724e" stroke-width="0.6" opacity="0.10"/>
        <!-- V-shape 1 -->
        <path d="M6 55 C8 62, 12 68, 16 72" stroke="#c4724e" stroke-width="0.5" opacity="0.09" fill="none"/>
        <path d="M22 55 C20 62, 16 68, 16 72" stroke="#c4724e" stroke-width="0.5" opacity="0.09" fill="none"/>
        <!-- Tassel 1 -->
        <line x1="16" y1="72" x2="14" y2="78" stroke="#c4724e" stroke-width="0.4" opacity="0.07"/>
        <line x1="16" y1="72" x2="16" y2="79" stroke="#c4724e" stroke-width="0.4" opacity="0.07"/>
        <line x1="16" y1="72" x2="18" y2="78" stroke="#c4724e" stroke-width="0.4" opacity="0.07"/>
        <!-- V-shape 2 -->
        <path d="M14 55 C16 60, 18 65, 22 68" stroke="#c4724e" stroke-width="0.4" opacity="0.07" fill="none"/>
        <path d="M30 55 C28 60, 26 65, 22 68" stroke="#c4724e" stroke-width="0.4" opacity="0.07" fill="none"/>
        <!-- Tassel 2 -->
        <line x1="22" y1="68" x2="20" y2="74" stroke="#c4724e" stroke-width="0.3" opacity="0.06"/>
        <line x1="22" y1="68" x2="22" y2="75" stroke="#c4724e" stroke-width="0.3" opacity="0.06"/>
        <line x1="22" y1="68" x2="24" y2="74" stroke="#c4724e" stroke-width="0.3" opacity="0.06"/>
        <!-- V-shape 3 (smaller) -->
        <path d="M28 55 C30 60, 33 65, 36 68" stroke="#c4724e" stroke-width="0.4" opacity="0.06" fill="none"/>
        <path d="M42 55 C40 60, 37 65, 36 68" stroke="#c4724e" stroke-width="0.4" opacity="0.06" fill="none"/>
        <!-- Tassel 3 -->
        <line x1="36" y1="68" x2="34" y2="73" stroke="#c4724e" stroke-width="0.3" opacity="0.05"/>
        <line x1="36" y1="68" x2="36" y2="74" stroke="#c4724e" stroke-width="0.3" opacity="0.05"/>
        <line x1="36" y1="68" x2="38" y2="73" stroke="#c4724e" stroke-width="0.3" opacity="0.05"/>
        <!-- Knot dots at V intersections -->
        <circle cx="16" cy="72" r="1" fill="#c4724e" opacity="0.08"/>
        <circle cx="22" cy="68" r="0.8" fill="#c4724e" opacity="0.07"/>
        <circle cx="36" cy="68" r="0.8" fill="#c4724e" opacity="0.06"/>
      </svg>`,
      bottomRight: `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80" fill="none">
        <!-- Macrame hanging fringe pattern - mirrored -->
        <!-- Top mounting line -->
        <path d="M35 55 L77 55" stroke="#c4724e" stroke-width="0.6" opacity="0.10"/>
        <!-- V-shape 1 -->
        <path d="M74 55 C72 62, 68 68, 64 72" stroke="#c4724e" stroke-width="0.5" opacity="0.09" fill="none"/>
        <path d="M58 55 C60 62, 64 68, 64 72" stroke="#c4724e" stroke-width="0.5" opacity="0.09" fill="none"/>
        <!-- Tassel 1 -->
        <line x1="64" y1="72" x2="62" y2="78" stroke="#c4724e" stroke-width="0.4" opacity="0.07"/>
        <line x1="64" y1="72" x2="64" y2="79" stroke="#c4724e" stroke-width="0.4" opacity="0.07"/>
        <line x1="64" y1="72" x2="66" y2="78" stroke="#c4724e" stroke-width="0.4" opacity="0.07"/>
        <!-- V-shape 2 -->
        <path d="M66 55 C64 60, 62 65, 58 68" stroke="#c4724e" stroke-width="0.4" opacity="0.07" fill="none"/>
        <path d="M50 55 C52 60, 54 65, 58 68" stroke="#c4724e" stroke-width="0.4" opacity="0.07" fill="none"/>
        <!-- Tassel 2 -->
        <line x1="58" y1="68" x2="56" y2="74" stroke="#c4724e" stroke-width="0.3" opacity="0.06"/>
        <line x1="58" y1="68" x2="58" y2="75" stroke="#c4724e" stroke-width="0.3" opacity="0.06"/>
        <line x1="58" y1="68" x2="60" y2="74" stroke="#c4724e" stroke-width="0.3" opacity="0.06"/>
        <!-- V-shape 3 (smaller) -->
        <path d="M52 55 C50 60, 47 65, 44 68" stroke="#c4724e" stroke-width="0.4" opacity="0.06" fill="none"/>
        <path d="M38 55 C40 60, 43 65, 44 68" stroke="#c4724e" stroke-width="0.4" opacity="0.06" fill="none"/>
        <!-- Tassel 3 -->
        <line x1="44" y1="68" x2="42" y2="73" stroke="#c4724e" stroke-width="0.3" opacity="0.05"/>
        <line x1="44" y1="68" x2="44" y2="74" stroke="#c4724e" stroke-width="0.3" opacity="0.05"/>
        <line x1="44" y1="68" x2="46" y2="73" stroke="#c4724e" stroke-width="0.3" opacity="0.05"/>
        <!-- Knot dots -->
        <circle cx="64" cy="72" r="1" fill="#c4724e" opacity="0.08"/>
        <circle cx="58" cy="68" r="0.8" fill="#c4724e" opacity="0.07"/>
        <circle cx="44" cy="68" r="0.8" fill="#c4724e" opacity="0.06"/>
      </svg>`,
    },
    backgroundPattern: `radial-gradient(circle at 50% 50%, rgba(196, 114, 78, 0.02) 0%, transparent 70%)`,
  },
  printer: {
    fontFamily: 'Helvetica, Arial, sans-serif',
    primaryColor: '#333333',
    textColor: '#111111',
    backgroundColor: '#ffffff',
    sectionHeaderBg: 'rgba(0, 0, 0, 0.04)',
    borderColor: '#cccccc',
  },
}
