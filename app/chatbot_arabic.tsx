import React, { useState, useRef, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, ScrollView, ActivityIndicator, KeyboardAvoidingView, Platform, I18nManager } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { Link } from "expo-router";
import Icon from "react-native-vector-icons/MaterialIcons";
import Icon2 from "react-native-vector-icons/MaterialCommunityIcons";

I18nManager.forceRTL(true); // Force RTL for Arabic layout

const ChatBot = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([{ text: "نحن هنا لمساعدتك!", sender: "bot" }]);
  const [loading, setLoading] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const sendMessage = async () => {
    if (!message.trim()) return;

    const newMessages = [...messages, { text: message, sender: "user" }];
    setMessages([...newMessages, { text: "جارٍ التحميل...", sender: "bot" }]);
    setMessage("");
    setLoading(true);

    try {
      const response = await fetch("https://nice-barnacle-complete.ngrok-free.app/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message }),
      });

      if (!response.ok) throw new Error(`Server error: ${response.status}`);

      const data = await response.json();
      const botResponse = data.reply || "عذراً، لم أفهم ذلك.";

      setMessages([...newMessages, { text: botResponse, sender: "bot" }]);
    } catch (error) {
      console.error("Error:", error);
      setMessages([...newMessages, { text: "حدث خطأ! حاول مرة أخرى لاحقًا.", sender: "bot" }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="arrow-forward" size={27} color="white" style={styles.backIcon} onPress={() => router.push("./homepage_arabic")} />
        <Text style={styles.headerText}>الدردشة</Text>
      </View>

      <ScrollView ref={scrollViewRef} contentContainerStyle={styles.chatContainer}>
        {messages.map((msg, index) => (
          <View key={index} style={msg.sender === "user" ? styles.userMessage : styles.botMessage}>
            {msg.text === "جارٍ التحميل..." ? (
              <ActivityIndicator size="small" color="gray" />
            ) : (
              <Text style={styles.messageText}>{msg.text}</Text>
            )}
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="أرسل رسالة إلى روبوت الدردشة"
          placeholderTextColor="#888"
          value={message}
          onChangeText={setMessage}
          textAlign="right"
        />
        <TouchableOpacity style={styles.sendButton} onPress={sendMessage} disabled={loading}>
          <Ionicons name="send" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.bottomNav}>
        <Link href="./homepage_arabic"><Icon name="home" size={30} color="#000" /></Link>
        <Link href="./profile_arabic"><Icon name="person" size={30} color="#000" /></Link>
        <Link href="./disease_detection_arabic"><Icon2 name="leaf" size={30} color="#000" /></Link>
        <Link href="./feed_arabic"><Icon2 name="file-document-outline" size={30} color="#000" /></Link>
        <Link href="./allFarms_arabic"><Icon name="local-florist" size={30} color="#000" /></Link>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: { backgroundColor: "#000", paddingVertical: 50, paddingHorizontal: 16, justifyContent: "center", alignItems: "center", position: "relative" },
  backIcon: { position: "absolute", right: 16, top: 25 },
  headerText: { color: "#fff", fontSize: 30, fontWeight: "bold", textAlign: "center" },
  chatContainer: { flexGrow: 1, padding: 16, paddingBottom: 20 },

  userMessage: {
    backgroundColor: "#DCF8C6",
    alignSelf: "flex-start",
    padding: 10,
    borderRadius: 12,
    marginVertical: 5,
    maxWidth: "75%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },

  botMessage: {
    backgroundColor: "#f5f5f5",
    alignSelf: "flex-end",
    padding: 10,
    borderRadius: 12,
    marginVertical: 5,
    maxWidth: "75%",
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
  },

  messageText: { fontSize: 16, color: "#000", textAlign: "right" },

  inputContainer: {
    flexDirection: "row-reverse",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#ddd",
  },

  input: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    height: 50,
    paddingHorizontal: 16,
    fontSize: 16,
    color: "#000",
  },

  sendButton: {
    backgroundColor: "green",
    borderRadius: 8,
    height: 50,
    width: 50,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },

  bottomNav: { flexDirection: "row", justifyContent: "space-around", alignItems: "center", backgroundColor: "#D7E9D4", paddingVertical: 10 },
});

export default ChatBot;
