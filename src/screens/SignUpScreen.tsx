import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  View,
} from 'react-native';
import {Button, Checkbox, Text, TextInput} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Logo} from '../components/Logo';
import {theme} from '../theme/theme';
import {validEmail} from '../utils/emailRegex';
export const SingUpScreen = ({navigation}: {navigation: any}) => {
  const [text, onChangeText] = React.useState('');
  const [textP, onChangeTextP] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(false);

  const handleSubmit = () => {
    if (validEmail.test(text)) {
      return console.log('ok', {textP});
    }

    return console.log('NEL');
  };

  return (
    <SafeAreaView style={styles.view}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.logoView}>
            <Logo />
          </View>
          <View style={styles.inputView}>
            <TextInput
              mode="outlined"
              label="Username"
              onChangeText={onChangeText}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              mode="outlined"
              label="Email"
              onChangeText={onChangeText}
            />
          </View>

          <View style={styles.inputView}>
            <TextInput
              mode="outlined"
              label="Password"
              secureTextEntry={!isVisible}
              onChangeText={onChangeTextP}
            />
            <Checkbox.Item
              label="Show Password"
              status={isVisible ? 'checked' : 'unchecked'}
              position="leading"
              style={styles.checkbox}
              labelStyle={styles.labelCheckbox}
              onPress={() => {
                setIsVisible(!isVisible);
              }}
            />
          </View>
          <View style={styles.row}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('SignIn')}>
              <Text style={styles.link}>Sign In</Text>
            </TouchableOpacity>
          </View>

          <Button icon="login" mode="contained" onPress={handleSubmit}>
            Sign In
          </Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    paddingTop: StatusBar.currentHeight,
    padding: 10,
  },
  inputView: {
    margin: 10,
  },
  labelCheckbox: {
    position: 'absolute',
    marginLeft: 50,
  },
  row: {
    flexDirection: 'row',
    padding: 10,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  checkbox: {marginLeft: -20},
  container: {paddingTop: 30},
  logoView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
