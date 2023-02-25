import React from 'react';
import {Text} from 'react-native-paper';
import {CalendarComponent} from './components/Calendar';
import {View} from 'react-native';
export const CreateOrUpdateBooking = () => {
  return (
    <View>
      <CalendarComponent />
      <Text>CreateOrUpdateBooking</Text>
    </View>
  );
};
