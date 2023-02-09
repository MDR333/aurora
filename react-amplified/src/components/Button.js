import React from 'react';
import { TouchableOpacity, Text } from 'react';

const Button = ({ style, onClick, children }) => (
  <TouchableOpacity style={style} onPress={onClick}>
    <Text>{children}</Text>
  </TouchableOpacity>
);

export default Button;
