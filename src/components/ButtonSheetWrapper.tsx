import BottomSheet, {
  BottomSheetView,
  BottomSheetBackdrop,
} from '@gorhom/bottom-sheet';
import React, {useMemo, RefObject, useCallback} from 'react';
import {useAppDispatch} from '../hooks';
import {clearActiveService} from '../store/slices/services/thunks';

type Props = {
  bottomSheetRef: RefObject<BottomSheet>;
  children: React.ReactNode;
  percentage: string;
  height: number;
};

export const ButtonSheetWrapper = ({
  bottomSheetRef,
  children,
  percentage,
  height,
}: Props) => {
  // variables
  const dispatch = useAppDispatch();

  const snapPoints = useMemo(() => ['1%', percentage], [percentage]);

  // handlers
  const onClose = () => {
    dispatch(clearActiveService());
  };

  // renders
  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        opacity={1}
        disappearsOnIndex={0}
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
      <BottomSheetView style={{height: height}}>{children}</BottomSheetView>
    </BottomSheet>
  );
};
