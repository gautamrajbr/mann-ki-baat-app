import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { theme } from '../theme';
import { Heart, Users } from 'lucide-react-native';
import axios from 'axios';

// Ensure you replace with appropriate IP when testing on physical device
const API_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000/api';

export default function GroupSessionsScreen({ navigation }) {
  const [sessions, setSessions] = useState([]);

  useEffect(() => {
    axios.get(`${API_URL}/sessions`)
      .then(res => setSessions(res.data))
      .catch(err => console.error('Error fetching sessions:', err));
  }, []);

  const renderIcon = (iconName) => {
    if (iconName === 'favorite') return <Heart color={theme.colors.onPrimaryContainer} size={24} />;
    return <Users color={theme.colors.onSecondaryContainer} size={24} />;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>Healing Together</Text>
          <Text style={styles.subtitle}>
            Guided sessions designed to strengthen bonds, foster understanding, and build a safe space within your relationships.
          </Text>
        </View>

        <View style={styles.grid}>
          {sessions.map((session, index) => (
            <TouchableOpacity key={session.id} style={styles.card}>
              <View>
                <View style={[
                  styles.iconContainer, 
                  index % 2 === 0 ? styles.iconPrimary : styles.iconSecondary
                ]}>
                  {renderIcon(session.icon)}
                </View>
                <Text style={styles.cardTitle}>{session.type}</Text>
                <Text style={styles.cardDescription}>{session.description}</Text>
              </View>
              <View style={styles.cardFooter}>
                <View style={styles.durationBadge}>
                  <Text style={styles.durationText}>{session.duration}</Text>
                </View>
                <Text style={{color: theme.colors.primary}}>&rarr;</Text>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  container: { padding: theme.spacing.containerPadding, alignItems: 'center' },
  header: { alignItems: 'center', marginBottom: theme.spacing.lg, maxWidth: 600, marginTop: theme.spacing.md },
  title: { ...theme.typography.display, color: theme.colors.onSurface, marginBottom: theme.spacing.sm, textAlign: 'center' },
  subtitle: { ...theme.typography.bodyLg, color: theme.colors.onSurfaceVariant, textAlign: 'center' },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: theme.spacing.md, maxWidth: 800, width: '100%' },
  card: {
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderRadius: 20,
    padding: theme.spacing.md,
    width: '100%',
    maxWidth: 350,
    minHeight: 220,
    justifyContent: 'space-between',
    shadowColor: theme.colors.onSurface,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 32,
    elevation: 2,
    marginVertical: 8,
  },
  iconContainer: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center', marginBottom: theme.spacing.sm },
  iconPrimary: { backgroundColor: theme.colors.primaryContainer },
  iconSecondary: { backgroundColor: theme.colors.secondaryContainer },
  cardTitle: { ...theme.typography.headlineMd, color: theme.colors.onSurface, marginBottom: theme.spacing.xs },
  cardDescription: { ...theme.typography.bodyMd, color: theme.colors.onSurfaceVariant },
  cardFooter: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: theme.spacing.lg },
  durationBadge: { backgroundColor: theme.colors.secondaryContainer, paddingHorizontal: 12, paddingVertical: 4, borderRadius: 16 },
  durationText: { ...theme.typography.labelMd, color: theme.colors.secondary },
});
