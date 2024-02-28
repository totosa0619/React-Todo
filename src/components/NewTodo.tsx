import React, { useEffect, useRef } from "react";
import "./NewTodo.css";
import { Todo } from "./Todo.model";
interface NewTodoProps {
  btnStatus: boolean;
  newTodo: Todo | null;
  onAddTodo: (text: string) => void;
}

const NewTodo: React.FC<NewTodoProps> = (props) => {
  const textInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (props.btnStatus) {
      if (props.newTodo !== null) {
        textInputRef.current!.value = props.newTodo.text;
      }
    }
  }, [props.btnStatus, props.newTodo]);

  const todoSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredText = textInputRef.current!.value;
    props.onAddTodo(enteredText);
    textInputRef.current!.value = "";
  };

  return (
    <form onSubmit={todoSubmitHandler}>
      <div className="new-todo">
        <div className="input-text">
          <label htmlFor="todo-text" className="label">
            Todo Text:
          </label>
          <input
            type="text"
            id="todo-text"
            ref={textInputRef}
            placeholder="Please enter NewText"
          />
        </div>

        <button type="submit" className="create-btn">{`${
          !props.btnStatus ? "ADD" : "UPDATE"
        } TODO`}</button>
      </div>
    </form>
  );
};

export default NewTodo;
