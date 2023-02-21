import React from 'react';
import {AnimatedFAB} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {StyleSheet} from 'react-native';
import {useTheme} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';

export const FabButton = ({isExtended}: {isExtended: boolean}) => {
  const {colors} = useTheme();
  const navigation = useNavigation();
  const handleCreate = () => {
    navigation.navigate('Root', {
      screen: 'NewService',
    });
  };
  return (
    <SafeAreaView style={styles.container}>
      <AnimatedFAB
        color={colors.primary}
        label={'Create'}
        icon={'plus'}
        extended={isExtended}
        onPress={handleCreate}
        visible
        animateFrom={'right'}
        iconMode={'dynamic'}
        style={[styles.fabStyle]}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  fabStyle: {
    bottom: 16,
    right: 16,
    position: 'absolute',
  },
});
