// Birth Choices
// Main document file

// Import the template
#import "template.typ": *

// Document metadata
#show: project.with(
  title: "Birth Choices",
  subtitle: "Everything You Need to Make Informed Decisions, Build Your Birth Plan, and Bring Home the Healthiest Baby Possible",
  authors: (
    "Cooper McCall",
  ),
  date: datetime.today().display(),
)

// Foreword
#include "chapters/00-foreword.typ"

// Introduction
#include "chapters/00-introduction.typ"

// ─── PART I: Foundations ───
#part-header[Part I: Foundations]
#part-intro[
You're pregnant. You're overwhelmed. Everyone — your mother, your coworkers, that woman in the grocery store checkout line — has advice, and most of it conflicts with whatever you read online last night at 2 AM.

Take a breath. This section is the "before you do anything else" foundation. We'll walk through how birth actually works (because most childbirth education leaves out the parts that matter most), who should be on your team, how interventions interact with each other in ways your provider may not explain, and what your body is already doing to prepare. None of this is about memorizing facts for a test. It's about understanding the landscape well enough that when someone recommends something during labor, you'll know the right questions to ask.

Start here. Everything else in this book builds on it.
]

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
#part-intro[
This is the Big Decision section — or, more accurately, the Big Decisions, plural. Hospital or birth center or home? Vaginal or cesarean? Epidural, unmedicated, or somewhere in between? Water birth? VBAC?

There's no universal right answer to any of these, which is exactly why this section exists. What works beautifully for your best friend might be completely wrong for you, and vice versa. We're not here to push you in any direction. We're here to lay out what the research actually says — the real numbers, the trade-offs nobody mentions, and the questions worth asking — so you can figure out what kind of birth you're actually planning for.

Read the chapters that apply to your situation. Skip the ones that don't. And if you change your mind later, that's fine too.
]

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
#part-intro[
The unsexy-but-essential stuff nobody tells you about. What to pack in your hospital bag (and what to leave home). What to figure out before labor starts so you're not googling it between contractions. What actually happens when you walk through those hospital doors — the paperwork, the triage, the questions they'll ask.

This is the section that seems boring when you're still pregnant and becomes the section you wish you'd read more carefully when you're in labor and your partner is frantically searching for the insurance card. Think of it as the logistics chapter of a road trip: not the exciting part, but the part that determines whether the trip goes smoothly or falls apart before you leave the driveway.

Do yourself a favor and read this section by 36 weeks.
]

#include "chapters/18-hospital-bag.typ"
#pagebreak()

#include "chapters/19-pre-labor-logistics.typ"
#pagebreak()

#include "chapters/24-hospital-admission.typ"
#pagebreak()

// ─── PART IV: Labor Decisions ───
#part-header[Part IV: Labor Decisions]
#part-intro[
This is the section where everyone has an opinion about your body. Your nurse will have thoughts on your pain management. Your doctor will have preferences about monitoring. Your mother-in-law will have strong feelings about whether you should eat during labor. The anesthesiologist will show up and ask if you want an epidural at a moment when you can barely form words.

Here's the thing: every one of these decisions belongs to you. Not your provider, not your partner, not the hospital's standard protocol — you. But making good decisions in the middle of labor requires knowing your options beforehand, when you can actually think clearly. That's what this section is for. We cover pain management, fetal monitoring, GBS, induction, IVs, pushing, and more — with the evidence laid out so you can make your own calls instead of defaulting to whatever someone else decides for you.

Read this section with your birth partner. Seriously. They need to know this stuff too.
]

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
#part-intro[
Your baby is born, you're still catching your breath, and suddenly there's a checklist of things people want to do to this tiny human you just met. Eye ointment. Vitamin K shot. Hepatitis B vaccine. Heel prick. Hearing test. It's a lot in the first 48 hours, and most of it happens whether you've thought about it or not — unless you've thought about it beforehand.

Every procedure in this section exists for a reason, and every one of them is your decision. Some have overwhelming evidence behind them. Some are more nuanced than your pediatrician might suggest. A few are genuinely controversial. We cover what each procedure does, what the actual evidence says (not just the pamphlet version), what happens if you accept it, and what happens if you decline. No judgment either way.

This is the section where being informed matters most, because these decisions come fast and they come while you're exhausted. Know what you want before you're holding a newborn and a nurse is standing there with a syringe.
]

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
#part-intro[
The "fourth trimester" — the part nobody really prepared you for. The adrenaline of birth wears off, the visitors go home, and suddenly it's 3 AM and you're alone with a baby who won't stop crying and a body that feels like it belongs to someone else.

This section covers the first days and weeks: feeding (breast, bottle, or both — no lectures here), the first bath, rooming-in, pacifiers, when to leave the hospital, and what those early days at home actually look like. We're honest about how hard it is, practical about what helps, and realistic about the fact that "sleeping when the baby sleeps" is advice given by people who apparently don't have laundry.

You'll get through this. It won't always feel like it, but you will.
]

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
#part-intro[
Quick reference for when you need it. Your rights as a patient (yes, you can say no). How informed refusal works and what it looks like in practice. Every citation we referenced throughout this book, organized by chapter so you can check our work. And additional resources for when you want to dig deeper.

Bookmark this section. You probably won't read it straight through, but you'll come back to it.
]

#include "chapters/42-informed-refusal.typ"
#pagebreak()

#include "chapters/98-citations-appendix.typ"
#pagebreak()

#include "chapters/99-resources.typ"
