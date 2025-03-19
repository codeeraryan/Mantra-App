import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typography from '../../library/Typography';

const CounterDisplay = ({ count, target }) => {
  return (
    <View style={styles.counterContainer}>
      <Typography style={styles.counterText}>{count}</Typography>
      <Typography style={styles.targetText}>Target: {target}</Typography>
      <View style={styles.progressContainer}>
        <View 
          style={[
            styles.progressBar, 
            { width: `${Math.min((count / target) * 100, 100)}%` }
          ]} 
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default CounterDisplay;