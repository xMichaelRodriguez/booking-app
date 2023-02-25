/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, useColorScheme} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Text} from 'react-native-paper';

interface IProps {
  time: string;
  isActive: boolean;
  onPress: () => void;
}

export const TimeItem = ({time, isActive, onPress}: IProps) => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  return (
    <TouchableOpacity onPress={onPress}>
      <View
        style={[styles.itemContainer, isActive && styles.activeItemContainer]}>
        <Text
          variant="bodyMedium"
          style={{color: isDarkTheme ? '#fbfbfb' : '#282828'}}>
          {time}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    margin: 2.5,
    borderRadius: 5,
    padding: 6,
    backgroundColor: 'rgba(234, 147, 196,0.3)',
    alignItems: 'center',
    marginVertical: 2,
    marginHorizontal: 3,
  },
  activeItemContainer: {
    backgroundColor: 'rgba(234, 147, 196,0.6)',
  },
});
