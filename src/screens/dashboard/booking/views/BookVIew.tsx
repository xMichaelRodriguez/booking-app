/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  Control,
  Controller,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from 'react-hook-form';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {Text, Button, TextInput, useTheme} from 'react-native-paper';
import {useAppSelector} from '../../../../hooks';
import {ICreateBook} from '../../../../store/slices/bookings/interface/bookin.interface';
import {CalendarSection} from '../components/CalendarSection';
import {HeaderBook} from '../components/HeaderBook';
import {TimeSection} from '../components/TimeSection';

interface IProps {
  errors: FieldErrors<ICreateBook>;
  activeItem: string | null;
  timeState: string[];
  handlePress: (time: string) => void;
  onSubmit: SubmitHandler<ICreateBook>;
  control: Control<ICreateBook, any>;
  handleSubmit: UseFormHandleSubmit<ICreateBook>;
  mediaUrl?: string;
  caption?: string;
  buttonName: string;
}
export const BookVIew = ({
  errors,
  activeItem,
  timeState,
  handlePress,
  onSubmit,
  control,
  handleSubmit,
  mediaUrl,
  caption,
  buttonName = 'Confirm',
}: IProps) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const {isLoading} = useAppSelector(state => state.ui);

  return (
    <View style={{margin: 10}}>
      <View>
        <HeaderBook mediaUrl={mediaUrl} caption={caption} />
      </View>
      <View style={{marginTop: 10}}>
        <Controller
          control={control}
          name="date"
          render={() => <CalendarSection control={control} name="date" />}
        />
        {errors.date && (
          <Text style={{color: isDark ? '#EA0000' : theme.colors.error}}>
            {errors.date.message}
          </Text>
        )}
      </View>
      <View>
        <TimeSection
          activeItem={activeItem}
          handlePress={handlePress}
          timeState={timeState}
        />
        {errors.hour && (
          <Text style={{color: isDark ? '#EA0000' : theme.colors.error}}>
            {errors.hour.message}
          </Text>
        )}
      </View>
      <View style={styles.margins}>
        <Controller
          name="note"
          control={control}
          rules={{
            maxLength: {
              value: 500,
              message: 'Only a maximum of 500 characters are allowed',
            },
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
              textColor={isDark ? '#fbfbfb' : '#282828'}
              multiline
              numberOfLines={3}
              error={!!errors.note}
              onBlur={onBlur}
              mode="outlined"
              label="Note"
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.note && (
          <Text style={{color: isDark ? '#FF2727' : theme.colors.error}}>
            {errors.note.message}
          </Text>
        )}
      </View>

      <Button
        mode="contained"
        onPress={handleSubmit(onSubmit)}
        loading={isLoading}>
        {buttonName}
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  margins: {
    margin: 20,
  },
  activityStyle: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    gap: 20,
    flexWrap: 'wrap',
  },
  container: {
    padding: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listContainer: {
    padding: 10,
  },
});
