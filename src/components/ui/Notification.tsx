import * as React from 'react';
import {View, StyleSheet} from 'react-native';
import {Snackbar} from 'react-native-paper';

import {useAppDispatch, useAppSelector} from '../../hooks';
import {onDismissSnackBar} from '../../store/slices/ui/uiSlice';

interface IProps {
  message: string;
}
const Notification = ({message}: IProps) => {
  const {snackVisible} = useAppSelector(state => state.ui);
  const dispatch = useAppDispatch();

  const handleDismissSnackBar = () => dispatch(onDismissSnackBar());
  return (
    <View style={styles.container}>
      <Snackbar
        visible={snackVisible}
        onDismiss={handleDismissSnackBar}
        duration={3000}
        action={{
          label: 'Undo',
          onPress: () => {
            handleDismissSnackBar();
          },
        }}>
        {message}
      </Snackbar>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
  },
});

export default Notification;
