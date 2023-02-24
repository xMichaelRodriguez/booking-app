import React from 'react';
import {View, StyleSheet} from 'react-native';

const DrawerSeparator = () => {
  return <View style={styles.separator} />;
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: '#ccc',
    marginVertical: 10,
    marginHorizontal: 15,
  },
});

export default DrawerSeparator;
