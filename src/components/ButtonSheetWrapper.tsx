import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import React, {useMemo, RefObject, useCallback} from 'react';
import {useAppDispatch} from '../hooks';
import {clearActiveService} from '../slices/services/thunks';
import {BottonContent} from './BottonContent';

type Props = {
  bottomSheetRef: RefObject<BottomSheet>;
};

export const ButtonSheetWrapper = ({bottomSheetRef}: Props) => {
  // variables
  const dispatch = useAppDispatch();

  const snapPoints = useMemo(() => ['1%', '35%'], []);

  // handlers
  const onClose = () => {
    dispatch(clearActiveService());
  };

  // renders
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={1}
        appearsOnIndex={2}
      />
    ),
    [],
  );
  return (
    <BottomSheet
      ref={bottomSheetRef}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
      onClose={onClose}
      enablePanDownToClose={true}>
      <BottomSheetView>
        <BottonContent />
      </BottomSheetView>
    </BottomSheet>
  );
};
