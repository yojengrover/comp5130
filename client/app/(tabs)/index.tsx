import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import SignIn from './SignIn';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View>
      <SignIn />
    </View>
  );
  }

