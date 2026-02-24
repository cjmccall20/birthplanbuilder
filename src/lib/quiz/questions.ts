export interface QuizOption {
  value: string
  label: string
  birthPlanText: string
  isUnsure?: boolean
  icon?: string  // Lucide icon name for option
  omitFromPlan?: boolean  // When true, selecting this answer omits the preference from the birth plan
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
  inputType?: 'text' | 'checklist_with_names' | 'checklist' | 'date'  // 'text' = legacy, 'checklist_with_names' = support people, 'checklist' = multi-select, 'date' = native date picker
  textInputOnOption?: string   // Show text input when this option value is selected
  deferredFor?: 'csection'     // Deferred to end for vaginal planners
  conditionalOn?: {            // Show question only when referenced question has one of the listed values
    questionId: string
    values: string[]
  }
  birthTypeVariant?: {
    csection?: {
      subtitle?: string
      learnMoreOverrides?: Partial<LearnMoreData>
      optionOverrides?: Record<string, { birthPlanText?: string; label?: string }>
    }
    vaginal?: {
      subtitle?: string
      learnMoreOverrides?: Partial<LearnMoreData>
      optionOverrides?: Record<string, { birthPlanText?: string; label?: string }>
    }
  }
}

// ---------------------------------------------------------------------------
// Category orderings by birth type
// ---------------------------------------------------------------------------

const CATEGORY_ORDER_VAGINAL = [
  'Getting Started',
  'Your Birth',
  'After Birth',
  'Newborn Care',
  'Hospital Stay',
  'C-Section Planning',
  'Personal',
]

const CATEGORY_ORDER_CSECTION = [
  'Getting Started',
  'C-Section Planning',
  'After Birth',
  'Newborn Care',
  'Hospital Stay',
  'Personal',
]

// ---------------------------------------------------------------------------
// Questions
// ---------------------------------------------------------------------------

export const quizQuestions: QuizQuestion[] = [
  // =========================================================================
  // GETTING STARTED
  // =========================================================================
  {
    id: 'birth_philosophy',
    category: 'Getting Started',
    title: 'Your Birth Philosophy',
    subtitle: 'Choose a statement that best represents your approach to this birth',
    order: 0.1,
    options: [
      { value: 'informed_flexible', label: 'Informed but flexible', birthPlanText: 'Thank you for being part of our birth team. We have educated ourselves and have preferences, but we understand birth is unpredictable. We ask that you explain any changes to our plan and include us in decision-making.', icon: 'BookOpen' },
      { value: 'natural_focused', label: 'Natural birth focused', birthPlanText: 'Thank you for supporting our birth experience. We are planning for a natural birth with minimal interventions. Please support us in this goal, and discuss any interventions with us before proceeding.', icon: 'Leaf' },
      { value: 'trust_team', label: 'Trust the team', birthPlanText: 'Thank you for taking care of us. We trust our medical team and are open to your guidance. These preferences reflect our hopes, but we defer to your expertise when needed.', icon: 'HeartHandshake' },
      { value: 'custom', label: 'Write my own philosophy', birthPlanText: '', icon: 'MessageSquare' },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'planned_birth_type',
    category: 'Getting Started',
    title: 'Type of Birth',
    subtitle: 'Are you planning a vaginal birth or a C-section?',
    order: 0.5,
    options: [
      { value: 'vaginal', label: 'Vaginal birth', birthPlanText: '', icon: 'Baby' },
      { value: 'csection', label: 'Planned C-section', birthPlanText: '', icon: 'Scissors' },
      { value: 'vbac', label: 'VBAC (vaginal birth after cesarean)', birthPlanText: '', icon: 'Baby' },
      { value: 'unsure', label: "I'm not sure yet", birthPlanText: '', isUnsure: true, icon: 'HelpCircle' },
    ],
  },
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
        'Hospital epidural rate is around 73%, which often leads to additional interventions',
        'Unplanned C-Section rates in hospitals are significantly higher for low risk-mothers when compared to alternatives due to the "Cascade of Interventions"',
        'Birth centers require transfer to a hospital if complications arise',
        'Home births have a transfer rate of about 16% for first-time mothers',
        'Some settings may limit your pain management options',
      ],
      bottomLine: 'The setting you choose affects the care you receive. Hospitals are designed for protocols, efficiency, emergencies, and minimizing liability - which means that the hospital may push for unnecessary interventions that can cascade into further interventions.',
      ebookChapter: 'Chapter 8: Birth Setting',
    },
    options: [
      { value: 'hospital', label: 'Hospital', birthPlanText: 'We are planning to give birth at a hospital.', icon: 'Building2' },
      { value: 'birth_center', label: 'Birth center', birthPlanText: 'We are planning to give birth at a birth center.', icon: 'Home' },
      { value: 'home', label: 'Home birth', birthPlanText: 'We are planning a home birth with a qualified midwife.', icon: 'House' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'MapPin' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We are still deciding on our birth setting.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'medical_provider',
    category: 'Getting Started',
    title: 'Your Medical Provider',
    subtitle: 'Who is providing your prenatal care?',
    order: 1.5,
    inputType: 'checklist_with_names',
    learnMoreData: {
      tradeoff: 'Your provider shapes your birth experience more than almost any other factor. OBs are trained surgeons who specialize in high-risk pregnancies; midwives specialize in supporting physiological birth with lower intervention rates.',
      pros: [
        'OBs are trained to handle surgical births and high-risk complications',
        'Certified Nurse-Midwives (CNMs) have hospital privileges and lower C-section rates',
        'Midwifery model of care emphasizes education, informed consent, and shared decision-making',
        'Many families choose a CNM for prenatal care, and many CNMs work in a practice under an OB in case of higher risk pregnancies',
      ],
      cons: [
        'OBs may default to intervention-heavy protocols for normal births',
        'Not all midwives have the same level of training or hospital privileges',
        'Insurance coverage varies significantly by provider type',
        'Switching providers mid-pregnancy is possible and something to strongly consider if you feel like you are not on the same page or they are dismissive of your desires',
      ],
      bottomLine: 'The provider you choose will influence your birth more than your birth plan. Choose someone whose philosophy aligns with your goals, and interview them before committing.',
    },
    options: [
      { value: 'ob', label: 'OB/GYN', birthPlanText: 'Our provider is an OB/GYN.', icon: 'Stethoscope' },
      { value: 'cnm', label: 'Certified Nurse-Midwife (CNM)', birthPlanText: 'Our provider is a Certified Nurse-Midwife.', icon: 'Heart' },
      { value: 'midwife', label: 'Midwife (non-CNM)', birthPlanText: 'Our provider is a midwife.', icon: 'Leaf' },
      { value: 'unsure', label: 'I\'m still deciding', birthPlanText: 'We are still deciding on our medical provider.', isUnsure: true, icon: 'HelpCircle' },
    ],
  },
  {
    id: 'support_people',
    category: 'Getting Started',
    title: 'Your Birth Team',
    subtitle: 'Who do you want by your side?',
    order: 2,
    inputType: 'checklist_with_names',
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
      ebookChapter: 'Chapter 4: Birth Team',
    },
    options: [
      { value: 'partner', label: 'Partner', birthPlanText: 'I would like my partner present during labor and delivery.', icon: 'Heart' },
      { value: 'doula', label: 'Doula', birthPlanText: 'I would like our doula present during labor and delivery.', icon: 'UserCheck' },
      { value: 'family', label: 'Family member(s)', birthPlanText: 'I would like select family members present during labor and delivery.', icon: 'Users' },
      { value: 'unsure', label: 'I still need to think about this', birthPlanText: 'I am still deciding on our birth team.', isUnsure: true },
    ],
  },

  // =========================================================================
  // YOUR BIRTH
  // =========================================================================
  {
    id: 'pain_approach',
    category: 'Your Birth',
    title: 'Pain Management',
    subtitle: 'How do you feel about pain management during labor? (Check all that apply)',
    order: 3,
    inputType: 'checklist',
    learnMoreData: {
      tradeoff: 'Pain management is a spectrum from fully unmedicated to epidural. Each option has real trade-offs for mobility, labor progress, and your experience. Deciding before labor helps you prepare.',
      pros: [
        'Epidurals provide significant pain relief and allow rest during long labors',
        'Unmedicated birth preserves full mobility and natural hormone release',
        'Nitrous oxide offers a middle ground: some relief without numbness or immobility',
        'Having a plan reduces anxiety and helps your team support you effectively',
      ],
      cons: [
        'Epidurals limit mobility and may increase the chance of additional interventions such as necessity of using pitocin',
        'Unmedicated birth can require more preparation and continuous support to be successful',
        'IV opioids cross the placenta and can make baby sleepy at birth',
        'Non-intrusive techniques such as laboring in warm water or a shower, having your partner or support person press on your hips, and others can be very effective for pain management.',
      ],
      bottomLine: 'Most women who achieve unmedicated birth do so through preparation and an understanding of the birth process, not pain tolerance. Physical and mental preparation matter just as much as willpower.',
      ebookChapter: 'Chapter 18: Pain Management',
    },
    options: [
      { value: 'natural', label: 'Planning unmedicated birth', birthPlanText: 'We are planning an unmedicated birth. Please do not offer pain medication unless I ask for it.', icon: 'Leaf' },
      { value: 'open', label: 'Open to options, will decide in the moment', birthPlanText: 'We are open to pain management options and will decide during labor.', icon: 'Scale' },
      { value: 'epidural', label: 'Planning to get an epidural', birthPlanText: 'We plan to request an epidural during labor.', icon: 'Syringe' },
      { value: 'nitrous', label: 'Planning to use nitrous oxide', birthPlanText: 'We plan to utilize nitrous oxide to help with pain management.', icon: 'Wind' },
      { value: 'iv_meds', label: 'IV pain medication (fentanyl, etc.)', birthPlanText: 'We are open to IV pain medication if needed during labor.', icon: 'Droplets' },
      { value: 'water', label: 'Warm water (shower/tub)', birthPlanText: 'We plan to use warm water immersion (shower or tub) for pain relief.', icon: 'Bath' },
      { value: 'breathing', label: 'Breathing and relaxation techniques', birthPlanText: 'We plan to use breathing and relaxation techniques for pain management.', icon: 'Wind' },
      { value: 'massage', label: 'Massage and counterpressure', birthPlanText: 'We plan to use massage and counterpressure techniques during labor.', icon: 'HandMetal' },
      { value: 'hypnobirthing', label: 'HypnoBirthing / self-hypnosis', birthPlanText: 'We have trained in HypnoBirthing techniques and plan to use them during labor.', icon: 'Brain' },
      { value: 'bradley', label: 'Bradley Method', birthPlanText: 'We have trained in the Bradley Method and plan to use it during labor.', icon: 'HeartHandshake' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Sparkles' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss pain management options with our care team.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },

  // =========================================================================
  // AFTER BIRTH (universally compelling)
  // =========================================================================
  {
    id: 'golden_hour',
    category: 'After Birth',
    title: 'The Golden Hour',
    subtitle: 'The first hour after birth is magical - how would you like to spend it? (Check all that apply)',
    order: 5,
    inputType: 'checklist',
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
      ebookChapter: 'Chapter 28: Skin-to-Skin',
    },
    options: [
      { value: 'protected', label: 'Protect it fully - no interruptions', birthPlanText: 'We want the first hour after birth to be uninterrupted skin-to-skin time. Please delay all non-urgent procedures.', icon: 'Shield' },
      { value: 'partner_backup', label: 'Partner does skin-to-skin if I can\'t', birthPlanText: 'If I am unable to do skin-to-skin immediately (such as during a C-section), please place baby skin-to-skin with my partner.', icon: 'Users' },
      { value: 'flexible', label: 'Flexible - follow the staff\'s lead', birthPlanText: 'We are flexible with the timing of procedures in the first hour.', icon: 'Workflow', omitFromPlan: true },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Shield' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss golden hour options with our care team.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'feeding',
    category: 'After Birth',
    title: 'Feeding Your Baby',
    subtitle: 'What are your feeding preferences? (Check all that apply)',
    order: 6,
    inputType: 'checklist',
    learnMoreData: {
      tradeoff: 'Breastfeeding provides unique immune benefits and dynamic nutrition, but success depends heavily on support, not just determination. Formula is food, not failure; however, introducing formula may make it more difficult to establish breastfeeding. Any breast milk counts.',
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
      ebookChapter: 'Chapter 40: Feeding',
    },
    options: [
      { value: 'breastfeed', label: 'Breastfeed', birthPlanText: 'We plan to breastfeed our baby.', icon: 'Baby' },
      { value: 'formula', label: 'Formula feed', birthPlanText: 'We plan to use formula.', icon: 'Package' },
      { value: 'donor_milk', label: 'Prefer donor milk if supplementation needed', birthPlanText: 'If supplementation is needed, we prefer donor milk over formula.', icon: 'Heart' },
      { value: 'no_formula_without_consent', label: 'No formula without our consent', birthPlanText: 'Please do not give formula without our explicit consent.', icon: 'Shield' },
      { value: 'lactation_consultant', label: 'Request lactation consultant visit', birthPlanText: 'We would like a lactation consultant visit during our hospital stay.', icon: 'Users' },
      { value: 'flexible', label: 'We\'re flexible', birthPlanText: 'We are flexible about feeding and open to whatever works best.', icon: 'ArrowLeftRight' },
    ],
  },

  // =========================================================================
  // GETTING STARTED (continued)
  // =========================================================================
  {
    id: 'birth_photography',
    category: 'Your Birth',
    title: 'Photos and Video',
    subtitle: 'Would you like photos or video of the birth?',
    order: 10.6,
    learnMoreData: {
      tradeoff: 'Birth photography captures one of life\'s most transformative moments. Some families treasure these images forever, while others prefer to be fully present without a camera.',
      pros: [
        'Captures a once-in-a-lifetime moment you may not fully remember',
        'Professional birth photographers know how to stay unobtrusive',
        'Photos can help process the birth experience afterward',
        'First moments with baby are priceless to look back on',
        'Many doulas offer birth photography as part of their services or as an add-on',
      ],
      cons: [
        'Camera awareness can make some people feel self-conscious during labor',
        'Hospital policies may restrict photography during certain procedures',
        'A designated photographer (partner or professional) may affect their support role',
        'Some moments feel more sacred without documentation',
      ],
      bottomLine: 'There is no wrong answer here. Some families treasure birth photos for decades; others prefer the memory to live only in their hearts. Whatever you decide, don\'t let it be a distraction from being present.',
    },
    options: [
      { value: 'photos_video', label: 'Yes, photos and video', birthPlanText: 'We would like to take photos and video during labor and delivery.', icon: 'Camera' },
      { value: 'photos_only', label: 'Photos only, no video', birthPlanText: 'We would like to take photos but not video during the birth.', icon: 'Image' },
      { value: 'after_only', label: 'Only after baby arrives', birthPlanText: 'We prefer photos only after baby is born, not during labor.', icon: 'ImagePlus' },
      { value: 'no', label: 'No photos or video', birthPlanText: 'We prefer no photos or video during the birth.', icon: 'EyeOff' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Camera' },
      { value: 'unsure', label: 'I need to think about this', birthPlanText: 'We are still deciding on photography preferences.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'episiotomy',
    category: 'Your Birth',
    title: 'Episiotomy Preferences',
    subtitle: 'What are your preferences regarding episiotomy?',
    order: 10.65,
    learnMoreData: {
      tradeoff: 'ACOG no longer recommends routine episiotomy. Research shows that natural tears generally heal better and cause less long-term damage than surgical cuts. However, in rare emergencies, an episiotomy can expedite delivery.',
      pros: [
        'Can speed delivery in genuine emergencies (shoulder dystocia, fetal distress)',
        'A controlled cut may be easier to repair than a severe natural tear in some cases',
      ],
      cons: [
        'Natural tears heal better and cause less damage than surgical cuts on average',
        'Routine episiotomy increases risk of severe third and fourth degree tears',
        'Perineal massage and warm compresses during pushing reduce tear severity',
        'Slow, controlled crowning with provider guidance reduces the need for any cut',
      ],
      bottomLine: 'Evidence strongly favors avoiding routine episiotomy. Ask your provider about their episiotomy rate - some providers almost never perform them, while others do routinely.',
    },
    options: [
      { value: 'avoid', label: 'Prefer to avoid unless emergency', birthPlanText: 'We prefer to avoid episiotomy. Please use perineal massage and warm compresses instead.', icon: 'Shield' },
      { value: 'only_consent', label: 'Only with our explicit consent', birthPlanText: 'Please do not perform an episiotomy without discussing it with us first.', icon: 'MessageSquare' },
      { value: 'provider_judgment', label: 'Trust our provider\'s judgment', birthPlanText: 'We are open to episiotomy if our provider determines it is necessary.', icon: 'Stethoscope' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Settings' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss episiotomy with our care team.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },

  // =========================================================================
  // GETTING STARTED (continued - new)
  // =========================================================================
  {
    id: 'when_to_hospital',
    category: 'Getting Started',
    title: 'When to Go to the Hospital',
    subtitle: 'When do you want to head to your birth location?',
    order: 7,
    learnMoreData: {
      tradeoff: 'Arriving too early often leads to interventions to "speed things up." Arriving in active labor lets your body establish its rhythm, but requires comfort with laboring at home.',
      pros: [
        'Waiting for active labor (3-1-1 rule) reduces your time on the hospital clock',
        'Laboring at home is associated with fewer interventions and shorter hospital stays',
        'Early admission often leads to Pitocin augmentation if labor "stalls"',
        'Your provider can guide timing based on your specific situation',
      ],
      cons: [
        'In addition to contraction timing and intensity, other giveaways such as the "emotional sign posts" can guide you on when to go to the hospital',
        'First-time mothers may feel anxious laboring at home without monitoring',
        'Some complications (water breaking without contractions, bleeding) require earlier arrival',
        'Distance from the hospital matters - longer drives warrant earlier departure',
        'If you want an epidural, you need to arrive with enough time for placement',
        'You may be sent home from the hospital if you arrive too early during labor unless you have other risk factors.',
      ],
      bottomLine: 'For most low-risk pregnancies, waiting until contractions are regular and strong (3 minutes apart, lasting 1 minute, for 1 hour) gives your body time to establish labor before hospital interventions enter the picture. Earlier arrival to the hospital is tied to higher rates of unplanned C-Sections. However, if you feel like something is wrong (baby not moving as much as usual, something else just "not right") - trust your gut and go to the hospital. Your intuition is real, and it\'s best to go early and find everything to be okay than wait while something bad is happening.',
    },
    options: [
      { value: 'active_labor_4_5', label: 'Active labor (contractions 4-5 min apart)', birthPlanText: 'We plan to arrive when contractions are 4-5 minutes apart, lasting about 1 minute each.', icon: 'Clock' },
      { value: 'active_labor_3_1_1', label: 'Active labor (contractions 3 min apart, emotional signposts)', birthPlanText: 'We plan to arrive when contractions are 3 minutes apart, lasting 1 minute, for at least 1 hour, and I am exhibiting the emotional signposts of active labor.', icon: 'Timer' },
      { value: 'early', label: 'Arrive early for monitoring', birthPlanText: 'We prefer to arrive early for monitoring, support, and/or for a medical reason (such as GBS antibiotics).', icon: 'Building2' },
      { value: 'provider_guidance', label: 'Follow our provider\'s guidance', birthPlanText: 'We will call our provider and arrive when they recommend.', icon: 'Stethoscope' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Clock' },
      { value: 'unsure', label: 'I need to think about this', birthPlanText: 'We are still deciding on when to head to the hospital.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'labor_start',
    category: 'Getting Started',
    title: 'How Would You Like Labor to Start?',
    subtitle: 'What are your preferences for how labor begins? (Check all that apply)',
    order: 7.5,
    inputType: 'checklist',
    learnMoreData: {
      tradeoff: 'When your body starts labor naturally, it produces oxytocin that crosses the blood-brain barrier, triggering endorphins (natural painkillers). Pitocin (synthetic oxytocin) cannot cross the blood-brain barrier, creating an "endorphin gap" where you get contractions without the natural pain relief.',
      pros: [
        'Waiting for spontaneous labor allows your body to produce both oxytocin and endorphins together',
        'Natural methods like nipple stimulation have a 37% success rate within 72 hours for favorable cervix',
        'Medical induction provides control over timing when medically indicated',
        'Membrane sweeps are less invasive than Pitocin and can be done in the office',
      ],
      cons: [
        'Pitocin contractions are often stronger and closer together without the endorphin support',
        'Induction with Pitocin requires continuous IV and fetal monitoring, restricting mobility',
        'Amniotomy (breaking water) is irreversible and starts a clock on delivery',
        'Natural methods are not guaranteed to work and may delay necessary medical intervention',
      ],
      bottomLine: 'Your body knows how to start labor. If there is no medical urgency, allowing labor to begin naturally gives you the best chance of having your own endorphins on board to manage the experience.',
      ebookChapter: 'Chapter 17: Labor Induction',
    },
    options: [
      { value: 'wait_natural', label: 'Wait for labor to start on its own', birthPlanText: 'We prefer to wait for labor to begin naturally.', icon: 'Clock' },
      { value: 'nipple_stimulation', label: 'Try nipple stimulation', birthPlanText: 'We are open to nipple stimulation as a natural method to encourage labor.', icon: 'Heart' },
      { value: 'membrane_sweep', label: 'Membrane sweep', birthPlanText: 'We are open to a membrane sweep if recommended by our provider.', icon: 'Activity' },
      { value: 'natural_methods', label: 'Natural methods (dates, evening primrose, walking)', birthPlanText: 'We plan to try natural methods to encourage labor.', icon: 'Leaf' },
      { value: 'amniotomy', label: 'Have water broken (amniotomy)', birthPlanText: 'We are open to amniotomy to help start or progress labor.', icon: 'Droplet' },
      { value: 'pitocin_induction', label: 'Pitocin induction if medically needed', birthPlanText: 'We are open to Pitocin induction if medically indicated.', icon: 'Syringe' },
      { value: 'provider_guidance', label: 'Follow our provider\'s recommendation', birthPlanText: '', omitFromPlan: true, icon: 'Stethoscope' },
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
        'Your body can naturally guide you to shift positions that best help labor progress - trust your instincts',
        'Upright positions and movement help baby descend and align optimally',
        'Walking, swaying, and position changes can reduce pain naturally',
        'Water immersion (shower or tub) provides significant pain relief',
        'Gravity works in your favor when upright or side-lying',
      ],
      cons: [
        'An epidural will significantly limit or eliminate your ability to walk',
        'Continuous fetal monitoring tethers you to the bed or nearby',
        'IV fluids require moving with an IV pole',
        'Some hospital policies restrict movement as a default, so if this is important to you make sure to ask your provider about this at a prenatal appointment',
      ],
      bottomLine: 'Movement is one of the most powerful pain management tools available. If staying mobile matters to you, factor that into your other decisions too.',
      ebookChapter: 'Chapter 25: Pushing Positions',
    },
    options: [
      { value: 'very_important', label: 'Very important - I want full freedom', birthPlanText: 'Freedom to move, walk, and change positions during labor is very important to us.', icon: 'Move' },
      { value: 'somewhat', label: 'I\'d like to, but I\'m flexible', birthPlanText: 'We would prefer freedom to move during labor but are flexible based on circumstances.', icon: 'ArrowLeftRight' },
      { value: 'not_priority', label: 'Not a priority for me', birthPlanText: 'Mobility during labor is not a priority for us.', icon: 'Bed' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Move' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss mobility options during labor.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
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
      ebookChapter: 'Chapter 19: Fetal Monitoring',
    },
    options: [
      { value: 'intermittent', label: 'Intermittent (checked periodically)', birthPlanText: 'We prefer intermittent fetal monitoring to allow freedom of movement.', icon: 'Activity' },
      { value: 'wireless', label: 'Wireless/waterproof if available', birthPlanText: 'If continuous monitoring is needed, we prefer wireless or waterproof monitors so movement is not impeded.', icon: 'Wifi' },
      { value: 'continuous', label: 'Continuous monitoring is fine', birthPlanText: 'We are comfortable with continuous fetal monitoring, even if it restricts movement.', icon: 'Monitor' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Activity' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss monitoring options with our care team.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },

  {
    id: 'iv_preference',
    category: 'Your Birth',
    title: 'IV Access',
    subtitle: 'How do you feel about having an IV during labor?',
    order: 10.1,
    learnMoreData: {
      tradeoff: 'A continuous IV delivers fluids directly but tethers you to a pole. A hep lock (saline lock - basically a needle in your wrist for easy IV access in case it\'s needed) keeps a line ready without constant fluids, preserving your mobility.',
      pros: [
        'A hep lock keeps IV access ready for emergencies without continuous fluids',
        'No IV means full freedom of movement and comfort',
        'Continuous fluids can help if you are dehydrated or receiving Pitocin',
        'A hep lock is a reasonable compromise between access and mobility',
      ],
      cons: [
        'Continuous IV limits mobility and can cause fluid overload',
        'Even a hep lock requires a needle insertion and tape on your hand',
        'Declining all IV access means a delay if emergency medication is needed',
        'Some hospitals require IV access as policy, especially with epidurals',
      ],
      bottomLine: 'A hep lock can give you emergency access without being tethered. Most hospitals will accommodate this request. However, you have the right to refuse this intervention.',
    },
    options: [
      { value: 'heplock', label: 'Hep lock only (IV ready, no fluids)', birthPlanText: 'We prefer a hep lock instead of continuous IV fluids.', icon: 'Plug' },
      { value: 'iv', label: 'Continuous IV is fine', birthPlanText: 'Continuous IV fluids are acceptable.', icon: 'Droplets' },
      { value: 'neither', label: 'No IV access initially or until an IV is needed', birthPlanText: 'We prefer no IV access initially, or until an IV is needed.', icon: 'X' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Plug' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss IV options with our care team.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'labor_augmentation',
    category: 'Your Birth',
    title: 'If Labor Slows Down',
    subtitle: 'If labor seems to slow and baby is doing okay, what would you prefer?',
    order: 10.15,
    learnMoreData: {
      tradeoff: 'The most important thing to understand about Pitocin is the "endorphin gap." Your body\'s natural oxytocin crosses the blood-brain barrier, triggering endorphins that help you cope with contractions. Pitocin cannot cross the blood-brain barrier, so you get the contractions without your body\'s natural painkillers.',
      pros: [
        'Pitocin can restart stalled labor and prevent a C-section',
        'Well-studied with decades of data on safety and effectiveness',
        '75% of induced first-time mothers achieve vaginal delivery',
        'Research shows stopping Pitocin once active labor is established reduces C-section risk by 20%',
      ],
      cons: [
        'Pitocin contractions come without endorphins, significantly increasing demand for epidurals',
        'Requires continuous IV and fetal monitoring, restricting your mobility',
        'Pitocin rates above 6 mIU/min exceed natural oxytocin levels, doubling at 10-16 mIU/min',
        'Can cause hyperstimulation (tachysystole), which doubles fetal distress risk',
        'Slow labor is not the same as stalled labor - there may be time to try alternatives',
      ],
      bottomLine: 'Slow labor is not the same as stalled labor. If baby is doing well, there is often time to try natural alternatives like walking, position changes, and rest before reaching for Pitocin.',
      ebookChapter: 'Chapter 27: Pitocin',
    },
    options: [
      { value: 'wait_it_out', label: 'Wait it out - try walking, positions, rest', birthPlanText: 'If labor slows, we prefer to try natural methods first (walking, position changes, rest, hydration) before considering Pitocin.', icon: 'Move' },
      { value: 'low_dose_pitocin', label: 'Open to Pitocin at the lowest effective dose', birthPlanText: 'If augmentation is needed, we prefer Pitocin at the lowest effective dose with slow increases.', icon: 'Syringe' },
      { value: 'pitocin_stop_active', label: 'Pitocin if needed, but turn off at active labor', birthPlanText: 'If Pitocin is used for augmentation, we would like it reduced or stopped once active labor is established.', icon: 'Timer' },
      { value: 'provider_recommends', label: 'Whatever our provider recommends', birthPlanText: 'We trust our provider\'s judgment on augmentation if labor stalls.', icon: 'Stethoscope' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'MessageSquare' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss augmentation options with our care team.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'eating_drinking',
    category: 'Your Birth',
    title: 'Eating and Drinking',
    subtitle: 'Would you like to eat and drink during labor?',
    order: 10.2,
    learnMoreData: {
      tradeoff: 'Labor is a marathon - your body needs fuel. Many hospitals still restrict food "in case of surgery," but current evidence supports eating and drinking during labor, particular for lower-risk mothers.',
      pros: [
        'ACOG now supports clear liquids during labor for low-risk patients',
        'Eating light foods provides energy for what can be a 12-24+ hour process. It\'s like running a marathon',
        'Dehydration and hunger can slow labor and increase exhaustion - often leading to unplanned medical interventions',
        'The aspiration risk that drove fasting policies is extremely rare with modern anesthesia techniques',
      ],
      cons: [
        'Nausea is common during labor, especially during transition.',
        'Even if you planned on eating you may not feel up to it during active labor.',
        'Some hospitals still enforce NPO (nothing by mouth) policies',
        'If general anesthesia becomes necessary, a full stomach poses a very small aspiration risk',
        'Heavy meals are not recommended - light snacks and clear liquids are ideal',
      ],
      bottomLine: 'The fasting policy dates from the 1940s when anesthesia was less safe. Modern evidence supports light eating and drinking to fuel your body during labor. Your body knows what it needs.',
    },
    options: [
      { value: 'yes', label: 'Eat and drink freely', birthPlanText: 'I plan to eat and drink as desired during labor.', icon: 'Coffee' },
      { value: 'clear_liquids', label: 'Clear liquids only is fine', birthPlanText: 'I plan to drink clear liquids as desired.', icon: 'Droplets' },
      { value: 'follow_policy', label: 'Follow hospital policy', birthPlanText: 'We will follow hospital policy regarding eating and drinking.', icon: 'Building2' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'UtensilsCrossed' },
      { value: 'unsure', label: 'I need to think about this', birthPlanText: 'We would like to discuss food and drink options during labor.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'cervical_checks',
    category: 'Your Birth',
    title: 'Cervical Checks During Labor',
    subtitle: 'What are your preferences for cervical checks during labor? (Check all that apply)',
    order: 10.25,
    inputType: 'checklist',
    learnMoreData: {
      tradeoff: 'Cervical checks assess dilation progress but carry infection risk, especially after water breaks. They also have limited predictive value - you can be 3cm for days or go from 4cm to complete in an hour.',
      pros: [
        'Provides data on labor progress that can inform care decisions',
        'Can reassure or motivate you during a long labor',
        'Helps providers assess whether interventions may be needed',
      ],
      cons: [
        'Each exam increases infection risk, especially after membranes rupture',
        'Dilation numbers are poor predictors of how much longer labor will take',
        'Can be emotionally discouraging if progress seems slow',
        'Some women find cervical exams painful or distressing',
      ],
      bottomLine: 'Cervical checks are a tool, not a requirement. You can decline or limit them, especially after your water breaks when infection risk increases.',
    },
    options: [
      { value: 'minimize', label: 'Minimize cervical checks', birthPlanText: 'Please minimize cervical exams - only when clinically necessary.', icon: 'Shield' },
      { value: 'only_requested', label: 'Only when I request', birthPlanText: 'Please only perform cervical checks when I ask for one.', icon: 'Hand' },
      { value: 'no_after_water', label: 'Decline after water breaks', birthPlanText: 'Please do not perform vaginal exams after my water has broken to reduce infection risk.', icon: 'AlertCircle' },
      { value: 'routine_fine', label: 'Routine checks are fine', birthPlanText: 'Routine cervical checks during labor are fine with us.', icon: 'Check' },
      { value: 'consent_each', label: 'Ask permission before each check', birthPlanText: 'Please ask my permission before each cervical exam.', icon: 'MessageSquare' },
    ],
  },
  {
    id: 'labor_environment',
    category: 'Your Birth',
    title: 'Labor Environment',
    subtitle: 'What kind of atmosphere do you want during labor? (Check all that apply)',
    order: 10.3,
    inputType: 'checklist',
    learnMoreData: {
      tradeoff: 'Your environment directly affects your hormones. Oxytocin (which drives contractions) flows best when you feel safe, private, and undisturbed. Bright lights and loud voices can trigger adrenaline, which slows labor.',
      pros: [
        'Dim lighting promotes melatonin and oxytocin, which help labor progress',
        'Familiar music can reduce anxiety and provide a rhythmic focus during contractions',
        'Aromatherapy (lavender, peppermint) has evidence for reducing labor anxiety',
        'Creating your own space makes a hospital room feel less clinical',
      ],
      cons: [
        'Hospital staff may need lights for procedures or assessments',
        'Strong scents can trigger nausea during labor',
        'Music preferences may change as labor intensifies',
        'Some hospitals have restrictions on candles or diffusers (battery-operated alternatives work)',
      ],
      bottomLine: 'Think of labor like sleep - it works best in the dark, quiet, and private. The more "mammalian" your environment, the better your hormones work.',
    },
    options: [
      { value: 'dim_quiet', label: 'Dim lighting and quiet', birthPlanText: 'We prefer dim lighting, a quiet environment, and minimal interruptions / check-ins from hospital staff.', icon: 'Moon' },
      { value: 'music', label: 'We\'ll bring our own music', birthPlanText: 'We will bring our own music to play during labor.', icon: 'Music' },
      { value: 'aromatherapy', label: 'Aromatherapy and calming touches', birthPlanText: 'We would like to use aromatherapy during labor.', icon: 'Flower2' },
      { value: 'standard', label: 'No special preferences', birthPlanText: 'Standard hospital environment is fine.', icon: 'Building2', omitFromPlan: true },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Moon' },
      { value: 'unsure', label: 'I need to think about this', birthPlanText: 'We are still deciding on our labor environment preferences.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'medical_students',
    category: 'Your Birth',
    title: 'Medical Students & Observers',
    subtitle: 'How do you feel about students or residents observing your birth?',
    order: 10.35,
    learnMoreData: {
      tradeoff: 'Teaching hospitals may have medical students or residents who observe or participate in your care. You always have the right to decline.',
      pros: [
        'Students are supervised by experienced providers',
        'Teaching hospitals often have the most up-to-date protocols and resources',
        'You are helping train the next generation of birth professionals',
        'Additional eyes can sometimes catch things others miss',
      ],
      cons: [
        'Extra people in the room can feel intrusive during a vulnerable time',
        'Students may need to perform additional examinations for learning purposes',
        'It can be harder to maintain a calm, private environment',
        'You may feel pressured to agree even though you can always say no',
      ],
      bottomLine: 'You have the absolute right to decline students or observers at any point. If you are at a teaching hospital, state your preference clearly in advance.',
    },
    options: [
      { value: 'welcome', label: 'Students are welcome to observe', birthPlanText: 'We are comfortable with medical students or residents observing.', icon: 'GraduationCap' },
      { value: 'prefer_not', label: 'We prefer no students or observers', birthPlanText: 'We prefer that no medical students or residents observe or participate in our care.', icon: 'ShieldOff' },
      { value: 'ask_first', label: 'Ask us first each time', birthPlanText: 'Please ask our permission before any students or observers enter the room.', icon: 'MessageCircle' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'GraduationCap' },
      { value: 'unsure', label: 'I need to think about this', birthPlanText: 'We are still deciding about medical students and observers.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'gbs_antibiotics',
    category: 'Your Birth',
    title: 'GBS Antibiotics',
    subtitle: 'If you test positive for Group B Strep, what\'s your preference?',
    order: 10.4,
    learnMoreData: {
      tradeoff: 'About 25% of women carry GBS bacteria, which is harmless to adults but can cause serious infection in newborns during birth. IV antibiotics are administered every four hours via a short IV infusion during labor, reducing transmission risk by 80%, but also affecting baby\'s gut microbiome.',
      pros: [
        'IV antibiotics reduce early-onset GBS disease from 1-2% to 0.2-0.3% in colonized mothers',
        'GBS infection in newborns can cause pneumonia, sepsis, and meningitis',
        'Treatment is well-studied with decades of safety data',
        'Penicillin is the standard treatment, with alternatives for allergic mothers',
      ],
      cons: [
        'Antibiotics disrupt baby\'s gut microbiome establishment',
        'Requires IV access during labor, which may limit mobility',
        'Antibiotics increases the risk of mastitis',
        'Risk of allergic reaction to antibiotics (rare but possible)',
        'Some families explore alternative protocols (garlic, probiotics) though evidence is limited',
        'The standard for mothers who are not tested for this condition is to not administer antibiotics.',
        'If you are African American, under the age of 20, or GBS is found in your urine (indicates heavy colonization) you have a higher risk profile of GBS transmission to your child than average',
      ],
      bottomLine: 'This should be a carefully considered decision. If you are GBS positive, the antibiotics significantly reduce a small but serious risk. The microbiome impact is real - breastfeeding can help restore it, but studies have shown that infants born to mothers who had the antibiotics treatment exhibit a difference in beneficial gut bacteria even a year after birth when compares to those born without the antibiotic treatment. However, Group B Strep can be a serious condition in newborns if infected.',
      ebookChapter: 'Chapter 6: Group B Strep',
    },
    options: [
      { value: 'not_applicable', label: 'Not applicable (tested negative or not screened)', birthPlanText: '', omitFromPlan: true, icon: 'CheckCircle' },
      { value: 'accept', label: 'Accept antibiotics if GBS positive', birthPlanText: 'Please administer IV antibiotics as recommended.', icon: 'Shield' },
      { value: 'decline', label: 'Decline antibiotics', birthPlanText: 'We decline GBS antibiotics and accept responsibility for this decision.', icon: 'X' },
      { value: 'natural', label: 'Discuss alternative approaches', birthPlanText: 'We would like to discuss alternative protocols for GBS.', icon: 'MessageCircle' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Pill' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss GBS treatment options with our care team.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'pushing_positions',
    category: 'Your Birth',
    title: 'Pushing Positions',
    subtitle: 'How would you like to push when it\'s time?',
    order: 10.5,
    learnMoreData: {
      tradeoff: 'The standard "on your back, feet in stirrups" position works against gravity and narrows the pelvis, making tearing more likely due to the smaller area for the baby\'s head to fit through. Upright and side-lying positions open the pelvis by up to 30% and let gravity help.',
      pros: [
        'Upright positions (squatting, hands-and-knees) open the pelvic outlet by up to 30%',
        'Gravity assists baby\'s descent in upright positions',
        'Side-lying reduces the risk of perineal tearing',
        'Freedom to change positions helps find what works best for you and baby',
      ],
      cons: [
        'An epidural may limit your ability to use certain positions',
        'Some providers are most experienced with lithotomy (on-back) position',
        'Continuous monitoring can restrict position changes',
        'You may not know what feels right until you are in the moment',
      ],
      bottomLine: 'Your pelvis is not a fixed structure - it moves and opens differently in different positions. The position that feels right to you is usually the one that works best for baby too.',
      ebookChapter: 'Chapter 25: Pushing Positions',
    },
    options: [
      { value: 'freedom', label: 'Freedom to choose in the moment', birthPlanText: 'I would like the freedom to push in different positions as feels natural.', icon: 'Move' },
      { value: 'standard', label: 'Standard position (lying on back) is fine', birthPlanText: 'Standard pushing position (lying on back) is acceptable.', icon: 'Bed', omitFromPlan: true },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Move' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss pushing position options.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
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
      ebookChapter: 'Chapter 39: First Bath',
    },
    options: [
      { value: '24hrs', label: 'Delay at least 24 hours', birthPlanText: 'Please delay baby\'s first bath for at least 24 hours.', icon: 'Clock' },
      { value: '48hrs', label: 'Delay at least 48 hours', birthPlanText: 'Please delay baby\'s first bath for at least 48 hours.', icon: 'Timer' },
      { value: 'parents_give', label: 'We want to give the first bath at home', birthPlanText: 'We would like to give baby\'s first bath ourselves at home.', icon: 'Droplets' },
      { value: 'hospital_timing', label: 'Whenever the hospital recommends', birthPlanText: 'Baby\'s first bath may be given when recommended by nursing staff.', icon: 'Building2' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Droplets' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss bath timing options.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
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
        'VKDB is rare (affects 4-7 per 100,000 breastfed babies without the shot)',
        'Oral alternative is available in some areas (3 doses over 6 weeks, about 80% effective)',
        'Some parents prefer to minimize early medical interventions',
      ],
      bottomLine: 'When VKDB occurs, about 50% involve brain bleeding, and half of those result in death or permanent damage. The injection prevents a rare but catastrophic condition.',
      ebookChapter: 'Chapter 29: Vitamin K',
    },
    options: [
      { value: 'accept', label: 'Yes, give the Vitamin K shot', birthPlanText: 'Please give the Vitamin K injection as recommended.', icon: 'Shield' },
      { value: 'oral', label: 'Oral Vitamin K - We have confirmed that our birth facility offers this', birthPlanText: 'We prefer oral Vitamin K administration over the injection. We understand the hospital offers this.', icon: 'Droplet' },
      { value: 'oral_own', label: 'Oral Vitamin K - We will bring our own to administer ourselves', birthPlanText: 'We prefer oral Vitamin K and will bring our own supply.', icon: 'Package' },
      { value: 'decline', label: 'We decline', birthPlanText: 'We decline the Vitamin K injection at this time.', icon: 'X' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Syringe' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss Vitamin K options with our care team.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'eye_ointment',
    category: 'Newborn Care',
    title: 'Eye Ointment',
    subtitle: 'Antibiotic eye ointment can prevent STDs being transmitted from mother to child',
    order: 13,
    learnMoreData: {
      tradeoff: 'Erythromycin eye ointment prevents gonorrhea and chlamydia transmission to baby\'s eyes during birth. If you have tested negative for both STIs, your baby\'s risk of these infections is essentially zero.',
      pros: [
        'Prevents serious eye infections that could lead to blindness if STIs are present',
        'Simple, quick application that is standard of care',
        'Required by law in many states as a public health measure (in most places parents can still opt out)',
        'The AAP is reconsidering mandatory status as of 2024',
      ],
      cons: [
        'Blurs baby\'s vision during the critical bonding hour after birth',
        'Most effective against infections parents have already been screened for',
        'If you tested negative for gonorrhea and chlamydia, there is no transmission risk',
        'Contains antibiotic that some prefer to avoid unless specifically needed',
      ],
      bottomLine: 'This is one of the few interventions where your STI testing status completely determines risk. If you tested negative, the ointment provides no benefit to your baby.',
      ebookChapter: 'Chapter 30: Eye Ointment',
    },
    options: [
      { value: 'accept', label: 'Yes, apply the ointment', birthPlanText: 'Please apply the erythromycin eye ointment as recommended.', icon: 'Eye' },
      { value: 'delay', label: 'Delay for bonding first', birthPlanText: 'Please delay the eye ointment to allow for initial bonding and breastfeeding.', icon: 'Clock' },
      { value: 'decline', label: 'We decline', birthPlanText: 'We decline the erythromycin eye ointment.', icon: 'X' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Eye' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss eye ointment options with our care team.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
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
      bottomLine: 'Transmission requires an infected source. If you are confirmed negative and your household is too, your newborn has no exposure risk. The vaccine may still make sense eventually - the question is timing.',
      ebookChapter: 'Chapter 31: Hepatitis B',
    },
    options: [
      { value: 'accept', label: 'Yes, give at birth', birthPlanText: 'Please administer the Hepatitis B vaccine at birth.', icon: 'Syringe' },
      { value: 'delay', label: 'Delay until pediatrician visit', birthPlanText: 'We prefer to delay the Hepatitis B vaccine until our pediatrician visit.', icon: 'Calendar' },
      { value: 'decline', label: 'We decline', birthPlanText: 'We decline the Hepatitis B vaccine at this time.', icon: 'X' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Syringe' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss Hepatitis B vaccine timing with our care team.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'placenta_delivery',
    category: 'After Birth',
    title: 'Placenta Delivery',
    subtitle: 'How would you like the placenta delivered?',
    order: 14.5,
    learnMoreData: {
      tradeoff: 'Routine third-stage Pitocin reduces postpartum hemorrhage risk by approximately 40% and is recommended by WHO, ACOG, and AWHONN. Unlike Pitocin during labor, the endorphin gap and cascade of interventions are no longer relevant after baby is born.',
      pros: [
        'Pitocin after delivery significantly reduces postpartum hemorrhage risk',
        'Active management speeds placenta delivery, reducing blood loss',
        'WHO, ACOG, and AWHONN all recommend routine third-stage Pitocin',
        'The endorphin gap and cascade concerns no longer apply after birth',
      ],
      cons: [
        'Aggressive cord traction before the placenta has separated can cause complications',
        'Some women prefer to complete the birth process without additional medication',
        'Physiological delivery allows the body to complete the process naturally',
        'Waiting for natural separation may feel more aligned with a natural birth plan',
      ],
      bottomLine: 'Third-stage Pitocin has a fundamentally different risk-benefit profile than labor Pitocin. The downsides that matter during labor (endorphin gap, cascade, mobility) are no longer relevant. The hemorrhage prevention benefit is significant.',
      ebookChapter: 'Chapter 27: Pitocin',
    },
    options: [
      { value: 'physiological', label: 'Allow natural separation, no traction', birthPlanText: 'We prefer physiological delivery of the placenta - allowing time for natural separation without cord traction.', icon: 'Clock' },
      { value: 'natural_with_pitocin', label: 'Natural separation, but Pitocin for hemorrhage prevention', birthPlanText: 'We prefer natural placenta delivery but are open to Pitocin after delivery to reduce hemorrhage risk.', icon: 'Shield' },
      { value: 'active_management', label: 'Active management (Pitocin + gentle cord traction)', birthPlanText: 'Active management of the third stage is fine, including routine Pitocin and gentle cord traction.', icon: 'Activity' },
      { value: 'provider_standard', label: 'Follow provider\'s standard protocol', birthPlanText: '', omitFromPlan: true, icon: 'Stethoscope' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Settings' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss placenta delivery management with our care team.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'circumcision',
    category: 'Newborn Care',
    title: 'Circumcision',
    subtitle: 'If having a boy, what are your thoughts on circumcision?',
    order: 15,
    conditionalOn: {
      questionId: 'baby_sex',
      values: ['boy', 'unknown', 'surprise', 'prefer_not_to_say'],
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
        'Surgical procedure with significant pain at a fragile stage in life, even with anesthesia (cortisol spikes 3-4x)',
        'Removes functional tissue that provides protection and increased sexual sensation later on in life',
        'This is a procedure that cannot be undone, but can happen at any time in life - if you do not circumcise your son he could later elect to do this procedure if desired',
        'Complication rate of 1.5-3% (bleeding, infection, rarely more serious). Approximately 100 baby boys die per year in the US due to circumcision complications.',
      ],
      bottomLine: 'The US is the only developed country with high routine circumcision rates. Europe\'s rate is under 5%. This is a personal family decision, not a medical recommendation.',
      ebookChapter: 'Chapter 34: Circumcision',
    },
    options: [
      { value: 'yes_hospital', label: 'Yes, circumcise at the hospital', birthPlanText: 'We would like our son circumcised before leaving the hospital.', icon: 'Scissors' },
      { value: 'yes_provider', label: 'Yes, but by our own provider later', birthPlanText: 'We will arrange circumcision with our own provider after discharge.', icon: 'Calendar' },
      { value: 'no', label: 'No circumcision', birthPlanText: 'We do not want circumcision performed.', icon: 'ShieldCheck' },
      { value: 'not_applicable', label: 'Not applicable', birthPlanText: '', omitFromPlan: true, icon: 'Minus' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Scissors' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We need more time to decide about circumcision.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'baby_companion',
    category: 'After Birth',
    title: 'If Baby Needs to Leave',
    subtitle: 'If baby needs to leave your room for any reason, what are your preferences?',
    order: 15.05,
    learnMoreData: {
      tradeoff: 'Being separated from your newborn can be stressful. Having a trusted person accompany baby provides comfort and advocacy, but hospital policies on who can be present in the NICU or procedure rooms vary.',
      pros: [
        'Having a support person with baby ensures someone is advocating for your family',
        'Reduces parental anxiety during separation',
        'Partner or support person can provide skin-to-skin if you cannot',
        'Ensures you receive real-time updates about baby\'s care',
      ],
      cons: [
        'Some NICU areas have restricted access policies',
        'Partner leaving your side means you may be without support during recovery',
        'Not all procedures allow a companion to be present',
      ],
      bottomLine: 'If baby needs to leave your room, having someone you trust accompany them is almost always possible and always worthwhile. Ask your hospital about their policies beforehand.',
    },
    options: [
      { value: 'partner_always', label: 'Partner stays with baby at all times', birthPlanText: 'If baby must leave our room, my partner should accompany baby at all times.', icon: 'Users' },
      { value: 'someone_present', label: 'A support person should be with baby', birthPlanText: 'We request that a support person be present with baby during any procedures or transfers.', icon: 'Shield' },
      { value: 'flexible', label: 'We\'re flexible about this', birthPlanText: 'We are flexible about who accompanies baby if they need to leave the room.', icon: 'ArrowLeftRight' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'MessageSquare' },
      { value: 'unsure', label: 'I need to think about this', birthPlanText: 'We are still deciding on our preference for baby accompaniment.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'newborn_screening',
    category: 'Newborn Care',
    title: 'Newborn Screening (Heel Prick)',
    subtitle: 'The heel prick test screens for rare but serious conditions - what\'s your preference?',
    order: 15.1,
    learnMoreData: {
      tradeoff: 'The newborn screening blood test checks for 30-50+ rare but treatable conditions (depending on your state). Early detection allows treatment before symptoms appear, potentially preventing disability or death.',
      pros: [
        'Screens for conditions like PKU, sickle cell disease, and hypothyroidism',
        'Early detection can be lifesaving - many conditions are treatable only if caught early',
        'Required in all 50 US states (though parents can decline in most)',
        'A single blood draw screens for dozens of conditions at once',
      ],
      cons: [
        'Involves a heel prick that causes discomfort for baby',
        'A small number of false positives can cause anxiety before follow-up testing',
        'Testing is typically done 24-48 hours after birth - some parents prefer to be home first',
        'Skin-to-skin or breastfeeding during the test can reduce baby\'s discomfort',
      ],
      bottomLine: 'This is one of the most universally recommended newborn procedures. Breastfeeding during the test can help with pain.',
    },
    options: [
      { value: 'accept', label: 'Yes, do the screening', birthPlanText: 'Please perform the standard newborn screening tests.', icon: 'Shield' },
      { value: 'decline', label: 'We decline', birthPlanText: 'We decline the newborn screening tests.', icon: 'X' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'TestTube' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss newborn screening with our care team.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'hearing_test',
    category: 'Newborn Care',
    title: 'Hearing Screening',
    subtitle: 'Would you like baby to have the newborn hearing test?',
    order: 15.2,
    learnMoreData: {
      tradeoff: 'The hearing screening is painless and takes 5-10 minutes while baby sleeps. Early detection of hearing loss allows intervention during the critical window for language development.',
      pros: [
        'Completely painless - performed while baby sleeps using soft earphones',
        'Early detection (before 3 months) dramatically improves language outcomes',
        'About 1-3 per 1,000 babies are born with hearing loss',
        'Without screening, hearing loss often is not detected until age 2-3, missing the critical window',
      ],
      cons: [
        'False positives (5-10%) can cause worry before follow-up testing confirms normal hearing',
        'The test must be done in a quiet environment, which can be hard in a busy hospital',
        'A failed screen does not necessarily mean hearing loss - fluid in the ears is a common cause',
        'Follow-up testing adds another appointment if the initial screen is inconclusive',
      ],
      bottomLine: 'This is a no-downside test. It is painless, quick, and catches a condition where early intervention makes a profound difference in your child\'s development.',
    },
    options: [
      { value: 'accept', label: 'Yes, do the hearing test', birthPlanText: 'Please perform the newborn hearing screening.', icon: 'Shield' },
      { value: 'decline', label: 'We decline', birthPlanText: 'We decline the hearing screening at this time.', icon: 'X' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Ear' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss the hearing screening with our care team.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'procedure_timing',
    category: 'Newborn Care',
    title: 'Timing of Procedures',
    subtitle: 'When should non-urgent newborn procedures happen? (Check all that apply)',
    order: 15.3,
    inputType: 'checklist',
    learnMoreData: {
      tradeoff: 'Weighing, measuring, eye ointment, and vitamin K can all wait. The first hour is biologically designed for bonding and feeding - not paperwork and procedures.',
      pros: [
        'Delaying procedures protects the golden hour for bonding and first feeding',
        'Baby\'s instinctive behaviors (crawling to breast, first latch) are strongest in the first hour',
        'Most procedures can be done during skin-to-skin or after the first feeding',
        'Asking before each procedure keeps you informed and in control',
      ],
      cons: [
        'Hospital workflows may default to doing procedures immediately',
        'Staff shift changes may mean different providers doing procedures later',
        'Some procedures (vitamin K) are ideally done within the first hour for medical reasons',
        'Delaying requires clear advance communication with your care team',
      ],
      bottomLine: 'Your baby will only have one first hour of life. Everything else can wait. Communicate this clearly in advance so the team knows your preferences.',
    },
    options: [
      { value: 'delay_golden_hour', label: 'Delay all during the golden hour', birthPlanText: 'Please delay all non-urgent procedures for at least the first hour to allow for bonding.', icon: 'Clock' },
      { value: 'ask_first', label: 'Ask us before each procedure', birthPlanText: 'Please ask our permission before each procedure and explain what will be done.', icon: 'MessageCircle' },
      { value: 'standard', label: 'Standard timing is fine', birthPlanText: 'Standard timing for procedures is acceptable.', icon: 'ClipboardCheck', omitFromPlan: true },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Clock' },
      { value: 'unsure', label: 'I need to think about this', birthPlanText: 'We would like to discuss procedure timing with our care team.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'infant_pain_management',
    category: 'Newborn Care',
    title: 'Baby\'s Comfort During Procedures',
    subtitle: 'During newborn procedures (heel prick, shots), how would you like baby\'s pain managed?',
    order: 15.35,
    learnMoreData: {
      tradeoff: 'Breastfeeding and skin-to-skin contact during procedures are evidence-based pain relief methods for newborns. Sucrose (sugar water) is also effective but some parents prefer natural comfort methods.',
      pros: [
        'Breastfeeding during the heel prick provides significant, measurable pain reduction',
        'Skin-to-skin contact activates calming pathways and reduces cortisol',
        'Sucrose solution is well-studied and widely used as infant pain management',
        'Combining methods (breastfeeding + skin-to-skin) is most effective',
      ],
      cons: [
        'Not all hospitals routinely offer breastfeeding during procedures',
        'Sugar water introduces an unnecessary substance if breastfeeding is available',
        'Some procedures require baby to be in a specific position',
      ],
      bottomLine: 'Your baby feels pain during procedures. Breastfeeding during the heel prick is the most effective comfort measure and is always worth requesting.',
      ebookChapter: 'Chapter 31: Infant Pain Management',
    },
    options: [
      { value: 'breastfeed_during', label: 'Breastfeed during procedures', birthPlanText: 'Please allow me to breastfeed baby during procedures like the heel prick for comfort and pain relief.', icon: 'Heart' },
      { value: 'skin_to_skin_during', label: 'Skin-to-skin during procedures', birthPlanText: 'Please perform newborn procedures during skin-to-skin contact when possible.', icon: 'Baby' },
      { value: 'sugar_water', label: 'Sugar water (sucrose) is fine', birthPlanText: 'Sugar water for pain management during procedures is fine with us.', icon: 'Droplet' },
      { value: 'no_sugar_water', label: 'No sugar water - breastfeeding or skin-to-skin only', birthPlanText: 'Please do not give baby sugar water. We prefer breastfeeding or skin-to-skin for comfort.', icon: 'AlertCircle' },
      { value: 'provider_choice', label: 'Provider\'s standard approach', birthPlanText: 'We are fine with the standard approach to infant comfort during procedures.', icon: 'Stethoscope' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Settings' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss infant pain management during procedures.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },

  {
    id: 'cord_clamping',
    category: 'After Birth',
    title: 'Cord Clamping Timing',
    subtitle: 'When should the umbilical cord be clamped?',
    order: 15,
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
        'Lotus birth (leaving the cord attached until it falls off) carries a small risk of infection',
      ],
      bottomLine: 'Your baby has about 30% of their blood in the placenta at birth. Immediate clamping became standard for convenience, not evidence. Your baby\'s blood belongs in your baby, not in the placenta.',
      ebookChapter: 'Chapter 32: Cord Clamping',
    },
    options: [
      { value: '1min', label: 'Wait at least 90 seconds', birthPlanText: 'Please wait at least 90 seconds before clamping the cord.', icon: 'Clock' },
      { value: '3-5min', label: 'Wait 5 minutes', birthPlanText: 'Please delay cord clamping for 5 minutes.', icon: 'Timer' },
      { value: 'until_stops', label: 'Wait until cord stops pulsing', birthPlanText: 'Please wait until the cord stops pulsing before clamping.', icon: 'Activity' },
      { value: 'lotus', label: 'Lotus birth (cord falls off naturally)', birthPlanText: 'We plan a lotus birth - please do not cut the cord. We will allow it to detach naturally.', icon: 'Leaf' },
      { value: 'immediate', label: 'Clamp right away', birthPlanText: 'We are comfortable with immediate cord clamping.', icon: 'Scissors' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Timer' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss cord clamping timing with our care team.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'who_cuts_cord',
    category: 'After Birth',
    title: 'Who Cuts the Cord',
    subtitle: 'Who would you like to cut the umbilical cord?',
    order: 15.5,
    learnMoreData: {
      tradeoff: 'Cutting the cord is a symbolic moment - there is no medical difference in who does it. Many partners treasure this as their first active role in the birth.',
      pros: [
        'Partners often describe cord cutting as an emotional, meaningful moment',
        'Mothers who cut their own cord report feeling empowered',
        'The provider can cut if no one else wants to - it is a quick, painless step',
        'Delayed cord clamping means there is no rush to decide',
      ],
      cons: [
        'Some partners feel squeamish and would rather not',
        'In an emergency, the provider may need to cut quickly',
        'The cord is tougher than expected - it takes real force with the scissors',
        'This decision may feel more or less important depending on the birth experience',
      ],
      bottomLine: 'This is a personal moment, not a medical one. There is no wrong answer - choose whoever will find it most meaningful.',
    },
    options: [
      { value: 'partner', label: 'Partner cuts the cord', birthPlanText: 'My partner would like to cut the umbilical cord.', icon: 'Scissors' },
      { value: 'mother', label: 'I want to cut the cord myself', birthPlanText: 'I would like to cut the cord myself.', icon: 'Scissors' },
      { value: 'provider', label: 'Provider can cut it', birthPlanText: 'Our provider may cut the umbilical cord.', icon: 'Scissors' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Scissors' },
      { value: 'unsure', label: 'I need to think about this', birthPlanText: 'We are still deciding who will cut the cord.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
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
        'Cord blood banking will necessitate more immediate cord clamping - lessening how much blood, iron stores, and stem cells your baby has at the beginning of life',
        'Private banking costs $1,000-2,000 initially plus $100-200 per year ongoing',
        'Actual likelihood of using privately stored cord blood is very low (1 in 1,000 to 1 in 200,000)',
        'Collection may conflict with delayed cord clamping, reducing those benefits',
        'Most families who skip banking choose delayed clamping for the blood volume benefit instead',
      ],
      bottomLine: 'Most families choose delayed cord clamping over cord blood banking, allowing baby to receive the full blood volume. Public donation is a generous option if you want to collect without paying for storage.',
      ebookChapter: 'Chapter 33: Cord Blood',
    },
    options: [
      { value: 'no', label: 'No cord blood banking', birthPlanText: 'We do not plan to bank or donate cord blood.', icon: 'X', omitFromPlan: true },
      { value: 'private', label: 'Private banking (for our family)', birthPlanText: 'We will be privately banking cord blood.', icon: 'Lock' },
      { value: 'public', label: 'Donate to a public bank', birthPlanText: 'We would like to donate cord blood to a public bank if available.', icon: 'Heart' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Droplets' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss cord blood banking options.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
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
      ebookChapter: 'Chapter 42: Rooming In',
    },
    options: [
      { value: '24_7', label: 'Baby stays with us 24/7', birthPlanText: 'We want baby to room-in with us at all times.', icon: 'Home' },
      { value: 'nursery_option', label: 'Mostly with us, may use nursery for rest', birthPlanText: 'We prefer rooming-in but may use the nursery for rest periods.', icon: 'Moon' },
      { value: 'flexible', label: 'Flexible, we\'ll see how we feel', birthPlanText: 'We are flexible about rooming-in and will decide based on how we are feeling.', icon: 'ArrowLeftRight', omitFromPlan: true },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Home' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss rooming-in options.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
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
      ebookChapter: 'Chapter 41: Pacifier Use',
    },
    options: [
      { value: 'no', label: 'No pacifiers please', birthPlanText: 'Please do not give baby a pacifier.', icon: 'Ban' },
      { value: 'if_needed', label: 'Flexible, we\'ll see', birthPlanText: 'We\'re flexible, if it seems needed then we\'d be open to using pacifiers after a discussion.', icon: 'ArrowLeftRight', omitFromPlan: true },
      { value: 'yes', label: 'Pacifiers are fine with us', birthPlanText: 'We plan to use pacifiers.', icon: 'Check' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Circle' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss pacifier use with our care team.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
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
        'If you do choose to have visitors you can set expectations for how long you\'d like them there',
        'Partners often act in the role of a gatekeeper',
        'Holding and passing baby around can overstimulate a newborn',
        'Difficult to breastfeed comfortably with an audience',
        'Saying no later is harder than setting expectations upfront',
      ],
      bottomLine: 'You will never get these first days back, and relatives who are overbearing can be a significant source of stress you don\'t need. Protect this time fiercely. Real friends will understand, and family will adjust.',
    },
    options: [
      { value: 'welcome', label: 'Visitors are welcome anytime', birthPlanText: 'We welcome visitors during our hospital stay.', icon: 'DoorOpen' },
      { value: 'limited', label: 'Close family only, limited hours', birthPlanText: 'We prefer brief visits from close family only during limited hours.', icon: 'Users' },
      { value: 'after_home', label: 'No visitors until we\'re home', birthPlanText: 'We prefer no visitors at the hospital. We will welcome visitors once we are settled at home.', icon: 'Home' },
      { value: 'case_by_case', label: 'We\'ll decide case by case', birthPlanText: 'We will decide on visitors on a case-by-case basis during our stay.', icon: 'MessageCircle' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'DoorOpen' },
      { value: 'unsure', label: 'I need to think about this', birthPlanText: 'We are still deciding on our visitor preferences.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },

  {
    id: 'length_of_stay',
    category: 'Hospital Stay',
    title: 'Length of Stay',
    subtitle: 'How long would you like to stay after birth?',
    order: 19.1,
    learnMoreData: {
      tradeoff: 'Standard hospital stays are 24-48 hours for vaginal births (birth centers are often significantly shorter) and 48-96 hours for C-sections. This is often dependent on hospital policy. Some families want to leave early to recover at home; others want the full support period.',
      pros: [
        'Leaving early gets you home to your own bed, food, and comfort',
        'Longer stays provide access to lactation consultants and nursing support',
        'First-time parents can learn valuable skills from nurses on how to take care of babies (skills such as swaddling, changing diapers, etc.)',
        'Home recovery reduces exposure to hospital bacteria',
        'Extended stays are valuable after difficult births or C-sections',
      ],
      cons: [
        'Early discharge means less monitoring for jaundice and feeding issues',
        'Hospital policies may discourage leaving early. There can be further ramifications if you choose to leave early against medical advice (AMA).',
        'First-time parents may feel overwhelmed at home without nurse support',
        'Insurance typically covers the standard stay - leaving early does not always save money, but it may save money depending on your situation',
        'Pediatrician follow-up within 48 hours is especially important with early discharge',
      ],
      bottomLine: 'There is no medal for leaving early, but some families may feel more comfortable in their own space. Use the hospital\'s resources while you have them, especially lactation support. You can always request discharge when you feel ready. If you intend to leave earlier than the standard time-frame this is something to be discussed during prenatal appointments.',
    },
    options: [
      { value: 'minimum', label: 'Leave as soon as possible', birthPlanText: 'We prefer to be discharged as soon as safely possible.', icon: 'Home' },
      { value: 'standard', label: 'Standard stay', birthPlanText: 'We are comfortable with the standard length of stay.', icon: 'Calendar' },
      { value: 'extended', label: 'Extended if we need support', birthPlanText: 'We would like to stay longer if we feel we need more support.', icon: 'HeartHandshake' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Calendar' },
      { value: 'unsure', label: 'I need to think about this', birthPlanText: 'We will decide on our length of stay based on how we are feeling.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
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
      tradeoff: 'The placenta sustained your baby for 9 months. Most families let the hospital dispose of it, but some keep it for encapsulation, burial, or other purposes. Scientific evidence for health benefits of encapsulation is inconclusive.',
      pros: [
        'Encapsulation: some women report increased energy and milk supply (evidence is anecdotal)',
        'Cultural or spiritual significance in many traditions worldwide',
        'Planting a tree over the placenta is a meaningful ritual for some families',
        'Hospital disposal is the simplest, most common choice',
        'Many doulas offer placenta encapsulation as an add-on service',
      ],
      cons: [
        'Encapsulation costs $150-300 and lacks FDA regulation or strong scientific evidence',
        'Improper processing carries a small risk of contamination',
        'Keeping the placenta requires planning (cooler, encapsulation service)',
        'Healthcare providers express some concern about heavy metals in placenta tissue',
      ],
      bottomLine: 'There is no wrong choice here. Most families choose hospital disposal, and that is perfectly fine. If keeping the placenta has meaning for you, plan ahead.',
      ebookChapter: 'Chapter 38: Placenta Options',
    },
    options: [
      { value: 'dispose', label: 'Hospital disposal is fine', birthPlanText: 'The hospital may dispose of the placenta.', icon: 'Building2' },
      { value: 'encapsulate', label: 'Keep for encapsulation', birthPlanText: 'We will be keeping the placenta for encapsulation. Please place it in our provided container.', icon: 'Pill' },
      { value: 'keep', label: 'Keep for other purposes', birthPlanText: 'We would like to keep the placenta for other reasons.', icon: 'Package' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Leaf' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss placenta options.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },

  // =========================================================================
  // PERSONAL
  // =========================================================================
  {
    id: 'baby_sex',
    category: 'Newborn Care',
    title: 'Baby\'s Sex',
    subtitle: 'Do you know if you\'re having a boy or girl?',
    order: 14.9,
    options: [
      { value: 'boy', label: 'Boy', birthPlanText: '', icon: 'Baby' },
      { value: 'girl', label: 'Girl', birthPlanText: '', icon: 'Baby' },
      { value: 'unknown', label: 'We don\'t know yet', birthPlanText: '', icon: 'HelpCircle' },
      { value: 'surprise', label: "It's a surprise!", birthPlanText: '', icon: 'Sparkles' },
      { value: 'prefer_not_to_say', label: 'Prefer not to say', birthPlanText: '', icon: 'Lock' },
    ],
  },
  {
    id: 'sex_announcement',
    category: 'After Birth',
    title: 'Baby\'s Sex Announcement',
    subtitle: 'Who would you like to announce baby\'s sex at delivery?',
    order: 14.95,
    conditionalOn: {
      questionId: 'baby_sex',
      values: ['unknown', 'surprise'],
    },
    options: [
      { value: 'discover_ourselves', label: 'We want to discover ourselves', birthPlanText: 'Please allow us to discover baby\'s sex ourselves - do not announce it.', icon: 'Sparkles' },
      { value: 'partner_announces', label: 'Partner announces', birthPlanText: 'We would like my partner to announce baby\'s sex.', icon: 'Users' },
      { value: 'provider_announces', label: 'Provider announces', birthPlanText: 'Our provider may announce baby\'s sex at delivery.', icon: 'Stethoscope' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'MessageSquare' },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'mother_name',
    category: 'Personal',
    title: 'Your Name',
    subtitle: 'What name would you like on your birth plan?',
    order: 21,
    textInputOnOption: 'has_name',
    options: [
      { value: 'has_name', label: 'Enter your name', birthPlanText: '', icon: 'User' },
      { value: 'prefer_not_to_say', label: 'Prefer not to say', birthPlanText: '', icon: 'Lock' },
    ],
  },
  {
    id: 'due_date',
    category: 'Personal',
    title: 'Due Date',
    subtitle: 'When is your baby due?',
    order: 21.5,
    inputType: 'date',
    textInputOnOption: 'has_date',
    options: [
      { value: 'has_date', label: 'Enter due date', birthPlanText: '', icon: 'Calendar' },
      { value: 'prefer_not_to_say', label: 'Prefer not to say', birthPlanText: '', icon: 'Lock' },
    ],
  },
  {
    id: 'baby_name',
    category: 'Personal',
    title: 'Baby\'s Name',
    subtitle: 'Have you picked a name?',
    order: 22,
    textInputOnOption: 'has_name',
    options: [
      { value: 'has_name', label: 'Yes, type baby\'s name', birthPlanText: '', icon: 'Baby' },
      { value: 'not_yet', label: "We haven't decided yet", birthPlanText: '', icon: 'HelpCircle' },
      { value: 'prefer_not_to_say', label: "We'd rather not say", birthPlanText: '', icon: 'Lock' },
    ],
  },
  {
    id: 'medical_conditions',
    category: 'Personal',
    title: 'Medical Conditions & Allergies',
    subtitle: 'Are there any medical conditions relevant to your birth? (Check all that apply)',
    order: 22.25,
    inputType: 'checklist',
    options: [
      { value: 'gestational_diabetes', label: 'Gestational diabetes', birthPlanText: 'I have been diagnosed with gestational diabetes.', icon: 'Activity' },
      { value: 'preeclampsia', label: 'Preeclampsia / high blood pressure', birthPlanText: 'I have been diagnosed with preeclampsia or pregnancy-related high blood pressure.', icon: 'Heart' },
      { value: 'gbs_positive', label: 'GBS positive', birthPlanText: 'I have tested positive for Group B Strep.', icon: 'TestTube' },
      { value: 'latex_allergy', label: 'Latex allergy', birthPlanText: 'I have a latex allergy - please use non-latex gloves and equipment.', icon: 'AlertCircle' },
      { value: 'medication_allergy', label: 'Medication allergies (specify in notes)', birthPlanText: 'I have medication allergies (see notes).', icon: 'Pill' },
      { value: 'prior_trauma', label: 'Prior birth trauma or PTSD', birthPlanText: 'I have a history of birth trauma. Please be sensitive to this and communicate clearly before any procedures.', icon: 'Shield' },
      { value: 'blood_clotting', label: 'Blood clotting disorder', birthPlanText: 'I have a blood clotting disorder.', icon: 'Droplet' },
      { value: 'prefer_not', label: 'Prefer not to include in birth plan', birthPlanText: '', omitFromPlan: true, icon: 'Lock' },
      { value: 'none', label: 'No relevant conditions', birthPlanText: '', omitFromPlan: true, icon: 'Check' },
    ],
  },

  {
    id: 'facility_name',
    category: 'Personal',
    title: 'Your Birth Facility',
    subtitle: 'Where are you planning to deliver?',
    order: 22.5,
    textInputOnOption: 'has_facility',
    options: [
      { value: 'has_facility', label: 'I know where - type facility name', birthPlanText: '', icon: 'Building2' },
      { value: 'still_deciding', label: 'Still deciding', birthPlanText: '', icon: 'HelpCircle' },
      { value: 'prefer_not_to_say', label: 'Prefer not to say', birthPlanText: '', icon: 'Lock' },
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
      ebookChapter: 'Chapter 12: Cesarean Birth',
    },
    options: [
      { value: 'gentle_family_centered', label: 'Gentle/family-centered C-section', birthPlanText: 'If a C-section is needed, we would like a gentle, family-centered approach: clear drape, immediate skin-to-skin in the OR, and delayed cord clamping when safely possible.', icon: 'Heart' },
      { value: 'standard_with_preferences', label: 'Standard, but with some preferences', birthPlanText: 'If a C-section is needed, we would like to discuss specific preferences with our surgical team, such as partner presence and music.', icon: 'Settings' },
      { value: 'follow_medical_team', label: 'Follow the medical team\'s lead', birthPlanText: 'If a C-section becomes necessary, we trust the medical team to follow standard protocols.', icon: 'Stethoscope' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Scissors' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss C-section approaches with our care team in advance.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
    birthTypeVariant: {
      vaginal: {
        subtitle: 'If a C-section becomes necessary, what approach would you prefer?',
      },
      csection: {
        subtitle: 'What approach would you like for your C-section?',
        optionOverrides: {
          gentle_family_centered: { birthPlanText: 'During our C-section, we would like a gentle, family-centered approach: clear drape, immediate skin-to-skin in the OR, and delayed cord clamping when safely possible.' },
          standard_with_preferences: { birthPlanText: 'During our C-section, we would like to discuss specific preferences with our surgical team, such as partner presence and music.' },
          follow_medical_team: { birthPlanText: 'We trust the medical team to follow standard protocols during our C-section.' },
        },
      },
    },
  },
  {
    id: 'csection_details',
    category: 'C-Section Planning',
    title: 'C-Section Details',
    subtitle: 'What should your surgical team know? (Check all that apply)',
    order: 24,
    deferredFor: 'csection',
    inputType: 'checklist',
    learnMoreData: {
      tradeoff: 'Even in a surgical birth, there are many personal touches that can make the experience meaningful. These range from visual (clear drape) to communication (narration) to bonding (skin-to-skin in the OR).',
      pros: [
        'A clear drape lets you see baby emerge without viewing the surgery itself',
        'Gentle/family-centered approaches prioritize bonding during surgery',
        'Immediate skin-to-skin promotes bonding even in the operating room',
        'Narration helps you feel informed and involved in your own birth',
      ],
      cons: [
        'Some requests may not be possible during emergency C-sections',
        'Hospital policies and individual surgeon preferences vary',
        'Clear drapes may not appeal to everyone',
        'Multiple requests require advance communication with the team',
      ],
      bottomLine: 'Your birth experience matters even when it happens in an operating room. Speak up about the details that will make this moment meaningful for your family.',
      ebookChapter: 'Chapter 12: Cesarean Birth',
    },
    options: [
      { value: 'gentle_csection', label: 'Gentle/family-centered approach if possible', birthPlanText: 'We would like a gentle/family-centered C-section approach, prioritizing bonding and a calm experience.', icon: 'Heart' },
      { value: 'clear_drape', label: 'Clear drape so we can see baby being born', birthPlanText: 'Please use a clear drape so we can see baby being born.', icon: 'Eye' },
      { value: 'step_by_step_narration', label: 'Surgeon narrates step-by-step', birthPlanText: 'We would appreciate step-by-step narration of what is happening during the procedure.', icon: 'MessageSquare' },

      { value: 'no_students', label: 'No medical students or observers', birthPlanText: 'We prefer no medical students or observers during the surgery.', icon: 'ShieldOff' },
      { value: 'standard_procedure', label: 'Standard procedure is fine', birthPlanText: '', omitFromPlan: true, icon: 'ClipboardCheck' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Settings' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: '', isUnsure: true, icon: 'HelpCircle' },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'csection_cord_clamping',
    category: 'C-Section Planning',
    title: 'Delayed Cord Clamping During C-Section',
    subtitle: 'Would you like delayed cord clamping if you have a C-section?',
    order: 25,
    deferredFor: 'csection',
    learnMoreData: {
      tradeoff: 'Delayed cord clamping during a C-section is safe and increasingly supported by research. It gives baby up to 30% more blood volume. Surgeons may push back on the delay due to a slight increased risk of infection to the mom due to the cut from the c-section being opened longer, but this is a minuscule risk that can bring huge benefits to the baby.',
      pros: [
        'Increases baby\'s blood volume and iron stores, just like in vaginal birth',
        '2024 research confirms delayed clamping during cesareans does not increase maternal blood loss',
        'ACOG, WHO, and AAP all recommend delayed clamping regardless of birth mode',
        'Even 30-60 seconds provides meaningful benefit',
      ],
      cons: [
        'Surgeon may need to manage timing around the surgical field',
        'In true emergencies, immediate clamping could be necessary for baby\'s safety',
        'Delay is typically shorter than in vaginal birth (60-90 seconds, though you can ask for longer time)',
        'Not all surgical teams are practiced in accommodating it',
      ],
      bottomLine: 'Delayed cord clamping during a C-section is safe and evidence-based. Your baby deserves that extra blood volume regardless of how they arrive.',
      ebookChapter: 'Chapter 12: Cesarean Birth',
    },
    options: [
      { value: '60_seconds', label: 'At least 60 seconds', birthPlanText: 'During a C-section, please delay cord clamping for at least 60 seconds.', icon: 'Clock' },
      { value: '90_seconds', label: 'At least 90 seconds', birthPlanText: 'During a C-section, please delay cord clamping for at least 90 seconds.', icon: 'Clock' },
      { value: '5_minutes', label: 'At least 5 minutes', birthPlanText: 'During a C-section, please delay cord clamping for at least 5 minutes.', icon: 'Timer' },
      { value: 'until_stops', label: 'Until cord stops pulsing', birthPlanText: 'During a C-section, please wait until the cord stops pulsing before clamping.', icon: 'Activity' },
      { value: 'surgeon_protocol', label: 'Follow surgeon\'s protocol', birthPlanText: 'We are comfortable with the surgeon\'s standard cord clamping protocol during a C-section.', icon: 'Stethoscope' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Timer' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to discuss cord clamping timing during a C-section with our surgical team.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
    birthTypeVariant: {
      vaginal: {
        subtitle: 'Would you like delayed cord clamping if a C-section happens?',
      },
      csection: {
        subtitle: 'Would you like delayed cord clamping during your C-section?',
      },
    },
  },
  {
    id: 'csection_vaginal_seeding',
    category: 'C-Section Planning',
    title: 'Vaginal Seeding',
    subtitle: 'Would you like baby swabbed with vaginal bacteria after a C-section?',
    order: 26,
    deferredFor: 'csection',
    learnMoreData: {
      tradeoff: 'C-section babies miss the bacterial exposure of passing through the birth canal. Vaginal seeding partially restores this by swabbing baby with maternal vaginal fluid. Research shows partial restoration of beneficial bacteria, though evidence is still emerging.',
      pros: [
        'Studies show partial restoration of key gut bacteria (Bacteroides, Lactobacillus) that C-section babies lack',
        'A 2025 review of 512 infants found no serious adverse events from the procedure',
        'May support immune development and reduce allergy and asthma risk',
        'Simple procedure: gauze incubated in the vagina, then swabbed on baby\'s mouth, face, and body after birth',
      ],
      cons: [
        'Many hospitals may resist or be completely unfamiliar with the procedure',
        'Evidence is promising but still emerging - no large randomized trials yet prove disease prevention',
        'Requires screening first: active herpes, untreated STIs, and certain infections are contraindications',
        'ACOG does not currently endorse the practice outside clinical trials',
      ],
      bottomLine: 'Vaginal seeding is a low-risk way to partially restore what C-section babies miss. Screen for infections first, and know that breastfeeding remains the most powerful microbiome intervention.',
      ebookChapter: 'Chapter 3: The Microbiome',
    },
    options: [
      { value: 'yes_plan', label: 'Yes, we plan to do vaginal seeding', birthPlanText: 'We plan to perform vaginal seeding after the C-section to support baby\'s microbiome.', icon: 'Droplets' },
      { value: 'interested_discuss', label: 'Interested but want to discuss with provider', birthPlanText: 'We are interested in vaginal seeding and would like to discuss it with our provider before making a decision.', icon: 'MessageCircle' },
      { value: 'no', label: 'No, not for us', birthPlanText: 'We do not plan to do vaginal seeding.', icon: 'X', omitFromPlan: true },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Droplets' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We would like to learn more about vaginal seeding before deciding.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
    birthTypeVariant: {
      vaginal: {
        subtitle: 'Would you consider vaginal seeding if baby is born via C-section?',
      },
      csection: {
        subtitle: 'Would you like baby swabbed with vaginal bacteria after your C-section?',
      },
    },
  },
  {
    id: 'csection_photography',
    category: 'C-Section Planning',
    title: 'Photos and Video',
    subtitle: 'Would you like photos or video of your C-section birth?',
    order: 26.5,
    deferredFor: 'csection',
    learnMoreData: {
      tradeoff: 'Birth photography captures one of life\'s most transformative moments. Some families treasure these images forever, while others prefer to be fully present without a camera.',
      pros: [
        'Captures a once-in-a-lifetime moment you may not fully remember',
        'Professional birth photographers know how to stay unobtrusive',
        'Photos can help process the birth experience afterward',
        'First moments with baby are priceless to look back on',
        'Many doulas offer birth photography as part of their services or as an add-on',
      ],
      cons: [
        'Hospital policies may restrict photography during certain procedures',
        'A designated photographer (partner or professional) may affect their support role',
        'Some moments feel more sacred without documentation',
        'OR policies on cameras vary by hospital',
      ],
      bottomLine: 'There is no wrong answer here. Many hospitals now allow photography during C-sections, but check with your surgical team in advance.',
    },
    options: [
      { value: 'photos_video', label: 'Yes, photos and video', birthPlanText: 'We would like to take photos and video during the C-section.', icon: 'Camera' },
      { value: 'photos_only', label: 'Photos only, no video', birthPlanText: 'We would like to take photos but not video during the C-section.', icon: 'Image' },
      { value: 'after_only', label: 'Only after baby arrives', birthPlanText: 'We prefer photos only after baby is born, not during the C-section.', icon: 'ImagePlus' },
      { value: 'no', label: 'No photos or video', birthPlanText: 'We prefer no photos or video during the C-section.', icon: 'EyeOff' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Camera' },
      { value: 'unsure', label: 'I need to think about this', birthPlanText: 'We are still deciding on photography preferences.', isUnsure: true },
    ],
    textInputOnOption: 'custom',
  },
  {
    id: 'csection_comfort',
    category: 'C-Section Planning',
    title: 'C-Section Environment',
    subtitle: 'What would make the environment more comfortable? (Check all that apply)',
    order: 27,
    deferredFor: 'csection',
    inputType: 'checklist',
    learnMoreData: {
      tradeoff: 'Small touches during a C-section - lighting, music, having your people present - can transform the experience from clinical to personal. Most of these requests are easy to accommodate, but require advance communication with your surgical team.',
      pros: [
        'Low lighting and quiet voices create a calmer, more intimate atmosphere',
        'Music reduces anxiety and makes the experience feel more personal',
        'Having your partner and/or doula present provides emotional support',
        'Having arms free lets you touch and hold baby as soon as possible',
      ],
      cons: [
        'Arms may need to be secured if you are trembling from anesthesia or medication',
        'Music volume must be low enough for the surgical team to communicate',
        'Not all hospitals allow doulas in the operating room',
        'Emergency situations may override comfort preferences',
      ],
      bottomLine: 'A C-section is still your birth. These small requests can make the difference between feeling like a patient and feeling like a mother meeting her baby.',
      ebookChapter: 'Chapter 12: Cesarean Birth',
    },
    options: [
      { value: 'dim_quiet', label: 'Low lighting and quiet voices', birthPlanText: 'We would appreciate low lighting and quiet voices in the operating room.', icon: 'Moon' },
      { value: 'music_in_or', label: 'Play our own music', birthPlanText: 'We would like to play our own music during the procedure.', icon: 'Music' },
      { value: 'photos_video', label: 'Photos and/or video during surgery', birthPlanText: 'We would like to take photos and/or video during the surgery.', icon: 'Camera' },
      { value: 'partner_present', label: 'Partner present throughout', birthPlanText: 'My partner should be present in the operating room throughout the procedure.', icon: 'Users' },
      { value: 'doula_present', label: 'Doula present throughout', birthPlanText: 'Our doula should be present in the operating room throughout the procedure.', icon: 'UserCheck' },
      { value: 'arms_free', label: 'Arms free (not strapped down)', birthPlanText: 'I would prefer my arms to remain free and not strapped down during the procedure.', icon: 'Move' },
      { value: 'standard_fine', label: 'Standard environment is fine', birthPlanText: '', omitFromPlan: true, icon: 'ClipboardCheck' },
      { value: 'custom', label: 'Write my own preference', birthPlanText: '', icon: 'Settings' },
      { value: 'unsure', label: 'I need to think about this', birthPlanText: '', isUnsure: true, icon: 'HelpCircle' },
    ],
    textInputOnOption: 'custom',
  },
]

// ---------------------------------------------------------------------------
// Helper functions
// ---------------------------------------------------------------------------

/**
 * Returns questions sorted by category order then by `order` within category.
 * Birth type answer determines which categories appear and in what sequence.
 */
export function getOrderedQuestions(answers: Record<string, string>): QuizQuestion[] {
  const birthType = answers['planned_birth_type']
  const categoryOrder = birthType === 'csection' ? CATEGORY_ORDER_CSECTION : CATEGORY_ORDER_VAGINAL

  const filtered = quizQuestions.filter(q => {
    // Handle conditionalOn (circumcision, sex announcement, etc.)
    if (q.conditionalOn) {
      const answer = answers[q.conditionalOn.questionId]
      if (!answer || !q.conditionalOn.values.includes(answer)) return false
    }
    // For planned C-section: exclude "Your Birth" questions entirely
    if (birthType === 'csection' && q.category === 'Your Birth') return false
    // For planned C-section: skip birth_setting (always hospital) and when_to_hospital (scheduled)
    if (birthType === 'csection' && (q.id === 'birth_setting' || q.id === 'when_to_hospital')) return false
    // For planned C-section: skip cord_clamping in After Birth (they get csection_cord_clamping in C-Section Planning)
    if (birthType === 'csection' && q.id === 'cord_clamping') return false
    // Only include categories in the active order
    if (!categoryOrder.includes(q.category)) return false
    return true
  })

  // Sort by category order first, then by `order` within category
  filtered.sort((a, b) => {
    const catA = categoryOrder.indexOf(a.category)
    const catB = categoryOrder.indexOf(b.category)
    if (catA !== catB) return catA - catB
    return a.order - b.order
  })

  return filtered
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

export function getCategories(answers?: Record<string, string>): string[] {
  const birthType = answers?.['planned_birth_type']
  return birthType === 'csection' ? CATEGORY_ORDER_CSECTION : CATEGORY_ORDER_VAGINAL
}
