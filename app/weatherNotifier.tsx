import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Image,
} from 'react-native';
import axios from 'axios';
import { Picker } from '@react-native-picker/picker';

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
        return base + (temp > 30 ? 'Provide shade and water more frequently.' :
                      cond.includes('rain') ? 'Watch for fungal infections.' :
                      'Maintain soil moisture and add potassium.');
      case 'Apple':
        return base + (temp < 10 ? 'Cover young trees to avoid frost damage.' :
                      'Thin fruit to ensure proper growth.');
      case 'Orange':
        return base + (cond.includes('rain') ? 'Prevent waterlogging and check for root rot.' :
                      'Add balanced citrus fertilizer.');
      case 'Blueberry':
        return base + 'Ensure acidic soil and protect from strong sun or frost.';
      case 'Peach':
        return base + 'Prune regularly and protect from late spring frosts.';
      case 'Bell Pepper':
        return base + 'Keep soil warm and mulch for moisture retention.';
      case 'Cucumber':
        return base + (temp > 32 ? 'Provide partial shade and increase watering.' :
                      'Use trellis to avoid fruit rotting on wet ground.');
      case 'Lettuce':
        return base + (temp > 28 ? 'Use shade cloth to prevent bolting.' :
                      'Harvest early in the day.');
      case 'Basil':
        return base + (temp < 15 ? 'Bring indoors or cover during cool nights.' :
                      'Pinch flowers to keep leaves tender.');
      case 'Mint':
        return base + 'Trim frequently and avoid water stagnation.';
      case 'Thyme':
        return base + 'Prefers dry, sunny weather—avoid overwatering.';
      case 'Wheat':
        return base + (cond.includes('rain') ? 'Check for rust and fungal infections.' :
                      'Ensure even irrigation during grain filling.');
      case 'Rice':
        return base + 'Maintain shallow water level and check for pests.';
      case 'Barley':
        return base + 'Protect from strong wind and fertilize at booting stage.';
      case 'Oats':
        return base + 'Needs well-drained soil—avoid compacted fields.';
      default:
        return base + 'Inspect plant health and adjust care accordingly.';
    }
  };

  return (
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
          <Text style={styles.cropText}>
            {cropAdvice(crop, hourly[0].main.temp, hourly[0].weather[0].main.toLowerCase())}
          </Text>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#f5fff5',
  },
  scrollContent: {
    paddingBottom: 80, // adds space at the bottom
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'rgb(75,134,75)',
    textAlign: 'center',
    marginBottom: 20,
  },
  subheading: {
    fontSize: 22,
    fontWeight: '600',
    color: 'rgb(75,134,75)',
    marginTop: 30,
    marginBottom: 20,
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
    paddingVertical: 20,
    paddingHorizontal: 18,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: '100%',
  },
  cropText: {
    color: '#333',
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '500',
  },
});
