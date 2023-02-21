import React from 'react';
import {useForm, SubmitHandler, Controller} from 'react-hook-form';
import {View, StyleSheet} from 'react-native';

import {Text, TextInput, Button} from 'react-native-paper';
import {useAppDispatch} from '../../hooks';
import {IService} from '../../slices/services/interface/services.interface';
import {createService} from '../../slices/services/thunks';
import {theme} from '../../theme/theme';
export const CreateService = () => {
  const dispatch = useAppDispatch();
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm<IService>();

  const onSubmit: SubmitHandler<IService> = data => {
    dispatch(createService(data));
  };
  return (
    <View style={custom.container}>
      <View style={custom.margins}>
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
      <View style={custom.margins}>
        <Controller
          name="description"
          control={control}
          rules={{
            required: {value: true, message: 'Required Description'},
            minLength: {value: 50, message: 'Minumum valid characters: 50'},
            maxLength: {value: 500, message: 'Maximun valid characters: 500'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              error={!!errors.description}
              label="Description"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              multiline
              numberOfLines={3}
            />
          )}
        />
        {errors.description?.type === 'required' && (
          <Text style={{color: theme.colors.error}}>
            {errors.description.message}
          </Text>
        )}
      </View>
      <View style={custom.margins}>
        <Controller
          name="price"
          control={control}
          rules={{
            required: {value: true, message: 'Required Price'},
            pattern: {
              value: /^\$?\d{1,3}(,\d{3})*(\.\d{2})?$/,
              message: 'Please enter a valid dollar amount',
            },
          }}
          render={({field: {onChange, onBlur, value = 0}}) => (
            <TextInput
              error={!!errors.price}
              label="Price"
              mode="outlined"
              onBlur={onBlur}
              onChangeText={onChange}
              value={String(value)}
              keyboardType="decimal-pad"
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

const custom = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  margins: {
    marginBottom: 40,
  },
});
