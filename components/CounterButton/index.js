import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Typography from '../../library/Typography';

const CounterButton = ({ onPress }) => {
  return (
    <TouchableOpacity 
      style={styles.counterButton} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <Typography style={styles.counterButtonText}>+</Typography>
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