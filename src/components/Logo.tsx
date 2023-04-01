import React from 'react';
import {StyleSheet, Image} from 'react-native';

export const Logo = () => {
  return (
    <Image style={styles.image} source={require('../assets/candy-logo.jpg')} />
  );
};
const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    marginBottom: 8,
  },
});
