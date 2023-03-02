/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useColorScheme,
} from 'react-native';
import {Button, Checkbox, TextInput, useTheme} from 'react-native-paper';
import {Logo} from '../../components/Logo';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {passwordMessage} from '../SignUpScreen';
import {startLogin} from '../../store/slices/auth';

import {validEmail, validPassword} from '../../utils/emailRegex';
import {GoogleButton} from '../../components/GoogleButton';

interface IFormInput {
  email: string;
  password: string;
}
export const SignInView = ({navigation}: {navigation: any}) => {
  const {isLoading} = useAppSelector(state => state.ui);
  const theme = useTheme();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormInput>();
  const [isVisible, setIsVisible] = React.useState(false);
  const dispatch = useAppDispatch();

  const onSubmit: SubmitHandler<IFormInput> = data => {
    dispatch(startLogin(data));
  };

  return (
    <View>
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
              error={!!errors.email}
              onBlur={onBlur}
              mode="outlined"
              label="Email"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.email && (
          <Text style={{color: theme.colors.error}}>
            {errors.email.message}
          </Text>
        )}
      </View>
      <View style={styles.inputView}>
        <Controller
          name="password"
          control={control}
          rules={{
            required: {value: true, message: 'Required Password'},
            pattern: {value: validPassword, message: passwordMessage},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              textColor={isDark ? '#fbfbfb' : '#282828'}
              error={!!errors.password}
              mode="outlined"
              label="Password"
              secureTextEntry={!isVisible}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.password && (
          <Text style={{color: theme.colors.error}}>
            {errors.password?.message}
          </Text>
        )}

        <Checkbox.Item
          label="Show Password"
          status={isVisible ? 'checked' : 'unchecked'}
          position="leading"
          style={[styles.checkbox]}
          labelStyle={[
            {color: isDark ? '#fbfbfb' : '#282828'},
            styles.labelCheckbox,
          ]}
          onPress={() => {
            setIsVisible(!isVisible);
          }}
        />
      </View>

      <View style={[styles.forgotPassword]}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={[styles.forgotPassword, {color: theme.colors.primary}]}>
            Forgot your password?
          </Text>
        </TouchableOpacity>
      </View>
      <Button
        icon="login"
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}>
        Sign In
      </Button>
      <GoogleButton />

      <View style={styles.row}>
        <Text style={{color: isDark ? '#fbfbfb' : '#282828'}}>
          Don't have an account?
        </Text>
        <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
          <Text style={[styles.link, {color: theme.colors.primary}]}>
            {' '}
            Sign Up
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
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
