export interface QuizOption {
  value: string
  label: string
  birthPlanText: string
  isUnsure?: boolean
}

export interface QuizQuestion {
  id: string
  category: string
  title: string
  description: string
  learnMoreContent?: string
  options: QuizOption[]
  conditionalOn?: {
    questionId: string
    values: string[]
  }
}

export const quizQuestions: QuizQuestion[] = [
  // NEWBORN PROCEDURES
  {
    id: 'vitamin_k',
    category: 'Newborn Procedures',
    title: 'Vitamin K Shot',
    description: 'Vitamin K helps with blood clotting. Hospitals routinely give newborns a Vitamin K injection shortly after birth.',
    learnMoreContent: 'Vitamin K is essential for blood clotting. Newborns are born with low levels of Vitamin K, which can increase the risk of a rare but serious bleeding condition called Vitamin K Deficiency Bleeding (VKDB). The injection is given in the thigh muscle within the first few hours of life.',
    options: [
      { value: 'accept', label: 'Yes, give the Vitamin K shot', birthPlanText: 'Please give the Vitamin K injection as recommended.' },
      { value: 'oral', label: 'I prefer oral Vitamin K', birthPlanText: 'We prefer oral Vitamin K administration over the injection.' },
      { value: 'decline', label: 'No, we decline', birthPlanText: 'We decline the Vitamin K injection.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss Vitamin K options with us.', isUnsure: true },
    ],
  },
  {
    id: 'hep_b_vaccine',
    category: 'Newborn Procedures',
    title: 'Hepatitis B Vaccine',
    description: 'The Hepatitis B vaccine is typically offered within 24 hours of birth as the first dose of the series.',
    learnMoreContent: 'Hepatitis B is a liver infection. The vaccine is given at birth because the virus can be transmitted from mother to baby during delivery if the mother is infected. Many parents choose to delay this vaccine if the mother tests negative for Hep B.',
    options: [
      { value: 'accept', label: 'Yes, give at birth', birthPlanText: 'Please administer the Hepatitis B vaccine at birth.' },
      { value: 'delay', label: 'Delay until pediatrician visit', birthPlanText: 'We prefer to delay the Hepatitis B vaccine until our pediatrician visit.' },
      { value: 'decline', label: 'No, we decline', birthPlanText: 'We decline the Hepatitis B vaccine at birth.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss Hepatitis B vaccine timing with us.', isUnsure: true },
    ],
  },
  {
    id: 'eye_ointment',
    category: 'Newborn Procedures',
    title: 'Eye Ointment (Erythromycin)',
    description: 'Antibiotic eye ointment is applied to prevent eye infections that could be transmitted during vaginal delivery.',
    learnMoreContent: 'This prophylactic treatment was originally designed to prevent blindness from gonorrhea transmission during birth. Many parents who have tested negative for STIs choose to decline this treatment. The ointment can cause temporary blurry vision for baby.',
    options: [
      { value: 'accept', label: 'Yes, apply the ointment', birthPlanText: 'Please apply the erythromycin eye ointment.' },
      { value: 'delay', label: 'Delay for bonding first', birthPlanText: 'Please delay the eye ointment to allow for initial bonding and breastfeeding.' },
      { value: 'decline', label: 'No, we decline', birthPlanText: 'We decline the erythromycin eye ointment.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss eye ointment with us.', isUnsure: true },
    ],
  },
  {
    id: 'newborn_screening',
    category: 'Newborn Procedures',
    title: 'Newborn Screening (Heel Prick)',
    description: 'A blood sample is taken from baby\'s heel to screen for rare but serious genetic conditions.',
    learnMoreContent: 'Newborn screening tests for conditions like PKU, sickle cell disease, and hypothyroidism that can be treated if caught early. The specific conditions tested vary by state. Most parents accept this screening as it can identify treatable conditions.',
    options: [
      { value: 'accept', label: 'Yes, do the screening', birthPlanText: 'Please perform the standard newborn screening tests.' },
      { value: 'decline', label: 'No, we decline', birthPlanText: 'We decline the newborn screening tests.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss newborn screening with us.', isUnsure: true },
    ],
  },
  {
    id: 'hearing_test',
    category: 'Newborn Procedures',
    title: 'Hearing Test',
    description: 'A quick, painless test to check baby\'s hearing before leaving the hospital.',
    learnMoreContent: 'Early detection of hearing issues allows for earlier intervention, which can significantly improve language development. The test is non-invasive and uses either otoacoustic emissions (OAE) or auditory brainstem response (ABR).',
    options: [
      { value: 'accept', label: 'Yes, do the hearing test', birthPlanText: 'Please perform the newborn hearing screening.' },
      { value: 'decline', label: 'No, we decline', birthPlanText: 'We decline the hearing screening at this time.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss hearing screening with us.', isUnsure: true },
    ],
  },

  // IMMEDIATELY AFTER BIRTH
  {
    id: 'cord_clamping',
    category: 'After Birth',
    title: 'Cord Clamping Timing',
    description: 'When should the umbilical cord be clamped and cut after baby is born?',
    learnMoreContent: 'Delayed cord clamping allows more blood to transfer from the placenta to the baby, increasing iron stores and blood volume. The American College of Obstetricians recommends waiting at least 30-60 seconds. Some parents prefer waiting until the cord stops pulsing (typically 3-5 minutes).',
    options: [
      { value: 'immediate', label: 'Clamp immediately', birthPlanText: 'Clamp the cord immediately after birth.' },
      { value: '1min', label: 'Wait at least 1 minute', birthPlanText: 'Please wait at least 1 minute before clamping the cord.' },
      { value: '3-5min', label: 'Wait 3-5 minutes', birthPlanText: 'Please delay cord clamping for 3-5 minutes.' },
      { value: 'until_stops', label: 'Wait until cord stops pulsing', birthPlanText: 'Please wait until the cord stops pulsing before clamping.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss cord clamping timing with us.', isUnsure: true },
    ],
  },
  {
    id: 'cord_blood_banking',
    category: 'After Birth',
    title: 'Cord Blood Banking',
    description: 'Would you like to bank your baby\'s cord blood for potential future medical use?',
    learnMoreContent: 'Cord blood contains stem cells that may be used to treat certain diseases. You can bank privately (for your family only) or donate to a public bank. Private banking involves ongoing storage fees. Note: cord blood banking may require earlier cord clamping.',
    options: [
      { value: 'private', label: 'Yes, private banking', birthPlanText: 'We will be privately banking cord blood. Our kit is from [COMPANY NAME].' },
      { value: 'public', label: 'Donate to public bank', birthPlanText: 'We would like to donate cord blood to a public bank if available.' },
      { value: 'no', label: 'No cord blood banking', birthPlanText: 'We do not plan to bank cord blood.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss cord blood banking options with us.', isUnsure: true },
    ],
  },
  {
    id: 'skin_to_skin',
    category: 'After Birth',
    title: 'Immediate Skin-to-Skin',
    description: 'Placing baby directly on mother\'s bare chest immediately after birth.',
    learnMoreContent: 'Skin-to-skin contact helps regulate baby\'s temperature, heart rate, and breathing. It promotes bonding and breastfeeding success. The World Health Organization recommends immediate and uninterrupted skin-to-skin for at least one hour after birth.',
    options: [
      { value: 'immediate', label: 'Immediately, uninterrupted', birthPlanText: 'Please place baby directly on my chest for immediate skin-to-skin contact. We want this to be uninterrupted for at least the first hour.' },
      { value: 'after_assessment', label: 'After initial assessment', birthPlanText: 'We would like skin-to-skin after the initial newborn assessment.' },
      { value: 'partner_backup', label: 'Partner if I\'m unable', birthPlanText: 'Please place baby skin-to-skin with my partner if I am unable.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss skin-to-skin options with us.', isUnsure: true },
    ],
  },
  {
    id: 'bath_delay',
    category: 'After Birth',
    title: 'First Bath Timing',
    description: 'When would you like baby\'s first bath to occur?',
    learnMoreContent: 'Delaying the first bath preserves the vernix (protective coating on baby\'s skin), helps maintain body temperature, and supports early breastfeeding. The World Health Organization recommends waiting at least 24 hours. Some parents prefer to give the first bath themselves.',
    options: [
      { value: 'hospital_recommend', label: 'When hospital recommends', birthPlanText: 'The first bath may be given when recommended by nursing staff.' },
      { value: '24hrs', label: 'Delay at least 24 hours', birthPlanText: 'Please delay baby\'s first bath for at least 24 hours.' },
      { value: '48hrs', label: 'Delay at least 48 hours', birthPlanText: 'Please delay baby\'s first bath for at least 48 hours.' },
      { value: 'parents_only', label: 'Parents will give first bath', birthPlanText: 'We would like to give baby\'s first bath ourselves.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss bath timing with us.', isUnsure: true },
    ],
  },
  {
    id: 'placenta',
    category: 'After Birth',
    title: 'Placenta Plans',
    description: 'What would you like done with the placenta after delivery?',
    learnMoreContent: 'Some parents choose to keep the placenta for encapsulation (made into pills), burial, or other purposes. Others prefer hospital disposal. If keeping, let your hospital know in advance as some have specific policies.',
    options: [
      { value: 'dispose', label: 'Hospital disposal', birthPlanText: 'The hospital may dispose of the placenta.' },
      { value: 'encapsulate', label: 'Keep for encapsulation', birthPlanText: 'We will be keeping the placenta for encapsulation. Please place it in our provided container.' },
      { value: 'keep', label: 'Keep for other purposes', birthPlanText: 'We would like to keep the placenta.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss placenta options with us.', isUnsure: true },
    ],
  },

  // LABOR PREFERENCES
  {
    id: 'gbs_antibiotics',
    category: 'Labor Preferences',
    title: 'GBS Antibiotics (if GBS+)',
    description: 'If you test positive for Group B Strep, what are your preferences for IV antibiotics during labor?',
    learnMoreContent: 'Group B Strep is a bacteria that about 25% of women carry. It\'s usually harmless to adults but can rarely cause serious infection in newborns. Standard protocol is IV antibiotics every 4 hours during labor. Some parents choose natural protocols or decline treatment.',
    options: [
      { value: 'accept', label: 'Accept IV antibiotics', birthPlanText: 'If GBS positive, please administer IV antibiotics as recommended.' },
      { value: 'decline', label: 'Decline antibiotics', birthPlanText: 'We decline GBS antibiotics and accept responsibility for this decision.' },
      { value: 'natural', label: 'Discuss natural protocols', birthPlanText: 'We would like to discuss alternative/natural protocols for GBS.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss GBS treatment options with us.', isUnsure: true },
    ],
  },
  {
    id: 'fetal_monitoring',
    category: 'Labor Preferences',
    title: 'Fetal Monitoring',
    description: 'How would you like baby\'s heart rate to be monitored during labor?',
    learnMoreContent: 'Continuous electronic fetal monitoring (EFM) requires staying in bed with monitors strapped on. Intermittent monitoring allows more freedom of movement. Research shows intermittent monitoring is safe for low-risk pregnancies and is associated with lower C-section rates.',
    options: [
      { value: 'continuous', label: 'Continuous monitoring', birthPlanText: 'Continuous fetal monitoring is acceptable.' },
      { value: 'intermittent', label: 'Intermittent monitoring', birthPlanText: 'We prefer intermittent fetal monitoring to allow freedom of movement.' },
      { value: 'wireless', label: 'Wireless/waterproof if available', birthPlanText: 'If continuous monitoring is needed, we prefer wireless/waterproof monitors.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss monitoring options with us.', isUnsure: true },
    ],
  },
  {
    id: 'iv_preference',
    category: 'Labor Preferences',
    title: 'IV vs Hep Lock',
    description: 'Would you prefer continuous IV fluids or a hep lock (IV access without continuous fluids)?',
    learnMoreContent: 'A hep lock provides IV access if needed for medications or emergencies without requiring continuous fluids. This allows more freedom of movement. Some hospitals require an IV for all laboring patients; others allow hep lock for low-risk patients.',
    options: [
      { value: 'iv', label: 'Continuous IV is fine', birthPlanText: 'Continuous IV fluids are acceptable.' },
      { value: 'heplock', label: 'Prefer hep lock only', birthPlanText: 'We prefer a hep lock instead of continuous IV fluids.' },
      { value: 'neither', label: 'No IV access if possible', birthPlanText: 'We prefer no IV access unless medically necessary.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss IV options with us.', isUnsure: true },
    ],
  },
  {
    id: 'eating_drinking',
    category: 'Labor Preferences',
    title: 'Eating & Drinking During Labor',
    description: 'What are your preferences for eating and drinking during labor?',
    learnMoreContent: 'Traditional policy restricted food/drink due to aspiration risk during general anesthesia. Modern evidence shows eating and drinking during low-risk labor is safe and may help maintain energy. Many hospitals now allow clear liquids; some allow light snacks.',
    options: [
      { value: 'yes', label: 'I want to eat and drink freely', birthPlanText: 'I would like to eat and drink as desired during labor.' },
      { value: 'clear_liquids', label: 'Clear liquids only is fine', birthPlanText: 'Clear liquids during labor are acceptable.' },
      { value: 'follow_policy', label: 'Follow hospital policy', birthPlanText: 'We will follow hospital policy regarding eating and drinking.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss eating/drinking policies with us.', isUnsure: true },
    ],
  },
  {
    id: 'pain_management',
    category: 'Labor Preferences',
    title: 'Pain Management',
    description: 'What is your general approach to pain management during labor?',
    learnMoreContent: 'Pain management options range from natural techniques (breathing, movement, water, massage) to medical interventions (nitrous oxide, IV pain medication, epidural). There\'s no right or wrong choice—what matters is that you feel supported in your decision.',
    options: [
      { value: 'natural', label: 'Prefer unmedicated/natural', birthPlanText: 'We are planning an unmedicated birth. Please do not offer pain medication unless I ask.' },
      { value: 'open', label: 'Open to options as needed', birthPlanText: 'We are open to pain management options and will decide during labor.' },
      { value: 'epidural', label: 'Planning to get an epidural', birthPlanText: 'We plan to request an epidural during labor.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss pain management options with us.', isUnsure: true },
    ],
  },

  // BABY CARE
  {
    id: 'circumcision',
    category: 'Baby Care',
    title: 'Circumcision',
    description: 'If having a boy, what are your preferences regarding circumcision?',
    learnMoreContent: 'Circumcision is the surgical removal of the foreskin. It may be done for religious, cultural, or personal reasons. Medical organizations state there are minor benefits but do not recommend routine circumcision. The decision is a personal one for families.',
    options: [
      { value: 'yes', label: 'Yes, circumcise at hospital', birthPlanText: 'We would like our son circumcised before leaving the hospital.' },
      { value: 'delayed', label: 'Yes, but by our own provider', birthPlanText: 'We will arrange circumcision with our own provider after discharge.' },
      { value: 'no', label: 'No circumcision', birthPlanText: 'We do not want circumcision performed.' },
      { value: 'na', label: 'Not applicable (having a girl)', birthPlanText: '' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'We need more time to decide about circumcision.', isUnsure: true },
    ],
  },
  {
    id: 'feeding',
    category: 'Baby Care',
    title: 'Feeding Preferences',
    description: 'How do you plan to feed your baby?',
    learnMoreContent: 'Fed is best. Breastfeeding has many benefits but isn\'t possible or desired for everyone. If breastfeeding, hospitals should provide lactation support. If supplementing, you can specify donor milk vs. formula. Know your options and feel confident in your choice.',
    options: [
      { value: 'breastfeed', label: 'Breastfeeding only', birthPlanText: 'We plan to exclusively breastfeed. Please do not offer formula or pacifiers without our consent.' },
      { value: 'open_supplement', label: 'Breastfeeding, open to supplementing', birthPlanText: 'We plan to breastfeed but are open to supplementation if medically needed.' },
      { value: 'formula', label: 'Formula feeding', birthPlanText: 'We will be formula feeding.' },
      { value: 'combo', label: 'Combination feeding', birthPlanText: 'We plan to combination feed (breast milk and formula).' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss feeding options with us.', isUnsure: true },
    ],
  },
  {
    id: 'pacifier',
    category: 'Baby Care',
    title: 'Pacifier Use',
    description: 'What are your preferences for pacifier use in the hospital?',
    learnMoreContent: 'Some breastfeeding advocates recommend avoiding pacifiers until breastfeeding is established (usually 3-4 weeks) to prevent nipple confusion. However, recent research suggests pacifiers may not interfere with breastfeeding for most babies and may help soothe.',
    options: [
      { value: 'no', label: 'No pacifiers please', birthPlanText: 'Please do not give baby a pacifier.' },
      { value: 'if_needed', label: 'Only if medically needed', birthPlanText: 'Pacifier use is acceptable only if medically necessary.' },
      { value: 'yes', label: 'Pacifiers are fine', birthPlanText: 'Pacifier use is acceptable.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss pacifier use with us.', isUnsure: true },
    ],
  },
  {
    id: 'rooming_in',
    category: 'Baby Care',
    title: 'Rooming In',
    description: 'Would you like baby to stay in your room or use the nursery?',
    learnMoreContent: 'Rooming-in (baby stays with you 24/7) promotes bonding and breastfeeding. However, many parents appreciate the option to send baby to the nursery for a few hours to rest, especially after a long labor. Many hospitals are now "Baby-Friendly" and don\'t have nurseries.',
    options: [
      { value: '24_7', label: 'Baby stays with us 24/7', birthPlanText: 'We want baby to room-in with us at all times.' },
      { value: 'nursery_option', label: 'Room-in but may use nursery', birthPlanText: 'We prefer rooming-in but may use the nursery for rest periods.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss rooming-in options with us.', isUnsure: true },
    ],
  },
]

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
