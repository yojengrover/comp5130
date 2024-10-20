import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Link } from 'expo-router';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);

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
          <Text style={styles.subtitle}>Create your PrivNote Account</Text>
        </View>
        <View style={styles.inputGroup}>
          <View style={styles.inputRow}>
            <TextInput
              placeholder="Full Name"
              style={styles.input}
              autoCapitalize="words"
            />
          </View>
          <TextInput
            placeholder="Email address"
            style={styles.input}
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <View style={styles.passwordContainer}>
            <TextInput
              placeholder="Password"
              style={styles.input}
              secureTextEntry={!showPassword}
              autoCapitalize="none"
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? "eye-off" : "eye"}
                size={24}
                color="gray"
              />
            </TouchableOpacity>
          </View>
        </View>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Sign up</Text>
          <Ionicons name="chevron-forward" size={20} color="white" />
        </TouchableOpacity>

        {/* Sign in link */}
        <TouchableOpacity style={styles.signInLink}>
          <Link href={"/SignIn"}>
          <Text style={styles.signInText}>Already have an account? <Text style={styles.signInButtonText}>Sign in</Text></Text>
          </Link>
        </TouchableOpacity>

      </View>
    </View>
  );
}

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
  inputRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
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
