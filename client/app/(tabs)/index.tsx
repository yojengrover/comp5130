import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import SignIn from './SignIn';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Component from './Component';
import { Ionicons } from '@expo/vector-icons';

const Stack = createStackNavigator();

export default function HomeScreen() {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen name="SignIn" component={SignIn} />
        <Stack.Screen name="Component" component={Component} />
      </Stack.Navigator>
    </NavigationContainer>
  );
  }

