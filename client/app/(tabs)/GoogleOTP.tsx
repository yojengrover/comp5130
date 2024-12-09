import React, { useState, useRef } from "react";
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, Pressable } from "react-native";
import { Button } from "react-native-paper"; // For Google-themed buttons
import axios from 'axios';
import SignIn from "./SignIn";
import NotificationScreen from './NotificationScreen'; // Import your NotificationScreen component

interface GoogleOTPProps {
  user: {
    fullName: string;
    email: string;
    password: string;
  };
}

const GoogleOTP: React.FC<GoogleOTPProps> = ({ user }) => {
  const [otp, setOtp] = useState(["", "", "", ""]); // Array for 4 input fields
  const refs = useRef<(TextInput | null)[]>([]);
  const [showSignIn, setShowSignIn] = useState(false);
  const [notification, setNotification] = useState<{ message: string; type: boolean }>({ message: '', type: false });

  const handleChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Automatically focus on the next input if available
    if (text && index < otp.length - 1) {
      refs.current[index + 1]?.focus();
    }
  };

  const handleVerify = async () => {
    try {
      const otpString = otp.join(''); // Join OTP array into a string
  
      // Verify OTP with the server
      const response = await axios.post('http://localhost:8000/verify-otp', {
        email: user.email, // Use the email from props
        otp: otpString,    // Send the joined OTP
      });
  
      if (response.status === 200) {
        // Display success notification using NotificationScreen
        setNotification({ message: 'OTP verified! Creating account...', type: true });

        // Hide the notification after 3 seconds
        setTimeout(() => {
          setNotification({ message: '', type: true });
        }, 3000);

        // Call the signup route after OTP verification
        await axios.post('http://localhost:8000/signup', {
          fullName: user.fullName,
          email: user.email,
          password: user.password,
        });
  
        // Success message after creating account
        setNotification({ message: 'Account created successfully!', type: true });

        // Hide the notification after 3 seconds
        setTimeout(() => {
          setNotification({ message: '', type: true });
        }, 3000);

        // Show SignIn after successful account creation
        setShowSignIn(true); 
      }
    } catch (error) {
      console.error(error);
      // Display error notification using NotificationScreen
      setNotification({ message: 'Invalid OTP or failed to create account. Please try again.', type: false });

      // Hide the notification after 3 seconds
      setTimeout(() => {
        setNotification({ message: '', type: false });
      }, 4000);
    }
  };

  if (showSignIn) {
    return <SignIn />;
  }

  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <View style={styles.logoContainer}>
        {/* Your logo or illustration */}
      </View>
      <Text style={styles.title}>Enter verification code</Text>
      <Text style={styles.subtitle}>
        We sent a 4-digit code to your email. Enter it below to verify your identity.
      </Text>
      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (refs.current[index] = el)} // Assign ref to each TextInput
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>
      <Button
        mode="contained"
        onPress={handleVerify} // Call the verify function
        buttonColor="#4285F4"
        textColor="#FFF"
        style={styles.verifyButton}
      >
        Verify
      </Button>

      {/* Display the notification */}
      {notification.message && (
        <NotificationScreen
          message={notification.message}
          type={notification.type}
        />
      )}
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  logoContainer: {
    marginBottom: 30,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 14,
    color: "#555",
    textAlign: "center",
    marginBottom: 30,
  },
  otpContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 30,
    width: "80%",
  },
  otpInput: {
    width: 50,
    height: 50,
    backgroundColor: "#FFF",
    borderColor: "#DDD",
    borderWidth: 1,
    borderRadius: 10,
    textAlign: "center",
    fontSize: 18,
    color: "#333",
  },
  verifyButton: {
    width: "100%",
    paddingVertical: 10,
    borderRadius: 10,
  },
});

export default GoogleOTP;
