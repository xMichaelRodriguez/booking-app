/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Image, StyleSheet, useColorScheme} from 'react-native';
import {Text} from 'react-native-paper';

const noDataImage = require('../../assets/no-data.png');
export const NotData = () => {
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  return (
    <View style={custom.activityStyle}>
      <Image style={custom.image} source={noDataImage} />
      <Text
        style={{color: isDark ? '#fbfbfb' : '#282828'}}
        variant="titleLarge">
        No Data
      </Text>
    </View>
  );
};
const custom = StyleSheet.create({
  activityStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
    flex: 1,
  },
  image: {
    width: 300,
    height: 300,
  },
});
