import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import axios from 'axios';

const API_URL = 'https://mann-ki-baat-backend.onrender.com/api';

export default function ChatScreen({ navigation }) {
  const [messages, setMessages] = useState([
    { id: '1', text: "Hello. I'm here for you. Whatever you're carrying today, it's safe to set it down here. How are you feeling right now?", sender: 'ai', timestamp: new Date().toISOString() }
  ]);
  const [inputText, setInputText] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!inputText.trim()) return;
    
    const userMsg = { id: Date.now().toString(), text: inputText, sender: 'user', timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);
    setInputText('');
    setLoading(true);

    try {
      const response = await axios.post(`${API_URL}/chat`, { message: userMsg.text });
      const aiMsg = { id: Date.now().toString() + 'ai', text: response.data.text, sender: 'ai', timestamp: response.data.timestamp };
      setMessages(prev => [...prev, aiMsg]);
    } catch (error) {
      console.error('Chat error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        style={styles.container} 
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.iconButton}>
            <MaterialCommunityIcons name="arrow-left" color={theme.colors.primary} size={24} />
          </TouchableOpacity>
          <View style={styles.headerInfo}>
            <Image 
              source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCIpZRAd-TjyBBAxwKyDkoGWe7u7d3xiY_USn14eSyJzcwmotkl_JfxHjAM9GNYHvwlGYvPDOur_xzxnzQHxHEm64WiaacDTzUmqGtoPq8xt0Ryjsb6miUwdL_hJqtw_co9UPdyua6wVqzZsjCSYOz_DnTVeD3e7iiu3tLwOlAQ3MiBzQ_lP4KH-5Loff9XtW1uEES2AyPpLKntjaKpGH5cXkxSf1U4enQLD8Py_Bf5ePZO-PlcSGKirngh3_JjArWcc3ZQrB-UZuk' }} 
              style={styles.avatar} 
            />
            <View>
              <Text style={styles.headerName}>Mann Ki Baat AI</Text>
              <Text style={styles.headerStatus}>Online</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.iconButton}>
            <MaterialCommunityIcons name="dots-vertical" color={theme.colors.outline} size={24} />
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.messageArea} contentContainerStyle={styles.messageContent}>
          <Text style={styles.timestamp}>Today</Text>
          {messages.map(msg => (
            <View key={msg.id} style={[styles.messageRow, msg.sender === 'user' ? styles.messageRowUser : styles.messageRowAI]}>
              {msg.sender === 'ai' && (
                 <Image source={{ uri: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBDKyctC48P313xhVMaBoO50zAMjXr-prizNJBiyq3bOVqGr7XdxODixCLQgA7cxDHXOrlJ_qZAL_klQv8wHtuKTaBJNZ-sV1clsspFoDfEFKWwnsbq3j__XACH2TSzlQo32wvwRcgxg6WIY_12w7RUabbX9IZyH8PIQMrKgZ2NElWy5Fc8hbe5c4LX0Lys1bRlzOz994Q9foHmqvjQZ6D8LncOcVo_FAyyR6GU0csbUe7JOYSHAf3GqgZo3iWn8NDijzm3-pUTnPQ' }} style={styles.msgAvatar} />
              )}
              <View style={[styles.bubble, msg.sender === 'user' ? styles.bubbleUser : styles.bubbleAI]}>
                <Text style={[styles.messageText, msg.sender === 'user' ? styles.textUser : styles.textAI]}>{msg.text}</Text>
              </View>
            </View>
          ))}
          {loading && <Text style={styles.loadingText}>Typing...</Text>}
        </ScrollView>

        <View style={styles.inputArea}>
          <View style={styles.inputContainer}>
            <TouchableOpacity><MaterialCommunityIcons name="plus-circle-outline" color={theme.colors.outline} size={24} /></TouchableOpacity>
            <TextInput 
              style={styles.input} 
              placeholder="Type your message..." 
              placeholderTextColor={theme.colors.outline}
              value={inputText}
              onChangeText={setInputText}
            />
            <TouchableOpacity><MaterialCommunityIcons name="microphone-outline" color={theme.colors.outline} size={24} /></TouchableOpacity>
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <MaterialCommunityIcons name="send" color={theme.colors.onPrimary} size={20} />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1, backgroundColor: theme.colors.background },
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: theme.spacing.md, backgroundColor: theme.colors.surfaceContainerLowest, borderBottomWidth: 1, borderBottomColor: theme.colors.surfaceVariant },
  headerInfo: { flexDirection: 'row', alignItems: 'center', gap: theme.spacing.sm },
  avatar: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: theme.colors.primaryFixed },
  headerName: { ...theme.typography.labelMd, fontSize: 16, color: theme.colors.primary },
  headerStatus: { fontSize: 12, color: theme.colors.primary },
  messageArea: { flex: 1, padding: theme.spacing.md, backgroundColor: theme.colors.surfaceContainerLow },
  messageContent: { paddingBottom: 20 },
  timestamp: { textAlign: 'center', color: theme.colors.onSurfaceVariant, ...theme.typography.labelMd, marginBottom: 16 },
  messageRow: { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 16, maxWidth: '85%' },
  messageRowUser: { alignSelf: 'flex-end', justifyContent: 'flex-end' },
  messageRowAI: { alignSelf: 'flex-start' },
  msgAvatar: { width: 32, height: 32, borderRadius: 16, marginRight: 8, marginTop: 4 },
  bubble: { padding: 12, borderRadius: 16 },
  bubbleAI: { backgroundColor: theme.colors.surfaceContainerLowest, borderTopLeftRadius: 4, borderColor: theme.colors.surfaceVariant, borderWidth: 1 },
  bubbleUser: { backgroundColor: theme.colors.primary, borderBottomRightRadius: 4 },
  messageText: { ...theme.typography.bodyMd },
  textAI: { color: theme.colors.onSurface },
  textUser: { color: theme.colors.onPrimary },
  loadingText: { color: theme.colors.outline, marginLeft: 40 },
  inputArea: { padding: theme.spacing.md, backgroundColor: theme.colors.surfaceContainerLowest, borderTopWidth: 1, borderTopColor: theme.colors.surfaceVariant },
  inputContainer: { flexDirection: 'row', alignItems: 'center', backgroundColor: theme.colors.secondaryFixed, borderRadius: 30, paddingHorizontal: 12, paddingVertical: 8, gap: 8 },
  input: { flex: 1, ...theme.typography.bodyMd, color: theme.colors.onSurface, paddingVertical: 4 },
  sendButton: { backgroundColor: theme.colors.primary, width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' }
});
