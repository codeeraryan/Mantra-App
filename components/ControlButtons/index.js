import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ControlButtons = ({ onSetTarget, onReset }) => {
  return (
    <View style={styles.controlsContainer}>
      <TouchableOpacity 
        style={styles.controlButton} 
        onPress={onSetTarget}
      >
        <Text style={styles.controlButtonText}>Set Target</Text>
      </TouchableOpacity>
      
      <TouchableOpacity 
        style={[styles.controlButton, styles.resetButton]} 
        onPress={onReset}
      >
        <Text style={styles.controlButtonText}>Reset</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default ControlButtons;