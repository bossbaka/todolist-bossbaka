import { useState, useEffect } from "react";
import "./App.css";
import { Typography, TextField, Button, Stack } from "@mui/material";
import TodoList from "./components/TodoList";

function App() {
  const initialState = JSON.parse(localStorage.getItem("dataList")) || [];
  const [dataList, setDataList] = useState(initialState);
  const [input, setInput] = useState("");
  const [editData, setEditData] = useState(null);

  const InputChange = (e) => {
    setInput(e.target.value);
  };

  const handleDelete = ({ id }) => {
    setDataList(dataList.filter((item) => item.id !== id));
  };

  const handleComplete = (data) => {
    setDataList(
      dataList.map((item) => {
        if (item.id === data.id) {
          return { ...item, completed: !item.completed };
        }
        return item;
      })
    );
  };

  const handleEdit = ({ id }) => {
    const findData = dataList.find((item) => item.id === id);
    setEditData(findData);
  };

  const updateData = (title, id, completed) => {
    const newData = dataList.map((item) =>
      item.id === id ? { title, id, completed } : item
    );
    setDataList(newData);
    setEditData("");
  };

  useEffect(() => {
    if (editData) {
      setInput(editData.title);
    } else {
      setInput("");
    }
  }, [setInput, editData]);

  const formSubmit = (e) => {
    if (input) {
      e.preventDefault();
      if (!editData) {
        const num = dataList.length + 1;
        setDataList([...dataList, { id: num, title: input, completed: false }]);
        setInput("");
      } else {
        updateData(input, editData.id, editData.completed);
      }
    } else {
      return alert("Please fill in fields");
    }
  };

  useEffect(() => {
    localStorage.setItem("dataList", JSON.stringify(dataList));
  }, [dataList]);

  return (
    <div className="App">
      <Typography variant="h4">TODO LIST</Typography>

      <form onSubmit={formSubmit}>
        <Stack
          direction="row"
          justifyContent="space-between"
          alignItems="flex-end"
        >
          <TextField
            label="Title"
            variant="standard"
            value={input}
            onChange={InputChange}
            style={{ width: "100%", paddingRight: "20px" }}
          />
          <Button variant="contained" type="submit">
            {editData ? "EDIT" : "ADD"}
          </Button>
        </Stack>
      </form>

      <TodoList
        dataList={dataList}
        handleDelete={handleDelete}
        handleComplete={handleComplete}
        handleEdit={handleEdit}
      />
    </div>
  );
}

export default App;
