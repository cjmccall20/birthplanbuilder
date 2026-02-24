import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer'
import type { BirthTeam } from '@/types'
import { getBirthTeamFieldValue } from '@/types'
import type { PlanItem } from '@/lib/editor/editorToPdf'

const styles = StyleSheet.create({
  page: {
    padding: 50,
    fontFamily: 'Helvetica',
    fontSize: 11,
    lineHeight: 1.5,
  },
  header: {
    marginBottom: 30,
    textAlign: 'center',
    borderBottom: '2 solid #d4a5a5',
    paddingBottom: 20,
  },
  title: {
    fontSize: 24,
    fontFamily: 'Helvetica-Bold',
    marginBottom: 8,
    color: '#333',
  },
  subtitle: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  birthTeam: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#faf5f5',
    borderRadius: 4,
  },
  birthTeamRow: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  birthTeamLabel: {
    width: 100,
    fontFamily: 'Helvetica-Bold',
    fontSize: 10,
    color: '#666',
  },
  birthTeamValue: {
    flex: 1,
    fontSize: 10,
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'Helvetica-Bold',
    color: '#d4a5a5',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: '1 solid #eee',
  },
  item: {
    marginBottom: 10,
    paddingLeft: 10,
  },
  itemTitle: {
    fontFamily: 'Helvetica-Bold',
    marginBottom: 2,
  },
  itemText: {
    color: '#333',
  },
  customNote: {
    marginTop: 4,
    fontStyle: 'italic',
    fontSize: 10,
    color: '#666',
    paddingLeft: 10,
    borderLeft: '2 solid #d4a5a5',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 50,
    right: 50,
    textAlign: 'center',
    fontSize: 9,
    color: '#999',
  },
  disclaimer: {
    marginTop: 30,
    padding: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 4,
    fontSize: 9,
    color: '#666',
    lineHeight: 1.4,
  },
})

interface MinimalTemplateProps {
  birthTeam: BirthTeam
  groupedContent: Record<string, PlanItem[]>
  disclaimerText?: string
  philosophyStatement?: string
  showPhilosophy?: boolean
}

const DEFAULT_DISCLAIMER = 'This birth plan represents my preferences for labor and delivery. I understand that circumstances may change and medical decisions may need to be made for the safety of myself and my baby. I trust my care team to keep us informed and involve us in any decisions when possible.'

export function MinimalTemplate({ birthTeam, groupedContent, disclaimerText, philosophyStatement, showPhilosophy }: MinimalTemplateProps) {
  // Get primary name from first field
  const primaryName = birthTeam.fields?.[0]?.value || 'My Birth Preferences'

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Birth Plan</Text>
          <Text style={styles.subtitle}>{primaryName}</Text>
          {birthTeam.due_date && (
            <Text style={styles.subtitle}>
              Due Date: {new Date(birthTeam.due_date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          )}

          {/* Dynamic Birth Team Info */}
          <View style={styles.birthTeam}>
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
            <Text style={styles.sectionTitle}>{category}</Text>
            {items.map((item, idx) => (
              <View key={idx} style={styles.item}>
                <Text style={styles.itemTitle}>
                  {item.stance === 'desired' ? '\u2713 ' : item.stance === 'declined' ? '\u2717 ' : item.stance === 'cautious' ? '\u26A0 ' : ''}
                  {item.title}
                </Text>
                <Text style={styles.itemText}>
                  {item.birthPlanText}
                  {item.assignedTo && (
                    <Text style={{ fontSize: '0.7em', opacity: 0.6 }}> (@{item.assignedTo})</Text>
                  )}
                </Text>
                {item.customNote && (
                  <Text style={styles.customNote}>Note: {item.customNote}</Text>
                )}
              </View>
            ))}
          </View>
        ))}

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text>{disclaimerText || DEFAULT_DISCLAIMER}</Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Created with Birth Plan Builder | birthplanbuilder.com
        </Text>
      </Page>
    </Document>
  )
}
