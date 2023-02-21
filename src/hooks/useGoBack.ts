import {useFocusEffect} from '@react-navigation/native';
import {useCallback} from 'react';
import {BackHandler} from 'react-native';

type hookProps = {
  navigation: any;
  screenName: string;
};
export const useGoBack = ({navigation, screenName}: hookProps) => {
  useFocusEffect(
    useCallback(() => {
      const handleGoBack = () => {
        navigation.replace('Root', {screen: screenName});
        navigation.closeDrawer();

        return true;
      };
      const subscription = BackHandler.addEventListener(
        'hardwareBackPress',
        () => {
          return handleGoBack();
        },
      );

      return () => subscription.remove();
    }, [navigation, screenName]),
  );
};
