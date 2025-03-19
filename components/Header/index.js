import React from 'react';
import { StyleSheet, View } from 'react-native';
import Typography from '../../library/Typography';

const Header = () => {
  return (
    <View style={styles.headerContainer}>
      <Typography style={styles.title}>Mantra Counter</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default Header;