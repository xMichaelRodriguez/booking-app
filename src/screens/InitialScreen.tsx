import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button} from 'react-native-paper';
import {Logo} from '../components/Logo';
import {theme} from '../theme/theme';

export const InitialScreen = ({navigation}: {navigation: any}) => {
  return (
    <View style={styles.view}>
      <View style={styles.logo}>
        <Logo />
      </View>
      <Button
        labelStyle={styles.text}
        contentStyle={styles.buttomStyle}
        style={styles.buttonMargin}
        mode="contained"
        onPress={() => navigation.navigate('SignIn')}>
        Sign In
      </Button>

      <Button
        labelStyle={styles.text}
        contentStyle={styles.buttomStyle}
        mode="outlined"
        style={styles.buttonMargin}
        onPress={() => navigation.navigate('SignUp')}>
        Sign up
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  view: {
    flex: 0.9,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
  },
  buttomStyle: {
    margin: 10,
  },
  buttonMargin: {
    borderColor: theme.colors.primary,
    marginBottom: 10,
  },
});
