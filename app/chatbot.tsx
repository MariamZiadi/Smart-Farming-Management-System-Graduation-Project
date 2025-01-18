import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';

const ChatBot = () => {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Chat Bot</Text>
      </View>

      {/* Main Content */}
      <View style={styles.main}>
        <Text style={styles.title}>Get Help!</Text>

        {/* Chat Card */}
        <View style={styles.card}>
          <Text style={styles.cardText}>We’re Ready To Help You!</Text>
        </View>

        {/* Chat Input */}
        <TextInput
          style={styles.input}
          placeholder="Message Our Chat Bot"
          placeholderTextColor="#888"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    backgroundColor: '#000',
    paddingVertical: 85,
    paddingHorizontal: 16,

  },
  headerText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  main: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    width: '100%',
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },
  cardText: {
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    color: '#444',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    width: '100%',
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    color: '#000',
    position:'relative',
    top:15,
  },
});

export default ChatBot;
