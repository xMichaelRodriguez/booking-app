import React, {type ReactNode, useEffect, useRef} from 'react';
import {Animated} from 'react-native';

interface IProps {
  children: ReactNode;
}

const WrapperAnimate = ({children}: IProps) => {
  const animation = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 700,
      useNativeDriver: true,
    }).start();
  }, [animation]);

  //   const exit = () => {
  //     Animated.timing(animation, {
  //       toValue: 0,
  //       duration: 200,
  //       useNativeDriver: true,
  //     }).start();
  //   };

  return (
    <Animated.View
      style={{
        opacity: animation,
        transform: [
          {
            translateY: animation.interpolate({
              inputRange: [0, 1],
              outputRange: [-10, 0],
            }),
          },
        ],
      }}>
      {children}
    </Animated.View>
  );
};

export default WrapperAnimate;
