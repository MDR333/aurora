import React from "react";

const TodoForm = ({ handleSubmit, handleChange, todo }) => (
  <form onSubmit={handleSubmit}>
    <input
      type="text"
      name="todo"
      value={todo}
      onChange={handleChange}
      placeholder="Add a todo"
    />
    <button type="submit">Add Todo</button>
  </form>
);

export default TodoForm;
