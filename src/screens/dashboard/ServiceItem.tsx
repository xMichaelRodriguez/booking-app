/* eslint-disable react-hooks/exhaustive-deps */
import {useFocusEffect} from '@react-navigation/native';
import React from 'react';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {Button, Text, TextInput} from 'react-native-paper';
import {BackHandler, StyleSheet, View} from 'react-native/';
import {IServiceInput} from '../../interface/service.interface';
import {theme} from '../../theme/theme';
export const ServiceItem = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const {name, description, price}: IServiceInput = route.params;

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<IServiceInput>();

  React.useEffect(() => {
    if (name || description || price) {
      setValue('name', name);
      setValue('description', description);
      setValue('price', price);
    }
  }, [description, name, price, setValue]);

  const handleGoBack = () => {
    navigation.replace('Root', {screen: 'Services'});
    navigation.closeDrawer();

    return true;
  };
  useFocusEffect(
    React.useCallback(() => {
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          return handleGoBack();
        },
      );

      return () => subscription.remove();
    }, [handleGoBack]),
  );

  const onSubmit: SubmitHandler<IServiceInput> = data => {
    console.log(data);
  };
  return (
    <View style={styles.container}>
      <View style={styles.margins}>
        <Controller
          name="name"
          control={control}
          rules={{
            required: {value: true, message: 'Required Name'},
            minLength: {value: 3, message: 'Minumum valid characters: 3'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              error={!!errors.name}
              label="Name"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.name?.type === 'required' && (
          <Text style={{color: theme.colors.error}}>{errors.name.message}</Text>
        )}
        {errors.name?.type === 'minLength' && (
          <Text style={{color: theme.colors.error}}>{errors.name.message}</Text>
        )}
      </View>

      <View style={styles.margins}>
        <Controller
          name="description"
          control={control}
          rules={{
            required: {value: true, message: 'Required Description'},
            minLength: {value: 3, message: 'Minumum valid characters: 50'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              error={!!errors.description}
              label="Description"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
            />
          )}
        />
        {errors.description?.type === 'required' && (
          <Text style={{color: theme.colors.error}}>
            {errors.description.message}
          </Text>
        )}
        {errors.description?.type === 'minLength' && (
          <Text style={{color: theme.colors.error}}>
            {errors.description.message}
          </Text>
        )}
      </View>

      <View style={styles.margins}>
        <Controller
          name="price"
          control={control}
          rules={{
            required: {value: true, message: 'Required Price'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              error={!!errors.price}
              label="Price"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              keyboardType="decimal-pad"
              value={String(value)}
            />
          )}
        />
        {errors.price?.type === 'required' && (
          <Text style={{color: theme.colors.error}}>
            {errors.price.message}
          </Text>
        )}
      </View>

      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Save
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  margins: {marginBottom: 15},
  container: {
    flex: 0,
    padding: 10,
    margin: 3,
    justifyContent: 'center',
  },
});
