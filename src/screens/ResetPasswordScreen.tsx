import React from 'react';
import {useForm, type SubmitHandler, Controller} from 'react-hook-form';
import {StyleSheet, TouchableOpacity, useColorScheme, View} from 'react-native';
import {Text, useTheme, TextInput, Button} from 'react-native-paper';

import {Logo} from '../components/Logo';
import {useAppDispatch} from '../hooks';
import {type INavigationProps} from '../interface';
import {requestResetPasswordToken} from '../store/slices/auth';
import {validEmail} from '../utils/emailRegex';

interface IFormInput {
  email: string;
}
export const ResetPasswordScreen = ({navigation}: INavigationProps) => {
  const theme = useTheme();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';

  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
    reset,
  } = useForm<IFormInput>();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    dispatch(requestResetPasswordToken(data));
    reset();
  };

  return (
    <View style={styles.view}>
      <View style={styles.logoView}>
        <Logo />
      </View>
      <View style={styles.inputView}>
        <Controller
          name="email"
          control={control}
          rules={{
            required: {value: true, message: 'Required Email'},
            pattern: {value: validEmail, message: 'Invalid Email'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              textColor={isDark ? '#fbfbfb' : '#282828'}
              error={!(errors.email == null)}
              onBlur={onBlur}
              mode="outlined"
              label="Email"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email != null && (
          <Text style={{color: theme.colors.error}}>
            {errors.email.message}
          </Text>
        )}
      </View>

      <View style={[styles.forgotPassword]}>
        <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
          <Text style={[styles.forgotPassword, {color: theme.colors.primary}]}>
            Iniciar sesion
          </Text>
        </TouchableOpacity>
      </View>
      <Button icon="send" mode="contained" onPress={handleSubmit(onSubmit)}>
        Enviar
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
  row: {
    flexDirection: 'row',
    padding: 10,
  },
  link: {
    fontWeight: 'bold',
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  labelCheckbox: {
    position: 'absolute',
    marginLeft: 50,
  },
  checkbox: {marginLeft: -20},
  googleButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
    padding: 10,
    borderRadius: 10,
  },
});
