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
    padding: 50,
    fontFamily: 'Times-Roman',
    fontSize: 11,
    lineHeight: 1.6,
    backgroundColor: '#fdfbf7',
  },
  // Gold decorative frame
  frameOuter: {
    position: 'absolute',
    top: 25,
    left: 25,
    right: 25,
    bottom: 25,
    border: '1 solid #d4af37',
  },
  frameInner: {
    position: 'absolute',
    top: 30,
    left: 30,
    right: 30,
    bottom: 30,
    border: '2 solid #d4af37',
  },
  cornerTopLeft: {
    position: 'absolute',
    top: 22,
    left: 22,
    width: 40,
    height: 40,
    borderTop: '3 solid #d4af37',
    borderLeft: '3 solid #d4af37',
  },
  cornerTopRight: {
    position: 'absolute',
    top: 22,
    right: 22,
    width: 40,
    height: 40,
    borderTop: '3 solid #d4af37',
    borderRight: '3 solid #d4af37',
  },
  cornerBottomLeft: {
    position: 'absolute',
    bottom: 22,
    left: 22,
    width: 40,
    height: 40,
    borderBottom: '3 solid #d4af37',
    borderLeft: '3 solid #d4af37',
  },
  cornerBottomRight: {
    position: 'absolute',
    bottom: 22,
    right: 22,
    width: 40,
    height: 40,
    borderBottom: '3 solid #d4af37',
    borderRight: '3 solid #d4af37',
  },
  header: {
    marginBottom: 25,
    textAlign: 'center',
    paddingBottom: 20,
  },
  ornamentTop: {
    fontSize: 18,
    color: '#d4af37',
    marginBottom: 5,
    letterSpacing: 8,
  },
  title: {
    fontSize: 32,
    fontFamily: 'Times-BoldItalic',
    marginBottom: 5,
    color: '#3d3d3d',
    letterSpacing: 3,
  },
  titleUnderline: {
    width: 150,
    height: 2,
    backgroundColor: '#d4af37',
    marginHorizontal: 'auto',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#5a5a5a',
    marginBottom: 4,
    fontFamily: 'Times-Italic',
  },
  dueDate: {
    fontSize: 12,
    color: '#8b7355',
    marginTop: 8,
    fontFamily: 'Times-Roman',
  },
  birthTeam: {
    marginTop: 20,
    padding: 15,
    backgroundColor: '#faf8f3',
    border: '1 solid #e5d9c3',
  },
  birthTeamTitle: {
    textAlign: 'center',
    fontSize: 11,
    fontFamily: 'Times-BoldItalic',
    color: '#d4af37',
    marginBottom: 10,
    letterSpacing: 2,
    textTransform: 'uppercase',
  },
  birthTeamGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  birthTeamItem: {
    width: '48%',
    marginBottom: 8,
    textAlign: 'center',
  },
  birthTeamLabel: {
    fontSize: 9,
    color: '#8b7355',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  birthTeamValue: {
    fontSize: 11,
    color: '#3d3d3d',
    fontFamily: 'Times-Bold',
  },
  section: {
    marginBottom: 18,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#d4af37',
  },
  sectionTitleWrapper: {
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 13,
    fontFamily: 'Times-BoldItalic',
    color: '#3d3d3d',
    textAlign: 'center',
    letterSpacing: 1,
  },
  item: {
    marginBottom: 10,
    paddingLeft: 15,
    borderLeft: '2 solid #e5d9c3',
  },
  itemTitle: {
    fontFamily: 'Times-Bold',
    marginBottom: 2,
    color: '#4a4a4a',
  },
  itemText: {
    color: '#5a5a5a',
    fontFamily: 'Times-Roman',
  },
  customNote: {
    marginTop: 5,
    fontFamily: 'Times-Italic',
    fontSize: 10,
    color: '#8b7355',
    paddingLeft: 12,
    borderLeft: '2 solid #d4af37',
  },
  footer: {
    position: 'absolute',
    bottom: 40,
    left: 50,
    right: 50,
    textAlign: 'center',
  },
  footerOrnament: {
    fontSize: 14,
    color: '#d4af37',
    marginBottom: 5,
  },
  footerText: {
    fontSize: 9,
    color: '#a0937d',
    fontFamily: 'Times-Italic',
  },
  disclaimer: {
    marginTop: 25,
    padding: 15,
    backgroundColor: '#faf8f3',
    border: '1 solid #e5d9c3',
    fontSize: 9,
    color: '#8b7355',
    lineHeight: 1.5,
    fontFamily: 'Times-Italic',
    textAlign: 'center',
  },
})

interface ElegantTemplateProps {
  birthTeam: BirthTeam
  groupedContent: Record<string, PlanItem[]>
  disclaimerText: string
  philosophyStatement?: string
  showPhilosophy?: boolean
}

export function ElegantTemplate({ birthTeam, groupedContent, disclaimerText, philosophyStatement, showPhilosophy }: ElegantTemplateProps) {
  const primaryName = birthTeam.fields?.[0]?.value || 'My Birth Preferences'

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Decorative Frame */}
        <View style={styles.frameOuter} />
        <View style={styles.frameInner} />
        <View style={styles.cornerTopLeft} />
        <View style={styles.cornerTopRight} />
        <View style={styles.cornerBottomLeft} />
        <View style={styles.cornerBottomRight} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.ornamentTop}>* * *</Text>
          <Text style={styles.title}>Birth Plan</Text>
          <View style={styles.titleUnderline} />
          <Text style={styles.subtitle}>
            {primaryName}
          </Text>
          {birthTeam.due_date && (
            <Text style={styles.dueDate}>
              Anticipated Arrival: {new Date(birthTeam.due_date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          )}

          {/* Dynamic Birth Team Info */}
          <View style={styles.birthTeam}>
            <Text style={styles.birthTeamTitle}>My Birth Team</Text>
            <View style={styles.birthTeamGrid}>
              {birthTeam.fields?.slice(1).filter(f => f.value).map(field => (
                <View key={field.id} style={styles.birthTeamItem}>
                  <Text style={styles.birthTeamLabel}>{field.label}</Text>
                  <Text style={styles.birthTeamValue}>{field.value}</Text>
                </View>
              ))}
            </View>
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
              <View style={styles.sectionLine} />
              <View style={styles.sectionTitleWrapper}>
                <Text style={styles.sectionTitle}>{category}</Text>
              </View>
              <View style={styles.sectionLine} />
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
          <Text>{disclaimerText}</Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerOrnament}>~</Text>
          <Text style={styles.footerText}>
            Created with Birth Plan Builder | birthplanbuilder.com
          </Text>
        </View>
      </Page>
    </Document>
  )
}
