import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Check, X } from "lucide-react-native"; // Ensure lucide-react-native is installed

interface NotificationScreenProps {
  message: string;
  type: boolean;
  
}

const NotificationScreen: React.FC<NotificationScreenProps> = ({ message, type }) => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <View
          style={[
            styles.iconContainer,
            { backgroundColor: type ? "#4CAF50" : "#F44336" }, // Green for success, red for error
          ]}
        >
          {type ? (
            <Check width={20} height={20} color="white" />
          ) : (
            <X width={20} height={20} color="white" />
          )}
        </View>
        <Text style={styles.title}>{type ? "Success!" : "Error!"}</Text>
        <Text style={styles.message}>{message}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  card: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 12,
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    textAlign: "center",
    color: "#666",
    marginBottom: 20,
  },
  button: {
    width: "80%",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    fontSize: 16,
    color: "white",
    fontWeight: "600",
  },
});

export default NotificationScreen;
