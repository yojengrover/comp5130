import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';

interface ComponentProps {
  user: {
    name: string;
    email: string;
  };
}

const Component: React.FC<ComponentProps> = ({ user }) => {
  const router = useRouter();
  const [loggedUser, setUser] = useState({
    name: user.name || 'Default Name',
    email: user.email || 'Default Email',
    avatarUrl: 'https://i.pravatar.cc/300',
  });

  const [emailInput, setEmailInput] = useState('');
  const [message, setMessage] = useState('Welcome to your profile!');

  const handleSendMessage = async () => {
    if (message.trim() && emailInput.trim()) {
      try {
        const response = await axios.post('http://localhost:8000/sendmessage', {
          sender: loggedUser.email,
          receiver: emailInput.trim(),
          messageContent: message.trim(),
          timestamp: new Date().toISOString(), // Add the current timestamp
        });
        setMessage('');
        setEmailInput('');
        alert('Message sent successfully!');
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
      }
    } else {
      alert('Please enter both a valid receiver email and message.');
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.logo}>
          <Text style={styles.googleG}>P</Text>
          <Text style={styles.googleV}>V</Text>
          <Text style={styles.googleN}>N</Text>
          <Text style={styles.googleO}>o</Text>
          <Text style={styles.googleT}>t</Text>
          <Text style={styles.googleE}>e</Text>
        </Text>
        <TouchableOpacity>
          <Text style={styles.bellIcon}>🔔</Text>
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView style={styles.content}>
        {/* User Card */}
        <View style={styles.card}>
          <Image source={{ uri: loggedUser.avatarUrl }} style={styles.avatar} />
          <View style={styles.userInfo}>
            <Text style={styles.userName}>{loggedUser.name}</Text>
            <Text style={styles.userEmail}>{loggedUser.email}</Text>
          </View>
        </View>

        {/* Email and Message Box */}
        <View style={styles.messageBox}>
          <TextInput
            style={styles.input}
            placeholder="Enter receiver's email"
            value={emailInput}
            onChangeText={setEmailInput}
          />
          <TextInput
            style={styles.messageTextInput}
            placeholder="Type your message here"
            value={message}
            onChangeText={setMessage}
            multiline={true}
          />
          <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#f8f9fa' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, backgroundColor: '#fff' },
  logo: { fontSize: 20, fontWeight: 'bold' },
  googleG: { color: '#4285F4' },
  googleV: { color: '#EA4335' },
  googleN: { color: '#FBBC05' },
  googleO: { color: '#34A853' },
  googleT: { color: '#0F9D58' },
  googleE: { color: '#DB4437' },
  bellIcon: { fontSize: 24 },
  content: { padding: 16 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 16 },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 16 },
  userInfo: { flex: 1 },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  userEmail: { fontSize: 14, color: '#666' },
  messageBox: { marginVertical: 16 },
  input: { height: 40, borderColor: '#ddd', borderWidth: 1, borderRadius: 4, padding: 8, marginBottom: 8 },
  messageTextInput: { height: 100, borderColor: '#ddd', borderWidth: 1, borderRadius: 4, padding: 8, textAlignVertical: 'top', marginBottom: 8 },
  sendButton: { backgroundColor: '#007bff', paddingVertical: 10, paddingHorizontal: 20, borderRadius: 4, alignItems: 'center' },
  sendButtonText: { color: '#fff', fontSize: 14, fontWeight: 'bold' },
});

export default Component;
