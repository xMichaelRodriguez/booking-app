/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {CalendarComponent} from './components/Calendar';

import {FlatList, ScrollView, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native-paper';

interface propsObj {
  [key: string]: JSX.Element;
}
export const CreateOrUpdateBooking = () => {
  const prueba: propsObj = {
    calendar: (
      <View style={styles.item}>
        <CalendarComponent />
      </View>
    ),
    textInput: (
      <View style={styles.item}>
        <TextInput mode="outlined" label="Note" multiline numberOfLines={3} />
      </View>
    ),
  };
  // return (
  //   <ScrollView style={{flex: 1, padding: 20}}>
  //     <CalendarComponent />
  //   </ScrollView>

  // );

  return (
    <FlatList
      style={styles.container}
      data={[{key: 'calendar'}, {key: 'textinput'}]}
      renderItem={({item}) => prueba[item.key]}
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
