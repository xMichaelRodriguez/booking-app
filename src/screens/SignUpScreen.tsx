/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Controller, SubmitHandler, useForm} from 'react-hook-form';
import {
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  useColorScheme,
  ScrollView,
  View,
} from 'react-native';
import {Button, Checkbox, Text, TextInput, useTheme} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import DividerWithOr from '../components/DividerWIthOr';
import {GoogleButton} from '../components/GoogleButton';

import {Logo} from '../components/Logo';
import {useAppDispatch} from '../hooks';
import {startRegister} from '../store/slices/auth/thunks';
import {validEmail, validPassword} from '../utils/emailRegex';

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

export const passwordMessage =
  'Please choose a more secure password that includes at least one uppercase letter, at least one lowercase letter, at least one of the following special characters: [-, _, *, .] and a length between 8 and 16 characters.';

export const SingUpScreen = ({navigation}: {navigation: any}) => {
  const theme = useTheme();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IFormInput>();
  const [isVisible, setIsVisible] = React.useState(false);

  const onSubmit: SubmitHandler<IFormInput> = data => {
    dispatch(startRegister(data));
  };
  return (
    <SafeAreaView style={styles.view}>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.logoView}>
            <Logo />
          </View>
          <View style={styles.inputView}>
            <Controller
              name="username"
              control={control}
              rules={{
                required: {value: true, message: 'Required Name'},
                minLength: {value: 3, message: 'Minimun characters is 3'},
                maxLength: {value: 16, message: 'Maximun characters is 16'},
              }}
              render={({field: {onChange, onBlur, value}}) => (
                <TextInput
                  // eslint-disable-next-line react-native/no-inline-styles
                  style={{color: isDark ? '#fbfbfb' : '#282828'}}
                  error={!!errors.username}
                  onBlur={onBlur}
                  mode="outlined"
                  label="Username"
                  value={value}
                  onChangeText={onChange}
                />
              )}
            />
            {errors.username && (
              <Text style={{color: theme.colors.error}}>
                {errors.username?.message}.
              </Text>
            )}
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
                  style={{color: isDark ? '#fbfbfb' : '#282828'}}
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
                  style={{color: isDark ? '#fbfbfb' : '#282828'}}
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
                {errors.password.message}
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
          <View style={styles.row}>
            <Text>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.replace('SignIn')}>
              <Text style={[styles.link, {color: theme.colors.primary}]}>
                Sign In
              </Text>
            </TouchableOpacity>
          </View>

          <Button
            icon="login"
            mode="contained"
            onPress={handleSubmit(onSubmit)}>
            Sign In
          </Button>

          <DividerWithOr />
          <GoogleButton />
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
  },
  checkbox: {marginLeft: -20},
  container: {paddingTop: 30},
  logoView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
