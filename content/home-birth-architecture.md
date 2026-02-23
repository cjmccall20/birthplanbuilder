# Birth Center / Home Birth Architecture

## Overview

This document outlines how the Birth Plan Builder can support birth center and home birth planners alongside the existing hospital-focused flow. The core insight: most birth preferences already apply across all venues. The architecture needs conditional sections for venue-specific concerns and a Plan A/B/C model for transport scenarios.

## Current State

- `birthVenue` exists in EditorState (`'hospital' | 'birth_center' | 'home'`)
- `birth_setting` quiz question already captures venue preference
- The venue selector is visible in the editor canvas header (hospital/birth center/home pills)
- `getOrderedQuestions()` currently filters only on `birthType` (vaginal/csection), not venue

## Plan A / B / C Model

### How It Works

- **Plan A**: Primary birth plan for chosen venue (home or birth center)
- **Plan B**: Hospital transfer plan - preferences if transport to hospital becomes necessary during labor
- **Plan C**: Emergency C-section plan - already covered by the existing C-Section Planning section

### Implementation

1. Add a `venue` filter to `getOrderedQuestions()` alongside the existing `birthType` filter
2. For home/birth center planners, the quiz flow becomes:
   - Getting Started (venue-aware)
   - Your Birth (mostly identical, some options change)
   - After Birth (identical)
   - Newborn Care (identical)
   - **Hospital Transfer Preferences** (NEW section - Plan B)
   - C-Section Planning (Plan C - already exists)
   - Personal
3. The Hospital Transfer section only appears for non-hospital planners

### Data Model

```typescript
// In getOrderedQuestions:
const birthVenue = answers['birth_setting'] // 'hospital' | 'birth_center' | 'home'

// New category
const CATEGORY_ORDER_HOME_BIRTH = [
  'Getting Started',
  'Your Birth',
  'After Birth',
  'Newborn Care',
  'Hospital Transfer',  // NEW - Plan B
  'Personal',
  'C-Section Planning',
]
```

## Overlap Analysis

### Questions That Apply to ALL Venues (no changes needed)

These questions are venue-agnostic and work as-is:

- `pain_approach` - All venues offer pain management options (just different ones)
- `fetal_monitoring` - Monitoring happens everywhere, just different methods
- `movement_labor` - Movement is relevant at all venues
- `golden_hour` - Universal
- `feeding` - Universal
- `cord_clamping` / `who_cuts_cord` / `cord_blood` - Universal
- `vitamin_k` / `eye_ointment` / `hep_b_vaccine` - Universal (home birth midwives carry these)
- `circumcision` - Universal (usually happens later regardless)
- `newborn_screening` / `hearing_test` - Universal (home birth midwives arrange these)
- `procedure_timing` - Universal
- `bath_timing` - Universal
- `placenta` - Universal
- `baby_sex` / `baby_name` / `facility_name` - Universal
- `birth_photography` - Universal

### Questions That Are Hospital-Specific (need alternatives)

| Question | Hospital Context | Home/Birth Center Alternative |
|----------|-----------------|------------------------------|
| `when_to_hospital` | When to arrive | N/A for home; "When to go to birth center" for BC |
| `iv_preference` | IV access during labor | Rarely relevant at home; some birth centers offer |
| `eating_drinking` | NPO policies | Non-issue at home/BC (you eat freely) |
| `medical_students` | Teaching hospital observers | N/A for home/BC |
| `gbs_antibiotics` | IV antibiotics during labor | Home birth: arrange with midwife; may require hospital |
| `rooming_in` | Nursery option | N/A for home; N/A for most birth centers |
| `pacifier` | Hospital pacifier policy | Non-issue outside hospital |
| `visitors` | Hospital visitor policy | Different framing for home (who comes to the house) |
| `length_of_stay` | Hospital discharge timing | Birth center discharge (usually 4-6 hours); N/A for home |

### Implementation Approach for Venue-Specific Questions

Use `birthTypeVariant`-style overrides, extended to support venue:

```typescript
interface QuizQuestion {
  // ...existing fields...
  venueVariant?: {
    home?: { subtitle?: string; optionOverrides?: Record<string, Partial<QuizOption>> }
    birth_center?: { subtitle?: string; optionOverrides?: Record<string, Partial<QuizOption>> }
  }
  excludeForVenue?: ('home' | 'birth_center' | 'hospital')[]
}
```

## New Questions Needed

### Hospital Transfer Preferences (Plan B)

1. **`transfer_transport`** - How do you want to get to the hospital?
   - "Ambulance" / "Partner drives" / "Follow midwife's guidance" / "Unsure"

2. **`transfer_preferences`** - What matters most if you transfer?
   - "My midwife comes with me" / "Partner stays with me at all times" / "Minimize interventions unless medically necessary" / "Follow hospital protocols"

3. **`transfer_communication`** - How should the hospital team be informed?
   - "My midwife will communicate my birth plan" / "Partner will advocate" / "I have a printed plan to hand over" / "I'll communicate directly"

4. **`transfer_mindset`** - How do you want to approach a transfer emotionally?
   - "I understand transfers are a normal part of out-of-hospital birth" / "I want time to process before non-urgent decisions" / "I trust my midwife's judgment on when to transfer"

### Home Birth Supplies

5. **`home_birth_supplies`** (checklist) - Have you prepared?
   - "Birth kit from midwife" / "Birth pool/tub" / "Waterproof sheets" / "Post-birth supplies" / "Emergency supplies per midwife's list"

### Birth Center Policies

6. **`birth_center_policies`** (informational) - What to discuss with your birth center
   - "Water birth availability" / "Transfer hospital and distance" / "Who will attend your birth" / "Postpartum stay duration"

## Editor Changes

### Section Headers That Reflect Venue

The `displayTitle` for editor sections should be venue-aware:

```typescript
// Instead of fixed "Pre-Hospital"
const sectionTitle = venue === 'home'
  ? 'Before Labor Begins'
  : venue === 'birth_center'
    ? 'Before Going to the Birth Center'
    : 'Pre-Hospital'
```

### Conditional Sections for Plan B/C

- Hospital Transfer section only renders for home/birth center planners
- C-Section Planning renders for everyone (it's always Plan C or Plan B for csection planners)
- Editor sections can use `hiddenSections` (just implemented in Phase 6) to let users hide Plan B if they prefer

### PDF Output

- Plan A preferences render normally
- Plan B (Hospital Transfer) renders as a distinct section with a header: "In Case of Hospital Transfer"
- Plan C (C-Section) already renders with its distinct header

## Data Model Summary

### birthVenue Interaction with birthType

```
birthType: vaginal + birthVenue: hospital    -> Standard flow (current)
birthType: vaginal + birthVenue: birth_center -> Add Hospital Transfer section, venue-aware questions
birthType: vaginal + birthVenue: home         -> Add Hospital Transfer section, venue-aware questions
birthType: csection + birthVenue: hospital    -> Standard csection flow (current, venue is always hospital)
```

C-section planners always deliver at a hospital, so `birthVenue` is only meaningful for vaginal planners. The venue selector is already hidden when `birthType === 'planned_csection'` in the editor.

### Migration Path

1. **Phase 1**: Add `excludeForVenue` and `venueVariant` fields to QuizQuestion
2. **Phase 2**: Update `getOrderedQuestions()` to filter/modify by venue
3. **Phase 3**: Create Hospital Transfer questions
4. **Phase 4**: Add venue-aware section titles to editor
5. **Phase 5**: Update PDF generation for Plan B section
6. **Phase 6**: QA all three venue paths end-to-end

### Estimated Scope

- 4-6 new quiz questions
- ~10 existing questions need venue variants or exclusions
- 1 new editor section (hospital_transfer)
- Section title logic update
- PDF template update for multi-plan layout

This can be built incrementally. The most impactful first step is adding `excludeForVenue` filtering to `getOrderedQuestions()` so that irrelevant hospital-specific questions disappear for home/BC planners.
