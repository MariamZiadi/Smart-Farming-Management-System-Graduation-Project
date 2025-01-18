import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";

export default function JoinFarmScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Join A Farm</Text>
      </View>

      {/* Content */}
      <View style={styles.content}>
        <Text style={styles.label}>Join Your Farm</Text>
        <TextInput style={styles.input} placeholder="Farm ID" placeholderTextColor="#A9A9A9" />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Join</Text>
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <Text style={styles.navItem}>🏠</Text>
        <Text style={styles.navItem}>✏️</Text>
        <Text style={styles.navItem}>🌱</Text>
        <Text style={styles.navItem}>🤖</Text>
        <Text style={styles.navItem}>👤</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "black",
    paddingVertical:85,
    paddingHorizontal: 10,
  },

  headerTitle: {
    color: "white",
    fontSize: 25,
    fontWeight: "bold",
    marginLeft: 15,
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: "white",
    marginTop: 70,
  },
  label: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#CCCCCC",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "black",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "600",
  },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#D7E9D4",
    paddingVertical: 10,
  },
  navItem: {
    fontSize: 24,
  },
});
