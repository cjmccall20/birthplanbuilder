import type { PreferenceDefinition, BirthType } from './editorTypes'

export const PREFERENCES: PreferenceDefinition[] = [
  // ============================================
  // PRE-HOSPITAL ARRIVAL
  // ============================================
  {
    id: 'support_people',
    sectionId: 'pre_hospital',
    title: 'Support People at Birth',
    description: 'Who will be present with you during labor and delivery?',
    icon: 'Users',
    allowCustom: true,
    quizQuestionId: 'support_people',
    options: [
      { value: 'partner', label: 'Partner only', birthPlanText: 'My partner will be my primary support person.', isPopular: true },
      { value: 'partner_doula', label: 'Partner and doula', birthPlanText: 'My partner and our doula will be present.', isPopular: true },
      { value: 'partner_family', label: 'Partner and family member', birthPlanText: 'My partner and a family member will be present.' },
      { value: 'family_only', label: 'Family member(s)', birthPlanText: 'Family members will be my support people.' },
      { value: 'doula_only', label: 'Doula only', birthPlanText: 'My doula will be my primary support person.' },
    ],
  },
  {
    id: 'birth_location',
    sectionId: 'pre_hospital',
    title: 'Birth Location',
    description: 'Where do you plan to give birth?',
    icon: 'MapPin',
    allowCustom: true,
    quizQuestionId: 'birth_setting',
    options: [
      { value: 'hospital', label: 'Hospital', birthPlanText: 'We are planning a hospital birth.', isPopular: true },
      { value: 'birth_center', label: 'Birth center', birthPlanText: 'We are planning a birth center delivery.' },
      { value: 'home', label: 'Home birth', birthPlanText: 'We are planning a home birth.' },
    ],
  },
  {
    id: 'medical_provider',
    sectionId: 'pre_hospital',
    title: 'Medical Provider',
    description: 'Who is providing your prenatal and birth care?',
    icon: 'Stethoscope',
    allowCustom: true,
    quizQuestionId: 'medical_provider',
    options: [
      { value: 'ob', label: 'OB/GYN', birthPlanText: 'Our provider is an OB/GYN.', isPopular: true },
      { value: 'cnm', label: 'Certified Nurse-Midwife', birthPlanText: 'Our provider is a Certified Nurse-Midwife.', isPopular: true },
      { value: 'midwife', label: 'Midwife (non-CNM)', birthPlanText: 'Our provider is a midwife.' },
    ],
  },
  {
    id: 'when_to_hospital',
    sectionId: 'pre_hospital',
    title: 'When to Go to Hospital',
    description: 'What are your preferences for timing of arrival?',
    icon: 'Clock',
    allowCustom: true,
    options: [
      { value: 'active_labor', label: 'Wait until active labor', birthPlanText: 'We plan to arrive during active labor (contractions 4-5 minutes apart).', isPopular: true },
      { value: 'early', label: 'Arrive early for monitoring', birthPlanText: 'We prefer to arrive early for monitoring and support.' },
      { value: 'provider_guidance', label: 'Follow provider guidance', birthPlanText: 'We will arrive when our provider recommends.', isPopular: true },
    ],
  },
  {
    id: 'admission_procedures',
    sectionId: 'during_labor',
    title: 'Admission Procedures',
    description: 'Preferences for hospital admission process',
    icon: 'BookOpen',
    allowCustom: true,
    options: [
      { value: 'minimize', label: 'Minimize procedures', birthPlanText: 'Please minimize admission procedures to allow focus on labor.', isPopular: true },
      { value: 'standard', label: 'Standard admission', birthPlanText: 'Standard admission procedures are acceptable.' },
      { value: 'discuss', label: 'Discuss each procedure', birthPlanText: 'Please discuss each admission procedure with us before proceeding.' },
    ],
  },
  {
    id: 'photography_video',
    sectionId: 'pre_hospital',
    title: 'Photography & Video',
    description: 'Plans for documenting the birth',
    icon: 'Camera',
    allowCustom: true,
    options: [
      { value: 'professional', label: 'Professional birth photographer', birthPlanText: 'We have hired a professional birth photographer who will be present.', isPopular: true },
      { value: 'partner', label: 'Partner will take photos', birthPlanText: 'My partner will take photos during labor and birth.' },
      { value: 'video', label: 'Video recording', birthPlanText: 'We plan to record video during the birth.' },
      { value: 'none', label: 'No photos or video', birthPlanText: 'We prefer no photography or video.' },
    ],
  },
  {
    id: 'limited_interruptions',
    sectionId: 'during_labor',
    title: 'Interruptions During Labor',
    description: 'Preferences for staff visits and monitoring',
    icon: 'AlertCircle',
    allowCustom: true,
    options: [
      { value: 'minimal', label: 'Prefer minimal disruptions', birthPlanText: 'We prefer limited interruptions during labor to allow focus and rest.', isPopular: true },
      { value: 'standard', label: 'Standard monitoring okay', birthPlanText: 'Standard monitoring and check-ins are acceptable.' },
    ],
  },
  {
    id: 'quiet_labor_environment',
    sectionId: 'during_labor',
    title: 'Quiet Environment',
    description: 'Atmosphere preferences during labor',
    icon: 'Moon',
    allowCustom: true,
    options: [
      { value: 'quiet', label: 'Dim lights/quiet voices preferred', birthPlanText: 'We prefer dim lights and quiet voices during labor.', isPopular: true },
      { value: 'no_preference', label: 'No preference', birthPlanText: 'Standard hospital environment is fine.' },
    ],
  },

  // ============================================
  // DURING LABOR
  // ============================================
  {
    id: 'pain_management',
    sectionId: 'during_labor',
    title: 'Pain Management',
    description: 'An epidural is regional anesthesia that blocks pain in the lower body while allowing you to remain awake and alert. It provides effective pain relief but may limit your ability to move and can lengthen labor. Unmedicated birth allows full mobility and often results in shorter recovery time. Nitrous oxide (laughing gas) takes the edge off pain while maintaining mobility. There\'s no "right" choice - some people plan ahead, while others prefer to decide in the moment based on how labor progresses.',
    icon: 'Heart',
    allowCustom: true,
    quizQuestionId: 'pain_approach',
    options: [
      { value: 'natural', label: 'Unmedicated/natural', birthPlanText: 'We are planning an unmedicated birth. Please do not offer pain medication unless I ask.', isPopular: true, icon: 'Heart' },
      { value: 'open', label: 'Open to options as needed', birthPlanText: 'We are open to pain management options and will decide during labor.', isPopular: true, icon: 'AlertCircle' },
      { value: 'epidural', label: 'Planning epidural', birthPlanText: 'We plan to request an epidural during labor.', icon: 'Syringe' },
      { value: 'nitrous', label: 'Nitrous oxide preferred', birthPlanText: 'We would like to use nitrous oxide (laughing gas) for pain management.', icon: 'Wind' },
    ],
  },
  {
    id: 'fetal_monitoring',
    sectionId: 'during_labor',
    title: 'Fetal Monitoring',
    description: 'Fetal monitoring tracks your baby\'s heart rate during labor. Continuous monitoring keeps you connected to a machine throughout labor, which can limit movement but provides constant data. Intermittent monitoring checks baby\'s heart rate every 15-30 minutes using a handheld doppler, allowing you to move freely, use the shower, and change positions. For low-risk pregnancies, research shows intermittent monitoring is just as safe as continuous monitoring and may lead to fewer interventions.',
    icon: 'Activity',
    allowCustom: true,
    quizQuestionId: 'fetal_monitoring',
    options: [
      { value: 'continuous', label: 'Continuous monitoring', birthPlanText: 'Continuous fetal monitoring is acceptable.' },
      { value: 'intermittent', label: 'Intermittent monitoring', birthPlanText: 'We prefer intermittent fetal monitoring to allow freedom of movement.', isPopular: true },
      { value: 'wireless', label: 'Wireless/waterproof monitors', birthPlanText: 'If continuous monitoring is needed, we prefer wireless/waterproof monitors.', isPopular: true },
    ],
  },
  {
    id: 'iv_preference',
    sectionId: 'during_labor',
    title: 'IV vs Hep Lock',
    description: 'Preference for IV access during labor',
    icon: 'Syringe',
    allowCustom: true,

    options: [
      { value: 'iv', label: 'Continuous IV is fine', birthPlanText: 'Continuous IV fluids are acceptable.' },
      { value: 'heplock', label: 'Hep lock only', birthPlanText: 'We prefer a hep lock instead of continuous IV fluids.', isPopular: true },
      { value: 'neither', label: 'No IV access if possible', birthPlanText: 'We prefer no IV access unless medically necessary.' },
    ],
  },
  {
    id: 'eating_drinking',
    sectionId: 'during_labor',
    title: 'Eating & Drinking',
    description: 'Food and beverage during labor',
    icon: 'Coffee',
    allowCustom: true,

    options: [
      { value: 'yes', label: 'Eat and drink freely', birthPlanText: 'I would like to eat and drink as desired during labor.', isPopular: true },
      { value: 'clear_liquids', label: 'Clear liquids only', birthPlanText: 'Clear liquids during labor are acceptable.' },
      { value: 'follow_policy', label: 'Follow hospital policy', birthPlanText: 'We will follow hospital policy regarding eating and drinking.' },
    ],
  },
  {
    id: 'movement_positions',
    sectionId: 'during_labor',
    title: 'Movement & Positioning',
    description: 'Freedom to move and change positions',
    icon: 'Move',
    allowCustom: true,
    hiddenFor: ['planned_csection'],
    quizQuestionId: 'movement_labor',
    options: [
      { value: 'freedom', label: 'Freedom to move', birthPlanText: 'I would like the freedom to move and change positions throughout labor.', isPopular: true },
      { value: 'upright', label: 'Prefer upright positions', birthPlanText: 'I prefer upright and active positions during labor.', isPopular: true },
      { value: 'bed', label: 'In bed is fine', birthPlanText: 'Laboring in bed is acceptable to me.' },
    ],
  },
  {
    id: 'hydrotherapy',
    sectionId: 'during_labor',
    title: 'Hydrotherapy',
    description: 'Use of water for pain relief',
    icon: 'Droplet',
    allowCustom: true,
    hiddenFor: ['planned_csection'],
    options: [
      { value: 'tub', label: 'Want to use tub/pool', birthPlanText: 'I would like to use a tub or birthing pool during labor.', isPopular: true },
      { value: 'shower', label: 'Shower available', birthPlanText: 'I may use the shower for pain relief.' },
      { value: 'not_interested', label: 'Not planning to use', birthPlanText: 'We are not planning to use hydrotherapy.' },
    ],
  },
  {
    id: 'labor_environment',
    sectionId: 'during_labor',
    title: 'Labor Environment',
    description: 'Setting the atmosphere during labor',
    icon: 'Lightbulb',
    allowCustom: true,
    options: [
      { value: 'dim_quiet', label: 'Dim lighting and quiet', birthPlanText: 'We prefer dim lighting and a quiet environment.', isPopular: true },
      { value: 'music', label: 'Our own music', birthPlanText: 'We will bring our own music to play during labor.', isPopular: true },
      { value: 'aromatherapy', label: 'Aromatherapy', birthPlanText: 'We would like to use aromatherapy during labor.' },
      { value: 'standard', label: 'Standard hospital environment', birthPlanText: 'Standard hospital environment is fine.' },
    ],
  },
  {
    id: 'medical_students',
    sectionId: 'during_labor',
    title: 'Medical Students & Observers',
    description: 'Preference for students or residents observing your birth',
    icon: 'GraduationCap',
    allowCustom: true,
    quizQuestionId: 'medical_students',
    options: [
      { value: 'welcome', label: 'Students welcome', birthPlanText: 'We are comfortable with medical students or residents observing.', isPopular: true },
      { value: 'prefer_not', label: 'No students or observers', birthPlanText: 'We prefer that no medical students or residents observe or participate in our care.' },
      { value: 'ask_first', label: 'Ask us first each time', birthPlanText: 'Please ask our permission before any students or observers enter the room.', isPopular: true },
    ],
  },
  {
    id: 'gbs_antibiotics',
    sectionId: 'during_labor',
    title: 'GBS Antibiotics',
    description: 'Preference if tested positive for Group B Strep',
    icon: 'Pill',
    allowCustom: true,

    options: [
      { value: 'accept', label: 'Accept if GBS positive', birthPlanText: 'If GBS positive, please administer IV antibiotics as recommended.', isPopular: true, defaultStance: 'desired' },
      { value: 'decline', label: 'Decline antibiotics', birthPlanText: 'We decline GBS antibiotics and accept responsibility for this decision.', defaultStance: 'declined' },
      { value: 'natural', label: 'Discuss alternatives', birthPlanText: 'We would like to discuss alternative/natural protocols for GBS.' },
    ],
  },
  {
    id: 'pushing_position',
    sectionId: 'during_labor',
    title: 'Pushing Positions',
    description: 'Preferred positions for the pushing stage',
    icon: 'Navigation',
    allowCustom: true,
    hiddenFor: ['planned_csection'],

    options: [
      { value: 'freedom', label: 'Freedom to choose', birthPlanText: 'I would like the freedom to push in different positions as feels natural.', isPopular: true },
      { value: 'upright', label: 'Upright positions', birthPlanText: 'I prefer upright pushing positions (squatting, hands-and-knees, etc.).', isPopular: true },
      { value: 'standard', label: 'Standard position', birthPlanText: 'Standard pushing position is acceptable.' },
    ],
  },
  {
    id: 'directed_pushing',
    sectionId: 'during_labor',
    title: 'Directed vs Spontaneous Pushing',
    description: 'Directed pushing involves coached breath-holding and pushing with counting (often "purple pushing"). Spontaneous pushing means following your body\'s natural urges to push, which often results in shorter pushes with more frequent breaks. Research suggests that spontaneous pushing may reduce the risk of perineal tearing and fetal distress, while directed pushing can be helpful if you have an epidural and can\'t feel the urge to push clearly. Many care providers now encourage a hybrid approach, using your instincts when possible but offering guidance if needed.',
    icon: 'Wind',
    allowCustom: true,
    hiddenFor: ['planned_csection'],

    options: [
      { value: 'spontaneous', label: 'Spontaneous pushing', birthPlanText: 'I prefer to push spontaneously, following my body\'s natural urges rather than coached counting.', isPopular: true },
      { value: 'directed', label: 'Directed/coached pushing', birthPlanText: 'I would like coached, directed pushing with counting.' },
      { value: 'flexible', label: 'Flexible approach', birthPlanText: 'I am open to either directed or spontaneous pushing depending on what feels right.' },
    ],
  },
  {
    id: 'perineal_support',
    sectionId: 'during_labor',
    title: 'Perineal Support & Tearing',
    description: 'Preferences for preventing tearing',
    icon: 'Shield',
    allowCustom: true,
    hiddenFor: ['planned_csection'],

    options: [
      { value: 'natural', label: 'Natural stretching', birthPlanText: 'I prefer to allow natural stretching and avoid episiotomy unless absolutely necessary.', isPopular: true },
      { value: 'support', label: 'Warm compresses & massage', birthPlanText: 'Please use warm compresses and perineal massage to help prevent tearing.', isPopular: true },
      { value: 'episiotomy_if_needed', label: 'Episiotomy if recommended', birthPlanText: 'I trust my provider to recommend episiotomy if medically beneficial.' },
    ],
  },
  {
    id: 'birth_mirror',
    sectionId: 'at_birth',
    title: 'Mirror to See Baby Emerge',
    description: 'Watching baby being born',
    icon: 'Eye',
    allowCustom: true,
    hiddenFor: ['planned_csection'],
    options: [
      { value: 'yes', label: 'Yes please', birthPlanText: 'I would like a mirror so I can see baby emerge.', isPopular: true },
      { value: 'no', label: 'No thank you', birthPlanText: 'I prefer not to use a mirror during delivery.' },
    ],
  },
  {
    id: 'unplanned_csection',
    sectionId: 'csection',
    title: 'Unplanned C-Section Preferences',
    description: 'If cesarean becomes necessary',
    icon: 'AlertCircle',
    allowCustom: true,

    options: [
      { value: 'gentle', label: 'Request gentle C-section', birthPlanText: 'If a C-section becomes necessary, we would like gentle/family-centered techniques when safely possible (clear drape, skin-to-skin in OR, etc.).', isPopular: true },
      { value: 'partner_present', label: 'Partner must be present', birthPlanText: 'If a C-section is needed, it is very important that my partner be present.' },
      { value: 'standard', label: 'Standard protocol', birthPlanText: 'If a C-section becomes necessary, please follow standard hospital protocol.' },
      { value: 'discuss', label: 'Discuss all options first', birthPlanText: 'If a C-section becomes necessary, please discuss all available options with us.' },
    ],
  },

  // ============================================
  // AT & IMMEDIATELY AFTER BIRTH
  // ============================================
  {
    id: 'skin_to_skin',
    sectionId: 'at_birth',
    title: 'Immediate Skin-to-Skin',
    description: 'Skin-to-skin contact immediately after birth helps regulate baby\'s temperature, heart rate, and breathing. It promotes bonding, supports successful breastfeeding initiation, and helps stabilize blood sugar levels. Research shows that babies who experience immediate skin-to-skin are calmer, cry less, and are more likely to breastfeed successfully. The first hour after birth, often called the "golden hour," is an especially powerful time for this contact.',
    icon: 'Heart',
    allowCustom: true,
    quizQuestionId: 'skin_to_skin',
    options: [
      { value: 'immediate', label: 'Immediately, uninterrupted', birthPlanText: 'Please place baby directly on my chest for immediate skin-to-skin contact. We want this to be uninterrupted for at least the first hour.', isPopular: true, icon: 'Heart', defaultStance: 'desired' },
      { value: 'after_assessment', label: 'After initial assessment', birthPlanText: 'We would like skin-to-skin after the initial newborn assessment.', icon: 'Clock' },
      { value: 'partner_backup', label: 'Partner if I\'m unable', birthPlanText: 'Please place baby skin-to-skin with my partner if I am unable.', isPopular: true, icon: 'Users' },
    ],
  },
  {
    id: 'cord_clamping',
    sectionId: 'at_birth',
    title: 'Cord Clamping Timing',
    description: 'Delaying cord clamping for 1-3 minutes (or longer) allows more blood to transfer from the placenta to your baby. This extra blood provides additional iron stores that can last for the first 6 months of life, reducing the risk of anemia. It also helps with baby\'s transition to breathing on their own and supports cardiovascular stability. The World Health Organization recommends waiting at least 1-3 minutes before clamping, and many providers now consider this standard practice.',
    icon: 'Link',
    allowCustom: true,
    quizQuestionId: 'cord_clamping',
    options: [
      { value: 'immediate', label: 'Clamp immediately', birthPlanText: 'Clamp the cord immediately after birth.', icon: 'Scissors', defaultStance: 'declined' },
      { value: '1min', label: 'Wait at least 1 minute', birthPlanText: 'Please wait at least 1 minute before clamping the cord.', isPopular: true, icon: 'Clock' },
      { value: '3-5min', label: 'Wait 3-5 minutes', birthPlanText: 'Please delay cord clamping for 3-5 minutes.', isPopular: true, icon: 'Clock' },
      { value: 'until_stops', label: 'Until cord stops pulsing', birthPlanText: 'Please wait until the cord stops pulsing before clamping.', icon: 'Clock', defaultStance: 'desired' },
    ],
  },
  {
    id: 'who_cuts_cord',
    sectionId: 'at_birth',
    title: 'Who Cuts the Cord',
    description: 'Who will cut the umbilical cord',
    icon: 'Scissors',
    allowCustom: true,
    options: [
      { value: 'partner', label: 'Partner cuts cord', birthPlanText: 'My partner would like to cut the umbilical cord.', isPopular: true },
      { value: 'provider', label: 'Provider cuts cord', birthPlanText: 'Our provider may cut the umbilical cord.' },
      { value: 'mother', label: 'Mother cuts cord', birthPlanText: 'I would like to cut the cord myself.' },
    ],
  },
  {
    id: 'cord_blood_banking',
    sectionId: 'at_birth',
    title: 'Cord Blood Banking',
    description: 'Collecting and storing cord blood',
    icon: 'Database',
    allowCustom: true,
    quizQuestionId: 'cord_blood',
    options: [
      { value: 'private', label: 'Private banking', birthPlanText: 'We will be privately banking cord blood. Our kit is ready.' },
      { value: 'public', label: 'Donate to public bank', birthPlanText: 'We would like to donate cord blood to a public bank if available.' },
      { value: 'no', label: 'No cord blood banking', birthPlanText: 'We do not plan to bank cord blood.', isPopular: true },
    ],
  },
  {
    id: 'placenta',
    sectionId: 'at_birth',
    title: 'Placenta Plans',
    description: 'What to do with the placenta',
    icon: 'Leaf',
    allowCustom: true,
    quizQuestionId: 'placenta',
    options: [
      { value: 'dispose', label: 'Hospital disposal', birthPlanText: 'The hospital may dispose of the placenta.', isPopular: true },
      { value: 'encapsulate', label: 'Keep for encapsulation', birthPlanText: 'We will be keeping the placenta for encapsulation. Please place it in our provided container.', isPopular: true },
      { value: 'keep', label: 'Keep for other purposes', birthPlanText: 'We would like to keep the placenta.' },
    ],
  },
  {
    id: 'physiological_placenta',
    sectionId: 'at_birth',
    title: 'Physiological Placenta Delivery',
    description: 'Third stage management approach',
    icon: 'Clock',
    allowCustom: true,
    options: [
      { value: 'natural', label: 'Allow time for natural delivery', birthPlanText: 'I prefer physiological delivery of the placenta, allowing time for it to naturally separate and deliver.', isPopular: true },
      { value: 'standard', label: 'Standard management fine', birthPlanText: 'Active management of the third stage is acceptable.' },
    ],
  },
  {
    id: 'see_placenta',
    sectionId: 'at_birth',
    title: 'See the Placenta',
    description: 'Viewing the placenta after birth',
    icon: 'Eye',
    allowCustom: true,
    options: [
      { value: 'yes', label: 'Yes', birthPlanText: 'We would like to see and examine the placenta.' },
      { value: 'no', label: 'No', birthPlanText: 'We do not need to see the placenta.' },
    ],
  },
  {
    id: 'golden_hour',
    sectionId: 'at_birth',
    title: 'The Golden Hour',
    description: 'The first hour after birth is called the "golden hour" because it\'s a uniquely powerful time for bonding and establishing breastfeeding. When given uninterrupted skin-to-skin contact, babies naturally progress through stages that lead to self-attachment and their first feeding. During this time, baby is in a quiet alert state, taking in your smell, sound, and warmth. Routine procedures like weighing, measuring, and bathing can wait without any medical risk, and protecting this time can set the stage for successful breastfeeding and secure attachment.',
    icon: 'Sun',
    allowCustom: true,
    quizQuestionId: 'golden_hour',
    options: [
      { value: 'protected', label: 'Protected golden hour', birthPlanText: 'Please protect the first hour after birth for uninterrupted bonding time. Delay all non-urgent procedures.', isPopular: true },
      { value: 'flexible', label: 'Flexible timing', birthPlanText: 'We are flexible about timing of assessments and procedures.' },
    ],
  },
  {
    id: 'first_feeding',
    sectionId: 'at_birth',
    title: 'First Feeding',
    description: 'Initiating breastfeeding or bottle feeding',
    icon: 'Baby',
    allowCustom: true,
    options: [
      { value: 'immediate_breast', label: 'Immediate breastfeeding', birthPlanText: 'I would like to initiate breastfeeding within the first hour.', isPopular: true },
      { value: 'when_ready', label: 'When baby shows cues', birthPlanText: 'We will feed baby when showing hunger cues.' },
      { value: 'bottle', label: 'Bottle feeding', birthPlanText: 'We will be bottle feeding from the start.' },
    ],
  },

  // ============================================
  // NEWBORN PROCEDURES
  // ============================================
  {
    id: 'vitamin_k',
    sectionId: 'newborn_procedures',
    title: 'Vitamin K Shot',
    description: 'Vitamin K helps with blood clotting and prevents a rare but serious bleeding disorder called Vitamin K Deficiency Bleeding (VKDB). Newborns are born with very low levels of vitamin K because it doesn\'t cross the placenta easily and isn\'t in breast milk in sufficient amounts. The single injection at birth provides protection for the first few months of life. VKDB can cause bleeding in the brain or internal organs and can be life-threatening. The injection is recommended by the American Academy of Pediatrics.',
    icon: 'Syringe',
    allowCustom: true,
    quizQuestionId: 'vitamin_k',
    options: [
      { value: 'accept', label: 'Give Vitamin K shot', birthPlanText: 'Please give the Vitamin K injection as recommended.', isPopular: true, icon: 'Shield', defaultStance: 'desired' },
      { value: 'oral', label: 'Oral Vitamin K', birthPlanText: 'We prefer oral Vitamin K administration over the injection.', icon: 'Pill' },
      { value: 'delay', label: 'Delay for bonding', birthPlanText: 'Please delay the Vitamin K shot for at least one hour to allow for bonding.', icon: 'Clock' },
      { value: 'decline', label: 'Decline', birthPlanText: 'We decline the Vitamin K injection.', icon: 'AlertCircle', defaultStance: 'declined' },
    ],
  },
  {
    id: 'eye_ointment',
    sectionId: 'newborn_procedures',
    title: 'Eye Ointment (Erythromycin)',
    description: 'Antibiotic eye ointment is applied to prevent serious eye infections that could be transmitted during birth, particularly gonorrhea and chlamydia. These infections can cause blindness if left untreated. The ointment is typically applied within the first hour after birth and is required by law in many states. Some parents prefer to delay it briefly to allow for initial eye contact and bonding, which is often an acceptable compromise. The ointment can cause temporary blurry vision for baby but is not painful.',
    icon: 'Eye',
    allowCustom: true,
    quizQuestionId: 'eye_ointment',
    options: [
      { value: 'accept', label: 'Apply ointment', birthPlanText: 'Please apply the erythromycin eye ointment.', isPopular: true, defaultStance: 'desired' },
      { value: 'delay', label: 'Delay for bonding', birthPlanText: 'Please delay the eye ointment to allow for initial bonding and breastfeeding.', isPopular: true },
      { value: 'decline', label: 'Decline', birthPlanText: 'We decline the erythromycin eye ointment.', defaultStance: 'declined' },
    ],
  },
  {
    id: 'hep_b_vaccine',
    sectionId: 'newborn_procedures',
    title: 'Hepatitis B Vaccine',
    description: 'First dose typically given within 24 hours',
    icon: 'Shield',
    allowCustom: true,
    quizQuestionId: 'hep_b_vaccine',
    options: [
      { value: 'accept', label: 'Give at birth', birthPlanText: 'Please administer the Hepatitis B vaccine at birth.', defaultStance: 'desired' },
      { value: 'delay', label: 'Delay until pediatrician', birthPlanText: 'We prefer to delay the Hepatitis B vaccine until our pediatrician visit.', isPopular: true },
      { value: 'decline', label: 'Decline', birthPlanText: 'We decline the Hepatitis B vaccine at birth.', defaultStance: 'declined' },
    ],
  },
  {
    id: 'newborn_screening',
    sectionId: 'newborn_procedures',
    title: 'Newborn Screening (Heel Prick)',
    description: 'Blood test for genetic conditions',
    icon: 'TestTube',
    allowCustom: true,

    options: [
      { value: 'accept', label: 'Do the screening', birthPlanText: 'Please perform the standard newborn screening tests.', isPopular: true, defaultStance: 'desired' },
      { value: 'decline', label: 'Decline', birthPlanText: 'We decline the newborn screening tests.', defaultStance: 'declined' },
    ],
  },
  {
    id: 'hearing_test',
    sectionId: 'newborn_procedures',
    title: 'Hearing Test',
    description: 'Quick, painless hearing screening',
    icon: 'Activity',
    allowCustom: true,

    options: [
      { value: 'accept', label: 'Do the hearing test', birthPlanText: 'Please perform the newborn hearing screening.', isPopular: true, defaultStance: 'desired' },
      { value: 'decline', label: 'Decline', birthPlanText: 'We decline the hearing screening at this time.', defaultStance: 'declined' },
    ],
  },
  {
    id: 'bath_timing',
    sectionId: 'newborn_procedures',
    title: 'First Bath Timing',
    description: 'Delaying your baby\'s first bath has several benefits. The creamy white coating on newborns (vernix) is a natural moisturizer and provides antibacterial protection. Babies are also born with their mother\'s scent, which helps with bonding and breastfeeding. Bathing too soon can cause temperature instability and may disrupt the first feeding. The World Health Organization recommends waiting at least 24 hours before the first bath, and many experts suggest waiting even longer. When you do bathe baby, warm sponge baths are gentler than full immersion until the umbilical cord falls off.',
    icon: 'Bath',
    allowCustom: true,
    quizQuestionId: 'bath_timing',
    options: [
      { value: 'hospital_recommend', label: 'Hospital recommendation', birthPlanText: 'The first bath may be given when recommended by nursing staff.' },
      { value: '24hrs', label: 'Delay at least 24 hours', birthPlanText: 'Please delay baby\'s first bath for at least 24 hours.', isPopular: true },
      { value: '48hrs', label: 'Delay at least 48 hours', birthPlanText: 'Please delay baby\'s first bath for at least 48 hours.', isPopular: true },
      { value: 'parents_only', label: 'Parents will give first bath', birthPlanText: 'We would like to give baby\'s first bath ourselves.' },
    ],
  },
  {
    id: 'circumcision',
    sectionId: 'newborn_procedures',
    title: 'Circumcision (if applicable)',
    description: 'For baby boys',
    icon: 'Baby',
    allowCustom: true,
    quizQuestionId: 'circumcision',
    options: [
      { value: 'yes', label: 'Circumcise at hospital', birthPlanText: 'We would like our son circumcised before leaving the hospital.', icon: 'Shield', defaultStance: 'desired' },
      { value: 'delayed', label: 'By our own provider', birthPlanText: 'We will arrange circumcision with our own provider after discharge.', icon: 'Clock' },
      { value: 'no', label: 'No circumcision', birthPlanText: 'We do not want circumcision performed.', isPopular: true, icon: 'AlertCircle', defaultStance: 'declined' },
      { value: 'na', label: 'Not applicable', birthPlanText: '', icon: 'Circle' },
    ],
  },
  {
    id: 'procedure_timing',
    sectionId: 'newborn_procedures',
    title: 'Timing of Procedures',
    description: 'When non-urgent procedures are performed',
    icon: 'Clock',
    allowCustom: true,
    options: [
      { value: 'delay_golden_hour', label: 'Delay during golden hour', birthPlanText: 'Please delay all non-urgent procedures for at least the first hour to allow for bonding.', isPopular: true },
      { value: 'ask_first', label: 'Ask before each procedure', birthPlanText: 'Please ask our permission before each procedure and explain what will be done.' },
      { value: 'standard', label: 'Standard timing', birthPlanText: 'Standard timing for procedures is acceptable.' },
    ],
  },

  // ============================================
  // HOSPITAL STAY
  // ============================================
  {
    id: 'rooming_in',
    sectionId: 'hospital_stay',
    title: 'Rooming In',
    description: 'Rooming-in means keeping your baby in your hospital room instead of in the nursery. Research shows that rooming-in supports bonding, makes breastfeeding easier by allowing you to respond quickly to feeding cues, and helps you learn your baby\'s unique patterns. It also reduces the risk of hospital errors or mix-ups. However, it can be tiring for new parents who are recovering from birth. Many hospitals now encourage rooming-in but still offer nursery care when parents need rest.',
    icon: 'Home',
    allowCustom: true,
    quizQuestionId: 'rooming_in',
    options: [
      { value: '24_7', label: 'Baby with us 24/7', birthPlanText: 'We want baby to room-in with us at all times.', isPopular: true, icon: 'Heart' },
      { value: 'nursery_option', label: 'May use nursery for rest', birthPlanText: 'We prefer rooming-in but may use the nursery for rest periods.', isPopular: true, icon: 'Moon' },
    ],
  },
  {
    id: 'feeding_support',
    sectionId: 'hospital_stay',
    title: 'Feeding Support',
    description: 'Lactation and feeding assistance',
    icon: 'HeartHandshake',
    allowCustom: true,
    quizQuestionId: 'feeding',
    options: [
      { value: 'lactation', label: 'Request lactation consultant', birthPlanText: 'We would like assistance from a lactation consultant.', isPopular: true, icon: 'HeartHandshake' },
      { value: 'breastfeed_only', label: 'Breastfeeding only', birthPlanText: 'We plan to exclusively breastfeed. Please do not offer formula or pacifiers without our consent.', isPopular: true, icon: 'Heart' },
      { value: 'formula', label: 'Formula feeding', birthPlanText: 'We will be formula feeding.', icon: 'Baby' },
      { value: 'combo', label: 'Combination feeding', birthPlanText: 'We plan to combination feed (breast milk and formula).', icon: 'AlertCircle' },
    ],
  },
  {
    id: 'pacifier',
    sectionId: 'hospital_stay',
    title: 'Pacifier Use',
    description: 'Whether to offer pacifiers',
    icon: 'Circle',
    allowCustom: true,
    quizQuestionId: 'pacifier',
    options: [
      { value: 'no', label: 'No pacifiers', birthPlanText: 'Please do not give baby a pacifier.', isPopular: true, icon: 'AlertCircle', defaultStance: 'declined' },
      { value: 'if_needed', label: 'Only if medically needed', birthPlanText: 'Pacifier use is acceptable only if medically necessary.', icon: 'AlertCircle' },
      { value: 'yes', label: 'Pacifiers are fine', birthPlanText: 'Pacifier use is acceptable.', icon: 'Shield', defaultStance: 'desired' },
    ],
  },
  {
    id: 'visitors',
    sectionId: 'hospital_stay',
    title: 'Visitor Policy',
    description: 'Who can visit and when',
    icon: 'Users',
    allowCustom: true,
    quizQuestionId: 'visitors',
    options: [
      { value: 'immediate_family', label: 'Immediate family only', birthPlanText: 'We prefer only immediate family members to visit.', isPopular: true },
      { value: 'no_visitors', label: 'No visitors initially', birthPlanText: 'We would like no visitors for the first 24 hours to focus on bonding.', isPopular: true },
      { value: 'limited', label: 'Limited visitors', birthPlanText: 'We would like to keep visitors limited and brief.' },
      { value: 'open', label: 'Open to visitors', birthPlanText: 'We are comfortable with visitors as they come.' },
    ],
  },
  {
    id: 'length_of_stay',
    sectionId: 'hospital_stay',
    title: 'Length of Stay',
    description: 'Preference for hospital stay duration',
    icon: 'Calendar',
    allowCustom: true,
    options: [
      { value: 'minimum', label: 'Minimum required stay', birthPlanText: 'We prefer to be discharged as soon as safely possible.', isPopular: true },
      { value: 'standard', label: 'Standard stay', birthPlanText: 'We are comfortable with the standard length of stay.' },
      { value: 'extended', label: 'Extended if needed', birthPlanText: 'We would like to stay longer if we feel we need more support.' },
    ],
  },
  {
    id: 'quiet_environment',
    sectionId: 'hospital_stay',
    title: 'Room Environment',
    description: 'Preferences for room atmosphere',
    icon: 'Moon',
    allowCustom: true,
    options: [
      { value: 'quiet', label: 'Quiet and minimal interruptions', birthPlanText: 'We prefer a quiet environment with minimal interruptions for rest and bonding.', isPopular: true },
      { value: 'standard', label: 'Standard hospital routine', birthPlanText: 'Standard hospital routine and check-ins are fine.' },
    ],
  },

  // ============================================
  // C-SECTION (if needed)
  // ============================================
  {
    id: 'gentle_csection',
    sectionId: 'csection',
    title: 'Gentle C-Section Techniques',
    description: 'Family-centered approach to cesarean',
    icon: 'Heart',
    allowCustom: true,
    quizQuestionId: 'csection_approach',
    options: [
      { value: 'yes', label: 'Request gentle C-section', birthPlanText: 'We would like a gentle/family-centered C-section approach when possible.', isPopular: true },
      { value: 'discuss', label: 'Discuss with surgeon', birthPlanText: 'We would like to discuss gentle C-section options with our surgeon.' },
      { value: 'standard', label: 'Standard C-section', birthPlanText: 'Standard C-section procedures are acceptable.' },
    ],
  },
  {
    id: 'clear_drape',
    sectionId: 'csection',
    title: 'Clear Drape',
    description: 'Ability to see baby being born',
    icon: 'Eye',
    allowCustom: true,

    options: [
      { value: 'yes', label: 'Clear drape or lower at birth', birthPlanText: 'We would like a clear drape or to have the drape lowered so we can see baby being born.', isPopular: true },
      { value: 'no', label: 'Standard drape', birthPlanText: 'Standard drape is fine; we prefer not to watch the procedure.' },
    ],
  },
  {
    id: 'csection_skin_to_skin',
    sectionId: 'csection',
    title: 'Skin-to-Skin in OR',
    description: 'Immediate contact during C-section',
    icon: 'Heart',
    allowCustom: true,

    options: [
      { value: 'immediate', label: 'Immediate in OR', birthPlanText: 'Please place baby skin-to-skin with me in the operating room as soon as possible.', isPopular: true },
      { value: 'recovery', label: 'In recovery room', birthPlanText: 'We would like skin-to-skin contact to begin in the recovery room.' },
      { value: 'partner', label: 'Partner can do skin-to-skin', birthPlanText: 'My partner can do skin-to-skin in the OR while I am being closed.', isPopular: true },
    ],
  },
  {
    id: 'csection_music',
    sectionId: 'csection',
    title: 'Music During Surgery',
    description: 'Playing your own music',
    icon: 'Music',
    allowCustom: true,

    options: [
      { value: 'yes', label: 'We will bring music', birthPlanText: 'We would like to play our own music during the delivery.', isPopular: true },
      { value: 'no', label: 'No music needed', birthPlanText: 'No specific music preferences.' },
    ],
  },
  {
    id: 'csection_photos',
    sectionId: 'csection',
    title: 'Photos/Video During C-Section',
    description: 'Documenting the birth',
    icon: 'Camera',
    allowCustom: true,

    options: [
      { value: 'yes', label: 'Photos and/or video', birthPlanText: 'We would like to take photos and/or video during the birth.', isPopular: true },
      { value: 'photos_only', label: 'Photos only', birthPlanText: 'We would like to take photos but not video.' },
      { value: 'no', label: 'No photos or video', birthPlanText: 'We prefer no photos or video during the procedure.' },
    ],
  },
  {
    id: 'partner_presence_csection',
    sectionId: 'csection',
    title: 'Partner Presence',
    description: 'Partner in operating room',
    icon: 'Users',
    allowCustom: true,
    options: [
      { value: 'required', label: 'Partner must be present', birthPlanText: 'It is very important that my partner be present during the C-section.', isPopular: true },
      { value: 'preferred', label: 'Partner preferred', birthPlanText: 'We would like my partner to be present if possible.' },
    ],
  },
  {
    id: 'csection_delayed_cord',
    sectionId: 'csection',
    title: 'Delayed Cord Clamping',
    description: 'Timing of cord clamping during cesarean',
    icon: 'Clock',
    allowCustom: true,
    options: [
      { value: 'yes', label: 'Request delayed clamping', birthPlanText: 'Please delay cord clamping for at least 30-60 seconds if possible.', isPopular: true },
      { value: 'standard', label: 'Standard timing', birthPlanText: 'Standard cord clamping timing is acceptable.' },
    ],
  },
  {
    id: 'csection_explanation',
    sectionId: 'csection',
    title: 'Communication During Procedure',
    description: 'Updates during surgery',
    icon: 'MessageSquare',
    allowCustom: true,
    options: [
      { value: 'narrate', label: 'Explain what\'s happening', birthPlanText: 'Please explain what is happening during the procedure.', isPopular: true },
      { value: 'minimal', label: 'Minimal talking', birthPlanText: 'We prefer a quiet environment with minimal talking unless necessary.' },
    ],
  },
  {
    id: 'csection_arm_mobility',
    sectionId: 'csection',
    title: 'Arm Mobility During Surgery',
    description: 'Freedom of arm movement',
    icon: 'Move',
    allowCustom: true,
    options: [
      { value: 'not_strapped', label: 'Prefer not strapped down', birthPlanText: 'I prefer to have my arms free and not strapped down during the C-section.', isPopular: true },
      { value: 'standard', label: 'Standard procedure fine', birthPlanText: 'Standard arm positioning is acceptable.' },
    ],
  },
  {
    id: 'vaginal_seeding',
    sectionId: 'csection',
    title: 'Vaginal Seeding',
    description: 'Swabbing baby with maternal vaginal bacteria after C-section to support microbiome colonization. Requires screening for active infections beforehand.',
    icon: 'Droplets',
    allowCustom: true,
    quizQuestionId: 'csection_vaginal_seeding',
    options: [
      { value: 'yes', label: 'Yes, we plan to do vaginal seeding', birthPlanText: 'We plan to perform vaginal seeding after the C-section to support baby\'s microbiome.', isPopular: true },
      { value: 'discuss', label: 'Want to discuss with provider', birthPlanText: 'We are interested in vaginal seeding and would like to discuss it with our provider.' },
      { value: 'no', label: 'No vaginal seeding', birthPlanText: 'We do not plan to do vaginal seeding.' },
    ],
  },
  {
    id: 'avoid_general_anesthesia',
    sectionId: 'csection',
    title: 'Avoid General Anesthesia',
    description: 'Preference for regional anesthesia',
    icon: 'Shield',
    allowCustom: true,
    options: [
      { value: 'strongly_prefer_regional', label: 'Strongly prefer regional', birthPlanText: 'I strongly prefer regional anesthesia (spinal or epidural) over general anesthesia if safely possible.', isPopular: true },
      { value: 'open_to_needed', label: 'Open to what\'s needed', birthPlanText: 'I am open to whatever anesthesia type is medically appropriate.' },
    ],
  },
  {
    id: 'partner_catches_baby_csection',
    sectionId: 'csection',
    title: 'Partner Catches Baby (if possible)',
    description: 'Partner assistance in delivery',
    icon: 'Users',
    allowCustom: true,
    options: [
      { value: 'yes', label: 'Yes', birthPlanText: 'If possible and safe, we would like my partner to help catch/receive baby during the C-section.' },
      { value: 'no', label: 'No', birthPlanText: 'Standard delivery by medical team is preferred.' },
    ],
  },
]

// Helper function to get preferences by section
export function getPreferencesBySection(sectionId: string, birthType?: BirthType): PreferenceDefinition[] {
  return PREFERENCES.filter(p => {
    if (p.sectionId !== sectionId) return false
    if (birthType && p.hiddenFor?.includes(birthType)) return false
    return true
  })
}

// Helper function to get preference by ID
export function getPreferenceById(preferenceId: string): PreferenceDefinition | undefined {
  return PREFERENCES.find(p => p.id === preferenceId)
}

// Get default preference values for a section
// Initializes all preferences with their first "popular" option or first option
export function getDefaultPreferencesForSection(sectionId: string): Array<{
  preferenceId: string
  selectedOption: string | null
  isOmitted: boolean
  sortOrder: number
}> {
  const prefs = getPreferencesBySection(sectionId)
  return prefs.map((pref, index) => {
    // Find first popular option, or first option
    const defaultOption = pref.options.find(o => o.isPopular) || pref.options[0]
    return {
      preferenceId: pref.id,
      selectedOption: defaultOption?.value || null,
      isOmitted: false,
      sortOrder: index,
    }
  })
}
