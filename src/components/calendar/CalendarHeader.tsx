/* eslint-disable react-native/no-inline-styles */
import moment, {type Moment} from 'moment';
import React from 'react';
import {StyleSheet, useColorScheme} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';

import {INITIAL_DATE} from '../../constants/times';

interface IProps {
  selected: Moment;
  setSelectedDate: React.Dispatch<React.SetStateAction<moment.Moment>>;
}
export const CalendarHeader = ({selected, setSelectedDate}: IProps) => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  return (
    <CalendarStrip
      highlightDateContainerStyle={styles.highlightDateContainer}
      highlightDateNameStyle={styles.highlightDateStyle}
      highlightDateNumberStyle={styles.highlightDateStyle}
      dateNumberStyle={{color: isDarkTheme ? '#fbfbfb' : '#282828'}}
      dateNameStyle={{color: isDarkTheme ? '#fbfbfb' : '#282828'}}
      calendarHeaderStyle={{color: isDarkTheme ? '#fbfbfb' : '#282828'}}
      iconContainer={{flex: 0}}
      iconLeftStyle={{
        tintColor: isDarkTheme ? '#fbfbfb' : '#282828',
      }}
      iconRightStyle={{
        tintColor: isDarkTheme ? '#fbfbfb' : '#282828',
      }}
      startingDate={moment(INITIAL_DATE)}
      selectedDate={selected}
      onDateSelected={currentDay => {
        setSelectedDate(currentDay);
      }}
      minDate={new Date('2022-12-31')}
      scrollable
      style={styles.calendarContainer}
    />
  );
};
const styles = StyleSheet.create({
  calendarContainer: {height: 120, color: '#282828'},
  highlightDateContainer: {
    backgroundColor: '#EE65B3',
    shadowColor: '#fbfbfb',
    borderRadius: 10,
  },
  highlightDateStyle: {
    color: '#fbfbfb',
  },
});
