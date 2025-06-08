import React, { useState } from 'react';
import { Modal, TouchableOpacity, Text, View, StyleSheet } from 'react-native';
import { Link, router } from 'expo-router';


const LanguageSwitcher = () => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={styles.button}>
        <Text style={styles.text}>🌐 Language</Text>
      </TouchableOpacity>

      <Modal transparent animationType="fade" visible={modalVisible}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPressOut={() => setModalVisible(false)}
        >
          <View style={styles.menu}>
            <TouchableOpacity onPress={() => {
              setModalVisible(false);
              router.replace('/'); // Arabic version
            }}>
              <Text style={styles.option}>اللغة العربية</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
              setModalVisible(false);
              router.replace('/index_en'); // English version
            }}>
              <Text style={styles.option}>English</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 50,
    right: 20,
    zIndex: 999,
  },
  button: {
    backgroundColor: 'white',
    padding: 8,
    borderRadius: 8,
    elevation: 4,
  },
  text: {
    fontSize: 20,
    fontWeight: '600',
    color: 'rgb(2, 91, 4)', 
    },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-end',
    marginTop: 70,
    marginRight: 20,
  },
  menu: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    elevation: 5,
  },
  option: {
    fontSize: 16,
    paddingVertical: 6,
    textAlign: 'right',
  },
});

export default LanguageSwitcher;
