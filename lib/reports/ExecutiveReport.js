import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: { backgroundColor: '#020617', padding: 60, color: '#f8fafc' },
  header: { marginBottom: 40 },
  title: { fontSize: 32, fontWeight: 'black', color: '#f59e0b', marginBottom: 10, textTransform: 'uppercase' },
  subtitle: { fontSize: 10, letterSpacing: 4, color: '#94a3b8', marginBottom: 30 },
  section: { marginBottom: 25, borderBottom: '1px solid #1e293b', paddingBottom: 20 },
  heading: { fontSize: 14, fontWeight: 'bold', color: '#f59e0b', marginBottom: 10, textTransform: 'uppercase' },
  body: { fontSize: 11, lineHeight: 1.6, color: '#cbd5e1' },
  footer: { position: 'absolute', bottom: 40, left: 60, fontSize: 8, color: '#475569' }
});

export const ExecutiveReport = ({ user, signal }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.header}>
        <Text style={styles.title}>{user.name}</Text>
        <Text style={styles.subtitle}>Executive Life-Path Analysis</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Celestial Configuration</Text>
        <Text style={styles.body}>
          At the moment of your sync, the Ascendant was positioned at {signal.context.ascendant}°. 
          This alignment triggers a {signal.context.primary_yoga}, a rare configuration found in 
          the charts of visionary leaders.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.heading}>Strategic Guidance</Text>
        <Text style={styles.body}>
          The planetary positions indicate a significant opening in your career 
          and legacy. This is not a time for hesitation; the stars favor bold, 
          technological innovations.
        </Text>
      </View>

      <Text style={styles.footer}>© 2026 AstraVeda Connect | Proprietary Digital Oracle Engine</Text>
    </Page>
  </Document>
);
