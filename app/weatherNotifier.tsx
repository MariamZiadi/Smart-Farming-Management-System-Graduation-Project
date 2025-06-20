import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
  ImageBackground,
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

// Background image
const bg = require('../assets/images/BG2.jpg');

const cities = [
  { name: 'Cairo', lat: 30.0444, lon: 31.2357 },
  { name: 'Alexandria', lat: 31.2001, lon: 29.9187 },
  { name: 'Giza', lat: 30.0131, lon: 31.2089 },
  { name: 'Aswan', lat: 24.0889, lon: 32.8998 },
];

const crops = [
  'Tomato', 'Apple', 'Orange', 'Blueberry', 'Peach',
  'Bell Pepper', 'Cucumber', 'Lettuce', 'Basil', 'Mint',
  'Thyme', 'Wheat', 'Rice', 'Barley', 'Oats'
];

export default function WeatherNotifier() {
  const [city, setCity] = useState(cities[0]);
  const [hourly, setHourly] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const apiKey = '1addfa5b781054ce171cbaf7023a3c94';
  const baseColor = 'rgb(75, 134, 75)';

  useEffect(() => {
    fetchForecast();
  }, [city]);

  const fetchForecast = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.lon}&appid=${apiKey}&units=metric`
      );
      setHourly(data.list.slice(0, 3));
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const cropAdvice = (crop: string, temp: number, cond: string) => {
    const base = `🌱 ${crop}: `;
    switch (crop) {
      case 'Tomato':
        return  (temp > 30 ? 'Provide shade and water more frequently.' :
                      cond.includes('rain') ? 'Watch for fungal infections.' :
                      'Maintain soil moisture and add potassium.');
      case 'Apple':
        return  (temp < 10 ? 'Cover young trees to avoid frost damage.' :
                      'Thin fruit to ensure proper growth.');
      case 'Orange':
        return  (cond.includes('rain') ? 'Prevent waterlogging and check for root rot.' :
                      'Add balanced citrus fertilizer.');
      case 'Blueberry':
        return  'Ensure acidic soil and protect from strong sun or frost.';
      case 'Peach':
        return  'Prune regularly and protect from late spring frosts.';
      case 'Bell Pepper':
        return  'Keep soil warm and mulch for moisture retention.';
      case 'Cucumber':
        return  (temp > 32 ? 'Provide partial shade and increase watering.' :
                      'Use trellis to avoid fruit rotting on wet ground.');
      case 'Lettuce':
        return  (temp > 28 ? 'Use shade cloth to prevent bolting.' :
                      'Harvest early in the day.');
      case 'Basil':
        return  (temp < 15 ? 'Bring indoors or cover during cool nights.' :
                      'Pinch flowers to keep leaves tender.');
      case 'Mint':
        return  'Trim frequently and avoid water stagnation.';
      case 'Thyme':
        return  'Prefers dry, sunny weather—avoid overwatering.';
      case 'Wheat':
        return  (cond.includes('rain') ? 'Check for rust and fungal infections.' :
                      'Ensure even irrigation during grain filling.');
      case 'Rice':
        return  'Maintain shallow water level and check for pests.';
      case 'Barley':
        return  'Protect from strong wind and fertilize at booting stage.';
      case 'Oats':
        return  'Needs well-drained soil—avoid compacted fields.';
      default:
        return  'Inspect plant health and adjust care accordingly.';
    }
  };

  return (
    <ImageBackground source={bg} style={styles.bg} resizeMode="cover">
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Next 9-Hour Forecast</Text>

        <Picker
          selectedValue={city.name}
          onValueChange={(v) =>
            setCity(cities.find(c => c.name === v) || city)
          }
          style={styles.picker}
        >
          {cities.map(c => (
            <Picker.Item key={c.name} label={c.name} value={c.name} />
          ))}
        </Picker>

        {loading ? (
          <ActivityIndicator size="large" color={baseColor} />
        ) : (
          hourly.map((h, i) => (
            <View key={i} style={[styles.hourRow, { borderColor: baseColor }]}>
              <Text style={styles.hourText}>
                {new Date(h.dt * 1000).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </Text>
              <Image
                source={{ uri: `https://openweathermap.org/img/wn/${h.weather[0].icon}@2x.png` }}
                style={styles.icon}
              />
              <Text style={styles.hourText}>{h.main.temp}°C</Text>
              <Text style={styles.hourText}>{h.weather[0].description}</Text>
            </View>
          ))
        )}

        <Text style={styles.subheading}>Crop Actions</Text>
        {hourly[0] && crops.map(crop => (
          <View key={crop} style={[styles.cropBox, { borderLeftColor: baseColor }]}>
            <Text style={styles.cropHeader}>🌿 {crop}</Text>
            <Text style={styles.cropText}>
              {cropAdvice(crop, hourly[0].main.temp, hourly[0].weather[0].main.toLowerCase())}
            </Text>
          </View>
        ))}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  bg: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    paddingBottom: 80,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'rgb(163, 222, 164)',
    textAlign: 'center',
    marginBottom: 20,
  },
  subheading: {
    fontSize: 24,
    fontWeight: '700',
    color: 'rgb(163, 222, 164)',
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'left',
  },
  picker: {
    backgroundColor: '#fff',
    borderRadius: 8,
    marginBottom: 15,
  },
  hourRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    marginBottom: 10,
    gap: 5,
    backgroundColor: '#ffffffdd',
  },
  hourText: {
    flex: 1,
    color: '#333',
    fontSize: 16,
    textAlign: 'center',
  },
  icon: {
    width: 50,
    height: 50,
  },
  cropBox: {
    borderLeftWidth: 6,
    paddingVertical: 16,
    paddingHorizontal: 18,
    backgroundColor: '#ffffffee',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '100%',
  },
  cropHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2e7d32',
    marginBottom: 6,
  },
  cropText: {
    color: '#333',
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '500',
  },
});
