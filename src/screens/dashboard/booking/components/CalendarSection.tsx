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
          'stylesheet.calendar.header': {
            headerContainer: {
              flexDirection: 'row',
              backgroundColor: '#eee',
              borderRadius: 12,
            },
          },
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
          textMonthFontWeight: '400',
          textDayHeaderFontWeight: '400',
          textDayFontSize: 16,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 18,
        }}
        hideExtraDays
        enableSwipeMonths
      />
    </>
  );
};

// const styles = StyleSheet.create({
//   weekHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-around',
//     alignItems: 'center',
//     backgroundColor: '#eee',
//     borderRadius: 12,
//     height: 50,
//   },
//   dayText: {
//     fontWeight: 'bold',
//     fontSize: 18,
//     color: '#333',
//   },
// });
