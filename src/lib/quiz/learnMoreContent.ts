import type { LearnMoreData } from './questions'

export const LEARN_MORE_DATA: Record<string, LearnMoreData> = {
  birth_setting: {
    tradeoff:
      'For low-risk pregnancies, hospitals have the highest intervention rates but the most emergency resources. Birth centers and home births have lower intervention rates with comparable safety outcomes for appropriate candidates.',
    pros: [
      'Hospital: immediate surgical capability, epidural available, NICU on-site, full specialist availability',
      'Birth center: midwifery model, 94% vaginal birth rate, 6% cesarean rate, hospital backup nearby',
      'Home birth: full control of environment, lowest intervention rates, continuous one-on-one midwife care',
    ],
    cons: [
      'Hospital: 32% cesarean rate (WHO recommends 10-15%), rates vary wildly by hospital (19-56% in California alone)',
      'Birth center: no epidural available, 12% labor transfer rate (mostly non-emergency), first-time mothers 4-5x more likely to transfer',
      'Home birth: longer transfer time if emergency, 45% transfer rate for first-time mothers (UK data), not an option for high-risk pregnancies',
    ],
    bottomLine:
      'The setting you choose affects the care you receive. For low-risk pregnancies, all three settings show comparable safety - but intervention rates differ dramatically. Your hospital choice may matter as much as your provider choice.',
    ebookChapter: 'Chapter 8: Birth Setting',
  },

  pain_approach: {
    tradeoff:
      'Pain management is a spectrum from fully unmedicated to epidural. Each has trade-offs for mobility, recovery, and intervention risk. Decide before labor when you can think clearly - not during contractions.',
    pros: [
      'Unmedicated: full mobility, faster recovery, fewer interventions, baby more alert for first feeding',
      'Nitrous oxide: you control it, wears off quickly, stay mobile, does not affect baby',
      'Epidural: most effective pain relief, allows rest during long labors',
    ],
    cons: [
      'Unmedicated: requires preparation (childbirth class) and continuous support (doula) to manage intensity',
      'Nitrous oxide: less effective than epidural, may cause nausea in some women',
      'Epidural: limits mobility, may slow labor, increases intervention risk (~2.5x cesarean rate)',
    ],
    bottomLine:
      'Most women who achieve unmedicated birth do so through preparation, not pain tolerance. It is a learned skill, not willpower.',
    ebookChapter: 'Chapter 18: Pain Management',
  },

  skin_to_skin: {
    tradeoff:
      'Immediate skin-to-skin contact regulates baby\'s temperature, heart rate, and breathing while promoting breastfeeding. Most routine procedures can be done on your chest - the question is whether to prioritize bonding or separate for assessments.',
    pros: [
      'Your body adjusts temperature in response to baby\'s needs - better than a hospital warmer',
      'Babies are nearly 3x more likely to breastfeed successfully on the first try',
      'Triggers oxytocin cascade that reduces stress hormones and supports bonding in both mother and baby',
      'Stabilizes baby\'s blood sugar, heart rate, and breathing during the critical transition',
    ],
    cons: [
      'Not possible if baby needs resuscitation or has severe respiratory distress',
      'Some state laws require eye ointment within the first hour, which may briefly interrupt',
      'After cesarean, may need to wait until you are alert and stable in recovery',
    ],
    bottomLine:
      'Skin-to-skin is not a nice-to-have - it is biologically optimal. Your body is baby\'s best incubator. APGAR scoring, weighing, and most assessments can all be done while baby remains on your chest.',
    ebookChapter: 'Chapter 28: Skin-to-Skin',
  },

  golden_hour: {
    tradeoff:
      'The first 60 minutes after birth are a uniquely powerful window for bonding and breastfeeding. Baby is in a quiet alert state with rooting and sucking reflexes at their strongest. Protecting this time means delaying non-urgent procedures.',
    pros: [
      'Baby\'s feeding reflexes are at peak strength - ideal for first breastfeeding attempt',
      'Uninterrupted contact supports baby\'s self-attachment to the breast',
      'Hormonal cascade benefits both mother and baby - oxytocin supports uterine contraction and bonding',
      'Sets the foundation for successful breastfeeding long-term',
    ],
    cons: [
      'Some procedures (vitamin K, eye ointment) may be slightly delayed',
      'Not always possible if medical complications arise for mother or baby',
      'After cesarean, golden hour may begin in recovery room rather than immediately',
    ],
    bottomLine:
      'Medical assessments like APGAR scoring can be done while baby is on your chest. Only true medical emergencies - severe respiratory distress, resuscitation, or maternal hemorrhage - should interrupt this time. Everything else can wait.',
  },

  feeding: {
    tradeoff:
      'Breastfeeding is the gold standard for infant nutrition - living antibodies, dynamic composition that adapts in real time, immune protection, and reduced SIDS risk. Success depends heavily on support, not just determination.',
    pros: [
      'Breast milk contains living antibodies that respond to baby\'s specific exposures - no formula can replicate this',
      'Reduces SIDS risk, childhood leukemia risk, and provides better jaw and palate development',
      'Benefits for mom: 26% reduced breast cancer risk, faster uterine recovery, lower diabetes risk',
      'Always available, always the right temperature, free - formula costs $1,500-3,000+ per year',
    ],
    cons: [
      'Over 70% of mothers experience significant challenges - cracked nipples, latch difficulties, exhaustion',
      'Baby is expected to lose 7-10% of birth weight initially (meconium passage); IV fluids during labor can inflate birth weight, making normal loss look excessive',
      'Hospital staff may push formula supplementation - 50% of in-hospital formula use is for "lack of milk" or "crying baby," not medical reasons',
      'True insufficient supply affects only about 5% of women, but perceived low supply is the #1 reason mothers stop',
    ],
    bottomLine:
      'The hierarchy matters: direct breastfeeding is best, then pumped breast milk, then donor milk, then formula. Any breast milk counts - even partial breastfeeding provides immune benefits. Most breastfeeding "failures" are failures of support, not failures of the mother.',
    ebookChapter: 'Chapter 40: Feeding',
  },

  cord_clamping: {
    tradeoff:
      'At birth, approximately one-third of baby\'s blood is still outside their body in the cord and placenta. Delayed clamping (at least 90 seconds, ideally 5 minutes) returns this blood - along with iron and stem cells - to your baby.',
    pros: [
      'Increases blood volume by 25-40%, providing better oxygen delivery during the critical transition',
      'Iron stores significantly higher at 6 months - prevents iron deficiency that can cause irreversible brain damage',
      'Improved brain myelination documented at 4 months via MRI',
      'Delivers stem cells naturally and for free - the same cells cord blood banks charge thousands to store',
    ],
    cons: [
      'Small increase in phototherapy for jaundice (5-10% vs 3-5%) - safe, treatable with 12-48 hours of light',
      'Conflicts with cord blood banking - after 60 seconds, not enough blood remains for public bank donation',
      'Some providers still default to immediate clamping out of habit or convenience',
    ],
    bottomLine:
      'ACOG, WHO, and AAP all recommend delayed clamping. 90 seconds should be the absolute minimum for meaningful benefit. Your baby\'s blood belongs in your baby, not in the placenta.',
    ebookChapter: 'Chapter 32: Cord Clamping',
  },

  birth_photography: {
    tradeoff:
      'Birth photography captures an unrepeatable moment, but some families prefer privacy. Hospital policies vary on what is allowed, especially in the operating room.',
    pros: [
      'Captures a once-in-a-lifetime moment you may not fully remember due to hormones and intensity',
      'Professional birth photographers know how to stay out of the way and respect the space',
      'Photos can help process the birth experience afterward - especially valuable for unexpected outcomes',
      'Doulas often offer to take photos or video as part of their support, which can be a simpler alternative',
    ],
    cons: [
      'May feel intrusive during an intimate moment',
      'Hospital policies may restrict cameras in certain areas (especially the OR during cesarean)',
      'Partner may be distracted by documenting instead of providing hands-on support',
    ],
    bottomLine:
      'You can never go back and take photos you did not take. If a professional photographer is not in the budget, ask your doula - many are happy to capture key moments for you.',
  },

  movement_labor: {
    tradeoff:
      'Freedom to move during labor helps baby rotate and descend through the pelvis. Upright positions use gravity to your advantage and are associated with shorter labor and fewer interventions.',
    pros: [
      'Upright positions can change your pelvic opening by up to 28-30%',
      'Walking, swaying, and bouncing can significantly reduce pain',
      'Associated with shorter pushing stage, fewer assisted deliveries, and fewer episiotomies',
      'Side-lying is an excellent option even with an epidural',
    ],
    cons: [
      'Continuous fetal monitoring restricts movement to near the bed (ask for wireless monitoring)',
      'Epidural eliminates ability to walk or stand - but side-lying and position changes are still possible',
      'Lithotomy position (on your back, legs in stirrups) is the hospital default for provider convenience, not better outcomes',
    ],
    bottomLine:
      'The position you push in is your choice, and it matters. Lying flat on your back narrows the pelvis and works against gravity. Ask about upright positions during a prenatal visit and include your preferences in your birth plan.',
    ebookChapter: 'Chapter 25: Pushing Positions',
  },

  fetal_monitoring: {
    tradeoff:
      'Continuous electronic fetal monitoring (EFM) increases cesarean rates by 63% without improving outcomes for low-risk pregnancies. Intermittent auscultation is evidence-based and allows freedom to move.',
    pros: [
      'Continuous: constant data on baby\'s heart rate pattern',
      'Intermittent: freedom to move, change positions, use water - checked every 15-30 min in labor, every 5 min in pushing',
      'Wireless monitoring: middle ground if continuous is required - allows movement within range',
    ],
    cons: [
      'Continuous: 63% increase in cesarean rate, restricts movement, high false-positive rate',
      'Intermittent: gaps between check-ins; not appropriate if Pitocin, epidural, or concerning heart tones',
      'Wireless: not available at all hospitals',
    ],
    bottomLine:
      'Continuous monitoring became standard for liability protection, not better outcomes. 89% of US births use continuous EFM despite evidence showing no benefit for low-risk pregnancies. Ask: "Is there a medical reason I need continuous monitoring right now?"',
    ebookChapter: 'Chapter 19: Fetal Monitoring',
  },

  bath_timing: {
    tradeoff:
      'The white coating on newborns (vernix) is a natural moisturizer with antimicrobial properties. Early bathing removes it and can destabilize temperature and blood sugar. The WHO recommends waiting at least 24 hours.',
    pros: [
      'Vernix moisturizes skin, fights bacteria and fungi, and helps regulate temperature',
      'Delayed bathing supports breastfeeding - amniotic fluid scent on skin may help guide baby to the breast',
      'Avoids hypothermia risk: wet newborns lose heat rapidly, which can cause blood sugar drops',
      'Many families wait 48 hours to a full week, letting the vernix absorb completely on its own',
    ],
    cons: [
      'Some parents prefer a clean baby sooner - personal comfort matters too',
      'Cultural and religious bathing rituals may be meaningful as a welcoming act',
      'Blood or meconium on baby may feel uncomfortable for some families',
    ],
    bottomLine:
      'If you choose "we want to give the first bath," many families mean at home - once bonding is established and temperature regulation is more stable. If you bathe early, keep the room warm and get back to skin-to-skin quickly afterward.',
    ebookChapter: 'Chapter 39: First Bath',
  },

  vitamin_k: {
    tradeoff:
      'Babies are born with very low vitamin K, which creates a temporary window for dangerous bleeding. A single injection provides near-complete protection against VKDB - a rare but devastating condition where about 50% of cases involve brain hemorrhage.',
    pros: [
      'Near-complete VKDB protection (~97% effective) with a single dose',
      'No follow-up needed - one shot and it is done',
      'Well-studied with decades of safety data; the debunked 1992 cancer link was never replicated',
      'Especially important for breastfed babies - breast milk contains very little vitamin K',
    ],
    cons: [
      'Injection causes a moment of pain during baby\'s first hours (can be timed after initial bonding)',
      'Oral alternative exists: 3 doses over 6 weeks, ~80% effective, but requires strict compliance',
      'If planning oral vitamin K, you may need to bring your own supply - many US hospitals do not stock it',
    ],
    bottomLine:
      'VKDB is rare (4-7 per 100,000 breastfed babies) but when it occurs, about 50% have brain bleeding with 10-25% mortality. The injection is the most reliable prevention. Oral is a valid middle ground if you commit to all three doses on schedule.',
    ebookChapter: 'Chapter 29: Vitamin K',
  },

  eye_ointment: {
    tradeoff:
      'Eye ointment (erythromycin) prevents gonorrhea transmission to baby\'s eyes. If you tested negative for gonorrhea and chlamydia, your baby\'s risk of these infections is essentially zero. The AAP (2024) is calling for re-evaluation of mandatory status.',
    pros: [
      'Prevents serious eye infections that could cause blindness in babies of mothers with untreated STIs',
      'Quick, simple application',
      'Required by law in most US states (some now allow waivers to decline)',
    ],
    cons: [
      'Blurs baby\'s vision for 15-30 minutes during critical bonding - interferes with first eye contact',
      'Unnecessary if you tested negative for gonorrhea and chlamydia in a monogamous relationship',
      'Erythromycin is an antibiotic that may be absorbed systemically - potential microbiome disruption during the critical colonization window (see Chapter 3: Microbiome)',
      'Erythromycin does not effectively prevent chlamydial eye infection, despite chlamydia being more common than gonorrhea',
    ],
    bottomLine:
      'Several developed countries (UK, Canada, Scandinavia) no longer require routine eye ointment, relying on prenatal STI screening instead. If you tested negative, the ointment prevents a risk that does not exist for your baby.',
    ebookChapter: 'Chapter 30: Eye Ointment',
  },

  hep_b_vaccine: {
    tradeoff:
      'The birth dose primarily catches babies of mothers who test falsely negative or have unknown status. If you are confirmed HepB-negative, 2025 ACIP guidelines now support individual decision-making about timing - including delaying or declining.',
    pros: [
      'Safety net for undetected maternal infection (false negatives or untested mothers)',
      'Convenient timing while still in hospital with medical staff present',
      'Starts vaccine series early; 30+ years of observational safety data',
    ],
    cons: [
      'If both parents are confirmed HepB-negative, transmission risk is effectively zero - the virus spreads through blood and sexual contact, not casual exposure',
      'Adds another intervention during the first 24 hours of life',
      'Can be given at the 2-month visit, or later, with the same eventual immunity',
      'The US was an outlier among developed countries in recommending universal birth dosing - Japan, Sweden, and the UK start at 2-3 months',
    ],
    bottomLine:
      'Saying you plan to do it at a later visit with your pediatrician typically gets less pushback from hospital staff. Whether you vaccinate at birth, delay, or decline entirely, the 2025 ACIP change recognizes these as legitimate informed decisions for HepB-negative families.',
    ebookChapter: 'Chapter 31: Hepatitis B',
  },

  cord_blood: {
    tradeoff:
      'Cord blood contains stem cells that can treat certain blood cancers and disorders, but the likelihood of use is very low and private banking is expensive. Collection conflicts with delayed cord clamping - which gives your baby guaranteed benefits now.',
    pros: [
      'Preserves stem cells for potential future treatment of blood cancers, sickle cell disease, and immune disorders',
      'Private banking ensures availability for your family; public donation may save someone else\'s life',
      'Cord tissue banking (different from cord blood) is fully compatible with delayed clamping',
    ],
    cons: [
      'Private banking costs $1,400-$2,500 upfront plus $175-$300/year - total of $4,550-$7,900+ over 18 years',
      'Chance of child using stored cord blood: roughly 1 in 2,700 to 1 in 200,000',
      'For genetic diseases, baby\'s own cord blood carries the same genetic problem - they would need a donor',
      'After 60 seconds of delayed clamping, not enough blood remains for public bank donation',
    ],
    bottomLine:
      'Delayed cord clamping gives your baby their own stem cells naturally and for free - the exact same cells banking companies charge thousands to store. ACOG states cord clamping practice should not be altered solely for cord blood collection.',
    ebookChapter: 'Chapter 33: Cord Blood',
  },

  rooming_in: {
    tradeoff:
      'Keeping baby in your room supports bonding and breastfeeding, while giving you and your partner oversight of every decision about your newborn\'s care. But it can be exhausting after birth, and a few hours of nursery rest has not been shown to harm outcomes.',
    pros: [
      'Supports on-demand breastfeeding - you catch hunger cues before baby escalates to crying',
      'Baby does not leave your sight: no nursery mix-ups, no procedures done without your knowledge or consent',
      'Both parents learn baby\'s cues together with nurses nearby to help',
      'Your partner gets hands-on experience from day one: diaper changes, skin-to-skin, shift-taking',
    ],
    cons: [
      'Exhausting after a long labor or cesarean recovery - sleep deprivation is linked to postpartum mood disorders',
      'Hospital rooms have constant interruptions: vitals, meals, staff check-ins',
      'If breastfeeding and using the nursery, you must be explicit: "bring baby to me when hungry - do not give formula"',
      'Many Baby-Friendly hospitals have eliminated nurseries entirely, removing the option',
    ],
    bottomLine:
      'If you can room in with your partner sharing the load, the bonding and oversight benefits are real. If you need rest, take it - a rested mother is a safer, more present mother. There is no trophy for suffering.',
    ebookChapter: 'Chapter 42: Rooming In',
  },

  pacifier: {
    tradeoff:
      'Pacifiers satisfy the natural sucking reflex and reduce SIDS risk by 50-60% during sleep. The concern about breastfeeding interference is largely overstated when introduced after nursing is established.',
    pros: [
      'AAP recommends pacifiers at naptime and bedtime for SIDS risk reduction (50-60% decrease)',
      'Cochrane review found no significant effect on breastfeeding duration when introduced after nursing is established',
      'Provides genuine comfort and helps babies self-soothe',
    ],
    cons: [
      'In the first 3-4 weeks, every suck should ideally happen at the breast to build milk supply',
      'Flow preference is real: bottles and pacifiers deliver with less effort, which can frustrate baby at the breast',
      'Extended use beyond age 2-3 is associated with dental problems',
    ],
    bottomLine:
      'If breastfeeding, most IBCLCs recommend waiting 3-4 weeks until feeding is well established. Not breastfeeding? No reason to wait. The SIDS protection alone makes pacifiers worth considering for sleep.',
    ebookChapter: 'Chapter 41: Pacifier Use',
  },

  visitors: {
    tradeoff:
      'Visitors bring support and excitement, but the postpartum period is a vulnerable time for recovery, bonding, and establishing feeding. Your body is recovering from one of the most physically demanding experiences of your life.',
    pros: [
      'Emotional support from loved ones during a major life transition',
      'Practical help with meals, household tasks, and older children',
      'Sharing the joy of a new arrival strengthens family bonds',
    ],
    cons: [
      'Interrupts rest and recovery at a critical time',
      'Can make breastfeeding awkward or difficult - many women are still learning to nurse',
      'Germ exposure to a brand-new immune system',
      'Pressure to entertain when you need to focus on healing and feeding',
    ],
    bottomLine:
      'Your space, your rules. Anyone who truly supports you will respect your boundaries during this time. The best visitors bring food, help with chores, and leave when you are tired.',
  },

  placenta: {
    tradeoff:
      'Most families choose hospital disposal. Encapsulation is popular but lacks scientific evidence. Cultural and spiritual practices like tree planting offer meaningful alternatives.',
    pros: [
      'Cultural significance in many traditions - tree planting is practiced across Maori, Pacific Islander, and Indigenous cultures worldwide',
      'Some women report improved energy and mood with encapsulation (likely placebo effect, which is still real)',
      'Many doulas offer encapsulation as part of their services, simplifying logistics',
    ],
    cons: [
      'A 2018 systematic review found no evidence supporting encapsulation health claims',
      'Encapsulated placenta contains pregnancy hormones - re-introducing them postpartum could theoretically interfere with recovery and milk production',
      'CDC issued a 2017 warning after contaminated capsules caused a newborn GBS infection',
      'No FDA regulation of encapsulation; contamination risk if not properly processed',
    ],
    bottomLine:
      'Hospital disposal is perfectly fine. If you want to keep the placenta, plan ahead - you will need a container, and some hospitals require advance paperwork. Planting a tree over it is a meaningful tradition practiced across many cultures.',
    ebookChapter: 'Chapter 38: Placenta Options',
  },

  circumcision: {
    tradeoff:
      'Circumcision is a permanent surgical procedure that removes functional, specialized tissue. No major medical organization in the world recommends it routinely. The decision is cultural, religious, or personal - not medical.',
    pros: [
      'Slight reduction in UTI risk in infancy (100 circumcisions prevent 1 UTI, which is treatable with antibiotics)',
      'Cultural, religious, or family preference fulfillment - particularly for Jewish and Muslim families',
      'Some studies suggest reduced STI risk later in life (based on African studies; condoms are far more effective)',
    ],
    cons: [
      'Painful: cortisol spikes 3-4x during the procedure; studies show altered pain responses months later',
      'Removes ~50% of penile skin including specialized nerve endings and fine-touch receptors',
      'Complications in ~1.5-3% of cases (bleeding, infection, and rarely more serious)',
      'Permanent - removes the child\'s future choice about their own body',
    ],
    bottomLine:
      'The AAP concluded benefits do not justify a universal recommendation. Modern circumcision removes significantly more tissue than the ancient biblical practice. The US is the only developed country with high routine circumcision rates (Europe is under 5%).',
    ebookChapter: 'Chapter 34: Circumcision',
  },

  support_people: {
    tradeoff:
      'Your birth team shapes the atmosphere and directly affects outcomes. A doula reduces cesarean rates by 39% and shortens labor by 41 minutes on average. But too many people in the room can increase stress.',
    pros: [
      'Partner provides emotional connection, intimacy, and advocacy',
      'Doula provides continuous professional support: positioning, massage, counter-pressure, breathing techniques',
      'Doula support has no adverse effects - one of the few interventions that only improves outcomes',
    ],
    cons: [
      'Too many people can increase stress and disrupt the hormonal environment labor needs',
      'Family dynamics may create tension during a vulnerable time',
      'Hospital room space is limited; some hospitals cap the number of support people allowed',
    ],
    bottomLine:
      'Choose people who make you feel safe, supported, and calm. A doula supports both you and your partner - they enhance your partner\'s ability to help, not replace them.',
    ebookChapter: 'Chapter 5: Doula',
  },

  baby_sex: {
    tradeoff:
      'Knowing baby\'s sex helps us personalize a few questions in your birth plan, like circumcision preferences.',
    pros: [
      'Allows us to show relevant questions',
      'Personalizes your birth plan document',
    ],
    cons: [
      'Some families prefer to keep it a surprise',
    ],
    bottomLine:
      'This just helps us tailor the quiz. Select "prefer not to say" if you want to keep it private.',
  },

  multiples: {
    tradeoff:
      'Multiple pregnancies have different considerations for birth planning, monitoring, and delivery approach.',
    pros: [
      'Knowing helps us tailor recommendations appropriately',
    ],
    cons: [
      'Multiple pregnancies are often higher-risk and may limit some choices',
    ],
    bottomLine:
      'Twins and multiples may require additional monitoring and a different delivery approach. We want to make sure your plan fits your situation.',
  },

  csection_approach: {
    tradeoff:
      'Gentle or family-centered cesarean techniques make the experience more personal and support bonding, but not all hospitals or surgeons offer them. A cesarean does not have to feel like an assembly line.',
    pros: [
      'Clear drape lets you see baby being born - transforms the experience from behind a curtain',
      'Immediate or early skin-to-skin in the OR or recovery room is safe and beneficial',
      'Delayed cord clamping is possible during cesarean (typically 60-90 seconds) with the same benefits',
      'Music and a calmer atmosphere reduce anxiety and improve the experience',
    ],
    cons: [
      'Not all hospitals accommodate gentle cesarean requests - ask during prenatal visits',
      'Not possible in true emergency situations where speed is critical',
      'Some surgeons are unfamiliar or uncomfortable with the approach - willingness varies',
    ],
    bottomLine:
      'A cesarean is still a birth and you deserve to experience it as fully as safely possible. Many of the same preferences from a vaginal birth plan - skin-to-skin, delayed cord clamping, golden hour - can apply to a cesarean with advance planning.',
    ebookChapter: 'Chapter 12: Cesarean Birth',
  },

  csection_details: {
    tradeoff:
      'Small details during a cesarean - clear drape, music, arms free, partner present, photos - can make a significant difference in how you experience your baby\'s birth.',
    pros: [
      'Each option helps personalize an otherwise clinical experience',
      'Partner presence provides emotional support, advocacy, and can do skin-to-skin if you cannot',
      'Photos capture a moment you cannot see from the operating table',
      'Requesting a gentle cesarean demonstrates informed, engaged participation in your care',
    ],
    cons: [
      'Hospital policies may limit some options - ask well before your due date',
      'Emergency situations override all preferences when safety requires it',
      'Some requests require advance coordination with the surgical and anesthesia teams',
    ],
    bottomLine:
      'Ask for what you want. The worst they can say is no, and most surgical teams want you to have a positive experience. 60-80% of women who attempt VBAC after a cesarean succeed - one cesarean does not mean all future births must be surgical.',
    ebookChapter: 'Chapter 12: Cesarean Birth',
  },

  csection_cord_clamping: {
    tradeoff:
      'Delayed cord clamping during a cesarean is safe and increasingly supported by research. It gives baby up to 30% more blood volume, though the window is typically shorter (60-90 seconds) than in vaginal birth.',
    pros: [
      'Increases baby\'s blood volume and iron stores, same as vaginal birth',
      'Research confirms no increase in maternal blood loss during cesarean delayed clamping',
      'ACOG, WHO, and AAP all recommend delayed clamping regardless of birth mode',
      'Even 60-90 seconds provides meaningful benefit for baby',
    ],
    cons: [
      'Surgeon must manage timing around the surgical field',
      'In true emergencies, immediate clamping may be necessary',
      'Delay is typically shorter than in vaginal birth (60-90 seconds vs. up to 5 minutes)',
      'Not all surgical teams are practiced in accommodating the request',
    ],
    bottomLine:
      'Delayed cord clamping during a cesarean is safe and evidence-based. Your baby deserves that extra blood volume regardless of how they arrive.',
    ebookChapter: 'Chapter 12: Cesarean Birth',
  },

  csection_vaginal_seeding: {
    tradeoff:
      'Cesarean babies miss the bacterial exposure of the birth canal. Vaginal seeding partially restores this by swabbing baby with maternal vaginal fluid. Evidence is emerging and promising, but not yet definitive.',
    pros: [
      'Studies show partial restoration of key gut bacteria (Bacteroides, Lactobacillus)',
      'A review of 512 infants found no serious adverse events',
      'May support immune development and reduce risk of allergies and asthma',
      'Simple procedure that can be done immediately after birth',
    ],
    cons: [
      'Evidence is promising but still emerging - no large trials prove disease prevention yet',
      'Requires screening: active herpes, untreated STIs, and certain infections are contraindications',
      'ACOG does not currently endorse outside clinical trials',
      'Some hospitals may be resistant or unfamiliar with the practice',
    ],
    bottomLine:
      'Vaginal seeding is low-risk when screening precautions are followed. Breastfeeding remains the most powerful microbiome intervention for cesarean babies.',
    ebookChapter: 'Chapter 3: The Microbiome',
  },

  csection_comfort: {
    tradeoff:
      'Small touches - arms free, music, narration - can transform a cesarean from clinical to personal. Most requests are easy to accommodate with advance communication.',
    pros: [
      'Arms free lets you touch and hold baby as soon as possible',
      'Music reduces anxiety and creates a calmer atmosphere',
      'Surgeon narration helps you feel informed and involved in your own birth',
      'These changes significantly improve the emotional experience',
    ],
    cons: [
      'Arms may need to be secured if trembling from anesthesia',
      'Music must be low enough for the surgical team to communicate',
      'Not all surgeons are comfortable narrating the procedure',
      'Emergency situations may override comfort preferences',
    ],
    bottomLine:
      'A cesarean is still your birth. These small requests can make the difference between feeling like a patient and feeling like a mother meeting her baby.',
    ebookChapter: 'Chapter 12: Cesarean Birth',
  },
}
