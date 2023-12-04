import { useRef, useEffect } from "react";
import { View, StyleSheet, Animated, Easing } from "react-native";

const LoadingView = () => {
  const spinValue = useRef(new Animated.Value(0)).current; // Initial value for rotation: 0

  useEffect(() => {
    const spinningAnimation = Animated.loop(
      Animated.sequence([
        // Spin quickly
        Animated.timing(spinValue, {
          toValue: 1,
          duration: 100, // Fast spin duration
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        // Pause
        Animated.delay(500), // Pause duration
        // Reset to initial value without animation
        Animated.timing(spinValue, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    );

    spinningAnimation.start();

    return () => spinningAnimation.stop(); // Stop animation on component unmount
  }, [spinValue]);

  // Spin interpolation
  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'], // Rotation from 0 to 360 degrees
  });

  return (
    <View style={styles.loadingContainer}>
      <Animated.Image
        source={require('../assets/icon-transparent.png')} // Replace with your image path
        style={[styles.image, { transform: [{ rotate: spin }] }]}
        resizeMode="contain"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    backgroundColor: '#000',
    width: '100%',
    height: '100%',
    zIndex: 1
  },
  image: {
    width: 100, // Set the size of your image
    height: 100
  },
});

export default LoadingView;