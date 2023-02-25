/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList, StyleSheet, useColorScheme} from 'react-native';
import {Text} from 'react-native-paper';
import {NUM_COLUMN} from '../../../../utils/num-columns';
import {TimeItem} from './TimeItem';

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
      <FlatList
        data={timeState}
        renderItem={({item}) => (
          <TimeItem
            time={item}
            isActive={item === activeItem}
            onPress={() => handlePress(item)}
          />
        )}
        keyExtractor={item => item}
        numColumns={NUM_COLUMN}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {marginVertical: 20},
  listContainer: {
    padding: 10,
  },
});
