import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

export default function Component() {
  const router = useRouter();
 // const { email, fullName } = router.params || {} // Extract email and fullName from query params

  const [user, setUser] = useState({
    // name: fullName || 'Default Name', // Set default or received name
    // email: email || 'Default Email',
    avatarUrl: 'https://i.pravatar.cc/300',
  });

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
          <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
          <View style={styles.userInfo}>
            {/* <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text> */}
          </View>
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
}

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
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
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
