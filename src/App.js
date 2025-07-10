import React, { useState, useRef } from 'react';
import './App.css';

const App = () => {
  const [todos, settodos] = useState([]);
  const [showDateIndex, setShowDateIndex] = useState(null);
  const inputRef = useRef();

  const addingtodo = () => {
  const text = inputRef.current.value.trim();

  if (text === "") {
    alert("To-do is empty, ktab shi haja");
    return;
  }

  settodos([
    ...todos,
    {
      completed: false,
      text,
      date: new Date().toLocaleString(),
      modifiedDate: null,
      important: false,
    },
  ]);

  inputRef.current.value = "";
};


  const shatab = (index) => {
    settodos(todos.map((todo, i) => 
      i === index ? {...todo, completed: !todo.completed} : todo
    ));
  };

  const toggleImportant = (index) => {
    settodos(todos.map((todo, i) => 
      i === index ? {...todo, important: !todo.important} : todo
    ));
  };

  const delet = (index) => {
    settodos(todos.filter((_, i) => i !== index));
  };

  const modify = (index) => {
    settodos(todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          showInput: true
        };
      }
      return todo;
    }));
  };

  const saveChanges = (index, newText) => {
    settodos(todos.map((todo, i) => {
      if (i === index) {
        return {
          ...todo,
          text: newText,
          modifiedDate: new Date().toLocaleString(),
          showInput: false
        };
      }
      return todo;
    }));
  };

  const toggleDate = (index) => {
    setShowDateIndex(showDateIndex === index ? null : index);
  };

  const sortByImportance = () => {
    const sortedTodos = [...todos].sort((a, b) => {
      if (a.important === b.important) return 0;
      return b.important ? 1 : -1;
    });
    settodos(sortedTodos);
  };

  const clearAllTodos = () => {
    settodos([]);
  };

  return (
    <div className="app-container">
      <h1 className="app-title">SINIF YASSINE TODO-LIST</h1>
      <h2 className="app-title">MY FIRST PROJECT </h2>

      <div className="todo-stats">
        <p>
          Total Todos: {todos.length} ....  
          Completed: {todos.filter(todo => todo.completed).length} ....  
          Incompleted: {todos.filter(todo => !todo.completed).length} ....
          Important: {todos.filter(todo => todo.important).length} ....
          Not.important: {todos.filter(todo => !todo.important).length}
        </p>
      </div>
      
     
      <div className="input-group">
        <input
          ref={inputRef}
          placeholder="ktb shi haja..."
          className="todo-input"
        />
        <button onClick={addingtodo} className="add-button">Add</button>
        <button onClick={sortByImportance} className="add-button">important</button>
        <button onClick={clearAllTodos} className="add-button">Clear All</button>
      </div>

      <div>
        <ul className="todo-list">
          {todos.map(({ text, completed, date, modifiedDate, showInput, important }, index) => (
            <div className="div" key={index}>
              {showInput ? (
                <input
                  className="edit-input"
                  defaultValue={text}
                  onBlur={(e) => saveChanges(index, e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && saveChanges(index, e.target.value)}
                  autoFocus
                />
              ) : (
                <li
                  className={`todo-item ${completed ? "done" : ""} ${important ? "important" : ""}`}
                  onClick={() => shatab(index)}
                >
                  {showDateIndex === index 
                    ? (modifiedDate || date) 
                    : text}
                </li>
              )}
              <div>
                <span className="delete-button" onClick={() => delet(index)}>delete</span>
                <span className="delete-button" onClick={() => modify(index)}>modify</span>
                <span className="delete-button" onClick={() => toggleDate(index)}>date</span>
                <label className="important-label">
                  <input
                    type="checkbox"
                    checked={important}
                    onChange={() => toggleImportant(index)}
                    className="important-checkbox"
                  />
                  Important
                </label>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default App;