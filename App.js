// App.js
import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TouchableOpacity, 
  TextInput, 
  Modal, 
  Vibration, 
  Alert,
  StatusBar,
  SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Audio } from 'expo-av';

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

  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

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
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Mantra Counter</Text>
      </View>

      <View style={styles.counterContainer}>
        <Text style={styles.counterText}>{count}</Text>
        <Text style={styles.targetText}>Target: {target}</Text>
        <View style={styles.progressContainer}>
          <View 
            style={[
              styles.progressBar, 
              { width: `${Math.min((count / target) * 100, 100)}%` }
            ]} 
          />
        </View>
      </View>

      <TouchableOpacity 
        style={styles.counterButton} 
        onPress={incrementCounter}
        activeOpacity={0.7}
      >
        <Text style={styles.counterButtonText}>+</Text>
      </TouchableOpacity>

      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={styles.controlButton} 
          onPress={() => setModalVisible(true)}
        >
          <Text style={styles.controlButtonText}>Set Target</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlButton, styles.resetButton]} 
          onPress={resetCounter}
        >
          <Text style={styles.controlButtonText}>Reset</Text>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Set Target</Text>
            <TextInput
              style={styles.input}
              keyboardType="numeric"
              value={tempTarget}
              onChangeText={setTempTarget}
              placeholder="Enter target number"
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity 
                style={[styles.modalButton, styles.cancelButton]} 
                onPress={() => setModalVisible(false)}
              >
                <Text style={styles.modalButtonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalButton, styles.saveButton]} 
                onPress={saveTarget}
              >
                <Text style={styles.modalButtonText}>Save</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    backgroundColor: '#6A0DAD',
    paddingVertical: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  counterContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  counterText: {
    fontSize: 80,
    fontWeight: 'bold',
    color: '#6A0DAD',
  },
  targetText: {
    fontSize: 18,
    color: '#666',
    marginTop: 10,
  },
  progressContainer: {
    height: 10,
    backgroundColor: '#E0E0E0',
    borderRadius: 10,
    width: '80%',
    marginTop: 20,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#6A0DAD',
  },
  counterButton: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#6A0DAD',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 40,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  counterButtonText: {
    fontSize: 48,
    color: '#FFFFFF',
  },
  controlsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  controlButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    backgroundColor: '#6A0DAD',
    minWidth: 120,
    alignItems: 'center',
  },
  resetButton: {
    backgroundColor: '#FF6B6B',
  },
  controlButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#6A0DAD',
  },
  input: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 5,
    padding: 10,
    width: '100%',
    fontSize: 16,
    marginBottom: 20,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    minWidth: 100,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#CCCCCC',
  },
  saveButton: {
    backgroundColor: '#6A0DAD',
  },
  modalButtonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
});