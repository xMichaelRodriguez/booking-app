import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

const DividerWithOr = () => {
  return (
    <View style={styles.container}>
      <View style={styles.line} />
      <Text style={styles.or}>o</Text>
      <View style={styles.line} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: '#ccc',
  },
  or: {
    marginHorizontal: 10,
    fontSize: 16,
    color: '#ccc',
  },
});

export default DividerWithOr;
