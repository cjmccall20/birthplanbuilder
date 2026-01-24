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
    fontFamily: 'Times-Roman',
    fontSize: 11,
    lineHeight: 1.6,
    backgroundColor: '#fff9f9',
  },
  // Decorative border elements
  topBorder: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    height: 15,
    borderTop: '3 solid #d4a5a5',
    borderLeft: '3 solid #d4a5a5',
    borderRight: '3 solid #d4a5a5',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
  },
  bottomBorder: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 15,
    borderBottom: '3 solid #d4a5a5',
    borderLeft: '3 solid #d4a5a5',
    borderRight: '3 solid #d4a5a5',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
  },
  cornerDecoration: {
    position: 'absolute',
    width: 30,
    height: 30,
    borderColor: '#e8c4c4',
  },
  header: {
    marginBottom: 25,
    textAlign: 'center',
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontFamily: 'Times-Bold',
    marginBottom: 8,
    color: '#8b5a5a',
    letterSpacing: 2,
  },
  titleDecoration: {
    fontSize: 14,
    color: '#d4a5a5',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 13,
    color: '#8b7070',
    marginBottom: 4,
    fontFamily: 'Times-Italic',
  },
  birthTeam: {
    marginTop: 15,
    padding: 15,
    backgroundColor: '#fdf5f5',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e8c4c4',
  },
  birthTeamRow: {
    flexDirection: 'row',
    marginBottom: 5,
  },
  birthTeamLabel: {
    width: 100,
    fontFamily: 'Times-Bold',
    fontSize: 10,
    color: '#8b7070',
  },
  birthTeamValue: {
    flex: 1,
    fontSize: 10,
    color: '#5a4a4a',
  },
  section: {
    marginBottom: 18,
  },
  sectionTitle: {
    fontSize: 15,
    fontFamily: 'Times-Bold',
    color: '#8b5a5a',
    marginBottom: 10,
    paddingBottom: 5,
    borderBottom: '1 solid #e8c4c4',
  },
  sectionDecoration: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  decorativeLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e8c4c4',
  },
  sectionTitleText: {
    paddingHorizontal: 10,
    fontSize: 15,
    fontFamily: 'Times-Bold',
    color: '#8b5a5a',
  },
  item: {
    marginBottom: 10,
    paddingLeft: 12,
  },
  itemTitle: {
    fontFamily: 'Times-Bold',
    marginBottom: 2,
    color: '#5a4a4a',
  },
  itemText: {
    color: '#6a5a5a',
    fontFamily: 'Times-Roman',
  },
  customNote: {
    marginTop: 4,
    fontFamily: 'Times-Italic',
    fontSize: 10,
    color: '#8b7070',
    paddingLeft: 10,
    borderLeft: '2 solid #d4a5a5',
  },
  footer: {
    position: 'absolute',
    bottom: 35,
    left: 50,
    right: 50,
    textAlign: 'center',
    fontSize: 9,
    color: '#b89999',
    fontFamily: 'Times-Italic',
  },
  disclaimer: {
    marginTop: 25,
    padding: 15,
    backgroundColor: '#fdf8f8',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#e8c4c4',
    fontSize: 9,
    color: '#8b7070',
    lineHeight: 1.4,
    fontFamily: 'Times-Italic',
  },
  floralAccent: {
    color: '#d4a5a5',
    fontSize: 10,
  },
})

interface PlanItem {
  category: string
  title: string
  answer: string
  birthPlanText: string
  customNote?: string
}

interface FloralTemplateProps {
  birthTeam: BirthTeam
  groupedContent: Record<string, PlanItem[]>
}

export function FloralTemplate({ birthTeam, groupedContent }: FloralTemplateProps) {
  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Decorative Borders */}
        <View style={styles.topBorder} />
        <View style={styles.bottomBorder} />

        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.titleDecoration}>~ ~ ~</Text>
          <Text style={styles.title}>Birth Plan</Text>
          <Text style={styles.titleDecoration}>~ ~ ~</Text>
          <Text style={styles.subtitle}>
            {birthTeam.mother_name || 'My Birth Preferences'}
          </Text>
          {birthTeam.due_date && (
            <Text style={styles.subtitle}>
              Expected: {new Date(birthTeam.due_date).toLocaleDateString('en-US', {
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
            <View style={styles.sectionDecoration}>
              <View style={styles.decorativeLine} />
              <Text style={styles.sectionTitleText}>{category}</Text>
              <View style={styles.decorativeLine} />
            </View>
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
