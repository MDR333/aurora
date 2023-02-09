import React from 'react';
import { Text } from 'react';

const Heading = ({ level, children }) => {
  switch (level) {
    case 1:
      return <Text style={{ fontSize: 32 }}>{children}</Text>;
    case 2:
      return <Text style={{ fontSize: 24 }}>{children}</Text>;
    default:
      return <Text>{children}</Text>;
  }
};

export default Heading;
