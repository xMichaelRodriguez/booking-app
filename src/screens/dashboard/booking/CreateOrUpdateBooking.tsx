import React from 'react';
import {StyleSheet, View} from 'react-native';

import {FlatList} from 'react-native';
import {CalendarComponent} from './components/Calendar';

interface propsObj {
  [key: string]: JSX.Element;
}
export const CreateOrUpdateBooking = () => {
  const views: propsObj = {
    calendar: (
      <View style={styles.item}>
        <CalendarComponent />
      </View>
    ),
  };

  return (
    <FlatList
      style={styles.container}
      data={[{key: 'calendar'}, {key: 'textinput'}]}
      renderItem={({item}) => views[item.key]}
    />
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  item: {
    marginVertical: 20,
    marginHorizontal: 20,
  },
});
