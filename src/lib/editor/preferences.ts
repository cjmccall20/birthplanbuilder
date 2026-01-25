import type { PreferenceDefinition } from './editorTypes'

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
    options: [
      { value: 'hospital', label: 'Hospital', birthPlanText: 'We are planning a hospital birth.', isPopular: true },
      { value: 'birth_center', label: 'Birth center', birthPlanText: 'We are planning a birth center delivery.' },
      { value: 'home', label: 'Home birth', birthPlanText: 'We are planning a home birth.' },
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
    sectionId: 'pre_hospital',
    title: 'Admission Procedures',
    description: 'Preferences for hospital admission process',
    icon: 'Clipboard',
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

  // ============================================
  // DURING LABOR
  // ============================================
  {
    id: 'pain_management',
    sectionId: 'during_labor',
    title: 'Pain Management',
    description: 'Your general approach to managing labor pain',
    icon: 'Heart',
    allowCustom: true,
    quizQuestionId: 'pain_management',
    options: [
      { value: 'natural', label: 'Unmedicated/natural', birthPlanText: 'We are planning an unmedicated birth. Please do not offer pain medication unless I ask.', isPopular: true },
      { value: 'open', label: 'Open to options as needed', birthPlanText: 'We are open to pain management options and will decide during labor.', isPopular: true },
      { value: 'epidural', label: 'Planning epidural', birthPlanText: 'We plan to request an epidural during labor.' },
      { value: 'nitrous', label: 'Nitrous oxide preferred', birthPlanText: 'We would like to use nitrous oxide (laughing gas) for pain management.' },
    ],
  },
  {
    id: 'fetal_monitoring',
    sectionId: 'during_labor',
    title: 'Fetal Monitoring',
    description: 'How baby\'s heart rate is monitored during labor',
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
    quizQuestionId: 'iv_preference',
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
    quizQuestionId: 'eating_drinking',
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
    id: 'gbs_antibiotics',
    sectionId: 'during_labor',
    title: 'GBS Antibiotics',
    description: 'Preference if tested positive for Group B Strep',
    icon: 'Pill',
    allowCustom: true,
    quizQuestionId: 'gbs_antibiotics',
    options: [
      { value: 'accept', label: 'Accept if GBS positive', birthPlanText: 'If GBS positive, please administer IV antibiotics as recommended.', isPopular: true },
      { value: 'decline', label: 'Decline antibiotics', birthPlanText: 'We decline GBS antibiotics and accept responsibility for this decision.' },
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
    quizQuestionId: 'pushing_position',
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
    description: 'Coached pushing or following your body\'s urges',
    icon: 'Wind',
    allowCustom: true,
    quizQuestionId: 'directed_pushing',
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
    quizQuestionId: 'perineal_support',
    options: [
      { value: 'natural', label: 'Natural stretching', birthPlanText: 'I prefer to allow natural stretching and avoid episiotomy unless absolutely necessary.', isPopular: true },
      { value: 'support', label: 'Warm compresses & massage', birthPlanText: 'Please use warm compresses and perineal massage to help prevent tearing.', isPopular: true },
      { value: 'episiotomy_if_needed', label: 'Episiotomy if recommended', birthPlanText: 'I trust my provider to recommend episiotomy if medically beneficial.' },
    ],
  },
  {
    id: 'unplanned_csection',
    sectionId: 'during_labor',
    title: 'Unplanned C-Section Preferences',
    description: 'If cesarean becomes necessary',
    icon: 'AlertCircle',
    allowCustom: true,
    quizQuestionId: 'unplanned_csection_preferences',
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
    description: 'Baby placed on your chest right after birth',
    icon: 'Heart',
    allowCustom: true,
    quizQuestionId: 'skin_to_skin',
    options: [
      { value: 'immediate', label: 'Immediately, uninterrupted', birthPlanText: 'Please place baby directly on my chest for immediate skin-to-skin contact. We want this to be uninterrupted for at least the first hour.', isPopular: true },
      { value: 'after_assessment', label: 'After initial assessment', birthPlanText: 'We would like skin-to-skin after the initial newborn assessment.' },
      { value: 'partner_backup', label: 'Partner if I\'m unable', birthPlanText: 'Please place baby skin-to-skin with my partner if I am unable.', isPopular: true },
    ],
  },
  {
    id: 'cord_clamping',
    sectionId: 'at_birth',
    title: 'Cord Clamping Timing',
    description: 'When to clamp and cut the umbilical cord',
    icon: 'Link',
    allowCustom: true,
    quizQuestionId: 'cord_clamping',
    options: [
      { value: 'immediate', label: 'Clamp immediately', birthPlanText: 'Clamp the cord immediately after birth.' },
      { value: '1min', label: 'Wait at least 1 minute', birthPlanText: 'Please wait at least 1 minute before clamping the cord.', isPopular: true },
      { value: '3-5min', label: 'Wait 3-5 minutes', birthPlanText: 'Please delay cord clamping for 3-5 minutes.', isPopular: true },
      { value: 'until_stops', label: 'Until cord stops pulsing', birthPlanText: 'Please wait until the cord stops pulsing before clamping.' },
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
    quizQuestionId: 'cord_blood_banking',
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
    id: 'golden_hour',
    sectionId: 'at_birth',
    title: 'The Golden Hour',
    description: 'Uninterrupted time with baby after birth',
    icon: 'Sun',
    allowCustom: true,
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
    icon: 'Milk',
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
    description: 'Injection to help with blood clotting',
    icon: 'Syringe',
    allowCustom: true,
    quizQuestionId: 'vitamin_k',
    options: [
      { value: 'accept', label: 'Give Vitamin K shot', birthPlanText: 'Please give the Vitamin K injection as recommended.', isPopular: true },
      { value: 'oral', label: 'Oral Vitamin K', birthPlanText: 'We prefer oral Vitamin K administration over the injection.' },
      { value: 'delay', label: 'Delay for bonding', birthPlanText: 'Please delay the Vitamin K shot for at least one hour to allow for bonding.' },
      { value: 'decline', label: 'Decline', birthPlanText: 'We decline the Vitamin K injection.' },
    ],
  },
  {
    id: 'eye_ointment',
    sectionId: 'newborn_procedures',
    title: 'Eye Ointment (Erythromycin)',
    description: 'Antibiotic ointment to prevent eye infections',
    icon: 'Eye',
    allowCustom: true,
    quizQuestionId: 'eye_ointment',
    options: [
      { value: 'accept', label: 'Apply ointment', birthPlanText: 'Please apply the erythromycin eye ointment.', isPopular: true },
      { value: 'delay', label: 'Delay for bonding', birthPlanText: 'Please delay the eye ointment to allow for initial bonding and breastfeeding.', isPopular: true },
      { value: 'decline', label: 'Decline', birthPlanText: 'We decline the erythromycin eye ointment.' },
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
      { value: 'accept', label: 'Give at birth', birthPlanText: 'Please administer the Hepatitis B vaccine at birth.' },
      { value: 'delay', label: 'Delay until pediatrician', birthPlanText: 'We prefer to delay the Hepatitis B vaccine until our pediatrician visit.', isPopular: true },
      { value: 'decline', label: 'Decline', birthPlanText: 'We decline the Hepatitis B vaccine at birth.' },
    ],
  },
  {
    id: 'newborn_screening',
    sectionId: 'newborn_procedures',
    title: 'Newborn Screening (Heel Prick)',
    description: 'Blood test for genetic conditions',
    icon: 'TestTube',
    allowCustom: true,
    quizQuestionId: 'newborn_screening',
    options: [
      { value: 'accept', label: 'Do the screening', birthPlanText: 'Please perform the standard newborn screening tests.', isPopular: true },
      { value: 'decline', label: 'Decline', birthPlanText: 'We decline the newborn screening tests.' },
    ],
  },
  {
    id: 'hearing_test',
    sectionId: 'newborn_procedures',
    title: 'Hearing Test',
    description: 'Quick, painless hearing screening',
    icon: 'Ear',
    allowCustom: true,
    quizQuestionId: 'hearing_test',
    options: [
      { value: 'accept', label: 'Do the hearing test', birthPlanText: 'Please perform the newborn hearing screening.', isPopular: true },
      { value: 'decline', label: 'Decline', birthPlanText: 'We decline the hearing screening at this time.' },
    ],
  },
  {
    id: 'bath_timing',
    sectionId: 'newborn_procedures',
    title: 'First Bath Timing',
    description: 'When baby gets their first bath',
    icon: 'Bath',
    allowCustom: true,
    quizQuestionId: 'bath_delay',
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
      { value: 'yes', label: 'Circumcise at hospital', birthPlanText: 'We would like our son circumcised before leaving the hospital.' },
      { value: 'delayed', label: 'By our own provider', birthPlanText: 'We will arrange circumcision with our own provider after discharge.' },
      { value: 'no', label: 'No circumcision', birthPlanText: 'We do not want circumcision performed.', isPopular: true },
      { value: 'na', label: 'Not applicable', birthPlanText: '' },
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
    description: 'Baby stays in room vs. nursery',
    icon: 'Home',
    allowCustom: true,
    quizQuestionId: 'rooming_in',
    options: [
      { value: '24_7', label: 'Baby with us 24/7', birthPlanText: 'We want baby to room-in with us at all times.', isPopular: true },
      { value: 'nursery_option', label: 'May use nursery for rest', birthPlanText: 'We prefer rooming-in but may use the nursery for rest periods.', isPopular: true },
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
      { value: 'lactation', label: 'Request lactation consultant', birthPlanText: 'We would like assistance from a lactation consultant.', isPopular: true },
      { value: 'breastfeed_only', label: 'Breastfeeding only', birthPlanText: 'We plan to exclusively breastfeed. Please do not offer formula or pacifiers without our consent.', isPopular: true },
      { value: 'formula', label: 'Formula feeding', birthPlanText: 'We will be formula feeding.' },
      { value: 'combo', label: 'Combination feeding', birthPlanText: 'We plan to combination feed (breast milk and formula).' },
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
      { value: 'no', label: 'No pacifiers', birthPlanText: 'Please do not give baby a pacifier.', isPopular: true },
      { value: 'if_needed', label: 'Only if medically needed', birthPlanText: 'Pacifier use is acceptable only if medically necessary.' },
      { value: 'yes', label: 'Pacifiers are fine', birthPlanText: 'Pacifier use is acceptable.' },
    ],
  },
  {
    id: 'visitors',
    sectionId: 'hospital_stay',
    title: 'Visitor Policy',
    description: 'Who can visit and when',
    icon: 'Users',
    allowCustom: true,
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
    id: 'newborn_care_instruction',
    sectionId: 'hospital_stay',
    title: 'Newborn Care Instruction',
    description: 'Learning baby care skills',
    icon: 'BookOpen',
    allowCustom: true,
    options: [
      { value: 'comprehensive', label: 'Comprehensive instruction', birthPlanText: 'We would appreciate comprehensive instruction on bathing, diapering, and caring for baby.', isPopular: true },
      { value: 'basic', label: 'Basic guidance', birthPlanText: 'Basic newborn care guidance is sufficient.' },
      { value: 'experienced', label: 'We are experienced', birthPlanText: 'We are experienced with newborn care and do not need extensive instruction.' },
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
    quizQuestionId: 'gentle_csection',
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
    quizQuestionId: 'clear_drape',
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
    quizQuestionId: 'csection_skin_to_skin',
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
    quizQuestionId: 'csection_music',
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
    quizQuestionId: 'csection_photos',
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
]

// Helper function to get preferences by section
export function getPreferencesBySection(sectionId: string): PreferenceDefinition[] {
  return PREFERENCES.filter(p => p.sectionId === sectionId)
}

// Helper function to get preference by ID
export function getPreferenceById(preferenceId: string): PreferenceDefinition | undefined {
  return PREFERENCES.find(p => p.id === preferenceId)
}

// Get all preferences that map to quiz questions
export function getQuizMappedPreferences(): PreferenceDefinition[] {
  return PREFERENCES.filter(p => p.quizQuestionId)
}
