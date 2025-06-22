import React from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';

interface PlantProps {
    name: string;
    wateringPlan: string;
    fertilizerPlan: string;
}

const { width } = Dimensions.get('window');

const Plant_arabic = ({ name, wateringPlan, fertilizerPlan }: PlantProps) => (
    <View style={styles.container}>
        <View style={styles.card}>
            <Text style={styles.title}>{name}</Text>
            <View style={styles.infoRow}>
                <Text style={styles.label}>💧 خطة الري:</Text>
                <Text style={styles.value}>{wateringPlan}</Text>
            </View>
            <View style={styles.infoRow}>
                <Text style={styles.label}>🌱 خطة التسميد:</Text>
                <Text style={styles.value}>{fertilizerPlan}</Text>
            </View>
        </View>
    </View>
);


const styles = StyleSheet.create({
    container: {
        width: '100%',
        alignItems: 'center', 
        paddingHorizontal: 10,
    },
    card: {
        width: width - 20, 
        backgroundColor: '#f0f8f0', 
        borderRadius: 15,
        padding: 20,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
        marginVertical: 10,
        borderWidth: 1,
        borderColor: '#d0e6d0',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#2e7d32',
        marginBottom: 15,
        textAlign: 'center',
    },
    infoRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginVertical: 5,
    },
    label: {
        fontWeight: '600',
        color: '#388e3c',
        fontSize: 16,
    },
    value: {
        fontSize: 16,
        color: '#555',
        flexShrink: 1, 
        textAlign: 'right',
    },
});

export default Plant_arabic;