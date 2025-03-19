import React, { useState, useEffect } from 'react';
import { StyleSheet, StatusBar, SafeAreaView, Alert, Vibration } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

import Header from './components/Header';
import CounterDisplay from './components/CounterDisplay';
import CounterButton from './components/CounterButton';
import ControlButtons from './components/ControlButtons';
import TargetModal from './components/TargetModal';

export default function App() {
  const [count, setCount] = useState(0);
  const [target, setTarget] = useState(108);
  const [modalVisible, setModalVisible] = useState(false);
  const [tempTarget, setTempTarget] = useState('108');
  const [sound, setSound] = useState();

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    saveData();
  }, [count, target]);

  useEffect(() => {
    if (count === target && count > 0) {
      targetReached();
    }
  }, [count, target]);

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const loadData = async () => {
    try {
      const storedCount = await AsyncStorage.getItem('mantraCount');
      const storedTarget = await AsyncStorage.getItem('mantraTarget');
      
      if (storedCount !== null) {
        setCount(parseInt(storedCount));
      }
      
      if (storedTarget !== null) {
        setTarget(parseInt(storedTarget));
        setTempTarget(storedTarget);
      }
    } catch (error) {
      console.error('Error loading data from AsyncStorage:', error);
    }
  };

  const saveData = async () => {
    try {
      await AsyncStorage.setItem('mantraCount', count.toString());
      await AsyncStorage.setItem('mantraTarget', target.toString());
    } catch (error) {
      console.error('Error saving data to AsyncStorage:', error);
    }
  };

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('./assets/bell.mp3')
    );
    setSound(sound);
    await sound.playAsync();
  }

  const targetReached = () => {
    Vibration.vibrate(500);
    playSound();
    Alert.alert(
      "Target Reached!",
      `Congratulations! You've completed ${target} repetitions.`,
      [
        { text: "Continue", onPress: () => console.log("Continue pressed") },
        { text: "Reset", onPress: resetCounter }
      ]
    );
  };

  const incrementCounter = () => {
    setCount(prevCount => prevCount + 1);
  };

  const resetCounter = () => {
    setCount(0);
  };

  const saveTarget = () => {
    const newTarget = parseInt(tempTarget);
    if (isNaN(newTarget) || newTarget <= 0) {
      Alert.alert("Invalid Input", "Please enter a valid number greater than 0.");
      return;
    }
    setTarget(newTarget);
    setModalVisible(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <Header />
      
      <CounterDisplay 
        count={count} 
        target={target} 
      />

      <CounterButton onPress={incrementCounter} />

      <ControlButtons
        onSetTarget={() => setModalVisible(true)}
        onReset={resetCounter}
      />

      <TargetModal
        visible={modalVisible}
        tempTarget={tempTarget}
        onChangeTempTarget={setTempTarget}
        onCancel={() => setModalVisible(false)}
        onSave={saveTarget}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
});