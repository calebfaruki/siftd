import React from 'react';
import { View, TouchableHighlight, StyleProp, ViewStyle, TextStyle } from 'react-native';

interface ButtonProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress: () => void;
}

export default function Button({ onPress, style, children }: ButtonProps) {
  return (
    <TouchableHighlight onPress={onPress}>
      <View style={[styles.button, style, { flexDirection: 'row', alignItems: 'center' }]}>
        {children}
      </View>
    </TouchableHighlight>
  );
};

const styles = {
  button: {
    marginTop: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 5,
  }
};
