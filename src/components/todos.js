import React, { useState } from "react";
import TodoList from "./TodoList";

function Todos() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [todos, setTodos] = useState([]);
  const [editingIndex, setEditingIndex] = useState(-1);
  const [statusFilter, setStatusFilter] = useState("All");

  const handleAddTodo = () => {
    if (name && description) {
      const newTodo = {
        name,
        description,
      };
      if (editingIndex !== -1) {
        // If editing an existing todo, replace it
        const updatedTodos = [...todos];
        updatedTodos[editingIndex] = newTodo;
        setTodos(updatedTodos);
      } else {
        // If adding a new todo, append it
        setTodos([...todos, newTodo]);
      }

      setName("");
      setDescription("");
      setEditingIndex(-1);
    }
  };

  const editTodo = (index) => {
    const { name, description } = todos[index];
    setName(name);
    setDescription(description);
    setEditingIndex(index);
  };

  const deleteTodo = (index) => {
    const updateTodos = [...todos];
    updateTodos.splice(index, 1);

    setTodos(updateTodos);
  };

  return (
    <div>
      <div className="container" id="todo">
        <input
          type="text"
          className="TaskInput p-3"
          id="TextInput"
          placeholder="Enter the Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="text"
          className="description p-3"
          id="TextInput"
          placeholder="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button className="btn btn-success " onClick={handleAddTodo}>
          {" "}
          Add Todo
        </button>
      </div>

      <div className="section">
        <h5 className="pb-3 fw-bold">My Todos</h5>
        <h5 className="pb-3 fw-bold">
          Status Filter:
          <select
            className="btn btn-danger btn-secondary p-0 mx-3"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option className="btn btn-success opt" value="All">
              All
            </option>
            <option className="btn btn-success opt" value="Completed">
              Completed
            </option>
            <option className="btn btn-success opt" value="Not-Completed">
              Not-Completed
            </option>
          </select>
        </h5>
      </div>

      <div className="row ">
        {todos
          .filter((todo) => {
            if (statusFilter === "All") {
              return true;
            } else if (statusFilter === "Completed") {
              return todo.completed;
            } else if (statusFilter === "Not-Completed") {
              return !todo.completed;
            }
            return false;
          })
          .map((todo, index) => (
            <TodoList
              key={index}
              index={index}
              todo={todo}
              onDelete={deleteTodo}
              onEdit={editTodo}
            />
          ))}
      </div>
    </div>
  );
}

export default Todos;
