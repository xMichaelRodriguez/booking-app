import React from 'react';
import {StyleSheet} from 'react-native';
import {AnimatedFAB, useTheme} from 'react-native-paper';

// import {useNavigation} from '@react-navigation/native';

export const FabButton = ({isExtended}: {isExtended: boolean}) => {
  const {colors} = useTheme();
  // const navigation = useNavigation();

  return (
    <AnimatedFAB
      color={colors.primary}
      label={'Create'}
      icon={'plus'}
      extended={isExtended}
      // onPress={handleCreate}
      visible
      animateFrom={'right'}
      iconMode={'dynamic'}
      style={[styles.fabStyle]}
    />
  );
};

const styles = StyleSheet.create({
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});
