import React, {useEffect} from 'react';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {Button, Text, TextInput} from 'react-native-paper';
import {StyleSheet, View} from 'react-native';
import {useGoBack} from '../../hooks';
import {IService} from '../../slices/services/interface/services.interface';
import {theme} from '../../theme/theme';
export const ServiceItem = ({
  route,
  navigation,
}: {
  route: any;
  navigation: any;
}) => {
  const serviceItem: IService = route.params;

  const {
    control,
    handleSubmit,
    formState: {errors},
    setValue,
  } = useForm<IService>();

  useEffect(() => {
    if (Object.entries(serviceItem).length > 0) {
      const {description, id, name, price} = serviceItem;
      setValue('id', id);
      setValue('name', name);
      setValue('description', description);
      setValue('price', price);
    }
  }, [serviceItem, setValue]);

  useGoBack({navigation, screenName: 'Services'});
  // const handleGoBack = () => {
  //   navigation.replace('Root', {screen: 'Services'});
  //   navigation.closeDrawer();

  //   return true;
  // };
  // useFocusEffect(
  //   React.useCallback(() => {
  //     const subscription = BackHandler.addEventListener(
  //       'hardwareBackPress',
  //       () => {
  //         return handleGoBack();
  //       },
  //     );

  //     return () => subscription.remove();
  //   }, [handleGoBack]),
  // );

  const onSubmit: SubmitHandler<IService> = data => {
    console.log({data});
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
        {errors.name && (
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
        {errors.description && (
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
        {errors.price && (
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
