/* eslint-disable react/no-unstable-nested-components */
import React, {useState} from 'react';

import {View} from 'react-native';
import {Text} from 'react-native-paper';
import {Calendar} from 'react-native-calendars';

const INITIAL_DATE = '2023-01-01';

export const CalendarComponent = () => {
  const [selected, setSelected] = useState(INITIAL_DATE);

  return (
    <View>
      <Text variant="bodyLarge">Pick a Day</Text>
      <Calendar
        onDayPress={day => setSelected(day.dateString)}
        markedDates={{
          [selected]: {selected: true},
        }}
        hideExtraDays
        enableSwipeMonths
      />
    </View>
  );
};
