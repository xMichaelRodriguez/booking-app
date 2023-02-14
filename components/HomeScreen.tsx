/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import * as React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';

export const HomeScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.view}>
      <Text style={styles.text}>DETRAILS</Text>
      <Button
        icon="forward"
        mode="contained"
        onPress={() => navigation.navigate('Details')}>
        Go Details
      </Button>

      <Text style={styles.text}>FORM</Text>
      <Button
        icon="forward"
        mode="contained-tonal"
        onPress={() => navigation.navigate('Form')}>
        Go Form
      </Button>
      <Text style={styles.text}>SignIn</Text>
      <Button
        icon="forward"
        mode="contained-tonal"
        onPress={() => navigation.navigate('SignIn')}>
        Go SignIn
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    marginBottom: 20,
  },
});
