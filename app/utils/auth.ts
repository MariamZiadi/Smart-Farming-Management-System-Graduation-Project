import AsyncStorage from '@react-native-async-storage/async-storage';

// Function to get the stored token
export const getToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('userToken');
    return token;
  } catch (error) {
    console.error('Error retrieving token:', error);
    return null;
  }
};

// Function to get the stored userId
export const getUserId = async (): Promise<string | null> => {
  try {
    const userId = await AsyncStorage.getItem('userId');
    return userId;
  } catch (error) {
    console.error('Error retrieving userId:', error);
    return null;
  }
};

// Function to set the user token (if you plan to store it)
export const setToken = async (token: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('userToken', token);
  } catch (error) {
    console.error('Error saving token:', error);
  }
};

// Function to set the userId (if you plan to store it)
export const setUserId = async (userId: string): Promise<void> => {
  try {
    await AsyncStorage.setItem('userId', userId);
  } catch (error) {
    console.error('Error saving userId:', error);
  }
};

// Function to clear all user data (e.g., for logout)
export const clearUserData = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('userId');
  } catch (error) {
    console.error('Error clearing user data:', error);
  }
};

export default { getToken, getUserId, setToken, setUserId, clearUserData };
