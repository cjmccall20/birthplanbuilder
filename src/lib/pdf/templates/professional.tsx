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
    padding: 40,
    fontFamily: 'Helvetica',
    fontSize: 10,
    lineHeight: 1.4,
    backgroundColor: '#ffffff',
  },
  header: {
    marginBottom: 20,
    borderBottom: '3 solid #2c3e50',
    paddingBottom: 15,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Helvetica-Bold',
    color: '#2c3e50',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  documentType: {
    fontSize: 9,
    color: '#7f8c8d',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  patientInfo: {
    marginTop: 10,
    padding: 12,
    backgroundColor: '#f8f9fa',
    borderLeft: '4 solid #2c3e50',
  },
  infoGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  infoCell: {
    width: '50%',
    marginBottom: 6,
  },
  infoLabel: {
    fontSize: 8,
    color: '#7f8c8d',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#2c3e50',
  },
  section: {
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    backgroundColor: '#2c3e50',
    padding: 6,
  },
  sectionNumber: {
    width: 20,
    height: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionNumberText: {
    fontSize: 10,
    fontFamily: 'Helvetica-Bold',
    color: '#2c3e50',
  },
  sectionTitle: {
    fontSize: 11,
    fontFamily: 'Helvetica-Bold',
    color: '#ffffff',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  table: {
    border: '1 solid #dee2e6',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottom: '1 solid #dee2e6',
  },
  tableRowAlt: {
    flexDirection: 'row',
    borderBottom: '1 solid #dee2e6',
    backgroundColor: '#f8f9fa',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#ecf0f1',
    borderBottom: '1 solid #dee2e6',
  },
  tableCellPreference: {
    width: '35%',
    padding: 6,
    borderRight: '1 solid #dee2e6',
  },
  tableCellDetail: {
    width: '65%',
    padding: 6,
  },
  tableHeaderText: {
    fontSize: 9,
    fontFamily: 'Helvetica-Bold',
    color: '#2c3e50',
    textTransform: 'uppercase',
  },
  itemTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: '#2c3e50',
  },
  itemText: {
    fontSize: 9,
    color: '#34495e',
  },
  customNote: {
    marginTop: 3,
    fontSize: 8,
    color: '#7f8c8d',
    fontStyle: 'italic',
    paddingLeft: 8,
    borderLeft: '2 solid #3498db',
  },
  footer: {
    position: 'absolute',
    bottom: 25,
    left: 40,
    right: 40,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTop: '1 solid #dee2e6',
    paddingTop: 8,
  },
  footerText: {
    fontSize: 8,
    color: '#95a5a6',
  },
  disclaimer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#fef9e7',
    borderLeft: '4 solid #f1c40f',
    fontSize: 8,
    color: '#7f8c8d',
    lineHeight: 1.4,
  },
  disclaimerTitle: {
    fontFamily: 'Helvetica-Bold',
    fontSize: 9,
    color: '#f39c12',
    marginBottom: 4,
    textTransform: 'uppercase',
  },
  signatureSection: {
    marginTop: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  signatureBox: {
    width: '45%',
    borderTop: '1 solid #2c3e50',
    paddingTop: 5,
  },
  signatureLabel: {
    fontSize: 8,
    color: '#7f8c8d',
  },
})

interface ProfessionalTemplateProps {
  birthTeam: BirthTeam
  groupedContent: Record<string, PlanItem[]>
  disclaimerText: string
  philosophyStatement?: string
  showPhilosophy?: boolean
}

export function ProfessionalTemplate({ birthTeam, groupedContent, disclaimerText, philosophyStatement, showPhilosophy }: ProfessionalTemplateProps) {
  const primaryName = birthTeam.fields?.[0]?.value || 'Not Specified'
  let sectionNumber = 0

  return (
    <Document>
      <Page size="LETTER" style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.title}>Birth Plan</Text>
              <Text style={styles.documentType}>Patient Preferences Document</Text>
            </View>
            <View>
              {birthTeam.due_date && (
                <Text style={styles.infoValue}>
                  EDD: {new Date(birthTeam.due_date).toLocaleDateString('en-US', {
                    month: '2-digit',
                    day: '2-digit',
                    year: 'numeric',
                  })}
                </Text>
              )}
            </View>
          </View>

          {/* Patient Information Grid */}
          <View style={styles.patientInfo}>
            <View style={styles.infoGrid}>
              <View style={styles.infoCell}>
                <Text style={styles.infoLabel}>Patient Name</Text>
                <Text style={styles.infoValue}>{primaryName}</Text>
              </View>
              {birthTeam.fields?.slice(1).filter(f => f.value).map(field => (
                <View key={field.id} style={styles.infoCell}>
                  <Text style={styles.infoLabel}>{field.label}</Text>
                  <Text style={styles.infoValue}>{field.value}</Text>
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
        {Object.entries(groupedContent).map(([category, items], index) => {
          sectionNumber++
          return (
            <View key={category} style={styles.section} break={index > 0}>
              <View style={styles.sectionHeader}>
                <View style={styles.sectionNumber}>
                  <Text style={styles.sectionNumberText}>{sectionNumber}</Text>
                </View>
                <Text style={styles.sectionTitle}>{category}</Text>
              </View>
              <View style={styles.table}>
                <View style={styles.tableHeader}>
                  <View style={styles.tableCellPreference}>
                    <Text style={styles.tableHeaderText}>Preference</Text>
                  </View>
                  <View style={styles.tableCellDetail}>
                    <Text style={styles.tableHeaderText}>Details / Instructions</Text>
                  </View>
                </View>
                {items.map((item, index) => (
                  <View
                    key={index}
                    style={index % 2 === 0 ? styles.tableRow : styles.tableRowAlt}
                  >
                    <View style={styles.tableCellPreference}>
                      <Text style={styles.itemTitle}>
                        {item.stance === 'desired' ? '\u2713 ' : item.stance === 'declined' ? '\u2717 ' : item.stance === 'cautious' ? '\u26A0 ' : ''}
                        {item.title}
                      </Text>
                    </View>
                    <View style={styles.tableCellDetail}>
                      <Text style={styles.itemText}>
                        {item.birthPlanText}
                        {item.assignedTo && (
                          <Text style={{ fontSize: '0.7em', opacity: 0.6 }}> (@{item.assignedTo})</Text>
                        )}
                      </Text>
                      {item.customNote && (
                        <Text style={styles.customNote}>Additional Note: {item.customNote}</Text>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            </View>
          )
        })}

        {/* Disclaimer */}
        <View style={styles.disclaimer}>
          <Text style={styles.disclaimerTitle}>Important Notice</Text>
          <Text>{disclaimerText}</Text>
        </View>

        {/* Signature Section */}
        <View style={styles.signatureSection}>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Patient Signature / Date</Text>
          </View>
          <View style={styles.signatureBox}>
            <Text style={styles.signatureLabel}>Provider Acknowledgment / Date</Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Document generated: {new Date().toLocaleDateString('en-US')}
          </Text>
          <Text style={styles.footerText}>
            birthplanbuilder.com
          </Text>
        </View>
      </Page>
    </Document>
  )
}
