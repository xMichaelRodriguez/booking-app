/* eslint-disable prettier/prettier */
import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {TextInput, Badge} from 'react-native-paper';

export const FormScreen = ({navigation}: {navigation: any}) => {
  const [text, onChangeText] = React.useState('');

  return (
    <View style={styles.view}>
      <TextInput
        mode="outlined"
        label="Some Text"
        onChangeText={onChangeText}
      />
      <Badge style={styles.badge}>{text}</Badge>

      <Button title="Go to Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};
const styles = StyleSheet.create({
  view: {flex: 1, justifyContent: 'flex-start', padding: 20},
  badge: {
    color: '#fbfbfb',
    margin: 'auto',
    height: 20,
  },
});
