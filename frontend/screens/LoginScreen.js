import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { theme } from '../theme';
import { supabase } from '../lib/supabase';
import { Spa } from 'lucide-react-native';
import * as WebBrowser from 'expo-web-browser';
import * as Google from 'expo-auth-session/providers/google';

WebBrowser.maybeCompleteAuthSession();

export default function LoginScreen({ navigation }) {
  const [loading, setLoading] = useState(false);
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: 'PLACEHOLDER_WEB_CLIENT_ID', // Replace with real Firebase/Google Web Client ID
    androidClientId: 'PLACEHOLDER_ANDROID_CLIENT_ID',
    iosClientId: 'PLACEHOLDER_IOS_CLIENT_ID',
  });

  useEffect(() => {
    if (response?.type === 'success') {
      const { id_token } = response.params;
      handleGoogleLogin(id_token);
    }
  }, [response]);

  const handleGoogleLogin = async (idToken) => {
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithIdToken({
        provider: 'google',
        token: idToken,
      });

      if (error) {
        console.error('Error signing in with Google:', error.message);
      } else if (data.session) {
        // Successful login, navigate to Onboarding for Language selection
        navigation.replace('Onboarding');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.logoText}>Mann Ki Baat</Text>
        </View>

        <Text style={styles.title}>Your Digital Sanctuary</Text>
        <Text style={styles.subtitle}>
          Sign in to access your safe space and connect with professionals.
        </Text>
      </View>

      <View style={styles.buttonContainer}>
        {loading ? (
          <ActivityIndicator size="large" color={theme.colors.primary} />
        ) : (
          <TouchableOpacity 
            style={styles.googleButton}
            disabled={!request}
            onPress={() => {
              promptAsync();
            }}
          >
            <Text style={styles.googleButtonText}>Sign in with Google</Text>
          </TouchableOpacity>
        )}
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
  content: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logoText: {
    ...theme.typography.headlineMd,
    color: theme.colors.primary,
    fontSize: 32,
    fontWeight: 'bold',
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
    marginTop: 40,
  },
  googleButton: {
    backgroundColor: theme.colors.surfaceContainerLowest,
    borderColor: theme.colors.outlineVariant,
    borderWidth: 1,
    borderRadius: 20,
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: theme.colors.onSurface,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 16,
    elevation: 2,
  },
  googleButtonText: {
    ...theme.typography.headlineMd,
    color: theme.colors.onSurface,
  },
});
