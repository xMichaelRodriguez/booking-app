/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable react-native/no-inline-styles */
import {useFocusEffect} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  Controller,
  type SubmitHandler,
  useController,
  useForm,
} from 'react-hook-form';
import {Image, StyleSheet, useColorScheme, View} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import * as ImagePicker from 'react-native-image-picker';
import {
  Button,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';

import Notification from '../../../../components/ui/Notification';
import WrapperAnimate from '../../../../components/ui/WrapperAnimate';
import {useAppDispatch, useAppSelector} from '../../../../hooks';
import {addNewService} from '../../../../store/slices/services/thunks';
import {onToggleSnackBar} from '../../../../store/slices/ui/uiSlice';

interface IFormInput {
  image: string;
  name: string;
  description: string;
  price: string;
}

export const ServiceManager = () => {
  const theme = useTheme();
  const scheme = useColorScheme();
  const isDark = scheme === 'dark';
  const [imageSelected, setImageSelected] = useState<string | null>(null);
  const [notificationMessage, setNotificationMessage] = useState('');
  const dispatch = useAppDispatch();
  const {isLoading} = useAppSelector(state => state.ui);
  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
    reset,
    clearErrors,
  } = useForm<IFormInput>();

  // Get the Image controller
  const {field, fieldState} = useController({
    name: 'image',
    control,
    rules: {
      required: 'Required Image',
    },
  });
  const handlePickerImage = async () => {
    const resp = await ImagePicker.launchImageLibrary({
      mediaType: 'photo',
      selectionLimit: 1,
    });

    if (resp.assets == null) return;

    if (resp.assets[0]) {
      const {uri} = resp.assets[0];
      if (!uri) {
        fieldState.invalid && setError('image', {message: 'Invalid Image'});
        return;
      }

      setImageSelected(uri);
      field.onChange(resp.assets);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      clearErrors();
      reset();
    }, [clearErrors, reset]),
  );

  const onSubmit: SubmitHandler<IFormInput> = data => {
    dispatch(
      addNewService(data, ({message}: {message: string}) => {
        setNotificationMessage(message);
        dispatch(onToggleSnackBar());
        reset({price: '', image: '', description: '', name: ''});
        setImageSelected(null);
      }),
    );
  };
  return (
    <View style={{flex: 1}}>
      <WrapperAnimate>
        <ScrollView>
          <View style={styles.container}>
            <View style={styles.containerInput}>
              <Text
                variant="headlineSmall"
                style={{
                  marginVertical: 20,
                  color: isDark ? '#fbfbfb' : '#282828',
                }}>
                Elige una Image
              </Text>
              {imageSelected === null ? (
                <IconButton
                  icon={'image-edit-outline'}
                  size={90}
                  style={styles.imageStyle}
                  mode="outlined"
                  onPress={handlePickerImage}
                />
              ) : (
                <TouchableOpacity onPress={handlePickerImage}>
                  <Image
                    style={styles.imageStyle}
                    source={{
                      uri: imageSelected,
                    }}
                  />
                </TouchableOpacity>
              )}
              {errors.image != null && (
                <Text style={{color: theme.colors.error}}>
                  {errors.image.message}
                </Text>
              )}
            </View>
            <View style={styles.containerInput}>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: {value: true, message: 'Required Name'},
                  maxLength: {value: 20, message: 'max characters 20'},
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    label="Name"
                    mode="outlined"
                    onBlur={onBlur}
                    textColor={isDark ? '#fbfbfb' : '#282828'}
                    error={!(errors.name == null)}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.name != null && (
                <Text style={{color: theme.colors.error}}>
                  {errors.name.message}
                </Text>
              )}
            </View>
            <View style={styles.containerInput}>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: {value: true, message: 'Required Description'},
                  maxLength: {value: 200, message: 'max characters 200'},
                  minLength: {value: 50, message: 'min characters 50'},
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    multiline
                    numberOfLines={3}
                    label="Description"
                    mode="outlined"
                    onBlur={onBlur}
                    textColor={isDark ? '#fbfbfb' : '#282828'}
                    error={!(errors.description == null)}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.description != null && (
                <Text style={{color: theme.colors.error}}>
                  {errors.description.message}
                </Text>
              )}
            </View>
            <View style={styles.containerInput}>
              <Controller
                name="price"
                control={control}
                rules={{
                  required: {value: true, message: 'Required Price'},
                }}
                render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                    label="Price"
                    mode="outlined"
                    onBlur={onBlur}
                    textColor={isDark ? '#fbfbfb' : '#282828'}
                    keyboardType="decimal-pad"
                    error={!(errors.price == null)}
                    value={value}
                    onChangeText={onChange}
                  />
                )}
              />
              {errors.price != null && (
                <Text style={{color: theme.colors.error}}>
                  {errors.price.message}
                </Text>
              )}
            </View>

            <View style={[styles.containerInput]}>
              <Button
                mode="contained"
                onPress={handleSubmit(onSubmit)}
                loading={isLoading}>
                Confirmar
              </Button>
            </View>
          </View>
        </ScrollView>
      </WrapperAnimate>
      <Notification message={notificationMessage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  containerInput: {padding: 15},
  imageStyle: {
    alignSelf: 'center',
    marginVertical: 20,
    borderRadius: 20,
    width: 200,
    height: 200,
  },
});
