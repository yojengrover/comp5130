import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { useRouter } from 'expo-router';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import NotificationScreen from './NotificationScreen'; // Import your NotificationScreen component

interface ComponentProps {
  user: {
    name: string;
    email: string;
  };
  isLoggedIn: boolean;
}

const Component: React.FC<ComponentProps> = ({ user, isLoggedIn }) => {
  const router = useRouter();
  const [loggedUser, setUser] = useState({
    name: user.name || 'Default Name',
    email: user.email || 'Default Email',
    avatarUrl: 'https://i.pravatar.cc/300',
  });

  const [emailInput, setEmailInput] = useState('');
  const [message, setMessage] = useState('');
  const [notification, setNotification] = useState<{ message: string; type: boolean }>({ message: '', type: false });

  const handleLogout = async () => {
    if (isLoggedIn) {
      try {
        // Clear the JWT token from AsyncStorage
        await AsyncStorage.removeItem('jwtToken');
        
        // Clear any other user data if needed
        await AsyncStorage.removeItem('userData');

        // Display success notification
        setNotification({ message: 'You have been logged out.', type: true });

        // Hide the notification after 3 seconds
        setTimeout(() => {
          setNotification({ message: '', type: true });
        }, 3000);

        // Navigate to the login screen
        router.push('/SignIn');
      } catch (error) {
        console.error('Error clearing session:', error);
        setNotification({ message: 'Failed to log out. Please try again.', type: false });

        // Hide the notification after 3 seconds
        setTimeout(() => {
          setNotification({ message: '', type: false });
        }, 3000);
      }
    }
  };

  const handleSendMessage = async () => {
    if (message.trim() && emailInput.trim()) {
      try {
        const response = await axios.post('http://localhost:8000/sendmessage', {
          sender: loggedUser.email,
          receiver: emailInput.trim(),
          messageContent: message.trim(),
          timestamp: new Date().toISOString(),
        });
        setMessage('');
        setEmailInput('');
        
        // Display success notification
        setNotification({ message: 'Message sent successfully!', type: true });

        // Hide the notification after 3 seconds
        setTimeout(() => {
          setNotification({ message: '', type: true });
        }, 3000);
      } catch (error) {
        console.error('Error sending message:', error);
        // Display error notification
        setNotification({ message: 'Failed to send message. Please try again.', type: false });

        // Hide the notification after 3 seconds
        setTimeout(() => {
          setNotification({ message: '', type: false });
        }, 3000);
      }
    } else {
      setNotification({ message: 'Please enter both a valid receiver email and message.', type: false });

      // Hide the notification after 3 seconds
      setTimeout(() => {
        setNotification({ message: '', type: false });
      }, 3000);
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
        <View style={styles.headerActions}>
          <TouchableOpacity>
            <Text style={styles.bellIcon}>🔔</Text>
          </TouchableOpacity>
          {isLoggedIn && (
            <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          )}
        </View>
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

        {/* Notification Screen */}
        {notification.message && (
          <NotificationScreen
            message={notification.message}
            type={notification.type}
          />
        )}
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
  bellIcon: { fontSize: 24, marginRight: 16 },
  headerActions: { flexDirection: 'row', alignItems: 'center' },
  logoutButton: { padding: 8, backgroundColor: '#dc3545', borderRadius: 4 },
  logoutText: { color: '#fff', fontWeight: 'bold', fontSize: 14 },
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
