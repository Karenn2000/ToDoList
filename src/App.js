import "./App.css";
import { useEffect, useRef, useState } from "react";

function App() {
  const [allTodo, setAllTodo] = useState([]);
  const [completed, setCompleted] = useState([]);
  const [unCompleted, setUnCompleted] = useState([]);
  const [currentValue, setCurrentValue] = useState("all");
  const inputRef = useRef(null);

  useEffect(() => {
    if (currentValue === "completed") {
      console.log("completed");
      const completedState = [...allTodo];
      const completedState1 = completedState.filter((el) => {
        return el.isChecked === true;
      });
      setCompleted(completedState1);
    } else if (currentValue === "unCompleted") {
      console.log("unCompleted");
      const unCompletedState = [...allTodo];
      const unCompletedState1 = unCompletedState.filter((el) => {
        return el.isChecked === false;
      });
      setUnCompleted(unCompletedState1);
    }
  }, [allTodo, currentValue]);

  const todo = () => {
    console.log(inputRef.current.value);
    const obj = {
      text: inputRef.current.value,
      id: Math.random(),
      isChecked: false,
    };
    setAllTodo([...allTodo, obj]);
    inputRef.current.value = "";
  };

  const onChange = (elId) => {
    const test = allTodo.map((el) => {
      if (elId.id === el.id) {
        el.isChecked = !el.isChecked;
        return el;
      }
      return el;
    });
    setAllTodo(test);
  };

  const isDel = (elem) => {
    const del = allTodo.filter((el) => {
      return elem.id !== el.id;
    });
    setAllTodo(del);
  };

  const completedTodo = () => {
    setCurrentValue("completed");
  };

  const unCompletedToodo = () => {
    setCurrentValue("unCompleted");
  };

  const clearCheckedItem = () => {
    const todoClearr = [...allTodo];
    const clearTodo = todoClearr.filter((el) => {
      return el.isChecked === false;
    });
    setAllTodo(clearTodo);
  };

  const currentArr = currentValue === "all" ? allTodo : currentValue === "completed" ? completed : unCompleted;

  return (
    <div className="App">
      <h2>My To Do List</h2>
      <input placeholder="Title..." ref={inputRef}></input>
      <button onClick={() => todo()}>Add</button>
      {currentArr.map((element) => {
        return (
          <div
            key={element.id}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <div
              style={{
                display: "flex",
                backgroundColor: "red",
                width: "273px",
                padding: "8px",
                marginBottom: "6px",
              }}
            >
              <input
                type={"checkbox"}
                checked={element.isChecked}
                onChange={() => onChange(element)}
              />
              <div>{element.text}</div>
              <button onClick={() => isDel(element)}>x</button>
            </div>
          </div>
        );
      })}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: " 10px",
          marginBottom: "12px",
          marginTop: "12px",
        }}
      >
        <button
          style={{
            backgroundColor: currentValue === "all" ? "red" : "white",
          }}
          onClick={() => {
            setCurrentValue("all");
          }}
        >
          All
        </button>
        <button
          style={{
            backgroundColor: currentValue === "completed" ? "red" : "white",
          }}
          onClick={() => {
            completedTodo();
          }}
        >
          Completed
        </button>

        <button
          style={{
            backgroundColor: currentValue === "unCompleted" ? "red" : "white",
          }}
          onClick={() => {
            unCompletedToodo();
          }}
        >
          UnCompleted
        </button>

        <button
          onClick={() => {
            clearCheckedItem();
          }}
        >
          Clear Completed
        </button>
      </div>
    </div>
  );
}

export default App;
