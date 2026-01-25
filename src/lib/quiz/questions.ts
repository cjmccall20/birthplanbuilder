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
  // BIRTH TYPE
  {
    id: 'planned_birth_type',
    category: 'Birth Type',
    title: 'Type of Birth',
    description: 'Are you planning a C-section or vaginal birth?',
    learnMoreContent: 'Some births are scheduled as C-sections in advance due to medical reasons or personal choice. Others plan for vaginal birth but may need an unplanned C-section. Your answer will help customize which questions are most relevant to you.',
    options: [
      { value: 'vaginal', label: 'Planning vaginal birth', birthPlanText: 'We are planning a vaginal birth.' },
      { value: 'csection', label: 'Scheduled C-section', birthPlanText: 'We have a scheduled C-section.' },
      { value: 'unsure', label: 'Not sure yet', birthPlanText: 'We are still determining our birth plan.', isUnsure: true },
    ],
  },

  // C-SECTION SPECIFIC QUESTIONS
  {
    id: 'gentle_csection',
    category: 'C-Section Preferences',
    title: 'Gentle C-Section Techniques',
    description: 'Would you like to request gentle/family-centered C-section techniques?',
    learnMoreContent: 'Gentle C-section techniques aim to make the experience more family-centered and promote bonding. These may include: slower delivery allowing baby to squeeze fluid from lungs, lowering the drape so you can see baby being born, immediate skin-to-skin in the OR, delayed cord clamping, and playing music of your choice.',
    conditionalOn: {
      questionId: 'planned_birth_type',
      values: ['csection'],
    },
    options: [
      { value: 'yes', label: 'Yes, request gentle C-section', birthPlanText: 'We would like a gentle/family-centered C-section approach when possible.' },
      { value: 'discuss', label: 'Discuss options with surgeon', birthPlanText: 'We would like to discuss gentle C-section options with our surgeon.' },
      { value: 'standard', label: 'Standard C-section is fine', birthPlanText: 'Standard C-section procedures are acceptable.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss gentle C-section options with us.', isUnsure: true },
    ],
  },
  {
    id: 'clear_drape',
    category: 'C-Section Preferences',
    title: 'Clear Drape',
    description: 'Would you like a clear drape so you can see baby being born?',
    learnMoreContent: 'Some hospitals offer a clear drape option or will lower the standard drape at the moment of birth, allowing you to see your baby emerge. This can be a powerful bonding moment for families.',
    conditionalOn: {
      questionId: 'planned_birth_type',
      values: ['csection'],
    },
    options: [
      { value: 'yes', label: 'Yes, clear drape or lower at birth', birthPlanText: 'We would like a clear drape or to have the drape lowered so we can see baby being born.' },
      { value: 'no', label: 'No, standard drape preferred', birthPlanText: 'Standard drape is fine; we prefer not to watch the procedure.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss drape options with us.', isUnsure: true },
    ],
  },
  {
    id: 'csection_skin_to_skin',
    category: 'C-Section Preferences',
    title: 'Skin-to-Skin During C-Section',
    description: 'Would you like immediate skin-to-skin contact in the operating room?',
    learnMoreContent: 'Many hospitals now support skin-to-skin contact during C-sections, with baby placed on your chest in the OR after initial assessment. This promotes bonding, temperature regulation, and can support early breastfeeding.',
    conditionalOn: {
      questionId: 'planned_birth_type',
      values: ['csection'],
    },
    options: [
      { value: 'immediate', label: 'Yes, immediately in the OR', birthPlanText: 'Please place baby skin-to-skin with me in the operating room as soon as possible.' },
      { value: 'recovery', label: 'In recovery room', birthPlanText: 'We would like skin-to-skin contact to begin in the recovery room.' },
      { value: 'partner', label: 'Partner can do skin-to-skin', birthPlanText: 'My partner can do skin-to-skin in the OR while I am being closed.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss skin-to-skin options with us.', isUnsure: true },
    ],
  },
  {
    id: 'csection_photos',
    category: 'C-Section Preferences',
    title: 'Photos/Video During C-Section',
    description: 'Would you like your partner or a family member to take photos/video during the birth?',
    learnMoreContent: 'Many hospitals allow partners to take photos during a C-section, though there may be restrictions during certain parts of the procedure. Check your hospital policy and surgical team preferences.',
    conditionalOn: {
      questionId: 'planned_birth_type',
      values: ['csection'],
    },
    options: [
      { value: 'yes', label: 'Yes, photos and/or video', birthPlanText: 'We would like to take photos and/or video during the birth.' },
      { value: 'photos_only', label: 'Photos only, no video', birthPlanText: 'We would like to take photos but not video.' },
      { value: 'no', label: 'No photos or video', birthPlanText: 'We prefer no photos or video during the procedure.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss photo/video policies with us.', isUnsure: true },
    ],
  },
  {
    id: 'csection_music',
    category: 'C-Section Preferences',
    title: 'Music During Surgery',
    description: 'Would you like to play your own music during the C-section?',
    learnMoreContent: 'Some hospitals allow you to play music during the surgery to create a calmer, more personalized atmosphere. This is typically permitted during the baby\'s delivery but may need to be lowered during other parts of the procedure.',
    conditionalOn: {
      questionId: 'planned_birth_type',
      values: ['csection'],
    },
    options: [
      { value: 'yes', label: 'Yes, we will bring music', birthPlanText: 'We would like to play our own music during the delivery.' },
      { value: 'no', label: 'No music needed', birthPlanText: 'No specific music preferences.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss music options with us.', isUnsure: true },
    ],
  },

  // VAGINAL BIRTH SPECIFIC QUESTIONS
  {
    id: 'pushing_position',
    category: 'Labor Preferences',
    title: 'Pushing Positions',
    description: 'What are your preferences for positions during pushing? (Note: Options may be limited with an epidural due to reduced mobility)',
    learnMoreContent: 'You can push in many positions: on your back, side-lying, squatting, hands-and-knees, or using a birthing stool. Different positions can help baby descend and reduce tearing. Many hospitals default to back-lying, but you can request to try other positions. Important note: If you have an epidural, your mobility will be limited and you will likely need to stay in bed and push on your back (semi-reclined) or side-lying.',
    conditionalOn: {
      questionId: 'planned_birth_type',
      values: ['vaginal', 'unsure'],
    },
    options: [
      { value: 'freedom', label: 'I want freedom to choose positions', birthPlanText: 'I would like the freedom to push in different positions as feels natural.' },
      { value: 'upright', label: 'Prefer upright positions', birthPlanText: 'I prefer upright pushing positions (squatting, hands-and-knees, etc.).' },
      { value: 'standard', label: 'Back-lying (semi-reclined) is fine', birthPlanText: 'Standard pushing position is acceptable.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss pushing position options with us.', isUnsure: true },
    ],
  },
  {
    id: 'perineal_support',
    category: 'Labor Preferences',
    title: 'Perineal Support & Tearing Prevention',
    description: 'What are your preferences for preventing or managing perineal tearing?',
    learnMoreContent: 'Options include: warm compresses, perineal massage, controlled pushing, allowing the perineum to stretch naturally. Episiotomy (surgical cut) is rarely necessary but your provider may recommend it in certain situations. Most providers prefer to let natural tearing occur as it typically heals better.',
    conditionalOn: {
      questionId: 'planned_birth_type',
      values: ['vaginal', 'unsure'],
    },
    options: [
      { value: 'natural', label: 'Natural stretching, no episiotomy', birthPlanText: 'I prefer to allow natural stretching and avoid episiotomy unless absolutely necessary.' },
      { value: 'support', label: 'Use warm compresses and massage', birthPlanText: 'Please use warm compresses and perineal massage to help prevent tearing.' },
      { value: 'episiotomy_if_needed', label: 'Episiotomy if provider recommends', birthPlanText: 'I trust my provider to recommend episiotomy if medically beneficial.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss perineal support options with us.', isUnsure: true },
    ],
  },
  {
    id: 'directed_pushing',
    category: 'Labor Preferences',
    title: 'Directed vs. Spontaneous Pushing',
    description: 'Do you want coached/directed pushing or to push spontaneously as you feel the urge?',
    learnMoreContent: 'Directed pushing ("purple pushing") involves holding your breath and pushing for 10 counts. Spontaneous pushing means following your body\'s natural urges. Research suggests spontaneous pushing may reduce tearing and fetal distress, though directed pushing may shorten the pushing phase.',
    conditionalOn: {
      questionId: 'planned_birth_type',
      values: ['vaginal', 'unsure'],
    },
    options: [
      { value: 'spontaneous', label: 'Spontaneous/instinctive pushing', birthPlanText: 'I prefer to push spontaneously, following my body\'s natural urges rather than coached counting.' },
      { value: 'directed', label: 'Directed/coached pushing', birthPlanText: 'I would like coached, directed pushing with counting.' },
      { value: 'flexible', label: 'Flexible, will decide in the moment', birthPlanText: 'I am open to either directed or spontaneous pushing depending on what feels right.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss pushing techniques with us.', isUnsure: true },
    ],
  },

  // NEWBORN PROCEDURES
  {
    id: 'vitamin_k',
    category: 'Newborn Procedures',
    title: 'Vitamin K Shot',
    description: 'Vitamin K helps with blood clotting. Hospitals routinely give newborns a Vitamin K injection shortly after birth.',
    learnMoreContent: `**What hospitals typically recommend and why:**
Hospitals routinely offer a Vitamin K injection within the first few hours after birth. This is because newborns are born with low levels of Vitamin K, which is essential for blood clotting.

**PROS of the Vitamin K shot:**
• Provides immediate, reliable protection against Vitamin K Deficiency Bleeding (VKDB), a rare but potentially serious condition
• Single injection provides adequate levels throughout the critical first months
• Well-studied intervention with decades of safety data

**CONS/risks of the Vitamin K shot:**
• Involves an injection shortly after birth during initial bonding time
• Contains small amounts of preservatives (though formulations vary)
• Bypasses the natural way babies would gradually receive Vitamin K through breast milk

**Alternative options:**
Oral Vitamin K is available in some areas, though it requires multiple doses over several weeks and may be less reliably absorbed. Some parents choose to monitor closely and supplement vitamin K-rich foods if breastfeeding.

*Get our Research Guide for detailed analysis with medical citations on Vitamin K administration, absorption rates, and VKDB statistics.*`,
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
    learnMoreContent: `**What hospitals typically recommend and why:**
The Hepatitis B vaccine is typically offered within 24 hours of birth as the first dose in a three-dose series. This timing is recommended because Hepatitis B can be transmitted from mother to baby during delivery if the mother is infected.

**PROS of the Hepatitis B vaccine at birth:**
• Provides early protection if there was an undetected maternal infection
• Establishes immunity early in the vaccine series
• Convenient timing while still in the hospital with medical staff available

**CONS/risks of giving at birth:**
• Mother may have tested negative for Hepatitis B, making transmission risk extremely low
• Adds another intervention during the sensitive first 24 hours
• Some parents prefer to space out vaccines rather than giving multiple in the newborn period

**Alternative options:**
Many parents whose prenatal testing shows they're Hepatitis B negative choose to delay this vaccine until the 2-month pediatrician visit, when other vaccines are scheduled. This allows the newborn period to focus on bonding and recovery.

*Get our Research Guide for detailed analysis with medical citations on Hepatitis B transmission rates, vaccine timing, and maternal screening accuracy.*`,
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
    learnMoreContent: `**What hospitals typically recommend and why:**
Antibiotic eye ointment (erythromycin) is routinely applied to newborns' eyes shortly after birth. This practice was established to prevent serious eye infections from gonorrhea or chlamydia that could be transmitted during vaginal delivery.

**PROS of erythromycin eye ointment:**
• Prevents potential eye infections that could lead to blindness if present
• Simple, quick application
• Required by law in many states as a public health measure

**CONS/risks of the eye ointment:**
• Can cause temporary blurry vision, potentially interfering with initial eye contact and bonding
• Most effective against infections parents have already been screened for during pregnancy
• Contains antibiotic that some prefer to avoid unless specifically needed

**Alternative options:**
Parents who have tested negative for STIs and are in a monogamous relationship may feel comfortable declining this treatment. Some choose to delay application for an hour or two to allow for initial bonding and breastfeeding with clear vision.

*Get our Research Guide for detailed analysis with medical citations on eye infection rates, screening accuracy, and the timing impact on early bonding.*`,
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
    learnMoreContent: `**What hospitals typically recommend and why:**
The newborn screening (heel prick blood test) is offered before discharge to screen for rare but serious genetic and metabolic conditions. The specific conditions tested vary by state, but commonly include PKU, sickle cell disease, hypothyroidism, and dozens of others.

**PROS of newborn screening:**
• Early detection allows for treatment before symptoms appear, potentially preventing disability or death
• Tests for conditions that are treatable when caught early but may cause irreversible harm if missed
• Comprehensive screening that covers many rare conditions in one simple test

**CONS/risks of the heel prick:**
• Involves a quick prick that causes momentary discomfort to baby
• Very rarely, false positives can cause unnecessary worry and follow-up testing
• Some parents have philosophical concerns about genetic information being stored in databases

**Alternative options:**
Private screening is available, though typically more expensive. Some parents delay screening slightly (still within the first week) to reduce the number of procedures in the immediate post-birth period. Most medical providers strongly encourage this screening due to the treatable nature of the conditions tested.

*Get our Research Guide for detailed analysis with medical citations on the conditions screened, detection rates, and the treatment outcomes when caught early.*`,
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
    learnMoreContent: `**What hospitals typically recommend and why:**
A hearing screening is typically performed before discharge using a quick, painless test. Early detection of hearing loss allows for intervention during the critical window for language development in the first few years of life.

**PROS of hearing screening:**
• Non-invasive test that baby typically sleeps through
• Early identification of hearing issues enables early intervention (hearing aids, speech therapy)
• Language development outcomes are significantly better when hearing loss is addressed before 6 months of age

**CONS/risks of the test:**
• May disturb baby during sleep for the test
• False positives can occur (especially if done too soon after birth when fluid may still be in ears)
• Requires follow-up testing if initial screen shows potential issues

**Alternative options:**
The test can be delayed slightly if baby is having difficulty settling or if parents prefer to minimize procedures immediately after birth. Most pediatricians will check hearing at later well-child visits, though earlier detection is ideal for language development.

*Get our Research Guide for detailed analysis with medical citations on hearing loss prevalence, the critical period for language development, and intervention outcomes.*`,
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
    learnMoreContent: `**What hospitals typically recommend and why:**
The American College of Obstetricians and Gynecologists recommends delaying cord clamping for at least 30-60 seconds for both term and preterm infants. This allows additional blood to transfer from the placenta to the baby, which was the design of the birth process before modern interventions.

**PROS of delayed cord clamping:**
• Increases baby's iron stores, reducing anemia risk in the first year
• Provides additional blood volume (up to 30% more)
• Associated with better neurodevelopmental outcomes in some studies

**CONS/risks of delayed clamping:**
• May slightly increase jaundice risk (though usually mild and manageable)
• Can delay emergency interventions if baby needs immediate resuscitation
• Requires patience from medical staff who may prefer immediate cord cutting

**Alternative options:**
Timing can range from immediate clamping (if medical emergency requires it) to waiting until the cord stops pulsing completely (3-5+ minutes), which allows the full placental transfusion God designed for your baby.

*Get our Research Guide for detailed analysis with medical citations on blood volume transfer, iron stores, and long-term developmental outcomes.*`,
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
    learnMoreContent: `**What hospitals typically recommend and why:**
Hospitals typically offer information about cord blood banking but don't require it. Cord blood contains stem cells that can potentially be used to treat certain diseases. You can choose private banking (for your family's use), public donation (for anyone who matches), or neither.

**PROS of cord blood banking:**
• Preserves stem cells that could potentially treat future illnesses (leukemia, certain genetic disorders)
• Private banking ensures cells are available if your child or family member needs them
• Public donation can help others in need at no cost to you

**CONS/risks of cord blood banking:**
• Private banking requires expensive upfront and ongoing storage fees ($1000-2000 initial, $100-200/year)
• Actual likelihood of using stored cord blood is very low (estimated 1 in 1,000 to 1 in 200,000)
• Collection may require earlier cord clamping, reducing the benefits of delayed clamping

**Alternative options:**
Most families choose not to bank cord blood and opt for delayed cord clamping instead, allowing baby to receive the full blood volume. Public donation is a generous option if you're willing to collect but don't want to pay for private storage.

*Get our Research Guide for detailed analysis with medical citations on usage statistics, disease treatment success rates, and the tradeoffs with delayed cord clamping.*`,
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
    conditionalOn: {
      questionId: 'planned_birth_type',
      values: ['vaginal', 'unsure'],
    },
    learnMoreContent: `**What hospitals typically recommend and why:**
The World Health Organization and many hospitals now recommend immediate skin-to-skin contact—placing baby directly on mother's bare chest right after birth. This practice supports the natural transition from womb to world and activates instinctive behaviors in both mother and baby.

**PROS of immediate skin-to-skin:**
• Regulates baby's temperature, heart rate, breathing, and blood sugar naturally
• Promotes successful breastfeeding initiation through baby's natural reflexes
• Facilitates bonding and reduces stress hormones in both mother and baby

**CONS/risks of delaying skin-to-skin:**
• Early separation can interfere with natural breastfeeding instincts
• Baby may have more difficulty with temperature regulation and stress
• Missing the alert period immediately after birth when baby is most ready to nurse

**Alternative options:**
If mother is unable (due to cesarean or complications), partner skin-to-skin provides many of the same benefits. Some hospitals prefer to do assessments first, but most routine assessments can be done while baby is on mother's chest.

*Get our Research Guide for detailed analysis with medical citations on the biological importance of skin-to-skin, breastfeeding success rates, and the "golden hour" after birth.*`,
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
    learnMoreContent: `**What hospitals typically recommend and why:**
The World Health Organization now recommends delaying baby's first bath for at least 24 hours, which is a shift from the traditional practice of bathing soon after birth. This change recognizes the benefits of the vernix (the creamy coating on baby's skin).

**PROS of delaying the first bath:**
• Preserves vernix, which moisturizes skin, has antibacterial properties, and helps regulate temperature
• Helps maintain baby's body temperature and blood sugar stability
• Supports early breastfeeding by not interrupting the bonding period
• Allows baby to maintain mother's scent, which supports bonding and feeding

**CONS/risks of early bathing:**
• Removes beneficial vernix coating that God designed as baby's first skin protection
• Can cause temperature instability, especially in smaller babies
• Interrupts important skin-to-skin and breastfeeding time

**Alternative options:**
Many parents now choose to delay bathing for 48+ hours or even several days. Some prefer to give the first bath themselves at home. A simple wipe-down of any blood or meconium is usually sufficient in the early hours.

*Get our Research Guide for detailed analysis with medical citations on vernix benefits, temperature regulation, and optimal timing for newborn bathing.*`,
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
    learnMoreContent: `**What hospitals typically recommend and why:**
Hospitals typically dispose of the placenta as medical waste unless you request to keep it. However, many hospitals are accustomed to parents taking the placenta home and have procedures in place for this.

**PROS of placenta encapsulation/keeping:**
• Some women report benefits like increased energy, milk supply, and balanced mood (though scientific evidence is limited)
• Cultural or spiritual significance in some traditions
• Honors the organ that sustained your baby for 9 months

**CONS/risks of placenta encapsulation:**
• Encapsulation services cost $150-300 and lack FDA regulation
• Limited scientific evidence supporting health claims
• Small risk of contamination if not properly processed
• Some healthcare providers express concern about heavy metals or toxins

**Alternative options:**
Beyond encapsulation, some families bury the placenta in a meaningful location, plant a tree over it, or have it incorporated into art. Hospital disposal is perfectly acceptable and what most families choose.

*Get our Research Guide for detailed analysis with medical citations on placenta encapsulation research, cultural practices, and safety considerations.*`,
    options: [
      { value: 'dispose', label: 'Hospital disposal', birthPlanText: 'The hospital may dispose of the placenta.' },
      { value: 'encapsulate', label: 'Keep for encapsulation', birthPlanText: 'We will be keeping the placenta for encapsulation. Please place it in our provided container.' },
      { value: 'keep', label: 'Keep for other purposes', birthPlanText: 'We would like to keep the placenta.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'Discuss placenta options with us.', isUnsure: true },
    ],
  },

  // UNPLANNED C-SECTION QUESTION (for vaginal/unsure planners)
  {
    id: 'unplanned_csection_preferences',
    category: 'Labor Preferences',
    title: 'Unplanned C-Section Preferences',
    description: 'If an unplanned C-section becomes necessary, what are your preferences?',
    learnMoreContent: 'Even if you\'re planning a vaginal birth, it\'s helpful to consider your preferences in case a C-section becomes medically necessary. This might include gentle C-section techniques, immediate skin-to-skin, partner presence, etc.',
    conditionalOn: {
      questionId: 'planned_birth_type',
      values: ['vaginal', 'unsure'],
    },
    options: [
      { value: 'gentle', label: 'Request gentle C-section techniques if possible', birthPlanText: 'If a C-section becomes necessary, we would like gentle/family-centered techniques when safely possible (clear drape, skin-to-skin in OR, etc.).' },
      { value: 'partner_present', label: 'Partner must be present', birthPlanText: 'If a C-section is needed, it is very important that my partner be present.' },
      { value: 'standard', label: 'Follow standard C-section protocol', birthPlanText: 'If a C-section becomes necessary, please follow standard hospital protocol.' },
      { value: 'discuss', label: 'Discuss all options with us first', birthPlanText: 'If a C-section becomes necessary, please discuss all available options with us.' },
      { value: 'unsure', label: 'I need to research this more', birthPlanText: 'If a C-section becomes necessary, discuss options with us at that time.', isUnsure: true },
    ],
  },

  // LABOR PREFERENCES
  {
    id: 'gbs_antibiotics',
    category: 'Labor Preferences',
    conditionalOn: {
      questionId: 'planned_birth_type',
      values: ['vaginal', 'unsure'],
    },
    title: 'GBS Antibiotics (if GBS+)',
    description: 'If you test positive for Group B Strep, what are your preferences for IV antibiotics during labor?',
    learnMoreContent: `**What hospitals typically recommend and why:**
If you test positive for Group B Strep (GBS) during pregnancy, standard hospital protocol is IV antibiotics every 4 hours during labor. About 25% of women carry this bacteria naturally—it's harmless to adults but can rarely cause serious infection in newborns during passage through the birth canal.

**PROS of GBS antibiotics:**
• Significantly reduces risk of early-onset GBS infection in newborns (from about 1 in 200 to 1 in 4,000)
• Well-established protocol with proven effectiveness
• Provides peace of mind for many parents

**CONS/risks of IV antibiotics:**
• Requires IV access throughout labor, limiting mobility
• Antibiotics affect baby's gut microbiome development
• Even without antibiotics, 98-99% of GBS+ babies are born healthy
• May increase risk of antibiotic-resistant infections or thrush

**Alternative options:**
Some parents explore natural protocols (probiotics, garlic, vitamin C) hoping to reduce GBS colonization before labor. Others decline antibiotics and opt for close monitoring of baby after birth. The decision involves weighing a small risk of serious infection against the known effects of antibiotics.

*Get our Research Guide for detailed analysis with medical citations on GBS infection rates, antibiotic effectiveness, and alternative protocols.*`,
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
    conditionalOn: {
      questionId: 'planned_birth_type',
      values: ['vaginal', 'unsure'],
    },
    title: 'Fetal Monitoring',
    description: 'How would you like baby\'s heart rate to be monitored during labor?',
    learnMoreContent: `**What hospitals typically recommend and why:**
Many hospitals use continuous electronic fetal monitoring (EFM) for all laboring women, with two belts strapped around your belly to track baby's heart rate and contractions. This became standard practice for liability reasons and to detect potential problems early.

**PROS of continuous monitoring:**
• Provides constant reassurance of baby's wellbeing
• Can detect concerning heart rate patterns that may indicate distress
• Creates a paper trail that hospitals value for legal protection

**CONS/risks of continuous monitoring:**
• Requires staying in or very near the bed, limiting position changes and movement that help labor progress
• Higher false-positive rate leading to unnecessary interventions and increased C-section rates
• Can create anxiety if staff react to normal variations in heart rate

**Alternative options:**
Intermittent monitoring (listening to baby's heart rate every 15-30 minutes with a handheld Doppler) is supported by research for low-risk pregnancies and allows freedom of movement. Wireless/waterproof monitors offer a middle ground if continuous monitoring is preferred or required.

*Get our Research Guide for detailed analysis with medical citations on monitoring methods, intervention rates, and outcomes for low-risk pregnancies.*`,
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
    conditionalOn: {
      questionId: 'planned_birth_type',
      values: ['vaginal', 'unsure'],
    },
    title: 'IV vs Hep Lock',
    description: 'Would you prefer continuous IV fluids or a hep lock (IV access without continuous fluids)?',
    learnMoreContent: `**What hospitals typically recommend and why:**
Many hospitals routinely start continuous IV fluids for all laboring women "just in case" medications or emergency interventions become necessary. This ensures immediate access if needed but wasn't standard practice historically.

**PROS of continuous IV:**
• Immediate access for medications, antibiotics, or emergency interventions
• Provides hydration if eating/drinking is restricted
• Can help prevent dehydration during long labors

**CONS/risks of continuous IV:**
• Tethers you to an IV pole, limiting movement and position changes
• Continuous fluids can cause swelling and may dilute labor hormones
• Creates dependence on medical equipment for basic hydration
• May contribute to lower blood sugar in baby due to maternal blood sugar fluctuations

**Alternative options:**
A hep lock (saline lock) provides IV access without continuous fluids, allowing full mobility while maintaining the option for quick medication administration. Some low-risk mothers prefer no IV access at all, staying hydrated by drinking fluids naturally as the body designed.

*Get our Research Guide for detailed analysis with medical citations on IV fluid effects, mobility during labor, and hydration strategies.*`,
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
    conditionalOn: {
      questionId: 'planned_birth_type',
      values: ['vaginal', 'unsure'],
    },
    title: 'Eating & Drinking During Labor',
    description: 'What are your preferences for eating and drinking during labor?',
    learnMoreContent: `**What hospitals typically recommend and why:**
Traditional hospital policy restricted food and drink during labor due to concerns about aspiration (breathing in stomach contents) if emergency general anesthesia became necessary. This policy remains in many hospitals, though policies are gradually changing.

**PROS of eating and drinking during labor:**
• Maintains energy and strength for the hard work of labor (it's called "labor" for a reason!)
• Prevents dehydration and ketosis that can slow labor progress
• Aligns with how women have labored throughout history before modern restrictions
• Research shows it's safe for low-risk labors

**CONS/risks of eating during labor:**
• Theoretical risk of aspiration if emergency general anesthesia needed (though modern anesthesia techniques have made this extremely rare)
• Some women feel nauseous during active labor and don't want food anyway
• May violate hospital policy in some facilities

**Alternative options:**
Many hospitals now allow clear liquids (broth, juice, popsicles) during labor. Some allow light snacks. For unmedicated births, eating according to your hunger and thirst is natural. If planning an epidural, ask about your hospital's specific policy.

*Get our Research Guide for detailed analysis with medical citations on aspiration risk, energy needs during labor, and the evolution of hospital policies.*`,
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
    conditionalOn: {
      questionId: 'planned_birth_type',
      values: ['vaginal', 'unsure'],
    },
    title: 'Pain Management',
    description: 'What is your general approach to pain management during labor?',
    learnMoreContent: `**What hospitals typically recommend and why:**
Hospitals offer various pain management options ranging from natural comfort measures to medical interventions. Many hospitals actively promote epidurals, while others support unmedicated birth. The approach varies greatly by facility and provider.

**PROS of medical pain management:**
• Epidural can provide significant or complete pain relief, allowing rest during long labors
• Reduces fear and anxiety for women who are apprehensive about labor pain
• Allows for a calmer experience if that's your preference
• Can be helpful in certain medical situations

**CONS/risks of medical interventions:**
• Epidurals limit mobility and can slow labor progress, sometimes leading to additional interventions
• Side effects may include drop in blood pressure, itching, fever, difficulty pushing
• Interventions can interfere with natural hormone release that aids labor and bonding
• May affect baby's alertness at birth

**Alternative options:**
Natural pain management includes position changes, hydrotherapy (shower/tub), massage, breathing techniques, counter-pressure, and continuous support. Many women find that movement and water are surprisingly effective. Nitrous oxide (laughing gas) offers a middle ground—pain reduction without total numbness.

*Get our Research Guide for detailed analysis with medical citations on pain management options, intervention cascades, and the role of pain in the physiological birth process.*`,
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
    learnMoreContent: `**What hospitals typically recommend and why:**
Hospitals offer circumcision as an optional procedure, typically performed before discharge or within the first few days. The American Academy of Pediatrics states that the health benefits outweigh the risks but are not significant enough to recommend universal circumcision—making it a personal family decision.

**PROS of circumcision:**
• Slightly reduced risk of urinary tract infections in infancy
• Eliminates risk of foreskin-related issues (though these are uncommon)
• May reduce risk of certain STIs later in life
• Cultural, religious, or personal family preferences

**CONS/risks of circumcision:**
• Surgical procedure on a newborn with associated pain (though pain relief is used)
• Removes functional tissue that provides protection and sensation
• Risks include bleeding, infection, and rarely, more serious complications
• Removes the choice from the child to make this decision about his own body later

**Alternative options:**
Many families are now choosing to leave their sons intact, allowing them to make their own decision about their body when older. If choosing circumcision for religious reasons, some families prefer a ritual ceremony rather than hospital procedure. Proper hygiene education makes intact care straightforward.

*Get our Research Guide for detailed analysis with medical citations on circumcision outcomes, complication rates, and both short and long-term effects.*`,
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
    learnMoreContent: `**What hospitals typically recommend and why:**
Most hospitals encourage breastfeeding and are certified as "Baby-Friendly," providing lactation support and education. They recognize that breastfeeding offers health benefits for both baby and mother while acknowledging that fed is best and every family's situation is unique.

**PROS of exclusive breastfeeding:**
• Provides ideal nutrition specifically designed for human babies with antibodies and living cells
• Promotes bonding and supports mother's postpartum recovery
• Convenient, always available at the right temperature, and free
• Associated with health benefits for both mother and baby

**CONS/risks of exclusive breastfeeding:**
• Can be challenging to establish—many women need support and time to make it work
• Difficulty knowing exactly how much baby is eating can cause anxiety
• Physical demands are entirely on the mother, making it harder to share feeding duties
• Not always possible due to medical issues, medications, or supply challenges

**Alternative options:**
Combination feeding allows flexibility, and exclusive formula feeding is a valid choice that allows parents to share feeding responsibilities. Donor milk is available through milk banks. The most important thing is that baby is fed, growing, and that the family's feeding choice works for their unique situation.

*Get our Research Guide for detailed analysis with medical citations on breastfeeding benefits, common challenges and solutions, and formula feeding options.*`,
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
    learnMoreContent: `**What hospitals typically recommend and why:**
Guidance on pacifiers varies. Baby-Friendly hospitals typically avoid giving pacifiers to breastfed babies to prevent nipple confusion and ensure baby nurses frequently to establish milk supply. However, policies and evidence on this continue to evolve.

**PROS of allowing pacifiers:**
• Can soothe baby and satisfy natural sucking reflex between feedings
• Associated with reduced SIDS risk when used during sleep
• May help parents cope with a fussy baby, especially in hospital environment
• Recent research suggests less interference with breastfeeding than previously thought

**CONS/risks of pacifier use:**
• May reduce frequency of nursing in early days when establishing milk supply is critical
• Potential for nipple confusion while baby is learning to breastfeed
• Can mask hunger cues, leading to missed feeding opportunities
• Creates a habit/dependency that must eventually be broken

**Alternative options:**
Many families choose to avoid pacifiers for the first 3-4 weeks until breastfeeding is well established, then introduce if desired. Others use them from the start without issues. For families formula feeding, pacifier concerns are different since supply establishment isn't a factor.

*Get our Research Guide for detailed analysis with medical citations on nipple confusion evidence, pacifier use and SIDS reduction, and breastfeeding establishment.*`,
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
    learnMoreContent: `**What hospitals typically recommend and why:**
Baby-Friendly hospitals actively promote 24/7 rooming-in, believing it supports breastfeeding and bonding. Many newer hospitals have eliminated traditional nurseries entirely. Other hospitals offer nursery care as an option to help parents rest.

**PROS of 24/7 rooming-in:**
• Promotes bonding and helps you learn baby's cues more quickly
• Supports breastfeeding by allowing baby to nurse on demand
• Keeps baby close for monitoring and responding to needs
• Research shows benefits for breastfeeding establishment

**CONS/risks of 24/7 rooming-in:**
• Can be exhausting for mothers recovering from birth, especially after long labors or C-sections
• May contribute to postpartum anxiety and overwhelm without adequate rest
• Limited help available at 3am when learning to breastfeed
• Some mothers need sleep to recover and produce milk

**Alternative options:**
Many hospitals still offer nursery care for a few hours so parents can rest. Some families request this only after trying to settle baby themselves. Partner support and postpartum doulas can provide help while baby rooms-in. The key is finding what works for your family's recovery and bonding.

*Get our Research Guide for detailed analysis with medical citations on rooming-in outcomes, postpartum recovery needs, and maternal mental health considerations.*`,
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

// Helper function to get visible questions based on answers
export function getVisibleQuestions(answers: Record<string, string>): QuizQuestion[] {
  return quizQuestions.filter(question => {
    if (!question.conditionalOn) {
      return true
    }

    const { questionId, values } = question.conditionalOn
    const answer = answers[questionId]
    return answer && values.includes(answer)
  })
}
