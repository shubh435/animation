import { Dimensions, View, TouchableOpacity, Text } from "react-native";
import { Svg, Circle, Path } from "react-native-svg";
import Animated, {
  useAnimatedProps,
  withSpring,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from "react-native-reanimated";

import React from 'react'
const {width, height} = Dimensions.get('screen');
const Circle_Length = 1000;
const Radius = Circle_Length / (2 * Math.PI);
const CircularProgressLoadingAnimation = () => {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <Svg>
      <Circle
        cx={width / 2}
        cy={height / 2}
        r={Radius}
        stroke="#404258"
        fill="#fff"
        strokeWidth={35}
      />
      <Circle
        cx={width / 2}
        cy={height / 2}
        r={Radius}
        stroke="#82CD47"
        strokeWidth={15}
        fill="transparent"
        strokeDasharray={Circle_Length}
        strokeLinecap="round"
      />
    </Svg>
    <View
    style={{
      height: 250,
      position: "absolute",
      width: 250,
      bottom: 210,
      backgroundColor: "#54B435",
      borderRadius: 150,
    }}
  />
  <Svg
    viewBox="0 0 40 40"
    style={{
      height: 110,
      position: "absolute",
      width: 110,
      bottom: 280,
      backgroundColor: "transparent",
      transform: [{ scale: 2 }],
    }}
  >
    <Path
      d="M12.5 20l5 5 9-9"
      stroke={"#fff"}
      strokeWidth={3}
      fill="#54B435"
      strokeLinecap="round"
    />
  </Svg>
  </View>
  )
}

const AnimatedCircle = Animated.createAnimatedComponent(CircularProgressLoadingAnimation);
export default AnimatedCircle