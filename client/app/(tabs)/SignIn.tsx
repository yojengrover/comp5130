import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { Link } from 'expo-router';  // Keep the Link for navigation
import AsyncStorage from '@react-native-async-storage/async-storage';
import Component from './Component'; // Component to show after successful login
import NotificationScreen from './NotificationScreen'; // Import the Notification component

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userDetails, setUserDetails] = useState({ name: '', email: '' });
  const [notification, setNotification] = useState({ message: '', type: false });

  // Function to handle login
  const handleSignIn = async () => {
    if (!email || !password) {
      setNotification({ message: 'Please fill in both email and password.', type: false });
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/signin', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        // Save the token securely
        await AsyncStorage.setItem('authToken', token);

        // Update user details and login state
        setUserDetails({ name: user.fullName, email: user.email });
        setIsLoggedIn(true);
        setNotification({ message: 'Login successful!', type: true });
      }
    } catch (error) {
      console.error('Login Error:', error);
      setNotification({ message: 'Login failed. Invalid credentials or server error.', type: false });
    }
  };

  // Automatically hide the notification after 2 seconds
  useEffect(() => {
    if (notification.message) {
      const timer = setTimeout(() => {
        setNotification({ message: '', type: false }); // Reset notification state
      }, 3000); // 2000ms = 2 seconds

      // Cleanup the timer when the component is unmounted or the notification changes
      return () => clearTimeout(timer);
    }
  }, [notification]);

  // If logged in, show the full success screen with the "Continue" button
  if (isLoggedIn) {
    return (
      <Component
        user={userDetails}
        isLoggedIn={isLoggedIn}
      />
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>
            <Text style={styles.googleRed}>P</Text>
            <Text style={styles.googleBlue}>V</Text>
            <Text style={styles.googleYellow}>N</Text>
            <Text style={styles.googleBlue}>o</Text>
            <Text style={styles.googleGreen}>t</Text>
            <Text style={styles.googleRed}>e</Text>
          </Text>
          <Text style={styles.subtitle}>Sign in</Text>
        </View>

        <View style={styles.inputGroup}>
          <TextInput
            placeholder="Email address"
            style={styles.input}
            inputMode="email" // Use inputMode instead of keyboardType
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              style={[styles.input, { flex: 1 }]} 
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
            <Pressable
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="gray"
              />
            </Pressable>
          </View>
        </View>

        <Pressable style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign in</Text>
          <Ionicons name="chevron-forward" size={20} color="white" />
        </Pressable>

        <Pressable style={styles.signInLink}>
          <Link href="/Register">
            <Text style={styles.signInText}>Don't have an account? <Text style={styles.signInButtonText}>Sign up</Text></Text>
          </Link>
        </Pressable>
      </View>

      {/* Show notification message */}
      {notification.message && !isLoggedIn && (
        <NotificationScreen
          message={notification.message}
          type={notification.type}
        />
      )}
    </View>
  );
};

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
  },
  formContainer: {
    width: '100%',
    maxWidth: 400,
    padding: 16,
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  googleRed: { color: '#DB4437' },
  googleBlue: { color: '#4285F4' },
  googleYellow: { color: '#F4B400' },
  googleGreen: { color: '#0F9D58' },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginTop: 12,
  },
  inputGroup: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    marginBottom: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eyeIcon: {
    position: 'absolute',
    right: 16,
  },
  button: {
    backgroundColor: 'white', // White background
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5, // Thinner border
    borderColor: '#A9A9A9', // Greyish border color
  },
  buttonText: {
    color: 'black', // Black text color
    fontSize: 16,
    fontWeight: '500', // Lighter font weight
    marginRight: 8,
  },
  
  signInLink: {
    marginTop: 16,
    alignItems: 'center',
  },
  signInText: {
    color: '#333',
    fontSize: 14,
  },
  signInButtonText: {
    color: '#4285F4',
    fontWeight: 'bold',
  },
});

export default SignIn;
