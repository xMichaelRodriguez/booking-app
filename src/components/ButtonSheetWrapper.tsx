import React, {useMemo, RefObject} from 'react';
import {View, StyleSheet} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import {BottonContent} from './BottonContent';

type Props = {
  bottomSheetRef: RefObject<BottomSheet>;
};

export const ButtonSheetWrapper = ({bottomSheetRef}: Props) => {
  // variables
  const snapPoints = useMemo(() => [0, '50%', '75%'], []);

  // renders
  return (
    <View style={styles.container}>
      <BottomSheet
        ref={bottomSheetRef}
        snapPoints={snapPoints}
        borderRadius={10}
        renderContent={BottonContent}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
