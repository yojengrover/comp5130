import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import Component from './Component';

const SignIn = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status
  const [userDetails, setUserDetails] = useState({ name: '', email: '' }); // State to store user details

  const handleSignIn = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in both email and password.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:8000/signin', {
        email,
        password,
      });

      if (response.status === 200) {
        const { token, user } = response.data;

        const userDetails = {
          name: user.fullName,
          email: user.email,
        };

        setUserDetails(userDetails); // Save user details
        setIsLoggedIn(true); // Mark as logged in
      }
    } catch (error) {
      Alert.alert('Login Failed', 'An error occurred. Please try again.');
    }
  };

  // Render `Component` if the user is logged in
  if (isLoggedIn && userDetails.name && userDetails.email) {
    return <Component user={userDetails} />;
  }

  // Otherwise, render the SignIn screen
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
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign in</Text>
          <Ionicons name="chevron-forward" size={20} color="white" />
        </TouchableOpacity>

        {/* Sign up link */}
        <TouchableOpacity style={styles.signInLink}>
          <Text style={styles.signInText}>
            Don't have an account? <Text style={styles.signInButtonText}>Sign up</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};


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
    flexDirection: 'row',
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
    flex: 1,
    marginRight: 8,
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
    backgroundColor: '#4285F4',
    padding: 16,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
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
