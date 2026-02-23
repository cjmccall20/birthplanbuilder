// Preset maps for starting point selector
// Each maps a preference ID to the option value that best represents that approach

// "Start Natural" — most natural/minimal-intervention option for each preference
export const naturalPresets: Record<string, string> = {
  // Pre-Hospital
  support_people: 'partner_doula',
  birth_location: 'hospital',
  when_to_hospital: 'active_labor',
  admission_procedures: 'minimize',
  photography_video: 'partner',
  limited_interruptions: 'minimal',
  quiet_labor_environment: 'quiet',

  // During Labor
  pain_management: 'natural',
  fetal_monitoring: 'intermittent',
  iv_preference: 'heplock',
  eating_drinking: 'yes',
  movement_positions: 'freedom',
  hydrotherapy: 'tub',
  labor_environment: 'dim_quiet',
  gbs_antibiotics: 'accept',
  pushing_position: 'freedom',
  directed_pushing: 'spontaneous',
  perineal_support: 'support',
  unplanned_csection: 'gentle',

  // At & Immediately After Birth
  skin_to_skin: 'immediate',
  cord_clamping: 'until_stops',
  who_cuts_cord: 'partner',
  cord_blood_banking: 'no',
  placenta: 'dispose',
  physiological_placenta: 'natural',
  see_placenta: 'yes',
  birth_mirror: 'yes',
  golden_hour: 'protected',
  first_feeding: 'immediate_breast',

  // Newborn Procedures
  vitamin_k: 'accept',
  eye_ointment: 'delay',
  hep_b_vaccine: 'delay',
  newborn_screening: 'accept',
  hearing_test: 'accept',
  bath_timing: '48hrs',
  circumcision: 'no',
  procedure_timing: 'delay_golden_hour',

  // Hospital Stay
  rooming_in: '24_7',
  feeding_support: 'breastfeed_only',
  pacifier: 'no',
  visitors: 'no_visitors',
  length_of_stay: 'minimum',
  newborn_care_instruction: 'comprehensive',
  quiet_environment: 'quiet',

  // C-Section (if needed)
  gentle_csection: 'yes',
  clear_drape: 'yes',
  csection_skin_to_skin: 'immediate',
  csection_music: 'yes',
  csection_photos: 'yes',
  partner_presence_csection: 'required',
  csection_delayed_cord: 'yes',
  csection_explanation: 'narrate',
  csection_arm_mobility: 'not_strapped',
  avoid_general_anesthesia: 'strongly_prefer_regional',
  partner_catches_baby_csection: 'no',
}

// "Start with Standard Hospital Protocols" — typical hospital/provider recommendations
export const hospitalPresets: Record<string, string> = {
  // Pre-Hospital
  support_people: 'partner',
  birth_location: 'hospital',
  when_to_hospital: 'provider_guidance',
  admission_procedures: 'standard',
  photography_video: 'partner',
  limited_interruptions: 'standard',
  quiet_labor_environment: 'no_preference',

  // During Labor
  pain_management: 'open',
  fetal_monitoring: 'continuous',
  iv_preference: 'iv',
  eating_drinking: 'follow_policy',
  movement_positions: 'freedom',
  hydrotherapy: 'shower',
  labor_environment: 'standard',
  gbs_antibiotics: 'accept',
  pushing_position: 'standard',
  directed_pushing: 'flexible',
  perineal_support: 'episiotomy_if_needed',
  unplanned_csection: 'standard',

  // At & Immediately After Birth
  skin_to_skin: 'after_assessment',
  cord_clamping: '1min',
  who_cuts_cord: 'provider',
  cord_blood_banking: 'no',
  placenta: 'dispose',
  physiological_placenta: 'standard',
  see_placenta: 'no',
  birth_mirror: 'no',
  golden_hour: 'flexible',
  first_feeding: 'when_ready',

  // Newborn Procedures
  vitamin_k: 'accept',
  eye_ointment: 'accept',
  hep_b_vaccine: 'accept',
  newborn_screening: 'accept',
  hearing_test: 'accept',
  bath_timing: 'hospital_recommend',
  circumcision: 'na',
  procedure_timing: 'standard',

  // Hospital Stay
  rooming_in: 'nursery_option',
  feeding_support: 'lactation',
  pacifier: 'yes',
  visitors: 'limited',
  length_of_stay: 'standard',
  newborn_care_instruction: 'comprehensive',
  quiet_environment: 'standard',

  // C-Section (if needed)
  gentle_csection: 'standard',
  clear_drape: 'no',
  csection_skin_to_skin: 'recovery',
  csection_music: 'no',
  csection_photos: 'photos_only',
  partner_presence_csection: 'preferred',
  csection_delayed_cord: 'standard',
  csection_explanation: 'narrate',
  csection_arm_mobility: 'standard',
  avoid_general_anesthesia: 'open_to_needed',
  partner_catches_baby_csection: 'no',
}
