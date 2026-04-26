import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView } from 'react-native';
import { theme } from '../theme';
import { Heart } from 'lucide-react-native'; // Fallback icon

export default function OnboardingScreen({ navigation }) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Decorative Background Elements simulated */}
      <View style={styles.header}>
        <Heart color={theme.colors.primary} size={32} />
        <Text style={styles.logoText}>Mann Ki Baat</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.title}>You can talk freely here.</Text>
        <Text style={styles.subtitle}>
          Nothing leaves this space. Choose your preferred language to begin.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.languageButton}
          onPress={() => navigation.navigate('Main')}
        >
          <View style={styles.languageContent}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>अ</Text>
            </View>
            <Text style={styles.languageText}>Hindi</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.languageButton}
          onPress={() => navigation.navigate('Main')}
        >
          <View style={styles.languageContent}>
            <View style={styles.iconCircle}>
              <Text style={styles.iconText}>த</Text>
            </View>
            <Text style={styles.languageText}>Tamil</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.containerPadding,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    gap: theme.spacing.xs,
  },
  logoText: {
    ...theme.typography.headlineMd,
    color: theme.colors.onBackground,
  },
  content: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  title: {
    ...theme.typography.display,
    color: theme.colors.onBackground,
    textAlign: 'center',
    marginBottom: theme.spacing.md,
  },
  subtitle: {
    ...theme.typography.bodyLg,
    color: theme.colors.onSurfaceVariant,
    textAlign: 'center',
    maxWidth: 300,
  },
  buttonContainer: {
    width: '100%',
    maxWidth: 400,
    gap: theme.spacing.sm,
  },
  languageButton: {
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderColor: theme.colors.outlineVariant,
    borderWidth: 1,
    borderRadius: 20,
    padding: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: theme.colors.onSurface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  languageContent: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: theme.spacing.md,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: theme.colors.surfaceContainer,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    ...theme.typography.headlineMd,
    color: theme.colors.primary,
  },
  languageText: {
    ...theme.typography.headlineMd,
    color: theme.colors.onSurface,
  },
});
