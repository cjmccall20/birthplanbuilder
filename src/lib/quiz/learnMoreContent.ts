import type { LearnMoreData } from './questions'

export const LEARN_MORE_DATA: Record<string, LearnMoreData> = {
  birth_setting: {
    tradeoff:
      'Hospitals have the highest intervention rates but the most emergency resources. Birth centers and home births have lower intervention rates with similar safety outcomes for low-risk pregnancies.',
    pros: [
      'Hospital: full medical resources, epidural available, NICU on-site',
      'Birth center: midwifery model, lower intervention rates, hospital backup nearby',
      'Home birth: full control of environment, lowest intervention rates, most comfort and privacy',
    ],
    cons: [
      'Hospital: higher intervention and C-section rates, less personalized care',
      'Birth center: no epidural available, may need transfer for complications',
      'Home birth: longer transfer time if emergency, not recommended for high-risk pregnancies',
    ],
    bottomLine:
      'The setting you choose affects the care you receive. Hospitals treat routine births as potential emergencies; birth centers and home births treat birth as a normal process.',
    ebookChapter: 'Chapter 1: Birth Setting',
  },

  pain_approach: {
    tradeoff:
      'Pain management is a spectrum from fully unmedicated to epidural. Each option has trade-offs for mobility, recovery, and intervention risk. Decide before labor when you can think clearly.',
    pros: [
      'Unmedicated: full mobility, faster recovery, fewer interventions',
      'Nitrous oxide: you control it, wears off quickly, stay mobile',
      'Epidural: most effective pain relief, allows rest during long labors',
    ],
    cons: [
      'Unmedicated: requires preparation and continuous support to manage intensity',
      'Nitrous oxide: less effective than epidural, may cause nausea',
      'Epidural: limits mobility, may slow labor, increases intervention risk (~2.5x C-section)',
    ],
    bottomLine:
      'Most women who achieve unmedicated birth do so through preparation, not pain tolerance. It is a learned skill, not willpower.',
    ebookChapter: 'Chapter 3: Pain Management',
  },

  skin_to_skin: {
    tradeoff:
      'Immediate skin-to-skin contact regulates baby\'s temperature, heart rate, and breathing while promoting breastfeeding. Most routine procedures can wait - the question is whether to prioritize bonding or assessments first.',
    pros: [
      'Regulates baby\'s temperature better than a warmer',
      'Promotes successful breastfeeding initiation',
      'Triggers bonding hormones, reduces crying and stress',
      'Blood sugar stabilization is documented',
    ],
    cons: [
      'Delays initial newborn assessment (though most assessments can be done on your chest)',
      'May not be possible if baby needs resuscitation',
      'Some hospitals still resist uninterrupted skin-to-skin during procedures',
    ],
    bottomLine:
      'This is not a nice-to-have - it is biologically optimal. Your body is baby\'s best incubator.',
    ebookChapter: 'Chapter 8: Skin-to-Skin',
  },

  golden_hour: {
    tradeoff:
      'The first 60 minutes after birth are a uniquely powerful window for bonding and breastfeeding. Protecting this time means delaying non-urgent procedures, but some hospitals have routines that interrupt it.',
    pros: [
      'Baby is in quiet alert state, ideal for first feeding',
      'Uninterrupted contact supports self-attachment to breast',
      'Hormonal cascade benefits both mother and baby',
      'Sets the stage for successful breastfeeding',
    ],
    cons: [
      'Some procedures may be slightly delayed',
      'Staff may need reminding about your preferences',
      'Not always possible if medical complications arise',
    ],
    bottomLine:
      'The golden hour is when baby is most alert and ready to bond. Everything else can wait.',
  },

  feeding: {
    tradeoff:
      'Breastfeeding provides unique immune benefits and is biologically optimal when it works, but success depends heavily on support, not just determination. Formula is food, not failure.',
    pros: [
      'Breastfeeding: dynamic antibodies, immune protection, free, always available',
      'Formula: shareable with partner, precise measurement, no supply anxiety',
      'Combination: flexibility of both approaches',
    ],
    cons: [
      'Breastfeeding: 70% of mothers face significant challenges, requires substantial support',
      'Formula: no immune transfer, ongoing cost ($25-40/canister for clean brands)',
      'Combination: may affect supply if introduced too early',
    ],
    bottomLine:
      'Any breast milk counts. Fed babies thrive. Your worth as a mother is not measured in ounces.',
    ebookChapter: 'Chapter 16: Feeding',
  },

  cord_clamping: {
    tradeoff:
      'Delayed cord clamping gives baby 30% more blood volume and 50% more iron stores. ACOG recommends it. There is no good reason to clamp immediately unless there is an emergency.',
    pros: [
      'Increases blood volume by 30%',
      'Iron stores significantly higher at 6 months',
      'Improved brain myelination documented at 4 months',
      'Recommended by ACOG, WHO, and AAP',
    ],
    cons: [
      'Very slight increase in phototherapy for jaundice (not clinically significant)',
      'May delay emergency interventions if baby needs resuscitation',
      'Some providers still default to immediate clamping out of habit',
    ],
    bottomLine:
      'Immediate clamping became standard for convenience, not evidence. Your baby\'s blood belongs in your baby.',
    ebookChapter: 'Chapter 11: Cord Clamping',
  },

  birth_photography: {
    tradeoff:
      'Birth photography captures an unrepeatable moment, but some families prefer privacy. Hospital policies vary on what is allowed.',
    pros: [
      'Captures a once-in-a-lifetime moment you may not fully remember',
      'Professional photographers know how to stay out of the way',
      'Photos can help process the birth experience afterward',
    ],
    cons: [
      'May feel intrusive during an intimate moment',
      'Hospital policies may restrict cameras in certain areas (especially OR)',
      'Partner may be distracted by documenting instead of supporting',
    ],
    bottomLine:
      'You can never go back and take photos you did not take. But you also cannot un-take them.',
  },

  movement_labor: {
    tradeoff:
      'Freedom to move during labor helps baby descend and can reduce pain, but continuous monitoring or an epidural may limit mobility.',
    pros: [
      'Movement helps baby rotate and descend through the pelvis',
      'Upright positions use gravity to your advantage',
      'Walking, swaying, and bouncing can significantly reduce pain',
      'Associated with shorter labor and fewer interventions',
    ],
    cons: [
      'Continuous fetal monitoring restricts movement to near the bed',
      'Epidural eliminates ability to walk or stand',
      'Some hospitals discourage or do not accommodate movement',
    ],
    bottomLine:
      'Your body knows how to labor. Movement is not a luxury - it is how birth is designed to work.',
  },

  fetal_monitoring: {
    tradeoff:
      'Continuous electronic fetal monitoring increases C-section rates by ~20% without improving outcomes for low-risk pregnancies. Intermittent listening is evidence-based and allows freedom to move.',
    pros: [
      'Continuous: constant reassurance of baby\'s heart rate',
      'Intermittent: freedom to move, change positions, use water',
      'Wireless: middle ground if continuous is required',
    ],
    cons: [
      'Continuous: restricts movement, higher false-positive rate, increased C-section risk (63%)',
      'Intermittent: gaps between check-ins (every 15-30 min)',
      'Wireless: not available at all hospitals',
    ],
    bottomLine:
      'Continuous monitoring does not improve outcomes - it gives more data to potentially misinterpret. It became standard for liability, not better care.',
    ebookChapter: 'Chapter 5: Fetal Monitoring',
  },

  bath_timing: {
    tradeoff:
      'The white coating on newborns (vernix) is a natural moisturizer with antibacterial properties. Early bathing removes it and can destabilize temperature and blood sugar.',
    pros: [
      'Vernix moisturizes skin and has antibacterial properties',
      'Delayed bathing helps maintain body temperature',
      'Baby keeps mother\'s scent, supporting bonding and feeding',
      'WHO recommends waiting at least 24 hours',
    ],
    cons: [
      'Some parents prefer a clean baby sooner',
      'Hospital staff may default to early bathing as part of routine',
      'Blood or meconium on baby may feel uncomfortable to some families',
    ],
    bottomLine:
      'That white coating is not something to wash off - it is nature\'s moisturizer and baby\'s first skin protection.',
  },

  vitamin_k: {
    tradeoff:
      'A single injection provides near-complete protection against a rare but serious bleeding disorder. It involves a moment of pain during baby\'s first hours.',
    pros: [
      'Near-complete VKDB protection (~97% effective)',
      'Single dose, no follow-up needed',
      'Well-studied with decades of safety data',
      'Prevents brain hemorrhage and death in rare but catastrophic cases',
    ],
    cons: [
      'Injection causes pain during golden hour',
      'Oral alternative exists (3 doses over 6 weeks, ~80% effective)',
      'Some parents prefer natural vitamin K accumulation',
    ],
    bottomLine:
      'VKDB is rare (4-7 per 100,000) but when it occurs, ~50% have brain bleeding. The injection is the most reliable prevention.',
    ebookChapter: 'Chapter 9: Vitamin K',
  },

  eye_ointment: {
    tradeoff:
      'Eye ointment prevents gonorrhea and chlamydia transmission to baby\'s eyes. If you have tested negative for both STIs, your baby has zero risk of these infections.',
    pros: [
      'Prevents serious eye infections that could cause blindness',
      'Quick, simple application',
      'Required by law in most states',
    ],
    cons: [
      'Blurs baby\'s vision during critical bonding hour',
      'Unnecessary if you tested negative for gonorrhea and chlamydia',
      'AAP (2024) is reconsidering mandatory status',
    ],
    bottomLine:
      'If you tested negative for gonorrhea and chlamydia, the ointment provides no medical benefit. Negative means no transmission is possible.',
    ebookChapter: 'Chapter 7: Eye Ointment',
  },

  hep_b_vaccine: {
    tradeoff:
      'The birth dose primarily catches babies of mothers who test falsely negative. If you are confirmed HepB-negative, 2025 ACIP guidelines support individual decision-making about timing.',
    pros: [
      'Catches undetected maternal infection (false negatives)',
      'Convenient timing while still in hospital',
      'Starts vaccine series early',
    ],
    cons: [
      'If mom is confirmed negative, transmission risk is essentially zero',
      'Adds another intervention in the first 24 hours',
      'Can be given at 2-month visit instead (per 2025 ACIP guidelines)',
    ],
    bottomLine:
      'Transmission requires an infected source. If you are confirmed negative and your household is too, the question is just timing - not whether to vaccinate.',
    ebookChapter: 'Chapter 10: Hepatitis B',
  },

  cord_blood: {
    tradeoff:
      'Cord blood contains stem cells that could potentially treat future illnesses, but the likelihood of use is very low and private banking is expensive. Collection may conflict with delayed cord clamping.',
    pros: [
      'Preserves stem cells for potential future medical use',
      'Private banking ensures availability for your family',
      'Public donation helps others at no cost to you',
    ],
    cons: [
      'Private banking costs $1,000-2,000 upfront plus $100-200/year',
      'Likelihood of using stored blood: 1 in 1,000 to 1 in 200,000',
      'Collection may require earlier cord clamping',
    ],
    bottomLine:
      'Most families choose delayed cord clamping over banking - giving baby the blood now rather than storing it for an unlikely future need.',
  },

  rooming_in: {
    tradeoff:
      'Keeping baby in your room promotes bonding and breastfeeding, but can be exhausting for parents recovering from birth. The nursery exists for a reason.',
    pros: [
      'Promotes bonding and helps you learn baby\'s cues',
      'Supports breastfeeding with on-demand access',
      'Reduces risk of hospital mix-ups',
    ],
    cons: [
      'Exhausting after a long labor or C-section recovery',
      'May contribute to postpartum anxiety without adequate rest',
      'Limited help at 3am when learning to breastfeed',
    ],
    bottomLine:
      'A rested mother is a better mother. Use the nursery if you need sleep - there is no award for suffering.',
  },

  pacifier: {
    tradeoff:
      'Pacifiers satisfy the sucking reflex and reduce SIDS risk, but may interfere with breastfeeding establishment in the early days.',
    pros: [
      'Soothes baby and satisfies natural sucking reflex',
      'Associated with reduced SIDS risk during sleep',
      'Recent research shows less breastfeeding interference than previously thought',
    ],
    cons: [
      'May reduce nursing frequency when establishing supply',
      'Can mask hunger cues in early days',
      'Creates a dependency that must eventually be broken',
    ],
    bottomLine:
      'If breastfeeding, consider waiting 3-4 weeks until feeding is well established before introducing a pacifier.',
  },

  visitors: {
    tradeoff:
      'Visitors bring support and excitement, but the postpartum period is a vulnerable time for recovery, bonding, and establishing feeding.',
    pros: [
      'Emotional support from loved ones',
      'Help with practical tasks',
      'Sharing the joy of a new arrival',
    ],
    cons: [
      'Interrupts rest and recovery',
      'Can make breastfeeding awkward or difficult',
      'Germ exposure to a brand-new immune system',
      'Pressure to entertain when you need to focus on baby',
    ],
    bottomLine:
      'Your space, your rules. Anyone who truly loves you will respect your boundaries during this time.',
  },

  placenta: {
    tradeoff:
      'Most families choose hospital disposal. Encapsulation is popular but lacks strong scientific evidence. Cultural and spiritual practices offer meaningful alternatives.',
    pros: [
      'Encapsulation: some women report increased energy and mood benefits',
      'Cultural significance in many traditions',
      'Planting a tree over the placenta is a meaningful ritual',
    ],
    cons: [
      'Encapsulation costs $150-300 with no FDA regulation',
      'Limited scientific evidence supporting health claims',
      'Small contamination risk if not properly processed',
    ],
    bottomLine:
      'Hospital disposal is perfectly fine. If you want to keep it, plan ahead - you will need a container and a plan.',
  },

  circumcision: {
    tradeoff:
      'Circumcision is not medically necessary. It is a permanent surgical procedure performed during a sensitive developmental window. The decision is cultural, religious, or personal.',
    pros: [
      'Slightly reduced UTI risk in infancy (1 prevented per 100 procedures)',
      'Cultural, religious, or family preference fulfillment',
      'May reduce certain STI risks later in life (condoms are far more effective)',
    ],
    cons: [
      'Painful procedure: cortisol spikes 3-4x, altered pain responses documented months later',
      'Removes functional tissue with specialized nerve endings',
      'Complications in ~1.5-3% of cases (bleeding, infection)',
      'Permanent - removes the child\'s future choice',
    ],
    bottomLine:
      'No medical organization in the world recommends routine circumcision. The US is the only developed country with high rates.',
    ebookChapter: 'Chapter 12: Circumcision',
  },

  support_people: {
    tradeoff:
      'Your birth team shapes the atmosphere. A doula reduces epidural use by ~57% and C-section rates. But too many people can feel chaotic.',
    pros: [
      'Partner provides emotional connection and advocacy',
      'Doula provides continuous professional labor support',
      'Family members can offer comfort and practical help',
    ],
    cons: [
      'Too many people can increase stress and disrupt focus',
      'Family dynamics may create tension during a vulnerable time',
      'Hospital room space is limited',
    ],
    bottomLine:
      'Choose people who make you feel safe and supported, not people who expect to be entertained.',
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
      'Gentle/family-centered C-section techniques make the experience more personal and promote bonding, but not all hospitals or surgeons offer them.',
    pros: [
      'Slower delivery allows baby to clear lung fluid naturally',
      'Clear drape lets you see baby being born',
      'Immediate skin-to-skin in the OR is possible',
      'Music and a calmer atmosphere reduce anxiety',
    ],
    cons: [
      'Not all hospitals accommodate gentle C-section requests',
      'May not be possible in emergency situations',
      'Some surgeons are unfamiliar or uncomfortable with the approach',
    ],
    bottomLine:
      'A C-section is still a birth. You deserve to experience it as fully as safely possible.',
  },

  csection_details: {
    tradeoff:
      'Small details during a C-section - clear drape, music, arms free, photos - can make a big difference in how you experience your baby\'s birth.',
    pros: [
      'Each option helps personalize an otherwise clinical experience',
      'Partner presence provides emotional support and advocacy',
      'Photos capture a moment you cannot see from the table',
    ],
    cons: [
      'Hospital policies may limit some options',
      'Emergency situations override preferences',
      'Some requests require advance coordination with the surgical team',
    ],
    bottomLine:
      'Ask for what you want. The worst they can say is no, and most surgical teams want you to have a positive experience.',
  },
}
