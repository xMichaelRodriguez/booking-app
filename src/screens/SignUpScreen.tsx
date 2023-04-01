/* eslint-disable no-sparse-arrays */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {Controller, type SubmitHandler, useForm} from 'react-hook-form';
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
import WrapperAnimate from '../components/ui/WrapperAnimate';
import {useAppDispatch} from '../hooks';
import {type INavigationProps} from '../interface';
import {startRegister} from '../store/slices/auth/thunks';
import {validEmail, validPassword} from '../utils/emailRegex';

interface IFormInput {
  username: string;
  email: string;
  password: string;
}

export const passwordMessage =
  'Por favor, elija una contraseña más segura que incluya al menos una letra mayúscula, al menos una letra minúscula, al menos uno de los siguientes caracteres especiales: [-, _, *, .] y una longitud de entre 8 y 16 caracteres.';

export const SingUpScreen = ({navigation}: INavigationProps) => {
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
      <WrapperAnimate>
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
                  required: {value: true, message: 'Nombre obligatorio'},
                  minLength: {value: 3, message: 'Minimo de caracteres: 3'},
                  maxLength: {value: 16, message: 'Maxiomo de caracteres: 16'},
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={{color: isDark ? '#fbfbfb' : '#282828'}}
                    error={!(errors.username == null)}
                    onBlur={onBlur}
                    mode="outlined"
                    label="Username"
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.username != null && (
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
                  required: {value: true, message: 'Email Obligatorio'},
                  pattern: {value: validEmail, message: 'Email invalido'},
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={{color: isDark ? '#fbfbfb' : '#282828'}}
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

            <View style={styles.inputView}>
              <Controller
                name="password"
                control={control}
                rules={{
                  required: {value: true, message: 'Contraseña Obligatoria'},
                  pattern: {value: validPassword, message: passwordMessage},
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    style={{color: isDark ? '#fbfbfb' : '#282828'}}
                    error={!(errors.password == null)}
                    mode="outlined"
                    label="Password"
                    secureTextEntry={!isVisible}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />
              {errors.password != null && (
                <Text style={{color: theme.colors.error}}>
                  {errors.password.message}
                </Text>
              )}

              <Checkbox.Item
                label="Mostrar Contraseña"
                status={isVisible ? 'checked' : 'unchecked'}
                position="leading"
                style={styles.checkbox}
                labelStyle={[
                  {color: isDark ? '#fbfbfb' : '#282828'},
                  ,
                  styles.labelCheckbox,
                ]}
                onPress={() => {
                  setIsVisible(!isVisible);
                }}
              />
            </View>

            <Button
              icon="login"
              mode="contained"
              onPress={handleSubmit(onSubmit)}>
              Iniciar Session
            </Button>
            <View style={styles.row}>
              <Text style={{color: isDark ? '#fbfbfb' : '#282828'}}>
                Ya tienes una cuenta?{' '}
              </Text>
              <TouchableOpacity onPress={() => navigation.replace('SignIn')}>
                <Text style={[styles.link, {color: theme.colors.primary}]}>
                  Iniciar sesion
                </Text>
              </TouchableOpacity>
            </View>
            <DividerWithOr />
            <GoogleButton />
          </View>
        </ScrollView>
      </WrapperAnimate>
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
