/* eslint-disable react-native/no-inline-styles */
import {useTheme} from '@react-navigation/native';
import React from 'react';
import {useColorScheme} from 'react-native';
import {Calendar} from 'react-native-calendars';
import {Text} from 'react-native-paper';

interface IProps {
  selected: string;
  setSelected: (day: string) => void;
}
export const CalendarSection = ({selected, setSelected}: IProps) => {
  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  const theme = useTheme();
  return (
    <>
      <Text
        variant="bodyLarge"
        style={[
          {color: isDarkTheme ? '#fbfbfb' : '#282828', marginVertical: 10},
        ]}>
        Pick a Day
      </Text>
      <Calendar
        onDayPress={day => setSelected(day.dateString)}
        markedDates={{
          [selected]: {selected: true},
        }}
        theme={{
          calendarBackground: isDarkTheme ? '#282828' : '#fbfbfbfb',
          textSectionTitleColor: theme.colors.primary,
          textSectionTitleDisabledColor: '#fbfbfb',
          selectedDayBackgroundColor: theme.colors.primary,
          selectedDayTextColor: '#ffffff',
          todayTextColor: theme.colors.primary,
          dayTextColor: isDarkTheme ? '#fbfbfbfb' : '#282828',
          textDisabledColor: '#fbfbfb',
          dotColor: theme.colors.primary,
          selectedDotColor: '#ffffff',
          arrowColor: theme.colors.primary,
          disabledArrowColor: '#fbfbfb',
          monthTextColor: theme.colors.primary,
          indicatorColor: theme.colors.primary,
          textDayFontWeight: '300',
          textMonthFontWeight: '600',
          textDayHeaderFontWeight: '400',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 20,
        }}
        hideExtraDays
        enableSwipeMonths
      />
    </>
  );
};

// const styles = StyleSheet.create({
//   themeCalendar: {
//     calendarBackground: '#ffffff',
//     textSectionTitleColor: '#b6c1cd',
//     textSectionTitleDisabledColor: '#d9e1e8',
//     selectedDayBackgroundColor: '#00bfff',
//     selectedDayTextColor: '#ffffff',
//     todayTextColor: '#00bfff',
//     dayTextColor: '#2d4150',
//     textDisabledColor: '#d9e1e8',
//     dotColor: '#00bfff',
//     selectedDotColor: '#ffffff',
//     arrowColor: '#00bfff',
//     disabledArrowColor: '#d9e1e8',
//     monthTextColor: '#00bfff',
//     indicatorColor: '#00bfff',
//     textDayFontFamily: 'monospace',
//     textMonthFontFamily: 'monospace',
//     textDayHeaderFontFamily: 'monospace',
//     textDayFontWeight: '300',
//     textMonthFontWeight: 'bold',
//     textDayHeaderFontWeight: '300',
//     textDayFontSize: 16,
//     textMonthFontSize: 16,
//     textDayHeaderFontSize: 16,
//   },
// });
