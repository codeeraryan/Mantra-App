import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

const CounterButton = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.counterButton} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Text style={styles.counterButtonText}>+</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
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
});

export default CounterButton;