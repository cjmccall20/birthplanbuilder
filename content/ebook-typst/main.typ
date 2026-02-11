// Birth Decisions Research Guide
// Main document file

// Import the template
#import "template.typ": *

// Document metadata
#show: project.with(
  title: "Birth Decisions Research Guide",
  authors: (
    "Birth Plan Builder",
  ),
  date: datetime.today().display(),
)

// Introduction
#include "chapters/00-introduction.typ"

// ─── PART I: Foundations ───
#part-header[Part I: Foundations]

#include "chapters/40-childbirth-education.typ"
#pagebreak()

#include "chapters/39-cascade-interventions.typ"
#pagebreak()

#include "chapters/41-microbiome.typ"
#pagebreak()

#include "chapters/20-birth-team.typ"
#pagebreak()

#include "chapters/43-doula-support.typ"
#pagebreak()

#include "chapters/45-exercises-before-labor.typ"
#pagebreak()

#include "chapters/04-when-to-go.typ"
#pagebreak()

// ─── PART II: Choosing Your Birth Approach ───
#part-header[Part II: Choosing Your Birth Approach]

#include "chapters/01-birth-setting.typ"
#pagebreak()

#include "chapters/02-vaginal-cesarean.typ"
#pagebreak()

#include "chapters/13-unmedicated-birth.typ"
#pagebreak()

#include "chapters/14-epidural-birth.typ"
#pagebreak()

#include "chapters/15-cesarean-birth.typ"
#pagebreak()

#include "chapters/37-water-birth.typ"
#pagebreak()

#include "chapters/38-vbac.typ"
#pagebreak()

// ─── PART III: Practical Logistics ───
#part-header[Part III: Practical Logistics]

#include "chapters/18-hospital-bag.typ"
#pagebreak()

#include "chapters/19-pre-labor-logistics.typ"
#pagebreak()

#include "chapters/24-hospital-admission.typ"
#pagebreak()

// ─── PART IV: Labor Decisions ───
#part-header[Part IV: Labor Decisions]

#include "chapters/03-pain-management.typ"
#pagebreak()

#include "chapters/05-fetal-monitoring.typ"
#pagebreak()

#include "chapters/06-gbs.typ"
#pagebreak()

#include "chapters/17-labor-induction.typ"
#pagebreak()

#include "chapters/25-iv-hep-lock.typ"
#pagebreak()

#include "chapters/26-eating-drinking.typ"
#pagebreak()

#include "chapters/36-directed-pushing.typ"
#pagebreak()

#include "chapters/21-pushing-positions.typ"
#pagebreak()

#include "chapters/22-perineal-support.typ"
#pagebreak()

#include "chapters/44-pitocin.typ"
#pagebreak()

// ─── PART V: Newborn Medical Procedures ───
#part-header[Part V: Newborn Medical Procedures]

#include "chapters/08-skin-to-skin.typ"
#pagebreak()

#include "chapters/09-vitamin-k.typ"
#pagebreak()

#include "chapters/07-eye-ointment.typ"
#pagebreak()

#include "chapters/10-hepatitis-b.typ"
#pagebreak()

#include "chapters/11-cord-clamping.typ"
#pagebreak()

#include "chapters/23-cord-blood.typ"
#pagebreak()

#include "chapters/12-circumcision.typ"
#pagebreak()

#include "chapters/29-newborn-screening.typ"
#pagebreak()

#include "chapters/30-hearing-test.typ"
#pagebreak()

#include "chapters/31-infant-pain-management.typ"
#pagebreak()

#include "chapters/28-placenta-options.typ"
#pagebreak()

// ─── PART VI: Postpartum & Early Care ───
#part-header[Part VI: Postpartum & Early Care]

#include "chapters/27-first-bath.typ"
#pagebreak()

#include "chapters/16-feeding.typ"
#pagebreak()

#include "chapters/32-pacifier-use.typ"
#pagebreak()

#include "chapters/33-rooming-in.typ"
#pagebreak()

#include "chapters/34-leaving-hospital.typ"
#pagebreak()

#include "chapters/35-first-days-home.typ"
#pagebreak()

// ─── Part VII: Resources ───
#part-header[Part VII: Resources]

#include "chapters/42-informed-refusal.typ"
#pagebreak()

#include "chapters/99-resources.typ"
