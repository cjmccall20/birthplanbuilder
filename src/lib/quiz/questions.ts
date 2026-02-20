export interface QuizOption {
  value: string
  label: string
  birthPlanText: string
  isUnsure?: boolean
  icon?: string  // Lucide icon name for option
}

export interface LearnMoreData {
  tradeoff: string      // 1-2 sentence trade-off summary
  pros: string[]        // 3-4 bullets
  cons: string[]        // 3-4 bullets
  bottomLine: string    // "One Thing to Remember"
  ebookChapter?: string // For upsell: "Chapter 8: Skin-to-Skin"
}

export interface QuizQuestion {
  id: string
  category: string  // "Getting Started" | "Your Birth" | "After Birth" | "Newborn Care" | "Hospital Stay" | "Personal" | "C-Section Planning"
  title: string
  subtitle: string  // Approachable, not clinical
  description?: string         // Backward compat - old questions used this
  order: number
  learnMoreContent?: string    // Backward compat - old plain-text learn more
  learnMoreData?: LearnMoreData
  options: QuizOption[]
  inputType?: 'text'           // For baby name - renders text field instead of option buttons
  deferredFor?: 'csection'     // Deferred to end for vaginal planners
  conditionalOn?: {            // ONLY used for circumcision
    questionId: string
    values: string[]
  }
}

// ---------------------------------------------------------------------------
// Questions - ordered for engagement (universal first, clinical later)
// ---------------------------------------------------------------------------

export const quizQuestions: QuizQuestion[] = [
  // =========================================================================
  // GETTING STARTED
  // =========================================================================
  {
    id: 'birth_setting',
    category: 'Getting Started',
    title: 'Where to Give Birth',
    subtitle: 'Where do you picture yourself giving birth?',
    order: 1,
    learnMoreData: {
      tradeoff: 'Your birth setting shapes the care you receive. Hospitals offer full emergency resources but higher intervention rates; birth centers and home births offer lower intervention with midwifery-model care.',
      pros: [
        'Hospitals have the highest level of emergency care immediately available',
        'Birth centers offer a home-like environment with hospital backup nearby',
        'Home births provide maximum comfort, control, and lowest intervention rates',
        'All three settings have similar safety outcomes for low-risk pregnancies with qualified attendants',
      ],
      cons: [
        'Hospital epidural rate is around 73%, which may lead to additional interventions',
        'Birth centers require transfer (about 12%) if complications arise',
        'Home births have a transfer rate of about 16% for first-time mothers',
        'Some settings may limit your pain management options',
      ],
      bottomLine: 'The setting you choose affects the care you receive. Hospitals are designed for emergencies, which means routine births often get treated as potential emergencies.',
      ebookChapter: 'Chapter 1: Birth Setting',
    },
    options: [
      { value: 'hospital', label: 'Hospital', birthPlanText: 'We are planning to give birth at a hospital.', icon: 'Building2' },
      { value: 'birth_center', label: 'Birth center', birthPlanText: 'We are planning to give birth at a birth center.', icon: 'Home' },
      { value: 'home', label: 'Home birth', birthPlanText: 'We are planning a home birth with a qualified midwife.', icon: 'House' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We are still deciding on our birth setting.', isUnsure: true },
    ],
  },
  {
    id: 'support_people',
    category: 'Getting Started',
    title: 'Your Birth Team',
    subtitle: 'Who do you want by your side?',
    order: 2,
    learnMoreData: {
      tradeoff: 'Continuous labor support is one of the most evidence-based interventions in obstetrics. The people in your room affect your hormones, your comfort, and your outcomes.',
      pros: [
        'Doula support is associated with 39% fewer C-sections and shorter labor',
        'A supportive partner provides emotional connection and advocacy',
        'Familiar people help you feel safe, which keeps oxytocin flowing',
        'Research shows continuous support reduces the need for pain medication',
      ],
      cons: [
        'Too many people in the room can increase stress and slow labor',
        'Visitors during labor can disrupt your focus and privacy',
        'Some birth team members may have conflicting opinions or anxieties',
        'Hospital policies may limit the number of support people allowed',
      ],
      bottomLine: 'Your body works better when you feel supported, safe, and informed. Choose people who make you feel calm, not anxious.',
      ebookChapter: 'Chapter 20: Birth Team',
    },
    options: [
      { value: 'partner_only', label: 'My partner only', birthPlanText: 'We would like only my partner present during labor and delivery.', icon: 'Heart' },
      { value: 'partner_doula', label: 'Partner and doula', birthPlanText: 'We would like my partner and our doula present during labor and delivery.', icon: 'Users' },
      { value: 'partner_family', label: 'Partner and family member(s)', birthPlanText: 'We would like my partner and select family members present during labor and delivery.', icon: 'Users' },
      { value: 'doula_only', label: 'Doula (with or without partner)', birthPlanText: 'We would like our doula present as our primary support person.', icon: 'UserCheck' },
      { value: 'unsure', label: 'I need to think about this', birthPlanText: 'We are still deciding on our birth team.', isUnsure: true },
    ],
  },

  // =========================================================================
  // YOUR BIRTH
  // =========================================================================
  {
    id: 'pain_approach',
    category: 'Your Birth',
    title: 'Pain Management',
    subtitle: 'How do you feel about pain management during labor?',
    order: 3,
    learnMoreData: {
      tradeoff: 'Pain management is a spectrum from fully unmedicated to epidural. Each option has real trade-offs for mobility, labor progress, and your experience. Deciding before labor helps you prepare.',
      pros: [
        'Epidurals provide significant pain relief and allow rest during long labors',
        'Unmedicated birth preserves full mobility and natural hormone release',
        'Nitrous oxide offers a middle ground: some relief without numbness or immobility',
        'Having a plan reduces anxiety and helps your team support you effectively',
      ],
      cons: [
        'Epidurals limit mobility and may increase the chance of additional interventions',
        'Unmedicated birth requires significant preparation and continuous support',
        'IV opioids cross the placenta and can make baby sleepy at birth',
        'Changing plans mid-labor can feel stressful without advance thought',
      ],
      bottomLine: 'Most women who achieve unmedicated birth do so through preparation, not pain tolerance. It is a learned skill, not willpower.',
      ebookChapter: 'Chapter 3: Pain Management',
    },
    options: [
      { value: 'natural', label: 'Planning unmedicated birth', birthPlanText: 'We are planning an unmedicated birth. Please do not offer pain medication unless I ask for it.', icon: 'Leaf' },
      { value: 'open', label: 'Open to options, will decide in the moment', birthPlanText: 'We are open to pain management options and will decide during labor.', icon: 'Scale' },
      { value: 'epidural', label: 'Planning to get an epidural', birthPlanText: 'We plan to request an epidural during labor.', icon: 'Syringe' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss pain management options with our care team.', isUnsure: true },
    ],
  },

  // =========================================================================
  // AFTER BIRTH (universally compelling)
  // =========================================================================
  {
    id: 'skin_to_skin',
    category: 'After Birth',
    title: 'Immediate Skin-to-Skin',
    subtitle: 'Would you like baby placed on your chest right away?',
    order: 4,
    learnMoreData: {
      tradeoff: 'Placing baby directly on your bare chest immediately after birth regulates their temperature, heart rate, and breathing better than a warmer. Most routine procedures can be done while baby is on your chest.',
      pros: [
        'Regulates baby\'s temperature, heart rate, breathing, and blood sugar naturally',
        'Promotes successful breastfeeding through baby\'s instinctive crawling reflex',
        'Reduces stress hormones in both mother and baby, facilitating bonding',
        'Baby is more alert and calm during this initial period',
      ],
      cons: [
        'May need to be paused if baby requires immediate medical attention',
        'Some hospitals still default to separating baby for routine assessments first',
        'After a C-section, positioning may require extra assistance from staff',
        'If mother is unable, partner can provide skin-to-skin instead',
      ],
      bottomLine: 'This is not a nice-to-have - it is biologically optimal. Your body is baby\'s best incubator.',
      ebookChapter: 'Chapter 8: Skin-to-Skin',
    },
    options: [
      { value: 'immediate', label: 'Yes, immediately and uninterrupted', birthPlanText: 'Please place baby directly on my chest for immediate, uninterrupted skin-to-skin contact.', icon: 'Heart' },
      { value: 'after_assessment', label: 'After a quick initial check', birthPlanText: 'We would like skin-to-skin after the initial newborn assessment.', icon: 'Stethoscope' },
      { value: 'partner_backup', label: 'Partner does skin-to-skin if I can\'t', birthPlanText: 'If I am unable, please place baby skin-to-skin with my partner immediately.', icon: 'Users' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss skin-to-skin options with our care team.', isUnsure: true },
    ],
  },
  {
    id: 'golden_hour',
    category: 'After Birth',
    title: 'The Golden Hour',
    subtitle: 'The first hour after birth is magical - how would you like to spend it?',
    order: 5,
    learnMoreData: {
      tradeoff: 'The "golden hour" is the first 60 minutes after birth when baby is naturally alert and primed for bonding and feeding. Interruptions during this time can interfere with instinctive behaviors.',
      pros: [
        'Baby\'s natural crawling and rooting reflexes are strongest in the first hour',
        'Breastfeeding initiation is significantly more successful during this window',
        'Most routine procedures (weighing, measuring, vitamin K) can safely wait',
        'Uninterrupted contact supports the hormonal cascade for bonding and milk production',
      ],
      cons: [
        'Some time-sensitive medical assessments may need to occur during this period',
        'Hospital staff routines may not automatically accommodate uninterrupted time',
        'Requires clear communication with your care team in advance',
        'Partners and visitors may need to wait to hold baby',
      ],
      bottomLine: 'You only get one golden hour. Most procedures can wait - this time cannot be recreated.',
      ebookChapter: 'Chapter 8: Skin-to-Skin',
    },
    options: [
      { value: 'protected', label: 'Protect it fully - no interruptions', birthPlanText: 'We want the first hour after birth to be uninterrupted skin-to-skin time. Please delay all non-urgent procedures.', icon: 'Shield' },
      { value: 'mostly_protected', label: 'Minimize interruptions, but do essentials', birthPlanText: 'We would like to minimize interruptions during the first hour but understand essential assessments may be needed.', icon: 'Clock' },
      { value: 'flexible', label: 'Flexible - follow the staff\'s lead', birthPlanText: 'We are flexible with the timing of procedures in the first hour.', icon: 'Workflow' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss golden hour options with our care team.', isUnsure: true },
    ],
  },
  {
    id: 'feeding',
    category: 'After Birth',
    title: 'Feeding Your Baby',
    subtitle: 'How are you planning to feed your baby?',
    order: 6,
    learnMoreData: {
      tradeoff: 'Breastfeeding provides unique immune benefits and dynamic nutrition, but success depends heavily on support, not just determination. Formula is food, not failure. Any breast milk counts.',
      pros: [
        'Breastfeeding provides antibodies, living cells, and nutrition that adapts to baby\'s needs',
        'Associated with health benefits for both mother (reduced cancer risk) and baby',
        'Always available at the right temperature and free of cost',
        'Formula feeding allows shared feeding duties and measurable intake',
      ],
      cons: [
        '70% of mothers experience significant breastfeeding challenges early on',
        'Difficulty knowing how much baby is eating can cause anxiety with breastfeeding',
        'Formula lacks the dynamic immune properties of breast milk',
        'Breastfeeding places the physical demands entirely on the mother',
      ],
      bottomLine: 'Fed babies thrive. Whether breast, formula, or both - adequate nutrition is what matters. Your worth as a mother is not measured in ounces.',
      ebookChapter: 'Chapter 16: Feeding',
    },
    options: [
      { value: 'breastfeed', label: 'Breastfeeding only', birthPlanText: 'We plan to exclusively breastfeed. Please do not offer formula or pacifiers without our consent.', icon: 'Baby' },
      { value: 'open_supplement', label: 'Breastfeed, open to supplementing', birthPlanText: 'We plan to breastfeed but are open to supplementation if medically needed.', icon: 'Heart' },
      { value: 'combo', label: 'Combination feeding', birthPlanText: 'We plan to combination feed with breast milk and formula.', icon: 'Shuffle' },
      { value: 'formula', label: 'Formula feeding', birthPlanText: 'We will be formula feeding our baby.', icon: 'Package' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss feeding options with a lactation consultant.', isUnsure: true },
    ],
  },
  {
    id: 'cord_clamping',
    category: 'After Birth',
    title: 'Cord Clamping Timing',
    subtitle: 'When should the umbilical cord be clamped?',
    order: 7,
    learnMoreData: {
      tradeoff: 'Delayed cord clamping allows additional blood to transfer from the placenta to baby, increasing blood volume by up to 30% and significantly boosting iron stores. ACOG, WHO, and AAP all recommend it.',
      pros: [
        'Increases baby\'s blood volume by up to 30% and iron stores for the first year',
        'Associated with improved brain myelination at 4 months',
        'Recommended by ACOG (30-60 seconds minimum), WHO (1-3 minutes), and AAP',
        'Still possible during C-sections (typically 60-90 seconds)',
      ],
      cons: [
        'May very slightly increase jaundice risk, though usually mild and manageable',
        'Emergency situations may require immediate cord clamping',
        'Cord blood banking collection may conflict with full delayed clamping',
        'Requires patience from medical staff who may default to immediate clamping',
      ],
      bottomLine: 'Immediate clamping became standard for convenience, not evidence. Your baby\'s blood belongs in your baby, not in the placenta.',
      ebookChapter: 'Chapter 11: Cord Clamping',
    },
    options: [
      { value: '1min', label: 'Wait at least 1 minute', birthPlanText: 'Please wait at least 1 minute before clamping the cord.', icon: 'Clock' },
      { value: '3-5min', label: 'Wait 3-5 minutes', birthPlanText: 'Please delay cord clamping for 3-5 minutes.', icon: 'Timer' },
      { value: 'until_stops', label: 'Wait until cord stops pulsing', birthPlanText: 'Please wait until the cord stops pulsing before clamping.', icon: 'Activity' },
      { value: 'immediate', label: 'Clamp right away', birthPlanText: 'We are comfortable with immediate cord clamping.', icon: 'Scissors' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss cord clamping timing with our care team.', isUnsure: true },
    ],
  },

  // =========================================================================
  // GETTING STARTED (continued)
  // =========================================================================
  {
    id: 'birth_photography',
    category: 'Getting Started',
    title: 'Photos and Video',
    subtitle: 'Would you like photos or video of the birth?',
    order: 8,
    learnMoreData: {
      tradeoff: 'Birth photography captures one of life\'s most transformative moments. Some families treasure these images forever, while others prefer to be fully present without a camera.',
      pros: [
        'Captures a once-in-a-lifetime moment you may not fully remember',
        'Professional birth photographers know how to stay unobtrusive',
        'Photos can help process the birth experience afterward',
        'First moments with baby are priceless to look back on',
      ],
      cons: [
        'Camera awareness can make some people feel self-conscious during labor',
        'Hospital policies may restrict photography during certain procedures',
        'A designated photographer (partner or professional) may affect their support role',
        'Some moments feel more sacred without documentation',
      ],
      bottomLine: 'There is no wrong answer here. Some families treasure birth photos for decades; others prefer the memory to live only in their hearts.',
    },
    options: [
      { value: 'photos_video', label: 'Yes, photos and video', birthPlanText: 'We would like to take photos and video during labor and delivery.', icon: 'Camera' },
      { value: 'photos_only', label: 'Photos only, no video', birthPlanText: 'We would like to take photos but not video during the birth.', icon: 'Image' },
      { value: 'after_only', label: 'Only after baby arrives', birthPlanText: 'We prefer photos only after baby is born, not during labor.', icon: 'ImagePlus' },
      { value: 'no', label: 'No photos or video', birthPlanText: 'We prefer no photos or video during the birth.', icon: 'EyeOff' },
      { value: 'unsure', label: 'I need to think about this', birthPlanText: 'We are still deciding on photography preferences.', isUnsure: true },
    ],
  },

  // =========================================================================
  // YOUR BIRTH (continued)
  // =========================================================================
  {
    id: 'movement_labor',
    category: 'Your Birth',
    title: 'Movement During Labor',
    subtitle: 'How important is being able to move around during labor?',
    order: 9,
    learnMoreData: {
      tradeoff: 'Freedom to move during labor helps baby descend and keeps labor progressing. However, some interventions (epidural, continuous monitoring, IV fluids) restrict mobility.',
      pros: [
        'Upright positions and movement help baby descend and align optimally',
        'Walking, swaying, and position changes can reduce pain naturally',
        'Water immersion (shower or tub) provides significant pain relief',
        'Gravity works in your favor when upright or side-lying',
      ],
      cons: [
        'An epidural will significantly limit or eliminate your ability to walk',
        'Continuous fetal monitoring tethers you to the bed or nearby',
        'IV fluids require moving with an IV pole',
        'Some hospital policies restrict movement as a default',
      ],
      bottomLine: 'Movement is one of the most powerful pain management tools available. If staying mobile matters to you, factor that into your other decisions too.',
      ebookChapter: 'Chapter 21: Pushing Positions',
    },
    options: [
      { value: 'very_important', label: 'Very important - I want full freedom', birthPlanText: 'Freedom to move, walk, and change positions during labor is very important to us.', icon: 'Move' },
      { value: 'somewhat', label: 'I\'d like to, but I\'m flexible', birthPlanText: 'We would prefer freedom to move during labor but are flexible based on circumstances.', icon: 'ArrowLeftRight' },
      { value: 'not_priority', label: 'Not a priority for me', birthPlanText: 'Mobility during labor is not a priority for us.', icon: 'Bed' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss mobility options during labor.', isUnsure: true },
    ],
  },
  {
    id: 'fetal_monitoring',
    category: 'Your Birth',
    title: 'Fetal Monitoring',
    subtitle: 'How would you like baby\'s heart rate monitored?',
    order: 10,
    learnMoreData: {
      tradeoff: 'Continuous electronic monitoring increases C-section rates by about 20% without improving outcomes for low-risk pregnancies. Intermittent monitoring is evidence-based for low-risk births and allows freedom of movement.',
      pros: [
        'Continuous monitoring provides constant data on baby\'s heart rate patterns',
        'Intermittent monitoring allows freedom to move, walk, and change positions',
        'Wireless monitors offer a middle ground: continuous data with mobility',
        'Intermittent monitoring is supported by research for low-risk pregnancies',
      ],
      cons: [
        'Continuous monitoring has a high false-positive rate, leading to unnecessary interventions',
        'Intermittent monitoring requires a nurse to check regularly (every 15-30 minutes)',
        'Wireless monitors are not available at all hospitals',
        'High-risk situations may genuinely require continuous monitoring',
      ],
      bottomLine: 'Continuous monitoring became standard for liability protection, not better outcomes. For low-risk births, intermittent monitoring is equally safe and preserves your mobility.',
      ebookChapter: 'Chapter 5: Fetal Monitoring',
    },
    options: [
      { value: 'intermittent', label: 'Intermittent (checked periodically)', birthPlanText: 'We prefer intermittent fetal monitoring to allow freedom of movement.', icon: 'Activity' },
      { value: 'wireless', label: 'Wireless/waterproof if available', birthPlanText: 'If continuous monitoring is needed, we prefer wireless or waterproof monitors.', icon: 'Wifi' },
      { value: 'continuous', label: 'Continuous monitoring is fine', birthPlanText: 'We are comfortable with continuous fetal monitoring.', icon: 'Monitor' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss monitoring options with our care team.', isUnsure: true },
    ],
  },

  // =========================================================================
  // NEWBORN CARE
  // =========================================================================
  {
    id: 'bath_timing',
    category: 'Newborn Care',
    title: 'First Bath Timing',
    subtitle: 'When should baby get their first bath?',
    order: 11,
    learnMoreData: {
      tradeoff: 'The WHO now recommends delaying baby\'s first bath for at least 24 hours. The vernix (creamy white coating) on baby\'s skin has antibacterial properties, moisturizes, and helps regulate temperature.',
      pros: [
        'Preserves vernix, which moisturizes skin and has natural antibacterial properties',
        'Helps maintain body temperature and blood sugar stability',
        'Avoids interrupting critical skin-to-skin and early breastfeeding time',
        'Baby retains mother\'s scent, which supports bonding and feeding instincts',
      ],
      cons: [
        'Some parents prefer baby to be cleaned soon after birth',
        'Hospital staff may default to bathing earlier out of routine',
        'Blood or meconium may be present (a simple wipe-down addresses this)',
        'Extended delay may feel unfamiliar if this is not what you expected',
      ],
      bottomLine: 'The vernix is not something to wash off - it is baby\'s first skin protection. A gentle wipe-down is all that is needed in the early hours.',
      ebookChapter: 'Chapter 27: First Bath',
    },
    options: [
      { value: '24hrs', label: 'Delay at least 24 hours', birthPlanText: 'Please delay baby\'s first bath for at least 24 hours.', icon: 'Clock' },
      { value: '48hrs', label: 'Delay at least 48 hours', birthPlanText: 'Please delay baby\'s first bath for at least 48 hours.', icon: 'Timer' },
      { value: 'parents_give', label: 'We want to give the first bath', birthPlanText: 'We would like to give baby\'s first bath ourselves.', icon: 'Droplets' },
      { value: 'hospital_timing', label: 'Whenever the hospital recommends', birthPlanText: 'Baby\'s first bath may be given when recommended by nursing staff.', icon: 'Building2' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss bath timing options.', isUnsure: true },
    ],
  },
  {
    id: 'vitamin_k',
    category: 'Newborn Care',
    title: 'Vitamin K Shot',
    subtitle: 'Vitamin K helps with blood clotting - what\'s your preference?',
    order: 12,
    learnMoreData: {
      tradeoff: 'A single injection provides near-complete protection against VKDB (a rare but potentially fatal bleeding disorder). The oral alternative exists but requires multiple doses and is less effective.',
      pros: [
        'Near-complete protection against Vitamin K Deficiency Bleeding (VKDB)',
        'Single dose provides immediate, reliable coverage through the critical first months',
        'Well-studied intervention with decades of safety data',
        'No follow-up doses needed (unlike oral alternative)',
      ],
      cons: [
        'Involves an injection during baby\'s first hours of life',
        'VKDB is rare (4-7 per 100,000 breastfed babies without the shot)',
        'Oral alternative is available in some areas (3 doses over 6 weeks, about 80% effective)',
        'Some parents prefer to minimize early medical interventions',
      ],
      bottomLine: 'When VKDB occurs, about 50% involve brain bleeding, and half of those result in death or permanent damage. The injection is extremely safe and prevents a rare but catastrophic condition.',
      ebookChapter: 'Chapter 9: Vitamin K',
    },
    options: [
      { value: 'accept', label: 'Yes, give the Vitamin K shot', birthPlanText: 'Please give the Vitamin K injection as recommended.', icon: 'Shield' },
      { value: 'oral', label: 'Prefer oral Vitamin K', birthPlanText: 'We prefer oral Vitamin K administration over the injection.', icon: 'Pill' },
      { value: 'decline', label: 'We decline', birthPlanText: 'We decline the Vitamin K injection at this time.', icon: 'X' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss Vitamin K options with our care team.', isUnsure: true },
    ],
  },
  {
    id: 'eye_ointment',
    category: 'Newborn Care',
    title: 'Eye Ointment',
    subtitle: 'Eye ointment prevents infections - what would you like?',
    order: 13,
    learnMoreData: {
      tradeoff: 'Erythromycin eye ointment prevents gonorrhea and chlamydia transmission to baby\'s eyes during birth. If you have tested negative for both STIs, your baby\'s risk of these infections is essentially zero.',
      pros: [
        'Prevents serious eye infections that could lead to blindness if STIs are present',
        'Simple, quick application that is standard of care',
        'Required by law in many states as a public health measure',
        'The AAP is reconsidering mandatory status as of 2024',
      ],
      cons: [
        'Blurs baby\'s vision during the critical bonding hour after birth',
        'Most effective against infections parents have already been screened for',
        'If you tested negative for gonorrhea and chlamydia, there is no transmission risk',
        'Contains antibiotic that some prefer to avoid unless specifically needed',
      ],
      bottomLine: 'This is one of the few interventions where your STI testing status completely determines risk. If you tested negative, the ointment provides no benefit to your baby.',
      ebookChapter: 'Chapter 7: Eye Ointment',
    },
    options: [
      { value: 'accept', label: 'Yes, apply the ointment', birthPlanText: 'Please apply the erythromycin eye ointment as recommended.', icon: 'Eye' },
      { value: 'delay', label: 'Delay for bonding first', birthPlanText: 'Please delay the eye ointment to allow for initial bonding and breastfeeding.', icon: 'Clock' },
      { value: 'decline', label: 'We decline', birthPlanText: 'We decline the erythromycin eye ointment.', icon: 'X' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss eye ointment options with our care team.', isUnsure: true },
    ],
  },
  {
    id: 'hep_b_vaccine',
    category: 'Newborn Care',
    title: 'Hepatitis B Vaccine',
    subtitle: 'The Hep B vaccine is typically offered in the first 24 hours',
    order: 14,
    learnMoreData: {
      tradeoff: 'The birth-dose Hep B vaccine is primarily to catch babies of mothers who test falsely negative. If you are confirmed Hep B-negative, recent ACIP guidelines support individual decision-making about timing.',
      pros: [
        'Provides early protection in case of undetected maternal infection',
        'Convenient timing while still in the hospital with medical staff available',
        'Starts the three-dose vaccine series early',
        'Babies infected at birth have a 90% chance of chronic infection',
      ],
      cons: [
        'If you tested negative, your newborn has no exposure risk at birth',
        'Adds another intervention during the sensitive first 24 hours',
        'The 2025 ACIP guidelines now support individual decision-making for confirmed-negative mothers',
        'Vaccine can be given at the 2-month pediatrician visit instead',
      ],
      bottomLine: 'Transmission requires an infected source. If you are confirmed negative and your household is too, your newborn has no exposure risk. The vaccine still makes sense eventually - the question is timing.',
      ebookChapter: 'Chapter 10: Hepatitis B',
    },
    options: [
      { value: 'accept', label: 'Yes, give at birth', birthPlanText: 'Please administer the Hepatitis B vaccine at birth.', icon: 'Syringe' },
      { value: 'delay', label: 'Delay until pediatrician visit', birthPlanText: 'We prefer to delay the Hepatitis B vaccine until our pediatrician visit.', icon: 'Calendar' },
      { value: 'decline', label: 'We decline', birthPlanText: 'We decline the Hepatitis B vaccine at this time.', icon: 'X' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss Hepatitis B vaccine timing with our care team.', isUnsure: true },
    ],
  },
  {
    id: 'circumcision',
    category: 'Newborn Care',
    title: 'Circumcision',
    subtitle: 'If having a boy, what are your thoughts on circumcision?',
    order: 15,
    conditionalOn: {
      questionId: 'baby_sex',
      values: ['boy'],
    },
    learnMoreData: {
      tradeoff: 'Circumcision is not medically necessary. No medical organization in the world recommends routine circumcision. It is a cultural, religious, or personal decision, not a medical one.',
      pros: [
        'Slightly reduced risk of urinary tract infections in infancy (1 prevented per 100 procedures)',
        'May reduce risk of certain STIs later in life, though condoms are far more effective',
        'Cultural, religious, or family alignment',
        'Some families prefer matching father or siblings',
      ],
      cons: [
        'Surgical procedure with pain, even with anesthesia (cortisol spikes 3-4x)',
        'Removes functional tissue that provides protection and sensation',
        'Complication rate of 1.5-3% (bleeding, infection, rarely more serious)',
        'Removes the choice from the child to make this decision about his own body later',
      ],
      bottomLine: 'The US is the only developed country with high routine circumcision rates. Europe\'s rate is under 5%. This is a personal family decision, not a medical recommendation.',
      ebookChapter: 'Chapter 12: Circumcision',
    },
    options: [
      { value: 'yes_hospital', label: 'Yes, circumcise at the hospital', birthPlanText: 'We would like our son circumcised before leaving the hospital.', icon: 'Scissors' },
      { value: 'yes_provider', label: 'Yes, but by our own provider later', birthPlanText: 'We will arrange circumcision with our own provider after discharge.', icon: 'Calendar' },
      { value: 'no', label: 'No circumcision', birthPlanText: 'We do not want circumcision performed.', icon: 'ShieldCheck' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We need more time to decide about circumcision.', isUnsure: true },
    ],
  },
  {
    id: 'cord_blood',
    category: 'After Birth',
    title: 'Cord Blood Banking',
    subtitle: 'Would you like to bank or donate cord blood?',
    order: 16,
    learnMoreData: {
      tradeoff: 'Cord blood contains stem cells that could potentially treat future illnesses. Private banking is expensive with very low likelihood of use. Public donation helps others at no cost to you.',
      pros: [
        'Preserves stem cells that could potentially treat leukemia and certain genetic disorders',
        'Public donation can help others who need a stem cell match at no cost to you',
        'Private banking keeps cells available specifically for your family',
        'Collection is painless and happens after delivery',
      ],
      cons: [
        'Private banking costs $1,000-2,000 initially plus $100-200 per year ongoing',
        'Actual likelihood of using privately stored cord blood is very low (1 in 1,000 to 1 in 200,000)',
        'Collection may conflict with delayed cord clamping, reducing those benefits',
        'Most families who skip banking choose delayed clamping for the blood volume benefit instead',
      ],
      bottomLine: 'Most families choose delayed cord clamping over cord blood banking, allowing baby to receive the full blood volume. Public donation is a generous option if you want to collect without paying for storage.',
      ebookChapter: 'Chapter 23: Cord Blood',
    },
    options: [
      { value: 'private', label: 'Private banking (for our family)', birthPlanText: 'We will be privately banking cord blood.', icon: 'Lock' },
      { value: 'public', label: 'Donate to a public bank', birthPlanText: 'We would like to donate cord blood to a public bank if available.', icon: 'Heart' },
      { value: 'no', label: 'No cord blood banking', birthPlanText: 'We do not plan to bank or donate cord blood.', icon: 'X' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss cord blood banking options.', isUnsure: true },
    ],
  },

  // =========================================================================
  // HOSPITAL STAY
  // =========================================================================
  {
    id: 'rooming_in',
    category: 'Hospital Stay',
    title: 'Rooming In',
    subtitle: 'Would you like baby to stay in your room around the clock?',
    order: 17,
    learnMoreData: {
      tradeoff: 'Baby-Friendly hospitals promote 24/7 rooming-in for bonding and breastfeeding. But exhausted mothers recovering from birth also need rest, and some hospitals have eliminated nurseries entirely.',
      pros: [
        'Promotes bonding and helps you learn baby\'s cues more quickly',
        'Supports on-demand breastfeeding and milk supply establishment',
        'Research shows benefits for breastfeeding initiation success',
        'Keeps baby close for immediate response to needs',
      ],
      cons: [
        'Can be exhausting for mothers recovering from birth, especially after C-sections',
        'May contribute to postpartum overwhelm without adequate rest',
        'Limited help available at 3am when learning to breastfeed alone',
        'Some mothers need sleep to recover physically and support milk production',
      ],
      bottomLine: 'Bonding and rest are both important. If your hospital has a nursery, using it for a few hours so you can recover does not make you a bad parent.',
      ebookChapter: 'Chapter 33: Rooming In',
    },
    options: [
      { value: '24_7', label: 'Baby stays with us 24/7', birthPlanText: 'We want baby to room-in with us at all times.', icon: 'Home' },
      { value: 'nursery_option', label: 'Mostly with us, may use nursery for rest', birthPlanText: 'We prefer rooming-in but may use the nursery for rest periods.', icon: 'Moon' },
      { value: 'flexible', label: 'Flexible, we\'ll see how we feel', birthPlanText: 'We are flexible about rooming-in and will decide based on how we are feeling.', icon: 'ArrowLeftRight' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss rooming-in options.', isUnsure: true },
    ],
  },
  {
    id: 'pacifier',
    category: 'Hospital Stay',
    title: 'Pacifier Use',
    subtitle: 'How do you feel about pacifier use in the hospital?',
    order: 18,
    learnMoreData: {
      tradeoff: 'Pacifiers satisfy baby\'s natural sucking reflex and may reduce SIDS risk, but early use could interfere with breastfeeding establishment if baby is nursing.',
      pros: [
        'Associated with reduced SIDS risk when used during sleep',
        'Soothes baby and satisfies the natural non-nutritive sucking reflex',
        'Recent research suggests less interference with breastfeeding than previously thought',
        'Can help parents cope during the hospital stay, especially at night',
      ],
      cons: [
        'May reduce nursing frequency in early days when supply establishment is critical',
        'Can mask hunger cues, leading to missed feeding opportunities',
        'Potential for nipple confusion while baby is learning to breastfeed',
        'Creates a habit that must eventually be weaned',
      ],
      bottomLine: 'If you are breastfeeding, many lactation consultants suggest waiting 3-4 weeks until nursing is well established before introducing a pacifier. For formula-fed babies, there is less concern.',
      ebookChapter: 'Chapter 32: Pacifier Use',
    },
    options: [
      { value: 'no', label: 'No pacifiers please', birthPlanText: 'Please do not give baby a pacifier.', icon: 'Ban' },
      { value: 'if_needed', label: 'Only if medically helpful', birthPlanText: 'Pacifier use is acceptable only if medically recommended.', icon: 'Stethoscope' },
      { value: 'yes', label: 'Pacifiers are fine with us', birthPlanText: 'Pacifier use is acceptable.', icon: 'Check' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss pacifier use with our care team.', isUnsure: true },
    ],
  },
  {
    id: 'visitors',
    category: 'Hospital Stay',
    title: 'Visitor Preferences',
    subtitle: 'Who would you like to visit after baby arrives?',
    order: 19,
    learnMoreData: {
      tradeoff: 'Visitors bring love and excitement, but they can also be exhausting during recovery. Setting boundaries early is easier than trying to enforce them when you are tired and emotional.',
      pros: [
        'Family and friends bring emotional support and celebration',
        'Grandparents meeting baby is a meaningful moment for everyone',
        'Help with meals, errands, or watching baby while you nap',
        'Sharing the joy helps build your support network postpartum',
      ],
      cons: [
        'Visitors can be physically and emotionally exhausting during recovery',
        'Holding and passing baby around can overstimulate a newborn',
        'Difficult to breastfeed comfortably with an audience',
        'Saying no later is harder than setting expectations upfront',
      ],
      bottomLine: 'You will never get these first days back. Protect them fiercely. Real friends will understand, and family will adjust.',
    },
    options: [
      { value: 'welcome', label: 'Visitors are welcome anytime', birthPlanText: 'We welcome visitors during our hospital stay.', icon: 'DoorOpen' },
      { value: 'limited', label: 'Close family only, limited hours', birthPlanText: 'We prefer visits from close family only during limited hours.', icon: 'Users' },
      { value: 'after_home', label: 'No visitors until we\'re home', birthPlanText: 'We prefer no visitors at the hospital. We will welcome visitors once we are settled at home.', icon: 'Home' },
      { value: 'case_by_case', label: 'We\'ll decide case by case', birthPlanText: 'We will decide on visitors on a case-by-case basis during our stay.', icon: 'MessageCircle' },
      { value: 'unsure', label: 'I need to think about this', birthPlanText: 'We are still deciding on our visitor preferences.', isUnsure: true },
    ],
  },

  // =========================================================================
  // AFTER BIRTH (continued)
  // =========================================================================
  {
    id: 'placenta',
    category: 'After Birth',
    title: 'Placenta Plans',
    subtitle: 'What would you like done with the placenta?',
    order: 20,
    learnMoreData: {
      tradeoff: 'The placenta sustained your baby for 9 months. Most families let the hospital dispose of it, but some keep it for encapsulation, burial, or other purposes. Scientific evidence for health benefits of encapsulation is limited.',
      pros: [
        'Encapsulation: some women report increased energy and milk supply (evidence is anecdotal)',
        'Cultural or spiritual significance in many traditions worldwide',
        'Planting a tree over the placenta is a meaningful ritual for some families',
        'Hospital disposal is the simplest, most common choice',
      ],
      cons: [
        'Encapsulation costs $150-300 and lacks FDA regulation or strong scientific evidence',
        'Improper processing carries a small risk of contamination',
        'Keeping the placenta requires planning (cooler, encapsulation service)',
        'Healthcare providers express some concern about heavy metals in placenta tissue',
      ],
      bottomLine: 'There is no wrong choice here. Most families choose hospital disposal, and that is perfectly fine. If keeping the placenta has meaning for you, plan ahead.',
      ebookChapter: 'Chapter 28: Placenta Options',
    },
    options: [
      { value: 'dispose', label: 'Hospital disposal is fine', birthPlanText: 'The hospital may dispose of the placenta.', icon: 'Building2' },
      { value: 'encapsulate', label: 'Keep for encapsulation', birthPlanText: 'We will be keeping the placenta for encapsulation. Please place it in our provided container.', icon: 'Pill' },
      { value: 'keep', label: 'Keep for other purposes', birthPlanText: 'We would like to keep the placenta.', icon: 'Package' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss placenta options.', isUnsure: true },
    ],
  },

  // =========================================================================
  // PERSONAL
  // =========================================================================
  {
    id: 'baby_sex',
    category: 'Personal',
    title: 'Baby\'s Sex',
    subtitle: 'Do you know if you\'re having a boy or girl?',
    order: 21,
    options: [
      { value: 'boy', label: 'Boy', birthPlanText: '', icon: 'Baby' },
      { value: 'girl', label: 'Girl', birthPlanText: '', icon: 'Baby' },
      { value: 'unknown', label: 'We don\'t know yet', birthPlanText: '', icon: 'HelpCircle' },
      { value: 'prefer_not_to_say', label: 'Prefer not to say', birthPlanText: '', icon: 'Lock' },
    ],
  },
  {
    id: 'baby_name',
    category: 'Personal',
    title: 'Baby\'s Name',
    subtitle: 'Have you picked a name?',
    order: 22,
    inputType: 'text',
    options: [
      { value: 'has_name', label: 'Yes!', birthPlanText: '' },
      { value: 'not_yet', label: "We haven't decided yet", birthPlanText: '' },
      { value: 'prefer_not_to_say', label: "We'd rather not say", birthPlanText: '' },
    ],
  },

  // =========================================================================
  // C-SECTION PLANNING (deferred)
  // =========================================================================
  {
    id: 'csection_approach',
    category: 'C-Section Planning',
    title: 'C-Section Approach',
    subtitle: 'If a C-section happens, what approach would you prefer?',
    order: 23,
    deferredFor: 'csection',
    learnMoreData: {
      tradeoff: 'A "gentle" or family-centered C-section prioritizes bonding: slower delivery, clear drape, immediate skin-to-skin in the OR. Not all hospitals offer this, but many are increasingly open to it.',
      pros: [
        'Gentle C-section allows you to watch baby being born through a clear drape',
        'Immediate skin-to-skin in the OR promotes bonding even during surgery',
        'Slower delivery allows baby to transition more gradually',
        'Makes the C-section experience feel more personal and empowering',
      ],
      cons: [
        'Not all hospitals or surgeons are familiar with gentle C-section techniques',
        'Medical circumstances may override preferences if urgency is needed',
        'Some people prefer not to see the surgical procedure at all',
        'Requires advance discussion with your surgical team to set expectations',
      ],
      bottomLine: 'A C-section does not have to feel clinical and disconnected. Ask your provider about gentle or family-centered options - more hospitals are offering them every year.',
      ebookChapter: 'Chapter 15: Cesarean Birth',
    },
    options: [
      { value: 'gentle_family_centered', label: 'Gentle/family-centered C-section', birthPlanText: 'If a C-section is needed, we would like a gentle, family-centered approach: clear drape, immediate skin-to-skin in the OR, and delayed cord clamping when safely possible.', icon: 'Heart' },
      { value: 'standard_with_preferences', label: 'Standard, but with some preferences', birthPlanText: 'If a C-section is needed, we would like to discuss specific preferences with our surgical team, such as partner presence and music.', icon: 'Settings' },
      { value: 'follow_medical_team', label: 'Follow the medical team\'s lead', birthPlanText: 'If a C-section becomes necessary, we trust the medical team to follow standard protocols.', icon: 'Stethoscope' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss C-section approaches with our care team in advance.', isUnsure: true },
    ],
  },
  {
    id: 'csection_details',
    category: 'C-Section Planning',
    title: 'C-Section Details',
    subtitle: 'What details matter most during a C-section?',
    order: 24,
    deferredFor: 'csection',
    learnMoreData: {
      tradeoff: 'Even in a surgical birth, there are many personal touches that can make the experience meaningful. These range from visual (clear drape, photos) to sensory (music, narration) to bonding (skin-to-skin in the OR).',
      pros: [
        'A clear drape lets you see baby emerge without viewing the surgery itself',
        'Partner presence provides emotional support during the procedure',
        'Photos capture the moment even when you cannot move freely',
        'Music and narration create a calmer, more personal atmosphere',
      ],
      cons: [
        'Some requests may not be possible during emergency C-sections',
        'Hospital policies and individual surgeon preferences vary',
        'Clear drapes or photos may not appeal to everyone',
        'Multiple requests require advance communication with the team',
      ],
      bottomLine: 'Your birth experience matters even when it happens in an operating room. Speak up about the details that will make this moment meaningful for your family.',
      ebookChapter: 'Chapter 15: Cesarean Birth',
    },
    options: [
      { value: 'clear_drape_skin_to_skin', label: 'Clear drape and immediate skin-to-skin', birthPlanText: 'During a C-section, we would like a clear drape so we can see baby being born, and immediate skin-to-skin contact in the OR.', icon: 'Eye' },
      { value: 'partner_present_photos', label: 'Partner present with photos', birthPlanText: 'During a C-section, it is very important that my partner be present, and we would like to take photos.', icon: 'Camera' },
      { value: 'music_narration', label: 'Music and step-by-step narration', birthPlanText: 'During a C-section, we would like to play our own music and have the surgeon narrate what is happening.', icon: 'Music' },
      { value: 'standard_procedure', label: 'Standard procedure is fine', birthPlanText: 'During a C-section, standard procedures are acceptable.', icon: 'ClipboardCheck' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss C-section detail preferences with our surgical team.', isUnsure: true },
    ],
  },
]

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/**
 * Returns questions in the intended order, filtering by conditional logic
 * and separating deferred (C-section) questions to the end.
 */
export function getOrderedQuestions(answers: Record<string, string>): QuizQuestion[] {
  const allQuestions = quizQuestions.filter(q => {
    // Handle conditionalOn (only circumcision)
    if (q.conditionalOn) {
      const answer = answers[q.conditionalOn.questionId]
      if (!answer || !q.conditionalOn.values.includes(answer)) return false
    }
    return true
  })

  const mainQuestions = allQuestions.filter(q => !q.deferredFor)
  const deferredQuestions = allQuestions.filter(q => q.deferredFor === 'csection')
  return [...mainQuestions, ...deferredQuestions]
}

export function getQuestionsByCategory(): Record<string, QuizQuestion[]> {
  return quizQuestions.reduce((acc, question) => {
    if (!acc[question.category]) {
      acc[question.category] = []
    }
    acc[question.category].push(question)
    return acc
  }, {} as Record<string, QuizQuestion[]>)
}

export function getCategories(): string[] {
  const categories: string[] = []
  quizQuestions.forEach(q => {
    if (!categories.includes(q.category)) {
      categories.push(q.category)
    }
  })
  return categories
}
