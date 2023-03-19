/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Control, useController} from 'react-hook-form';
import {StyleSheet, useColorScheme} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import {Text} from 'react-native-paper';
import {INITIAL_DATE} from '../../../../constants/times';
import {ICreateBook} from '../../../../store/slices/bookings/interface/bookin.interface';

interface IProps {
  control: Control<ICreateBook, any>;
  name: 'date';
}

export const CalendarSection = ({control, name}: IProps) => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';

  const {field} = useController({control, name});

  return (
    <>
      <Text
        variant="bodyLarge"
        style={[
          {
            color: isDarkTheme ? '#fbfbfb' : '#282828',
            padding: 20,
            fontWeight: '700',
          },
        ]}>
        Pick a Day
      </Text>
      <CalendarStrip
        highlightDateContainerStyle={{
          backgroundColor: '#EE65B3',
          shadowColor: '#fbfbfb',
          borderRadius: 5,
        }}
        numDaysInWeek={6}
        dateNumberStyle={{color: isDarkTheme ? '#fbfbfb' : '#000'}}
        dateNameStyle={{color: isDarkTheme ? '#fbfbfb' : '#000'}}
        calendarHeaderStyle={{color: isDarkTheme ? '#fbfbfb' : '#000'}}
        iconContainer={{flex: 0}}
        iconLeftStyle={{
          tintColor: isDarkTheme ? '#fbfbfb' : '#282828',
        }}
        iconRightStyle={{
          tintColor: isDarkTheme ? '#fbfbfb' : '#282828',
        }}
        startingDate={field.value ? field.value : INITIAL_DATE}
        minDate={new Date('2022-12-31')}
        onDateSelected={currentDay => field.onChange(currentDay.toDate())}
        scrollable
        selectedDate={field.value ? field.value : INITIAL_DATE}
        style={styles.calendarContainer}
      />
    </>
  );
};
const styles = StyleSheet.create({
  calendarContainer: {height: 115, color: '#282828'},
});
