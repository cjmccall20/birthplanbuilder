# Birth Plan Builder - Comprehensive Fix & Improvement Plan

## Philosophy (from Baby Book)
- **Natural-minded, not granola** - God designed birth, interventions aren't always necessary
- **Informed consent is key** - Know what you're agreeing to
- **Pros AND cons** - Every decision has tradeoffs (like Vitamin K: shot vs drops vs skip)
- **Elegant, feminine design** - Soft, approachable, not clinical
- **Upsell to research guide** - Deep-dive content synthesizing Turtles All The Way Down, Mama Natural, Weston Price, Deep Nutrition, Bradley Method

---

## PHASE 1: CRITICAL BUGS (MVP Blockers)

### [x] Task 1.1: Fix Internal Error on Email Send
- Status: FIXED - Deployed 2026-01-24
- Changes made:
  - Added detailed logging to API route
  - Fixed buffer encoding (now using base64 for Resend)
  - Added try/catch blocks around PDF generation and email sending
- Files: `src/app/api/birth-plan/create/route.ts`, `src/lib/email/send-birth-plan.ts`
- Test: Complete quiz flow, submit real email, verify email received with PDF

### [x] Task 1.2: Remove Duplicate Due Date Field
- Status: FIXED - Deployed 2026-01-24
- Due date now only appears in Birth Team tab (preview page)
- Removed from register page
- Files: `src/app/register/page.tsx`
- Test: Go through full flow, verify due date only asked once

---

## PHASE 2: CORE FEATURES (High Priority)

### [x] Task 2.1: Implement All 5 PDF Templates
- Status: COMPLETE - Committed 2026-01-24
- Templates implemented:
  - [x] Minimal (existing)
  - [x] Floral - Soft pinks, watercolor borders, serif fonts (Times-Roman)
  - [x] Professional - Navy blue (#2c3e50), clean tables, sans-serif
  - [x] Elegant - Gold accents (#d4af37), cream background (#fdfbf7), serif
  - [x] Rustic - Burnt sienna (#a0522d), kraft paper feel (#f5f0e1)
- Files: `src/lib/pdf/templates/*.tsx`, `src/lib/pdf/generator.ts`
- Test: Select each template, generate PDF, verify unique styling

### [x] Task 2.2: Add PDF Preview Before Registration
- Status: COMPLETE - Committed 2026-01-24
- Features implemented:
  - "Preview PDF" button on preview page (Review tab)
  - Client-side PDF generation using @react-pdf/renderer pdf().toBlob()
  - Modal dialog with iframe display
  - Loading state and error handling
  - Memory cleanup for blob URLs
- Files: `src/app/preview/page.tsx`, `src/components/ui/dialog.tsx`, `src/lib/pdf/client-preview.ts`
- Test: Click preview button, see PDF, close modal, continue to register

### [ ] Task 2.3: Add Pros/Cons to Learn More Sections
- Requirements:
  - What hospital typically recommends
  - Pros of the intervention
  - Cons/risks of the intervention
  - Alternative options
  - Upsell: "Get the full research guide for detailed analysis"
- Files: `src/lib/quiz/questions.ts`
- Reference: Baby Book Vitamin K example for tone/format
- Test: Click "Learn More" on each question, verify pros/cons structure

### [ ] Task 2.4: Add C-Section Branch Logic
- Requirements:
  - New question: "Are you planning a C-section?" (yes/no/not sure)
  - If yes: Show C-section specific questions
  - If no: Ask "What are your preferences for an unplanned C-section?"
  - Conditional rendering based on answers
- Files: `src/lib/quiz/questions.ts`, `src/lib/quiz/context.tsx`
- Test: Select "planning C-section", verify specific questions appear

---

## PHASE 3: POLISH & UX (Medium Priority)

### [ ] Task 3.1: Template Selection UI Enhancement
- Requirements:
  - Replace FileText icons with mini template previews
  - Could be static images or actual miniature PDF renders
  - Selection should feel special, not just radio buttons
- Files: `src/app/preview/page.tsx`
- Test: Visit style tab, see visual preview of each template

### [ ] Task 3.2: Success Page Enhancement
- Requirements:
  - Add "Download PDF" direct link
  - Strong upsell for Research Guide with personalized messaging
  - "Share with your partner" option
  - List topics marked "unsure" with targeted upsell
- Files: `src/app/success/page.tsx`
- Test: Complete flow, verify success page has all elements

### [ ] Task 3.3: Error Handling & Toast Notifications
- Requirements:
  - Add shadcn/ui toast component
  - Friendly error messages (not "Internal Error")
  - Loading states on all submit buttons
- Test: Trigger errors, verify friendly messages appear

### [ ] Task 3.4: Improve Question Copy
- Requirements:
  - Align with natural birth philosophy
  - Add nuance: "The hospital will likely recommend X, but..."
  - Softer language, not preachy
- Files: `src/lib/quiz/questions.ts`
- Test: Read through quiz, verify tone is informative not judgmental

---

## PHASE 4: SEO & CONTENT (High Priority - User Request)

### [ ] Task 4.1: SEO-Friendly Explainer Pages
Create individual pages targeting natural birth queries:
- [ ] `/vitamin-k` - Vitamin K shot: pros, cons, alternatives (drops, oral, skip)
- [ ] `/circumcision` - Medical vs religious, risks, recovery, intact care
- [ ] `/eye-ointment` - Erythromycin: why required, when to decline
- [ ] `/delayed-cord-clamping` - Benefits, optimal timing, lotus birth
- [ ] `/skin-to-skin` - Golden hour importance, C-section adaptations
- [ ] `/pain-management` - Epidural, IV meds, natural methods comparison
- [ ] `/c-section` - Planned vs emergency, gentle C-section, VBAC
- [ ] `/newborn-procedures` - Bath delay, PKU test, hepatitis B vaccine
- Each page needs: balanced pros/cons, medical citations, upsell to Research Guide
- Keywords: "should I skip vitamin K", "vitamin K shot risks", "delayed cord clamping benefits"

### [ ] Task 4.2: Home Page SEO Optimization
- Target: "free birth plan template", "natural birth plan generator"
- Meta description optimized for CTR
- H1 with primary keywords
- FAQ section with structured data
- Social proof / testimonials section

### [ ] Task 4.3: Quiz Content Philosophy Alignment
Update all quiz questions to reflect natural-minded philosophy:
- Frame hospital defaults as "typically recommended" not "required"
- Add context: "Many parents choose to..." alternatives
- Softer, non-preachy tone
- Reference informed consent importance
- Files: `src/lib/quiz/questions.ts`

### [ ] Task 4.4: Mobile Experience
- Test full flow on mobile
- Touch-friendly buttons (44px minimum)
- Readable on small screens
- Test: Complete flow on mobile browser

### [ ] Task 4.5: Analytics Setup
- Track quiz completion rate
- Track template selections
- Track email conversion
- Track "unsure" topics (upsell opportunities)

---

## AUTOMATED TEST CHECKLIST

Run these tests after each Ralph iteration:

```bash
# Build check (must pass)
npm run build

# Type check
npx tsc --noEmit

# Lint check
npm run lint
```

### Manual Test Matrix

| Test | Steps | Expected Result | Status |
|------|-------|-----------------|--------|
| Happy Path | Home → Quiz → Preview → Register | Success page loads | [ ] |
| Email Delivery | Submit with real email | PDF arrives in inbox | [ ] |
| Due Date Once | Complete full flow | Due date only in Birth Team tab | [x] |
| Template Selection | Select each of 5 templates | All render unique PDFs | [ ] |
| PDF Preview | Click "Preview PDF" button | Modal shows generated PDF | [ ] |
| Quiz Persistence | Refresh mid-quiz | Answers persist | [ ] |
| Invalid Email | Enter bad format | Validation error shows | [ ] |
| Mobile Flow | Complete on mobile | All screens work | [ ] |
| Learn More | Click on each question | Pros/cons visible | [ ] |
| C-Section Branch | Select "planning C-section" | Specific questions appear | [ ] |

---

## Key Files Reference

| Purpose | File |
|---------|------|
| API endpoint | `src/app/api/birth-plan/create/route.ts` |
| Email sender | `src/lib/email/send-birth-plan.ts` |
| PDF generator | `src/lib/pdf/generator.ts` |
| Templates | `src/lib/pdf/templates/*.tsx` |
| Preview page | `src/app/preview/page.tsx` |
| Register page | `src/app/register/page.tsx` |
| Success page | `src/app/success/page.tsx` |
| Quiz questions | `src/lib/quiz/questions.ts` |
| Quiz context | `src/lib/quiz/context.tsx` |
| Type definitions | `src/types/index.ts` |

## Content Reference for Research Guide Upsell

| Topic | Source Location |
|-------|-----------------|
| Baby Book Outline | `/Users/coopermccall/Desktop/Old Desktop Files/Baby Binder/Baby Book/Baby Book Outline.docx` |
| Vitamin K Research | `/Users/coopermccall/Desktop/Old Desktop Files/Baby Binder/Baby Book/Birth/Vitamin K Shot.docx` |
| Circumcision Research | `/Users/coopermccall/Desktop/Old Desktop Files/Baby Binder/Baby Book/Birth/Circumcision.docx` |
| Mama Natural Template | `/Users/coopermccall/Desktop/Old Desktop Files/Baby Binder/Visual-Birth-Plan_Mama-Natural/` |
| Bradley Method | `/Users/coopermccall/Desktop/Old Desktop Files/Baby Binder/Bradley Method Quick Guides.docx` |

---

## SUCCESS CRITERIA

Ralph should set EXIT_SIGNAL=true when ALL of these are complete:

### Must Have (MVP) - REQUIRED FOR EXIT
1. [x] Email sends successfully with PDF attachment
2. [x] Due date only asked once
3. [x] PDF preview available before registration
4. [x] All 5 templates generate unique PDFs
5. [ ] No console errors in browser
6. [x] Build passes (`npm run build`)

### Should Have (v1.0) - REQUIRED FOR EXIT
7. [ ] Pros/cons in Learn More sections with upsell
8. [ ] C-section branch logic works
9. [ ] Mobile flow works smoothly
10. [ ] Success page has download + strong upsell
11. [ ] Home page SEO optimized (meta, H1, FAQ schema)
12. [ ] At least 3 SEO explainer pages created

### Nice to Have (v1.1) - NOT REQUIRED
13. [ ] Template preview thumbnails
14. [ ] Toast notifications for errors
15. [ ] All 8 SEO explainer pages
16. [ ] Analytics tracking

## MANUAL TASKS (Cannot Be Automated)
- [ ] Test email delivery with real email address
- [ ] Verify Resend API key in Vercel environment
- [ ] Test full flow on physical mobile device
- [ ] Verify Supabase RLS policies if needed
- [ ] Set up custom domain DNS if not already done
- [ ] Create social media preview images
- [ ] Set up Google Search Console
- [ ] Submit sitemap to Google
