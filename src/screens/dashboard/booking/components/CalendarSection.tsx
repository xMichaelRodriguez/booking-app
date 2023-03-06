/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import {Text} from 'react-native-paper';

interface IProps {
  selected: Date;
  setSelected: (day: Date) => void;
}

export const CalendarSection = ({selected, setSelected}: IProps) => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  return (
    <>
      <Text
        variant="bodyLarge"
        style={[
          {
            color: isDarkTheme ? '#fbfbfb' : '#282828',
            marginVertical: 5,
            fontWeight: '800',
          },
        ]}>
        Pick a Day
      </Text>
      <CalendarStrip
        highlightDateContainerStyle={styles.highlightDateContainer}
        highlightDateNameStyle={styles.highlightDateStyle}
        highlightDateNumberStyle={styles.highlightDateStyle}
        iconContainer={{flex: 0.1}}
        iconLeftStyle={{
          tintColor: isDarkTheme ? '#fbfbfb' : '#282828',
        }}
        startingDate={selected}
        iconRightStyle={{
          tintColor: isDarkTheme ? '#fbfbfb' : '#282828',
        }}
        minDate={new Date('2022-12-31')}
        onDateSelected={currentDay => setSelected(currentDay.toDate())}
        scrollable
        selectedDate={selected}
        style={styles.calendarContainer}
      />
    </>
  );
};
const styles = StyleSheet.create({
  calendarContainer: {height: 110},
  highlightDateContainer: {
    backgroundColor: '#EE65B3',
    shadowColor: '#fbfbfb',
    borderRadius: 10,
  },
  highlightDateStyle: {
    color: '#fbfbfb',
  },
});
