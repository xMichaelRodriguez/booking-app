import React from 'react';
import {useForm, Controller, SubmitHandler} from 'react-hook-form';
import {StyleSheet, Image, Text, TouchableOpacity, View} from 'react-native';
import {Button, Checkbox, TextInput} from 'react-native-paper';
import {Logo} from '../../components/Logo';
import {useAppDispatch} from '../../hooks';
import {passwordMessage} from '../SignUpScreen';
import {startLogin} from '../../slices/auth';

import {theme} from '../../theme/theme';
import {validEmail, validPassword} from '../../utils/emailRegex';
interface IFormInput {
  email: string;
  password: string;
}
export const SignInView = ({navigation}: {navigation: any}) => {
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
          style={styles.checkbox}
          labelStyle={styles.labelCheckbox}
          onPress={() => {
            setIsVisible(!isVisible);
          }}
        />
      </View>
      <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgotPassword}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>
      <Button icon="login" mode="contained" onPress={handleSubmit(onSubmit)}>
        Sign In
      </Button>

      <Button mode="text" textColor="#808080" style={styles.googleSignIn}>
        <Image
          source={require('../../assets/sign-in-google.png')}
          style={styles.googleIcon}
        />
        <Text>{'  '}Sign in with Google</Text>
      </Button>
      <View style={styles.row}>
        <Text style={styles.textColor}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => navigation.replace('SignUp')}>
          <Text style={styles.link}> Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  googleSignIn: {
    marginTop: 10,
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
    color: theme.colors.primary,
  },
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
    color: theme.colors.secondary,
  },
  logoView: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  textColor: {color: '#282828'},
  labelCheckbox: {
    position: 'absolute',
    marginLeft: 50,
  },
  checkbox: {marginLeft: -20},
  googleIcon: {
    height: 25,
    width: 25,
    padding: 3,
  },
});
