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

const bg = require('../assets/images/BG2.jpg');

// Convert numbers to Arabic digits
const toArabicDigits = (num: number | string) => {
  const map = ['٠','١','٢','٣','٤','٥','٦','٧','٨','٩'];
  return num.toString().replace(/\d/g, d => map[parseInt(d)]);
};

const cities = [
  { name: 'القاهرة', lat: 30.0444, lon: 31.2357 },
  { name: 'الإسكندرية', lat: 31.2001, lon: 29.9187 },
  { name: 'الجيزة', lat: 30.0131, lon: 31.2089 },
  { name: 'أسوان', lat: 24.0889, lon: 32.8998 },
];

const crops = [
  'طماطم', 'تفاح', 'برتقال', 'توت أزرق', 'خوخ',
  'فلفل رومي', 'خيار', 'خس', 'ريحان', 'نعناع',
  'زعتر', 'قمح', 'أرز', 'شعير', 'شوفان'
];

const weatherDescriptionsAr: { [key: string]: string } = {
  'clear sky': 'سماء صافية',
  'few clouds': 'غيوم قليلة',
  'scattered clouds': 'غيوم متناثرة',
  'broken clouds': 'غيوم متقطعة',
  'shower rain': 'زخات مطر',
  'rain': 'مطر',
  'thunderstorm': 'عاصفة رعدية',
  'snow': 'ثلج',
  'mist': 'ضباب',
};

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
    switch (crop) {
      case 'طماطم':
        return (temp > 30 ? 'وفر الظل وزد من كمية المياه.' :
                cond.includes('rain') ? 'راقب الفطريات بعد الأمطار.' :
                'حافظ على رطوبة التربة وأضف البوتاسيوم.');
      case 'تفاح':
        return (temp < 10 ? 'قم بتغطية الأشجار الصغيرة لتجنب الصقيع.' :
                'قم بترقيق الثمار لتحسين النمو.');
      case 'برتقال':
        return (cond.includes('rain') ? 'تجنب غمر الجذور وافحص التعفن.' :
                'استخدم سمادًا متوازنًا للحمضيات.');
      case 'توت أزرق':
        return 'احرص على تربة حمضية وقلل التعرض للشمس أو الصقيع.';
      case 'خوخ':
        return 'قم بالتقليم بانتظام واحمِ من صقيع الربيع المتأخر.';
      case 'فلفل رومي':
        return 'حافظ على دفء التربة واستخدم المهاد للاحتفاظ بالرطوبة.';
      case 'خيار':
        return (temp > 32 ? 'وفر ظل جزئي وزد من السقي.' :
                'استخدم تعريشة لتجنب تعفن الثمار.');
      case 'خس':
        return (temp > 28 ? 'استخدم قماش ظل لتقليل الإزهار المبكر.' :
                'احصد في الصباح الباكر.');
      case 'ريحان':
        return (temp < 15 ? 'أدخله للمنزل أو غطه ليلاً.' :
                'اقرص الزهور للحفاظ على الأوراق طرية.');
      case 'نعناع':
        return 'قم بالتقليم باستمرار وتجنب ركود الماء.';
      case 'زعتر':
        return 'يفضل الطقس الجاف والمشمس، لا تفرط في السقي.';
      case 'قمح':
        return (cond.includes('rain') ? 'افحص الصدأ والفطريات.' :
                'احرص على الري المنتظم خلال امتلاء الحبوب.');
      case 'أرز':
        return 'حافظ على مستوى ماء ضحل وافحص الآفات.';
      case 'شعير':
        return 'احمِ من الرياح القوية وسمّد عند بداية التزهير.';
      case 'شوفان':
        return 'يحتاج إلى تربة جيدة التصريف—تجنب التربة المضغوطة.';
      default:
        return 'افحص صحة النبات وعدّل الرعاية حسب الحاجة.';
    }
  };

  return (
    <ImageBackground source={bg} style={styles.bg} resizeMode="cover">
      <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>توقعات الطقس للـ ٩ ساعات القادمة</Text>

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
                {
                  toArabicDigits(new Date(h.dt * 1000).toLocaleTimeString('ar-EG', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false,
                  }))
                }
              </Text>
              <Image
                source={{ uri: `https://openweathermap.org/img/wn/${h.weather[0].icon}@2x.png` }}
                style={styles.icon}
              />
              <Text style={styles.hourText}>{toArabicDigits(h.main.temp)}°م</Text>
              <Text style={styles.hourText}>
                {weatherDescriptionsAr[h.weather[0].description] || h.weather[0].description}
              </Text>
            </View>
          ))
        )}

        <Text style={styles.subheading}>نصائح للمحاصيل</Text>
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
