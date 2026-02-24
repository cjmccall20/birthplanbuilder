import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer'
import type { BirthTeam } from '@/types'
import type { PlanItem } from '@/lib/editor/editorToPdf'

const styles = StyleSheet.create({
  page: {
    padding: 45,
    fontFamily: 'Times-Roman',
    fontSize: 11,
    lineHeight: 1.6,
    backgroundColor: '#f5f0e1',
  },
  // Kraft paper texture simulation
  paperTexture: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#f5f0e1',
  },
  // Rustic border
  border: {
    position: 'absolute',
    top: 15,
    left: 15,
    right: 15,
    bottom: 15,
    border: '2 dashed #a0522d',
  },
  innerBorder: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    bottom: 20,
    border: '1 solid #c8a882',
  },
  header: {
    marginBottom: 20,
    textAlign: 'center',
    paddingBottom: 15,
    borderBottom: '2 solid #a0522d',
  },
  titleWrapper: {
    marginBottom: 10,
  },
  titleDecoration: {
    fontSize: 12,
    color: '#a0522d',
    marginBottom: 5,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Times-Bold',
    color: '#5d3a1a',
    letterSpacing: 4,
    textTransform: 'uppercase',
  },
  titleUnderline: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  },
  underlineDash: {
    width: 40,
    height: 2,
    backgroundColor: '#a0522d',
  },
  underlineDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#a0522d',
    marginHorizontal: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#6b4423',
    marginBottom: 4,
    fontFamily: 'Times-Italic',
  },
  dueDate: {
    fontSize: 11,
    color: '#8b6914',
    marginTop: 5,
  },
  birthTeam: {
    marginTop: 15,
    padding: 12,
    backgroundColor: '#f9f4e8',
    border: '1 solid #c8a882',
    borderRadius: 2,
  },
  birthTeamTitle: {
    textAlign: 'center',
    fontSize: 10,
    fontFamily: 'Times-Bold',
    color: '#a0522d',
    marginBottom: 10,
    textTransform: 'uppercase',
    letterSpacing: 2,
  },
  birthTeamRow: {
    flexDirection: 'row',
    marginBottom: 5,
    paddingBottom: 5,
    borderBottom: '1 dotted #d4c4a8',
  },
  birthTeamLabel: {
    width: 100,
    fontFamily: 'Times-Bold',
    fontSize: 10,
    color: '#6b4423',
  },
  birthTeamValue: {
    flex: 1,
    fontSize: 10,
    color: '#4a3520',
  },
  section: {
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#a0522d',
    padding: 8,
    paddingHorizontal: 12,
  },
  sectionIcon: {
    fontSize: 10,
    color: '#f5f0e1',
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontFamily: 'Times-Bold',
    color: '#f5f0e1',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  item: {
    marginBottom: 10,
    paddingLeft: 15,
    paddingRight: 10,
    borderLeft: '3 solid #c8a882',
    backgroundColor: '#faf7f0',
    paddingVertical: 8,
  },
  itemTitle: {
    fontFamily: 'Times-Bold',
    marginBottom: 3,
    color: '#5d3a1a',
    fontSize: 11,
  },
  itemText: {
    color: '#4a3520',
    fontFamily: 'Times-Roman',
    fontSize: 10,
  },
  customNote: {
    marginTop: 5,
    fontFamily: 'Times-Italic',
    fontSize: 9,
    color: '#8b6914',
    borderLeft: '2 solid #a0522d',
    backgroundColor: '#f5edd8',
    padding: 5,
    paddingLeft: 10,
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 45,
    right: 45,
    textAlign: 'center',
  },
  footerLine: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  footerDash: {
    width: 30,
    height: 1,
    backgroundColor: '#a0522d',
  },
  footerHeart: {
    fontSize: 10,
    color: '#a0522d',
    marginHorizontal: 10,
  },
  footerText: {
    fontSize: 9,
    color: '#8b7355',
    fontFamily: 'Times-Italic',
  },
  disclaimer: {
    marginTop: 20,
    padding: 12,
    backgroundColor: '#f9f4e8',
    border: '1 solid #c8a882',
    fontSize: 9,
    color: '#6b4423',
    lineHeight: 1.5,
    fontFamily: 'Times-Italic',
  },
  disclaimerHeader: {
    fontFamily: 'Times-Bold',
    fontSize: 10,
    color: '#a0522d',
    marginBottom: 5,
  },
  stampBox: {
    position: 'absolute',
    top: 35,
    right: 35,
    width: 70,
    height: 70,
    border: '2 solid #a0522d',
    borderRadius: 35,
    alignItems: 'center',
    justifyContent: 'center',
    transform: 'rotate(-15deg)',
    backgroundColor: 'rgba(245, 240, 225, 0.9)',
  },
  stampText: {
    fontSize: 8,
    fontFamily: 'Times-Bold',
    color: '#a0522d',
    textAlign: 'center',
    textTransform: 'uppercase',
  },
})

interface RusticTemplateProps {
  birthTeam: BirthTeam
  groupedContent: Record<string, PlanItem[]>
  disclaimerText: string
  philosophyStatement?: string
  showPhilosophy?: boolean
}

export function RusticTemplate({ birthTeam, groupedContent, disclaimerText, philosophyStatement, showPhilosophy }: RusticTemplateProps) {
  const primaryName = birthTeam.fields?.[0]?.value || 'My Birth Preferences'

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Rustic Borders */}
        <View style={styles.border} />
        <View style={styles.innerBorder} />

        {/* Decorative Stamp */}
        <View style={styles.stampBox}>
          <Text style={styles.stampText}>Made{'\n'}With{'\n'}Love</Text>
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.titleWrapper}>
            <Text style={styles.titleDecoration}>- - -</Text>
            <Text style={styles.title}>Birth Plan</Text>
            <View style={styles.titleUnderline}>
              <View style={styles.underlineDash} />
              <View style={styles.underlineDot} />
              <View style={styles.underlineDash} />
            </View>
          </View>
          <Text style={styles.subtitle}>
            {primaryName}
          </Text>
          {birthTeam.due_date && (
            <Text style={styles.dueDate}>
              Expected: {new Date(birthTeam.due_date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          )}

          {/* Dynamic Birth Team Info */}
          <View style={styles.birthTeam}>
            <Text style={styles.birthTeamTitle}>Our Birth Team</Text>
            {birthTeam.fields?.slice(1).filter(f => f.value).map(field => (
              <View key={field.id} style={styles.birthTeamRow}>
                <Text style={styles.birthTeamLabel}>{field.label}:</Text>
                <Text style={styles.birthTeamValue}>{field.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Philosophy Statement */}
        {showPhilosophy !== false && philosophyStatement && (
          <View style={{ marginBottom: 12, paddingHorizontal: 4 }}>
            <Text style={{ fontSize: 10, fontStyle: 'italic', color: '#555', lineHeight: 1.5 }}>
              {philosophyStatement}
            </Text>
          </View>
        )}

        {/* Content Sections */}
        {Object.entries(groupedContent).map(([category, items], index) => (
          <View key={category} style={styles.section} break={index > 0}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionIcon}>*</Text>
              <Text style={styles.sectionTitle}>{category}</Text>
            </View>
            {items.map((item, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.itemTitle}>
                  {item.stance === 'desired' ? '\u2713 ' : item.stance === 'declined' ? '\u2717 ' : item.stance === 'cautious' ? '\u26A0 ' : ''}
                  {item.title}
                </Text>
                <Text style={styles.itemText}>{item.birthPlanText}</Text>
                {item.customNote && (
                  <Text style={styles.customNote}>Note: {item.customNote}</Text>
                )}
              </View>
            ))}
          </View>
        ))}

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerHeader}>A Note to My Care Team:</Text>
          <Text>{disclaimerText}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <View style={styles.footerLine}>
            <View style={styles.footerDash} />
            <Text style={styles.footerHeart}>*</Text>
            <View style={styles.footerDash} />
          </View>
          <Text style={styles.footerText}>
            Created with Birth Plan Builder | birthplanbuilder.com
          </Text>
        </View>
      </Page>
    </Document>
  )
}
