/* eslint-disable react/display-name */
/* eslint-disable react-native/no-inline-styles */
import {useTheme} from '@react-navigation/native';
import React, {useCallback} from 'react';
import {View, StyleSheet, useColorScheme} from 'react-native';
import {Chip, Text} from 'react-native-paper';

interface IProps {
  timeState: string[];
  handlePress: (item: string) => void;
  activeItem: string | null;
}
export const TimeSection = React.memo(
  ({timeState, handlePress, activeItem}: IProps) => {
    const colorScheme = useColorScheme();
    const isDarkTheme = colorScheme === 'dark';
    const theme = useTheme();
    const background = theme.colors.primary + '90';
    const handleSelect = useCallback(
      (item: string) => {
        handlePress(item);
      },
      [handlePress],
    );

    return (
      <View style={styles.container}>
        <Text
          variant="bodyLarge"
          style={[
            {
              color: isDarkTheme ? '#fbfbfb' : '#282828',
              fontWeight: '700',
              padding: 20,
            },
          ]}>
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
              selected={activeItem?.includes(item)}
              style={{margin: 2, backgroundColor: background}}
              textStyle={{
                color: '#fbfbfb',
              }}
              onPress={() => {
                handleSelect(item);
              }}>
              {item}
            </Chip>
          ))}
        </View>
      </View>
    );
  },
);
const styles = StyleSheet.create({
  container: {marginVertical: 20},
  listContainer: {
    padding: 10,
  },
});
