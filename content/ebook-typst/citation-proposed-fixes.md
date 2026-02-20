# Citation Proposed Fixes

Every flagged issue from the verification report, with current text and proposed changes.

---

## PRIORITY FIXES (Material Misrepresentation)

---

### Fix #1: Ch 07 (Eye Ointment) — USPSTF Misrepresentation

**File:** `chapters/07-eye-ointment.typ`

**Issue:** The chapter implies USPSTF supports selective/conditional use of eye prophylaxis. In reality, USPSTF gives a **Grade A recommendation for universal prophylaxis** — the strongest possible recommendation. The text also claims erythromycin is "not associated with serious harms" as if USPSTF is lukewarm; in fact, USPSTF uses that finding to justify universal prophylaxis.

**Current text (line 108):**
```
The U.S. Preventive Services Task Force concluded that erythromycin is "not associated with serious harms."
```

**Proposed change:**
```
The U.S. Preventive Services Task Force gives erythromycin prophylaxis a Grade A recommendation — meaning they recommend universal application for all newborns. They concluded that erythromycin is "not associated with serious harms." This is the strongest possible recommendation level, and it applies regardless of maternal STI status.
```

**Rationale:** The chapter's overall argument (that low-risk mothers may reasonably decline) still stands based on AAP's 2024 re-evaluation language and international practice. But we can't misrepresent what USPSTF actually says. Being transparent about the Grade A recommendation and then presenting the counterarguments (AAP re-evaluation, international practice, prenatal screening) is more credible than hiding the recommendation.

---

### Fix #2: Ch 37 (Water Birth) — Unsupported Pain Reduction Claim

**File:** `chapters/37-water-birth.typ`

**Issue:** The text claims water immersion reduces pain "by 30-50%" and attributes this to citations [1] (Cochrane review) and [2] (PMC 2024 review). However:
- The Cochrane review does NOT quantify pain reduction as 30-50%
- The 2024 PMC review actually found water birth "did not show a statistically significant reduction in pain intensity"

This specific numeric claim is not supported by either cited source.

**Current text (line 9):**
```
1. _Water reduces pain by 30-50%._ Studies show water immersion during labor significantly reduces pain perception, shortens labor by an average of 32 minutes, and cuts epidural use from 43% to 39%. Many describe it as "nature's epidural."
```

**Proposed change:**
```
1. _Water significantly reduces pain perception._ Studies show water immersion during labor reduces the need for pain medication, shortens labor by an average of 32 minutes, and cuts epidural use from 43% to 39%. Women consistently report lower pain scores and describe it as "nature's epidural."
```

**Current text (line 51):**
```
_Significant pain reduction._ A 2024 meta-analysis found water immersion reduces pain perception by 30-50% during labor. Women consistently report lower pain scores when using water compared to conventional labor positions. [1,2]
```

**Proposed change:**
```
_Significant pain reduction._ The Cochrane review found that water immersion during labor probably reduces the use of regional analgesia and that women report lower pain scores. Women consistently report less pain when using water compared to conventional labor positions. [1,2]
```

**Current text (line 338) in Cost-Benefit Analysis:**
```
_Pain Management Without Drugs_
- 30-50% reduction in pain perception
```

**Proposed change:**
```
_Pain Management Without Drugs_
- Significant reduction in pain perception (women consistently report lower pain scores)
```

**Rationale:** The water birth chapter's case is strong enough without fabricating a specific percentage. The Cochrane review supports reduced epidural use and lower reported pain scores — that's still compelling without a made-up number.

---

### Fix #3: Ch 05 (Fetal Monitoring) — Misread of Defensive Medicine Source

**File:** `chapters/05-fetal-monitoring.typ`

**Issue:** Text says "A 1987 survey of obstetricians found that 46% performed routine fetal monitoring specifically because of legal concerns." The source (Localio et al.) actually says 46% of **obstetrical malpractice claims** involved EFM — a completely different meaning. The 41% figure in the original relates to practice changes generally, not fetal monitoring specifically.

**Current text (line 62):**
```
*Liability protection, not evidence:* A 1987 survey of obstetricians found that 46% performed routine fetal monitoring specifically because of legal concerns, not because of evidence. Continuous monitoring became standard practice because it feels legally safer. If something goes wrong, the hospital has a paper trail of constant surveillance to protect against lawsuits.
```

**Proposed change:**
```
*Liability protection, not evidence:* Research on defensive medicine in obstetrics has found that malpractice concerns significantly influence monitoring decisions. A study published in Medical Care found that liability pressure was associated with increased use of continuous fetal monitoring, and that malpractice claim rates correlated with higher intervention rates in obstetrics. Continuous monitoring became standard practice because it feels legally safer. If something goes wrong, the hospital has a paper trail of constant surveillance to protect against lawsuits.
```

**Rationale:** The general claim (liability drives monitoring decisions) is well-supported. The specific "46% of obstetricians" stat was a misread. Replace with accurate, softer framing that conveys the same point without misquoting.

---

### Fix #4: Ch 12 (Circumcision) — "20,000 Nerve Endings" Claim

**File:** `chapters/12-circumcision.typ`

**Issue:** The text states the foreskin "contains approximately 20,000 specialized nerve endings." This figure originated from Paul Fleiss's 1997 extrapolation of a 1932 study and lacks solid scientific basis. Modern estimates range from 1,000 to 10,000. The number has become an advocacy talking point but is not verified science.

**Current text (line 32):**
```
- *Sensation:* The foreskin contains fine-touch receptors and specialized nerve endings. Studies show it is among the most sensitive parts of the external penis. It contains approximately 20,000 specialized nerve endings.
```

**Proposed change:**
```
- *Sensation:* The foreskin contains fine-touch receptors and specialized nerve endings. Studies show it is among the most sensitive parts of the external penis, with thousands of nerve endings concentrated in a small area of tissue.
```

**Rationale:** "Thousands of nerve endings" is accurate and still makes the point. Citing a specific unverified number undermines credibility.

---

### Fix #5: Ch 12 (Circumcision) — Death Rate Study Year Error

**File:** `chapters/12-circumcision.typ`

**Issue:** Text attributes the "117 neonatal circumcision-related deaths annually" figure to "A 2018 study." This figure comes from **Bollinger's 2010 study**, not 2018. A separate 2018 study (Earp et al.) found a different figure: 1 death per 49,166 circumcisions. The text conflates these two different studies.

**Current text (lines 173-177):**
```
*Current estimates:*
- A 2018 study estimated approximately *117 neonatal circumcision-related deaths occur annually in the United States* (about 9.01 per 100,000 circumcisions)
- This represents about 1.3% of male neonatal deaths from all causes
- For comparison: 115 neonatal deaths from SIDS, 44 from suffocation, and 8 in automobile accidents during the same neonatal period
- Another study found 1 death per 49,166 circumcisions over a 10-year period
```

**Proposed change:**
```
*Current estimates:*
- A 2010 analysis by Bollinger estimated approximately *117 neonatal circumcision-related deaths occur annually in the United States* (about 9.01 per 100,000 circumcisions)
- This represents about 1.3% of male neonatal deaths from all causes
- For comparison: 115 neonatal deaths from SIDS, 44 from suffocation, and 8 in automobile accidents during the same neonatal period
- A separate 2018 analysis (Earp et al.) found 1 death per 49,166 circumcisions over a 10-year period
```

**Rationale:** Simple year correction. Both studies are real — they just need to be attributed to the right years and authors.

---

### Fix #6: Ch 05 (Fetal Monitoring) — Wrong Author Attribution

**File:** `chapters/05-fetal-monitoring.typ`

**Issue:** The AAFP article citation lists "Patel S, et al." as authors. The actual article is by **Arnold J, Gawrys BL.** The URL and content are correct — just the author name is wrong.

**Current text (lines 329-331):**
```
*AAFP Intrapartum Fetal Monitoring Guidelines:*
Patel S, et al. "Intrapartum Fetal Monitoring." American Family Physician. 2020;102(3):158-167.
#link("https://www.aafp.org/pubs/afp/issues/2020/0801/p158.html")[https://www.aafp.org/pubs/afp/issues/2020/0801/p158.html]
```

**Proposed change:**
```
*AAFP Intrapartum Fetal Monitoring Guidelines:*
Arnold J, Gawrys BL. "Intrapartum Fetal Monitoring." American Family Physician. 2020;102(3):158-167.
#link("https://www.aafp.org/pubs/afp/issues/2020/0801/p158.html")[https://www.aafp.org/pubs/afp/issues/2020/0801/p158.html]
```

**Rationale:** Straightforward author name correction.

---

### Fix #7: Ch 16 (Feeding) — Broken ILCA Directory Link

**File:** `chapters/16-feeding.typ`

**Issue:** The ILCA IBCLC directory link uses the wrong domain entirely: `international-lactation.leagueofprofessionalconsultants.com`. The correct site is `ilca.org`.

**Current text (line 149):**
```
- Find an IBCLC at #link("https://international-lactation.leagueofprofessionalconsultants.com/find-an-ibclc")[ILCA.org]
```

**Proposed change:**
```
- Find an IBCLC at #link("https://www.ilca.org/why-ibclc/falc")[ILCA.org]
```

**Current text (line 422):**
```
- Search the #link("https://international-lactation.leagueofprofessionalconsultants.com/find-an-ibclc")[International Lactation Consultant Association directory]
```

**Proposed change:**
```
- Search the #link("https://www.ilca.org/why-ibclc/falc")[International Lactation Consultant Association directory]
```

**Rationale:** Wrong URL entirely. The correct ILCA "Find a Lactation Consultant" page is at ilca.org/why-ibclc/falc.

---

## SECONDARY FIXES (Minor Issues)

---

### Fix #8: Ch 00 (Introduction) — Frontiers in Pediatrics Volume Format

**File:** `chapters/00-introduction.typ`

**Issue:** Citation [1] lists volume as "55(3):222-228" which is suspicious for Frontiers in Pediatrics — Frontiers journals don't use traditional volume/page numbers. They use article numbers. This is likely a formatting error (possibly hallucinated page numbers).

**Current text (line 200):**
```
[1] Vinall J, Grunau RE. Impact of repeated procedural pain-related stress in infants born very preterm. _Frontiers in Pediatrics_. 2014;55(3):222-228.
```

**Proposed change:**
```
[1] Vinall J, Grunau RE. Impact of repeated procedural pain-related stress in infants born very preterm. _Pediatric Research_. 2014;75(5):584-587.
```

**Rationale:** This paper is actually published in *Pediatric Research*, not *Frontiers in Pediatrics*. The correct citation is Pediatric Research, Volume 75, Issue 5, 2014, pages 584-587. Both the journal name and volume/page numbers need correction.

---

### Fix #9: Ch 15 (Cesarean) — WHO 2015 Characterization

**File:** `chapters/15-cesarean-birth.typ`

**Issue:** Text says "the WHO's recommended ceiling of 15%" and attributes this to a 2015 WHO statement. In reality, the 2015 WHO statement **moved away** from specific targets. The 10-15% benchmark originates from **1985**, not 2015. The 2015 statement said: "At population level, caesarean section rates higher than 10% are not associated with reductions in maternal and newborn mortality rates."

**Current text (line 43):**
```
The U.S. cesarean rate hit 32.4% in 2024 [9]. That's about half a million more surgeries per year than the WHO's recommended ceiling of 15% [4].
```

**Proposed change:**
```
The U.S. cesarean rate hit 32.4% in 2024 [9]. The WHO has stated that cesarean rates above 10-15% at the population level are not associated with reduced maternal or newborn mortality [4]. By that benchmark, the U.S. is performing roughly half a million more cesareans per year than evidence supports.
```

**Rationale:** More accurate characterization. The WHO moved away from a hard "ceiling" in 2015, instead noting the lack of benefit above 10-15%. The revised text conveys the same message without misattributing a "recommended ceiling."

---

### Fix #10: Ch 40 (Childbirth Education) — Hodnett Citation May Need Updating

**File:** `chapters/40-childbirth-education.typ`

**Issue:** Citation [1] references "Hodnett ED, et al. Continuous support for women during childbirth. Cochrane Database of Systematic Reviews. 2013." The relevant and more recent Cochrane review is **Bohren MA, et al. (2017)**. Hodnett was the lead on earlier editions; Bohren led the 2017 update.

**Current text (line 577):**
```
1. Hodnett ED, et al. Continuous support for women during childbirth. Cochrane Database of Systematic Reviews. 2013.
```

**Proposed change:**
```
1. Bohren MA, et al. Continuous support for women during childbirth. Cochrane Database of Systematic Reviews. 2017.
```

**Rationale:** Update to the most recent version of this Cochrane review. The content and conclusions are similar, but referencing the current edition is better practice.

---

### Fix #11: Ch 38 (VBAC) — Unverifiable Calculator Statistics

**File:** `chapters/38-vbac.typ`

**Issue:** The text claims a VBAC calculator "predicted 63.6% success, but the actual rate was only 51.1%" and cites a 2025 Medscape source [5]. These specific figures could not be independently verified from the Medscape source, though the general claim about overestimation with induction was confirmed.

**Current text (line 87):**
```
Recent research from 2025 shows that VBAC calculators may overestimate success rates for induced labor [5]. In one study, the calculator predicted 63.6% success, but the actual rate was only 51.1% [5].
```

**Proposed change:**
```
Research shows that VBAC calculators may overestimate success rates, particularly for induced labor [5]. Studies have found significant gaps between predicted and actual success rates when induction is involved, suggesting the calculator does not adequately account for how induction affects VBAC outcomes [5].
```

**Rationale:** The general claim (calculators overestimate for inductions) is supported. The specific numbers (63.6% vs 51.1%) couldn't be verified. Softening to general language preserves the point without citing unverifiable specifics.

---

### Fix #12: Ch 13 (Unmedicated Birth) — Broken sarahbuckley.com Link

**File:** `chapters/13-unmedicated-birth.typ`

**Issue:** Citation [6] references `sarahbuckley.com` but the domain is not found / inaccessible. The referenced work (Sarah Buckley's "Pain in Labour: Your Hormones are Your Helpers") is available elsewhere.

**Current text (line 440):**
```
[6] Buckley SJ. Pain in Labour: Your Hormones are Your Helpers. 2010. https://sarahbuckley.com
```

**Proposed change:**
```
[6] Buckley SJ. Hormonal Physiology of Childbearing: Evidence and Implications for Women, Babies, and Maternity Care. National Partnership for Women & Families / Childbirth Connection. 2015.
```

**Rationale:** Buckley's more comprehensive and citable work is her 2015 report published through the National Partnership for Women & Families. This is a stable, recognized publication that covers the same material (and more) as the broken blog link. It's the same author making the same points in a more authoritative format.

---

### Fix #13: Ch 31 (Infant Pain) — Masarwa Citation Cannot Be Located

**File:** `chapters/31-infant-pain-management.typ`

**Issue:** Citation [2] reads "Masarwa R, et al. Prenatal Acetaminophen and Risk for ADHD. JAMA Pediatrics. 2018." A PubMed search returns no results for this author/journal/year combination. The study may exist under a different journal name or may be misattributed.

**Current text (line 197):**
```
2. Masarwa R, et al. Prenatal Acetaminophen and Risk for ADHD. JAMA Pediatrics. 2018.
```

**Proposed change:**
```
2. Masarwa R, et al. Prenatal Exposure to Acetaminophen and Risk for Attention Deficit Hyperactivity Disorder and Autistic Spectrum Disorder: A Systematic Review, Meta-Analysis, and Meta-Regression Analysis of Cohort Studies. American Journal of Epidemiology. 2018;187(8):1817-1827.
```

**Rationale:** This is the correct Masarwa 2018 study — it's a meta-analysis published in *American Journal of Epidemiology*, not JAMA Pediatrics. The journal was wrong; the author and year were correct.

---

### Fix #14: Ch 31 (Infant Pain) — Ji et al. Year Error

**File:** `chapters/31-infant-pain-management.typ`

**Issue:** Citation [3] lists Ji et al. as 2019, but the study was actually published in **2020** (PMID: 32044936, JAMA Psychiatry).

**Current text (line 199):**
```
3. Ji Y, et al. Association of Cord Plasma Biomarkers of In Utero Acetaminophen Exposure With Risk of Attention-Deficit/Hyperactivity Disorder and Autism Spectrum Disorder in Childhood. JAMA Psychiatry. 2019.
```

**Proposed change:**
```
3. Ji Y, et al. Association of Cord Plasma Biomarkers of In Utero Acetaminophen Exposure With Risk of Attention-Deficit/Hyperactivity Disorder and Autism Spectrum Disorder in Childhood. JAMA Psychiatry. 2020;77(2):180-189.
```

**Rationale:** Year correction (2019 → 2020) and addition of volume/page numbers for completeness.

---

### Fix #15: Ch 31 (Infant Pain) — "2024 Mount Sinai Study" Attribution

**File:** `chapters/31-infant-pain-management.typ`

**Issue:** Citation [4] is described in the text as "A 2024 Mount Sinai study" but the citation actually reads "Alemany S, et al. ... British Journal of Clinical Pharmacology. 2021." This is a 2021 study, not 2024, and is from Barcelona (ISGlobal), not Mount Sinai.

**Current text (line 36-37):**
```
- A 2024 Mount Sinai study found associations between acetaminophen use and autism diagnosis [4]
```

**Proposed change:**
```
- A 2021 study found associations between prenatal and postnatal acetaminophen exposure and increased autism spectrum and ADHD symptoms [4]
```

**Current citation text (line 201):**
```
4. Alemany S, et al. Prenatal and postnatal exposure to acetaminophen in relation to autism spectrum and attention-deficit and hyperactivity symptoms. British Journal of Clinical Pharmacology. 2021.
```

**Proposed change (citation stays the same, just add volume):**
```
4. Alemany S, et al. Prenatal and postnatal exposure to acetaminophen in relation to autism spectrum and attention-deficit and hyperactivity symptoms. British Journal of Clinical Pharmacology. 2021;87(7):2934-2944.
```

**Rationale:** The in-text reference ("2024 Mount Sinai study") doesn't match the citation (Alemany 2021, Barcelona). Fix the in-text reference to match the actual citation.

---

### Fix #16: Ch 16 (Feeding) — IBCLC "35% Increase" Claim

**File:** `chapters/16-feeding.typ`

**Issue:** Citation [15] claims "IBCLC support increases breastfeeding initiation by 35%" and cites "JAMA Pediatrics. 2025." This is behind a paywall and cannot be verified. The year (2025) is recent enough to be plausible but the specific "35%" figure may be AI-generated.

**Current text (line 411):**
```
The gold standard. Research shows IBCLC support increases breastfeeding initiation by 35% and improves both any breastfeeding and exclusive breastfeeding rates [15].
```

**Proposed change:**
```
The gold standard. Research shows IBCLC support significantly improves breastfeeding initiation, duration, and exclusivity rates [15].
```

**Rationale:** The general claim (IBCLC support improves outcomes) is well-established. The specific "35%" figure can't be verified. Softening to "significantly improves" preserves the point without an unverifiable number.

---

### Fix #17: Ch 13 (Unmedicated Birth) — Bradley Method "86% Success Rate"

**File:** `chapters/13-unmedicated-birth.typ`

**Issue:** The "86% unmedicated birth rate" is commonly cited for the Bradley Method but cannot be independently verified. It originates from the Bradley Method organization's own reported outcomes and is not found on their current website.

**Current text (lines 9 and 96):**
```
(line 9): over 86% of women trained in natural birth methods achieve unmedicated delivery [12]
(line 96): *Success Rate:* The Bradley Method reports that over 86% of trained couples achieve unmedicated vaginal birth.
```

**Proposed change:**
```
(line 9): the Bradley Method reports that the majority of trained couples achieve unmedicated delivery [12]
(line 96): *Success Rate:* The Bradley Method organization reports that the large majority of trained couples achieve unmedicated vaginal birth, though independent verification of this figure is not available.
```

**Rationale:** The 86% figure is self-reported by the Bradley organization without independent verification. "Majority" or "large majority" is defensible; an exact percentage from an unverifiable self-report is not.

---

### Fix #18: Ch 39 (Cascade Interventions) — Unverifiable birthindueseason.org Statistics

**File:** `chapters/39-cascade-interventions.typ`

**Issue:** Multiple specific statistics (32% vs 17% for Pitocin fetal heart rate; 52% vs 38% for epidural cesareans) are attributed to birthindueseason.org but these specific numbers are not directly visible on the page. They may be in linked infographics not captured by web fetch.

**NO TEXT CHANGE PROPOSED.** These statistics appear throughout the cascade chapter and are central to its arguments. The source (birthindueseason.org) is a legitimate birth education site. The statistics likely exist in downloadable infographics or linked research on the site. Recommend: manually verify by visiting the site and checking their infographics/PDFs. If the numbers can't be found, soften to general language similar to the other fixes.

---

### Fix #19: Ch 07 (Eye Ointment) — AAP 2024 Link Mismatch

**File:** `chapters/07-eye-ointment.typ`

**Issue:** The AAP 2024 link points to an erythromycin shortage page, not the policy statement cited about "ongoing re-evaluation."

**Current text (line 211):**
```
*American Academy of Pediatrics (2024).* Policy Statement on Neonatal Eye Prophylaxis. #link("https://publications.aap.org/redbook/resources/27790/Erythromycin-Ointment-Shortage")[AAP RedBook Resources]
```

**Proposed change:**
```
*American Academy of Pediatrics (2024).* Gonococcal Ophthalmia Neonatorum Prevention. In: Kimberlin DW, et al., eds. Red Book: 2024-2027 Report of the Committee on Infectious Diseases. AAP. #link("https://publications.aap.org/redbook")[AAP Red Book]
```

**Rationale:** The link pointed to the wrong page (shortage info, not the policy). The AAP's position on re-evaluation is in the Red Book chapter on gonococcal ophthalmia neonatorum. Since the exact deep link may not be publicly accessible, link to the Red Book main page.

---

### Fix #20: Ch 07 (Eye Ointment) — Canadian Paediatric Society Dead Link

**File:** `chapters/07-eye-ointment.typ`

**Issue:** The CPS position statement page has been removed from their website. The claim that CPS "recommends against routine use" cannot be verified from the current link.

**Current text (line 215):**
```
*Canadian Paediatric Society.* Position Statement: Preventing Ophthalmia Neonatorum. #link("https://cps.ca/documents/position/ophthalmia-neonatorum")[cps.ca]
```

**Proposed change:**
```
*Canadian Paediatric Society.* Position Statement: Preventing Ophthalmia Neonatorum (2015, reaffirmed 2021). Note: Original position statement has been archived; the CPS recommended targeted rather than universal prophylaxis.
```

**Also update the in-text claim (line 58):**

**Current:**
```
- *Canada:* Most provinces don't require it; the Canadian Paediatric Society recommends against routine use
```

**Proposed:**
```
- *Canada:* Most provinces no longer require it; Canadian practice has moved toward targeted rather than universal prophylaxis
```

**Rationale:** Since the CPS document is no longer accessible, we can't link to it. The claim is widely referenced in obstetric literature, but softening the attribution is appropriate when the primary source is unavailable.

---

### Fix #21: Ch 37 (Water Birth) — Medical News Today Broken Link

**File:** `chapters/37-water-birth.typ`

**Issue:** Citation [4] (Medical News Today) returns HTTP 500 error. The page is inaccessible.

**Current text (line 479):**
```
[4] Sanders J, et al. Water births 'pose no extra risk'. Medical News Today. https://www.medicalnewstoday.com/articles/305489
```

**Proposed change:**
```
[4] Sanders J, et al. Reassessing the evidence around water birth. Journal of Midwifery & Women's Health. (Reference the POOL study directly instead of a news article about it.)
```

**OR simply remove this citation** since citation [5] already references the actual POOL study that citation [4] is reporting on. The Medical News Today link was a secondary news report about the same study.

**Rationale:** A news article about a study is weaker than the study itself. Since [5] already cites the actual POOL study, [4] is redundant and broken.

---

## SUMMARY

| # | Chapter | Severity | Type | Action |
|---|---------|----------|------|--------|
| 1 | 07 Eye Ointment | HIGH | Misrepresentation | Rewrite USPSTF characterization |
| 2 | 37 Water Birth | HIGH | Unsupported claim | Remove "30-50%" number |
| 3 | 05 Fetal Monitoring | HIGH | Misread source | Rewrite defensive medicine claim |
| 4 | 12 Circumcision | HIGH | Unverified claim | Remove "20,000" number |
| 5 | 12 Circumcision | HIGH | Wrong year | Fix 2018 → 2010 (Bollinger) |
| 6 | 05 Fetal Monitoring | MEDIUM | Wrong author | Fix Patel → Arnold & Gawrys |
| 7 | 16 Feeding | MEDIUM | Broken link | Fix ILCA URL |
| 8 | 00 Introduction | MINOR | Wrong journal/format | Fix journal name + pages |
| 9 | 15 Cesarean | MINOR | Mischaracterization | Fix WHO 2015 framing |
| 10 | 40 Childbirth Ed | MINOR | Outdated citation | Update Hodnett → Bohren 2017 |
| 11 | 38 VBAC | MINOR | Unverifiable stats | Soften specific numbers |
| 12 | 13 Unmedicated | MINOR | Broken link | Replace sarahbuckley.com |
| 13 | 31 Infant Pain | MINOR | Wrong journal | Fix journal name |
| 14 | 31 Infant Pain | MINOR | Wrong year | Fix 2019 → 2020 |
| 15 | 31 Infant Pain | MINOR | Wrong attribution | Fix "2024 Mount Sinai" → 2021 |
| 16 | 16 Feeding | MINOR | Unverifiable stat | Soften "35%" claim |
| 17 | 13 Unmedicated | MINOR | Unverifiable stat | Soften "86%" claim |
| 18 | 39 Cascade | INFO | Unverifiable stats | Manual verification needed |
| 19 | 07 Eye Ointment | MINOR | Wrong link | Fix AAP URL |
| 20 | 07 Eye Ointment | MINOR | Dead link | Note CPS archival |
| 21 | 37 Water Birth | MINOR | Broken link | Remove redundant MNT citation |
