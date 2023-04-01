/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-native/no-inline-styles */
import moment from 'moment';
import React, {useEffect, useState} from 'react';
import {type Control, useController} from 'react-hook-form';
import {StyleSheet, useColorScheme} from 'react-native';
import CalendarStrip from 'react-native-calendar-strip';
import {Text} from 'react-native-paper';

import {INITIAL_DATE} from '../../../../constants/times';
import {type ICreateBook} from '../../../../store/slices/bookings/interface/bookin.interface';

interface IProps {
  control: Control<ICreateBook, any>;
  name: 'date';
}

export const CalendarSection = ({control, name}: IProps) => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  const [date, setDate] = useState(moment());

  const {field} = useController({control, name});

  useEffect(() => {
    setDate(moment(field.value));
  }, [field.value]);

  // Calcula la fecha mínima disponible
  const minDate = moment().toDate();
  const maxDate = moment().add(2, 'year').toDate();

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
        calendarAnimation={{type: 'sequence', duration: 30}}
        daySelectionAnimation={{
          type: 'background',
          duration: 200,
          highlightColor: '#80DEEA',
        }}
        highlightDateContainerStyle={{
          backgroundColor: '#EE65B3',
          shadowColor: '#fbfbfb',
          borderRadius: 5,
        }}
        numDaysInWeek={6}
        dateNumberStyle={{color: isDarkTheme ? '#fbfbfb' : '#282828'}}
        dateNameStyle={{color: isDarkTheme ? '#fbfbfb' : '#282828'}}
        disabledDateNameStyle={{color: '#BDBDBD'}}
        disabledDateNumberStyle={{color: '#BDBDBD'}}
        calendarHeaderStyle={{color: isDarkTheme ? '#fbfbfb' : '#282828'}}
        iconContainer={{flex: 0}}
        iconLeftStyle={{
          tintColor: isDarkTheme ? '#fbfbfb' : '#282828',
        }}
        iconRightStyle={{
          tintColor: isDarkTheme ? '#fbfbfb' : '#282828',
        }}
        minDate={minDate}
        maxDate={maxDate}
        startingDate={date ?? INITIAL_DATE}
        onDateSelected={currentDay => {
          const newDate = new Date(
            currentDay.year(),
            currentDay.month(),
            currentDay.date(),
          );
          field.onChange(newDate);
        }}
        scrollable
        selectedDate={date ?? INITIAL_DATE}
        style={customs.calendarContainer}
      />
    </>
  );
};
const customs = StyleSheet.create({
  calendarContainer: {height: 115, color: '#282828'},
});
