import { Link, Stack } from 'expo-router';
import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  return (
    <ImageBackground
      source={require('../assets/images/BG3.jpg')}
      style={styles.background}
    >
      <View style={styles.overlay} />

      <View style={styles.content}>
        <Text style={styles.topText}>Plant Smarter</Text>
        <Text style={styles.topText2}>Grow Stronger</Text>

        <View style={styles.options}>
          <Link href="/login" style={[styles.button, styles.greenButton]}>
            <Text style={[styles.buttonText, styles.greenText]}>Sign In</Text>
          </Link>
          <Link href="/signup" style={[styles.button, styles.greenButton]}>
            <Text style={[styles.buttonText, styles.greenText]}>Create an Account</Text>
          </Link>
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)', 
  },
  content: {
    flex: 1,
    justifyContent: 'center', 
    alignItems: 'center', 
    padding: 20,
  },
  options: {
    top: 220,
    width: 250, 
    alignItems: 'center',
  },
  topText: {
    position: 'absolute',
    top: 110,
    left: 20,
    color: 'white',
    fontSize: 44,
    fontFamily: 'DMSerifText-Regular',
    fontWeight: 'semibold',
  },
  topText2: {
    position: 'absolute',
    top: 170,
    left: 70,
    color: 'white',
    fontSize: 45,
    fontWeight: 'bold',
  },
  button: {
    paddingVertical: 15, 
    paddingHorizontal: 15, 
    borderRadius: 8, 
    marginBottom: 15, 
    width: '90%', 
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  greenButton: {
    backgroundColor: 'rgb(255, 255, 255)',
    borderWidth: 2,
  },
  buttonText: {
    fontSize: 18, 
    fontWeight: 'bold',
    textAlign: 'center', 
  },
  greenText: {
    color: 'rgb(2, 91, 4)', 
  },
});
