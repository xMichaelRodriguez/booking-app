import * as React from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {Button, useTheme} from 'react-native-paper';

import {Logo} from '../components/Logo';
import {type INavigationProps} from '../interface';

export const InitialScreen = ({navigation}: INavigationProps) => {
  const theme = useTheme();

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fadeIn, setFadeIn] = React.useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeIn, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  }, [fadeIn]);

  return (
    <Animated.View style={[styles.view, {opacity: fadeIn}]}>
      <View style={styles.logo}>
        <Logo />
      </View>
      <Button
        labelStyle={styles.text}
        contentStyle={styles.buttomStyle}
        style={[styles.buttonMargin, {borderColor: theme.colors.primary}]}
        mode="outlined"
        onPress={() => navigation.navigate('SignIn')}>
        Iniciar Sesion
      </Button>

      <Button
        labelStyle={styles.text}
        contentStyle={styles.buttomStyle}
        mode="contained"
        style={[styles.buttonMargin, {borderColor: theme.colors.primary}]}
        onPress={() => navigation.navigate('SignUp')}>
        Registrarte
      </Button>
    </Animated.View>
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
    marginBottom: 10,
  },
});
