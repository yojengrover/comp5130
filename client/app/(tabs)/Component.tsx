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
    if (message.trim()) {
      try {
        const response = await axios.post('https://your-backend-api-url.com/messages', {
          message,
        });
        setMessage(''); // Clear the message input after sending
        alert('Message sent successfully!');
      } catch (error) {
        console.error('Error sending message:', error);
        alert('Failed to send message. Please try again.');
      }
    } else {
      alert('Please enter a message to send.');
    }
  };

  const handleEmailChange = () => {
    if (emailInput.trim()) {
      setUser((prev) => ({ ...prev, email: emailInput.trim() }));
      setMessage(`Email updated to: ${emailInput.trim()}`);
      setEmailInput('');
    } else {
      setMessage('Please enter a valid email.');
    }
  };

  const menuItems = [
    { icon: '⚙️', label: 'Account settings' },
    { icon: '❓', label: 'Help & feedback' },
    { icon: '🚪', label: 'Sign out' },
  ];

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

       

        {/* Email Input Box */}
        <View style={styles.inputBox}>
          <TextInput
            style={styles.input}
            placeholder="Enter new email"
            value={emailInput}
            onChangeText={setEmailInput}
          />
        </View>
        <View style={styles.messageBox}>
  <TextInput
    style={styles.messageTextInput}
    value={message}
    onChangeText={(text) => setMessage(text)} // Update the message state dynamically
    multiline={true} // Allow multi-line input
    placeholder="Type your message here"
  />
  {/* Send Button */}
  <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
    <Text style={styles.sendButtonText}>Send</Text>
  </TouchableOpacity>
</View>

        {/* Menu */}
        <View style={styles.menu}>
          {menuItems.map((item, index) => (
            <TouchableOpacity key={index} style={styles.menuItem}>
              <Text style={styles.menuIcon}>{item.icon}</Text>
              <Text style={styles.menuLabel}>{item.label}</Text>
              <Text style={styles.menuChevron}>➡️</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  logo: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  googleG: { color: '#4285F4' },
  googleV: { color: '#EA4335' },
  googleN: { color: '#FBBC05' },
  googleO: { color: '#34A853' },
  googleT: { color: '#0F9D58' },
  googleE: { color: '#DB4437' },
  bellIcon: {
    fontSize: 24,
  },
  messageBox: {
    backgroundColor: '#e9ecef',
    padding: 12,
    borderRadius: 8,
    marginVertical: 16,
  },
  messageTextInput: {
    fontSize: 14,
    color: '#495057',
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlignVertical: 'top', // Align text properly in multi-line inputs
    minHeight: 50, // Set a minimum height for better appearance
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  sendButton: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
    alignItems: 'center',
    marginTop: 8,
  },
  sendButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginRight: 16,
  },
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  userEmail: {
    fontSize: 14,
    color: '#666',
  },
  messageText: {
    fontSize: 14,
    color: '#495057',
  },
  inputBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginRight: 8,
    fontSize: 14,
  },
  updateButton: {
    backgroundColor: '#007bff',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  updateButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  menu: {
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuIcon: {
    marginRight: 16,
    fontSize: 18,
  },
  menuLabel: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  menuChevron: {
    fontSize: 18,
    color: '#aaa',
  },
});

export default Component;
