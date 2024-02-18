import React, { useState, useEffect, useRef } from "react";
import { StyleSheet, Animated, Easing } from "react-native";

const defaultColors = ["#C4C4C4", "#C4C4C4", "#C4C4C4", "#C4C4C4"];

interface IProps {
  dots?: number;
  colors?: string[];
  size?: number;
  bounceHeight?: number;
  borderRadius?: number;
  components?: React.ReactNode[] | null;
}

const DotLoadingAnimation: React.FC<IProps> = ({
  dots = 3,
  colors = defaultColors,
  size = 30,
  bounceHeight = 40,
  borderRadius,
  components = null,
}) => {
  const [animations, setAnimations] = useState<Animated.Value[]>([]);
  const [reverse, setReverse] = useState(false);

  const opacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const dotAnimations: Animated.Value[] = [];
    let animationsAmount =
    !!components && Array.isArray(components) ? components.length : dots;
    for (let i = 0; i < animationsAmount; i++) {
      dotAnimations.push(new Animated.Value(0));
    }
    setAnimations(dotAnimations);
  }, []);

  useEffect(() => {
    if (animations.length === 0) return;
    loadingAnimation(animations, reverse);
    appearAnimation();
  }, [animations]);

  function appearAnimation() {
    Animated.timing(opacity, {
      toValue: 1,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  }

  function floatAnimation(node: Animated.Value, reverseY: boolean, delay: number) {
    const floatSequence = Animated.sequence([
      Animated.timing(node, {
        toValue: reverseY ? bounceHeight : -bounceHeight,
        easing: Easing.bezier(0.41, -0.15, 0.56, 1.21),
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(node, {
        toValue: reverseY ? -bounceHeight : bounceHeight,
        easing: Easing.bezier(0.41, -0.15, 0.56, 1.21),
        delay,
        useNativeDriver: true,
      }),
      Animated.timing(node, {
        toValue: 0,
        delay,
        useNativeDriver: true,
      }),
    ]);
    return floatSequence;
  }

  function loadingAnimation(nodes: Animated.Value[], reverseY: boolean) {
    Animated.parallel(
      nodes.map((node, index) => floatAnimation(node, reverseY, index * 100))
    ).start(() => {
      setReverse(!reverse);
    });
  }

  useEffect(() => {
    if (animations.length === 0) return;
    loadingAnimation(animations, reverse);
  }, [reverse, animations]);

  return (
    <Animated.View style={[styles.loading, { opacity }]}>
      {animations.map((animation, index) =>{
        return components ? (
          <Animated.View
            key={`loading-anim-${index}`}
            testID={`loading-anim-${index}`}
            style={[{ transform: [{ translateY: animation }] }]}
          >
            {components[index]}
          </Animated.View>
        ) : (
          <Animated.View
            key={`loading-anim-${index}`}
            testID={`loading-anim-${index}`}
            style={[
              {
                width: size,
                height: size,
                borderRadius: borderRadius || size / 2,
              },
              { backgroundColor: colors[index] || "#4dabf7" },
              { transform: [{ translateY: animation }] },
            ]}
          />
        )
      }
        
      )}
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  loading: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width:"30%"
  },
});

export default DotLoadingAnimation;