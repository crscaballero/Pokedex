import React from 'react';
import { Keyboard, TouchableWithoutFeedback } from 'react-native';

interface Props {
  children: JSX.Element;
}

export const DismissKeyboard = ({ children }: Props) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
    {children}
  </TouchableWithoutFeedback>
);
