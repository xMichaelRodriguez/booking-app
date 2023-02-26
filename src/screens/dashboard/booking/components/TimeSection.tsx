/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, StyleSheet, useColorScheme} from 'react-native';
import {Chip, Text} from 'react-native-paper';

interface IProps {
  timeState: string[];
  handlePress: (item: string) => void;
  activeItem: string | null;
}
export const TimeSection = ({timeState, handlePress, activeItem}: IProps) => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  return (
    <View style={styles.container}>
      <Text
        variant="bodyLarge"
        style={[{color: isDarkTheme ? '#fbfbfb' : '#282828'}]}>
        Pick a Time
      </Text>

      <View
        style={{
          flexDirection: 'row',
          flexWrap: 'wrap',
          overflow: 'scroll',
        }}>
        {timeState.map(item => (
          <Chip
            key={item}
            selected={item === activeItem}
            style={{margin: 2}}
            onPress={() => handlePress(item)}>
            {item}
          </Chip>
        ))}
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {marginVertical: 20},
  listContainer: {
    padding: 10,
  },
});
