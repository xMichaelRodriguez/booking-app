/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';

import {Image, StyleSheet, useColorScheme, View} from 'react-native';
import {
  Button,
  IconButton,
  Text,
  TextInput,
  useTheme,
} from 'react-native-paper';
import * as ImagePicker from 'react-native-image-picker';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {
  Controller,
  SubmitHandler,
  useController,
  useForm,
} from 'react-hook-form';
import {useAppDispatch} from '../../../../hooks';
import {addNewService} from '../../../../store/slices/services/thunks';

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
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
    setError,
  } = useForm<IFormInput>();
  // Obtener el controlador de la imagen
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

    // eslint-disable-next-line curly
    if (!resp.assets) return;

    if (resp.assets[0]) {
      const {uri} = resp.assets[0];
      if (!uri) {
        return (
          fieldState.invalid && setError('image', {message: 'Invalid Image'})
        );
      }

      setImageSelected(uri);
      field.onChange(resp.assets);
      console.debug({imageSelected});
    }
  };
  const onSubmit: SubmitHandler<IFormInput> = data => {
    dispatch(addNewService(data));
  };
  return (
    <ScrollView style={{flex: 1}}>
      <View style={styles.container}>
        <View style={styles.containerInput}>
          <Text variant="headlineSmall" style={{marginVertical: 20}}>
            Choose Image
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
          {errors.image && (
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
                error={!!errors.name}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.name && (
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
                error={!!errors.description}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.description && (
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
                error={!!errors.price}
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.price && (
            <Text style={{color: theme.colors.error}}>
              {errors.price.message}
            </Text>
          )}
        </View>

        <View style={[styles.containerInput]}>
          <Button mode="contained" onPress={handleSubmit(onSubmit)}>
            Confirm
          </Button>
        </View>
      </View>
    </ScrollView>
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