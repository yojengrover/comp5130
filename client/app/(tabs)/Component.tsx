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
    // Regular expression for email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
    // Check if the email and message are valid
    if (!emailInput.trim() || !emailRegex.test(emailInput.trim())) {
      setNotification({ message: 'Please enter a valid receiver email.', type: false });
  
      // Hide the notification after 3 seconds
      setTimeout(() => {
        setNotification({ message: '', type: false });
      }, 3000);
      return;
    }
  
    if (!message.trim()) {
      setNotification({ message: 'Please enter a message.', type: false });
  
      // Hide the notification after 3 seconds
      setTimeout(() => {
        setNotification({ message: '', type: false });
      }, 3000);
      return;
    }
  
    try {
      const response = await axios.post('http://10.0.2.2:8000/sendmessage', {
        sender: loggedUser.email,
        receiver: emailInput.trim(),
        messageContent: message.trim(),
        timestamp: new Date().toISOString(),
      });
  
      // Reset input fields
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
  logoutButton: {
    backgroundColor: 'white', // White background
    padding: 8,
    borderRadius: 4,
    borderWidth: 0.5, // Thin border
    borderColor: '#A9A9A9', // Slightly greyish border
    alignItems: 'center', // Center-align text
  },
  logoutText: {
    color: 'black', // Black text color
    fontWeight: '500', // Medium-light font weight
    fontSize: 14, // Font size
  },
  content: { padding: 16 },
  card: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#fff', borderRadius: 8, padding: 16, marginBottom: 16 },
  avatar: { width: 64, height: 64, borderRadius: 32, marginRight: 16 },
  userInfo: { flex: 1 },
  userName: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  userEmail: { fontSize: 14, color: '#666' },
  messageBox: { marginVertical: 16 },
  input: { height: 40, borderColor: '#ddd', borderWidth: 1, borderRadius: 4, padding: 8, marginBottom: 8 },
  messageTextInput: { height: 100, borderColor: '#ddd', borderWidth: 1, borderRadius: 4, padding: 8, textAlignVertical: 'top', marginBottom: 8 },
  sendButton: {
    backgroundColor: 'white', // White background
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    borderWidth: 0.5, // Thinner border
    borderColor: '#A9A9A9', // Slightly greyish border
  },
  sendButtonText: {
    color: 'black', // Black text color
    fontSize: 14, // Font size
    fontWeight: '500', // Medium-light font weight
  },
});

export default Component;
