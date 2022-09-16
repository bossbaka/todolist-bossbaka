import React from "react";
import {
  Typography,
  List,
  ListItem,
  IconButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  Divider,
} from "@mui/material";
import Icon from "@mui/material/Icon";

const TodoList = ({ dataList, handleDelete, handleComplete, handleEdit }) => {
  return (
    <div>
      {dataList.length === 0 ? (
        <Typography>Empty</Typography>
      ) : (
        <List>
          {dataList.map((item, index) => {
            return (
              <div key={index}>
                <ListItem>
                  <ListItemIcon>
                    <Checkbox
                      checked={item.completed}
                      onChange={() => handleComplete(item)}
                    />
                  </ListItemIcon>

                  <ListItemText
                    primary={item.title}
                    style={{
                      textDecoration: item.completed ? "line-through" : "none",
                    }}
                  />

                  <div>
                    <IconButton onClick={() => handleEdit(item)}>
                      <Icon color="primary">edit</Icon>
                    </IconButton>
                    <IconButton onClick={() => handleDelete(item)}>
                      <Icon color="error">delete</Icon>
                    </IconButton>
                  </div>
                </ListItem>
                {index === dataList.length - 1 || <Divider />}
              </div>
            );
          })}
        </List>
      )}
    </div>
  );
};

export default TodoList;
