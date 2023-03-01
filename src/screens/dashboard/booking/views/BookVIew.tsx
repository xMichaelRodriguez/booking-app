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
import {CalendarSection} from '../components/CalendarSection';
import {HeaderBook} from '../components/HeaderBook';
import {TimeSection} from '../components/TimeSection';
import {ICreateBook} from '../interface/createBook.interface';

interface IProps {
  selected: string;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
  errors: FieldErrors<ICreateBook>;
  activeItem: string | null;
  timeState: string[];
  handlePress: (time: string) => void;
  onSubmit: SubmitHandler<ICreateBook>;
  control: Control<ICreateBook, any>;
  handleSubmit: UseFormHandleSubmit<ICreateBook>;
}
export const BookVIew = ({
  selected,
  setSelected,
  errors,
  activeItem,
  timeState,
  handlePress,
  onSubmit,
  control,
  handleSubmit,
}: IProps) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const {isLoading} = useAppSelector(state => state.ui);
  return (
    <>
      <View>
        <HeaderBook />
      </View>
      <View>
        <CalendarSection selected={selected} setSelected={setSelected} />
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
            required: {value: true, message: 'Required Note'},
          }}
          render={({field: {onChange, onBlur, value}}) => (
            <TextInput
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
        Confirm
      </Button>
    </>
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
