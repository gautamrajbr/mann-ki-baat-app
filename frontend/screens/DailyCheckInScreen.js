import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { theme } from '../theme';

const moods = [
  { emoji: '🌧️', label: 'Struggling' },
  { emoji: '🌪️', label: 'Overwhelmed' },
  { emoji: '☁️', label: 'Okay' },
  { emoji: '🌤️', label: 'Good' },
  { emoji: '☀️', label: 'Great' },
];

export default function DailyCheckInScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <Text style={styles.title}>How are you feeling today?</Text>
          <Text style={styles.subtitle}>
            Take a mindful moment for yourself. There are no right or wrong answers.
          </Text>
        </View>

        <View style={styles.grid}>
          {moods.map((mood, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.card}
              onPress={() => navigation.navigate('HomeTabs', { screen: 'Explore' })}
            >
              <Text style={styles.emoji}>{mood.emoji}</Text>
              <Text style={styles.label}>{mood.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity 
          style={styles.skipButton}
          onPress={() => navigation.navigate('HomeTabs', { screen: 'Explore' })}
        >
          <Text style={styles.skipText}>Skip for now</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  container: {
    padding: theme.spacing.containerPadding,
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.xl,
  },
  header: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    maxWidth: 600,
  },
  title: {
    ...theme.typography.display,
    color: theme.colors.onSurface,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    ...theme.typography.bodyLg,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: theme.spacing.md,
    maxWidth: 800,
  },
  card: {
    width: 140,
    height: 160,
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.onSurface,
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.04,
    shadowRadius: 32,
    elevation: 2,
    borderWidth: 1,
    borderColor: 'transparent',
    margin: 8, // fallback for gap
  },
  emoji: {
    fontSize: 64,
    marginBottom: theme.spacing.sm,
  },
  label: {
    ...theme.typography.labelMd,
    color: theme.colors.onSurfaceVariant,
  },
  skipButton: {
    marginTop: theme.spacing.xl,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.rounded.full,
  },
  skipText: {
    ...theme.typography.labelMd,
    color: theme.colors.outline,
  },
});
