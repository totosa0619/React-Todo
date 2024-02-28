import React, { useState } from "react";
import TodoList from "./components/TodoList";
import NewTodo from "./components/NewTodo";
import { Todo } from "./components/Todo.model";

function App(): React.ReactElement {
  const [todos, setTodos] = useState<Todo[]>([
    { id: "firstTodo", text: "this is Todolist", checked: true },
  ]);
  const [newTodo, setNewTodo] = useState<Todo | null>(null);
  const [btnStatus, setBtnStatus] = useState<boolean>(false);

  const todoAddHandler = (text: string) => {
    if (btnStatus && newTodo) {
      setTodos(
        todos.map((todo) =>
          todo.id === newTodo.id ? { ...todo, text: text } : todo
        )
      );
      setBtnStatus(false);
      setNewTodo(null);
    } else {
      setTodos((prevTodos) => [
        ...prevTodos,
        { id: Math.random().toString(), text, checked: false },
      ]);
    }
  };

  const changeCheckedHandler = ({
    id,
    value,
  }: {
    id: string;
    value: boolean;
  }) => {
    const newTemp = todos.map((todo) =>
      todo.id === id ? { ...todo, checked: value } : { ...todo }
    );
    setTodos([...newTemp]);
  };

  const removeTodoHandler = (todoId: string) => {
    setTodos((prevTodos) => {
      return prevTodos.filter((todo) => todo.id !== todoId);
    });
  };

  const updateTodoHandler = (todoItem: {
    id: string;
    text: string;
    checked: boolean;
  }) => {
    setBtnStatus(true);
    setNewTodo(todoItem);
  };

  return (
    <div className="App">
      <NewTodo
        onAddTodo={todoAddHandler}
        btnStatus={btnStatus}
        newTodo={newTodo}
      />
      <TodoList
        items={todos}
        onDeleteTodo={removeTodoHandler}
        onUpdateTodo={updateTodoHandler}
        onChangeChecked={changeCheckedHandler}
      />
    </div>
  );
}

export default App;
