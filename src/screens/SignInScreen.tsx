import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {validEmail} from '../utils/emailRegex';

export const SignInScreen = () => {
  const [text, onChangeText] = React.useState('');
  const [textP, onChangeTextP] = React.useState('');
  const [isVisible, setIsVisible] = React.useState(true);

  const handleSubmit = () => {
    if (validEmail.test(text)) {
      return console.log('ok', {textP});
    }

    return console.log('NEL');
  };

  return (
    <View style={styles.view}>
      <View style={styles.inputView}>
        <TextInput
          mode="outlined"
          label="Email"
          onChangeText={onChangeText}
          right={<TextInput.Affix text={`${text.length}/100`} />}
        />
      </View>

      <View style={styles.inputView}>
        <TextInput
          mode="outlined"
          label="Password"
          secureTextEntry={isVisible}
          onChangeText={onChangeTextP}
          right={
            <TextInput.Icon
              icon="eye"
              onPress={() => setIsVisible(!isVisible)}
            />
          }
        />
      </View>

      <Button icon="login" mode="contained" onPress={handleSubmit}>
        Sign In
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  view: {
    flex: 1,
    justifyContent: 'center',
    alignContent: 'center',
    padding: 15,
  },
  inputView: {
    margin: 10,
  },
});
