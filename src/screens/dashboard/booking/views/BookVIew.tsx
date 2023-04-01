/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {
  type Control,
  Controller,
  type FieldErrors,
  type SubmitHandler,
  type UseFormHandleSubmit,
} from 'react-hook-form';
import {StyleSheet, useColorScheme, View} from 'react-native';
import {Text, Button, TextInput, useTheme} from 'react-native-paper';

import WrapperAnimate from '../../../../components/ui/WrapperAnimate';
import {useAppSelector} from '../../../../hooks';
import {type ICreateBook} from '../../../../store/slices/bookings/interface/bookin.interface';
import {CalendarSection} from '../components/CalendarSection';
import {HeaderBook} from '../components/HeaderBook';
import {TimeSection} from '../components/TimeSection';

interface IProps {
  errors: FieldErrors<ICreateBook>;
  activeItem: string | null;
  timeState: string[];
  handlePress: (time: string) => void;
  onSubmit: SubmitHandler<ICreateBook>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<ICreateBook, any>;
  handleSubmit: UseFormHandleSubmit<ICreateBook>;
  mediaUrl?: string;
  name?: string;
  description?: string;
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
  name,
  description,
  buttonName = 'Confirmar',
}: IProps) => {
  const theme = useTheme();
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const {isLoading} = useAppSelector(state => state.ui);
  return (
    <View style={{flex: 1, padding: 10}}>
      <WrapperAnimate>
        <HeaderBook mediaUrl={mediaUrl} name={name} description={description} />
      </WrapperAnimate>
      <View style={{marginTop: 10}}>
        <WrapperAnimate>
          <Controller
            control={control}
            name="date"
            render={() => <CalendarSection control={control} name="date" />}
          />
          {errors.date != null && (
            <Text style={{color: isDark ? '#EA0000' : theme.colors.error}}>
              {errors.date.message}
            </Text>
          )}
        </WrapperAnimate>
      </View>
      <WrapperAnimate>
        <TimeSection
          activeItem={activeItem}
          handlePress={handlePress}
          timeState={timeState}
        />
        {errors.hour != null && (
          <Text style={{color: isDark ? '#EA0000' : theme.colors.error}}>
            {errors.hour.message}
          </Text>
        )}
      </WrapperAnimate>
      <View style={styles.margins}>
        <WrapperAnimate>
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
                error={!(errors.note == null)}
                onBlur={onBlur}
                mode="outlined"
                label="Note"
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          {errors.note != null && (
            <Text style={{color: isDark ? '#FF2727' : theme.colors.error}}>
              {errors.note.message}
            </Text>
          )}
        </WrapperAnimate>
      </View>

      <View style={styles.buttonContainer}>
        <Button
          mode="contained"
          style={{width: '90%'}}
          onPress={handleSubmit(onSubmit)}
          loading={isLoading}>
          {buttonName}
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  margins: {
    paddingVertical: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    gap: 3,
    justifyContent: 'center',
  },
});
