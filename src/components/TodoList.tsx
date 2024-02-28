import React from "react";
import "./TodoList.css";

interface TodoListProps {
  items: { id: string; text: string; checked: boolean }[];
  onUpdateTodo: (item: { id: string; text: string; checked: boolean }) => void;
  onDeleteTodo: (id: string) => void;
  onChangeChecked: ({ id, value }: { id: string; value: boolean }) => void;
}
const TodoList: React.FC<TodoListProps> = ({
  items,
  onDeleteTodo,
  onUpdateTodo,
  onChangeChecked,
}) => {
  return (
    <ul>
      {items.map((item) => {
        return (
          <li key={item.id} className="row">
            <span className={`col-4 ${item.checked ? "todo-text" : ""}`}>
              {`${
                item.text.length < 15
                  ? item.text
                  : item.text.slice(0, 15) + "..."
              }`}
            </span>
            <div className="col-6">
              <button className="btn-update" onClick={() => onUpdateTodo(item)}>
                UPDATE
              </button>
              <button
                className="btn-delete"
                onClick={() => onDeleteTodo(item.id)}
              >
                DELETE
              </button>
            </div>
            <span className="col-2">
              <input
                type="checkbox"
                checked={item.checked}
                onChange={(e) =>
                  onChangeChecked({ id: item.id, value: e.target.checked })
                }
              />
            </span>
          </li>
        );
      })}
    </ul>
  );
};

export default TodoList;
