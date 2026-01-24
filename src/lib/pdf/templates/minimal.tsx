import React from 'react'
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from '@react-pdf/renderer'
import { BirthTeam } from '@/types'

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

interface PlanItem {
  category: string
  title: string
  answer: string
  birthPlanText: string
  customNote?: string
}

interface MinimalTemplateProps {
  birthTeam: BirthTeam
  groupedContent: Record<string, PlanItem[]>
}

export function MinimalTemplate({ birthTeam, groupedContent }: MinimalTemplateProps) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>Birth Plan</Text>
          <Text style={styles.subtitle}>
            {birthTeam.mother_name || 'My Birth Preferences'}
          </Text>
          {birthTeam.due_date && (
            <Text style={styles.subtitle}>
              Due Date: {new Date(birthTeam.due_date).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </Text>
          )}

          {/* Birth Team Info */}
          <View style={styles.birthTeam}>
            {birthTeam.partner_name && (
              <View style={styles.birthTeamRow}>
                <Text style={styles.birthTeamLabel}>Partner:</Text>
                <Text style={styles.birthTeamValue}>{birthTeam.partner_name}</Text>
              </View>
            )}
            {birthTeam.provider_name && (
              <View style={styles.birthTeamRow}>
                <Text style={styles.birthTeamLabel}>Provider:</Text>
                <Text style={styles.birthTeamValue}>
                  {birthTeam.provider_name}
                  {birthTeam.provider_type && ` (${birthTeam.provider_type})`}
                </Text>
              </View>
            )}
            {birthTeam.doula_name && (
              <View style={styles.birthTeamRow}>
                <Text style={styles.birthTeamLabel}>Doula:</Text>
                <Text style={styles.birthTeamValue}>{birthTeam.doula_name}</Text>
              </View>
            )}
            {birthTeam.hospital_name && (
              <View style={styles.birthTeamRow}>
                <Text style={styles.birthTeamLabel}>Birth Location:</Text>
                <Text style={styles.birthTeamValue}>{birthTeam.hospital_name}</Text>
              </View>
            )}
          </View>
        </View>

        {/* Content Sections */}
        {Object.entries(groupedContent).map(([category, items]) => (
          <View key={category} style={styles.section}>
            <Text style={styles.sectionTitle}>{category}</Text>
            {items.map((item, index) => (
              <View key={index} style={styles.item}>
                <Text style={styles.itemTitle}>{item.title}</Text>
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
          <Text>
            This birth plan represents my preferences for labor and delivery. I understand
            that circumstances may change and medical decisions may need to be made for
            the safety of myself and my baby. I trust my care team to keep us informed
            and involve us in any decisions when possible.
          </Text>
        </View>

        {/* Footer */}
        <Text style={styles.footer}>
          Created with Birth Plan Builder | birthplanbuilder.com
        </Text>
      </Page>
    </Document>
  )
}
