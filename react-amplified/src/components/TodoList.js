import React from 'react';
import { View, Text } from 'react-native';

const TodoList = ({ todos }) => (
  <View>
    {todos.map((todo, index) => (
      <Text key={index}>{todo}</Text>
    ))}
  </View>
);

export default TodoList;
