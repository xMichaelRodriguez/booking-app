import React from 'react';

import RBSheet from 'react-native-raw-bottom-sheet';
import {StyleSheet, View} from 'react-native';
import {theme} from '../theme/theme';

type props = {
  children: JSX.Element | JSX.Element[] | string | string[];
  refRBSheet: RBSheet | null;
};

export const ButtonSheet = ({children, refRBSheet}: props) => {
  return (
    <RBSheet
      animationType="slide"
      ref={refRBSheet}
      closeOnDragDown={true}
      closeOnPressMask={false}
      customStyles={{
        container: {
          justifyContent: 'center',
          alignItems: 'center',
          borderTopLeftRadius: 50,
          borderTopRightRadius: 50,
          backgroundColor: theme.dark ? '#858585' : '#fbfbfb',
          //   filter: 'drop-shadow(30px 10px 4px #4444dd)',
          shadowRadius: 30,
          shadowOpacity: 30,
          shadowColor: theme.dark ? '#FEFEFE' : '#6F6F6F',
        },
        wrapper: {
          backgroundColor: 'rgba(27, 27, 27, 0.6)',
        },

        draggableIcon: {
          backgroundColor: '#606060',
        },
      }}>
      <View style={custom.container}>{children}</View>
    </RBSheet>
  );
};

const custom = StyleSheet.create({
  container: {
    flex: 1,
  },
});
