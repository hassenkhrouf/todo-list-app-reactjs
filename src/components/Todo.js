import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import CheckIcon from "@mui/icons-material/Check";
import IconButton from "@mui/material/IconButton";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useContext } from "react";
import { TodosContext } from "../contexts/todosContext";
import { useToast } from "../contexts/ToastContext";

function Todo({ todo, handleDeleteOpen, handleEditClick }) {
  const { todos, setTodos } = useContext(TodosContext);
  const { showToast } = useToast();
  const handleCheckClick = (id) => {
    const updatedTodos = todos.map((t) =>
      t.id === id ? { ...t, isCompleted: !t.isCompleted } : t
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    showToast("تمت تغيير حالة المهمة.");
  };

  return (
    <Card
      className="todoCard"
      variant="outlined"
      style={{
        backgroundColor: "#283593",
        color: "white",
        marginTop: "12px",
        marginRight: "12px",
        marginLeft: "12px",
      }}
    >
      <CardContent>
        <Grid container spacing={2}>
          <Grid size={8}>
            <Typography
              variant="h5"
              sx={{
                textAlign: "right",
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              {todo.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                textAlign: "right",
                textDecoration: todo.isCompleted ? "line-through" : "none",
              }}
            >
              {todo.description}
            </Typography>
          </Grid>
          <Grid
            size={4}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <IconButton
              className="iconButton"
              aria-label="Check"
              style={{
                color: todo.isCompleted ? "white" : "#8bc34a",
                background: todo.isCompleted ? "#8bc34a" : "white",
                border: "solid 3px #8bc34a",
                height: "44px",
                width: "44px",
              }}
              onClick={() => handleCheckClick(todo.id)}
            >
              <CheckIcon />
            </IconButton>
            <IconButton
              className="iconButton"
              aria-label="Edit"
              style={{
                color: "#1769aa",
                background: "white",
                border: "solid 3px #1769aa",
                height: "44px",
                width: "44px",
              }}
              onClick={() => handleEditClick(todo)}
            >
              <EditOutlinedIcon />
            </IconButton>
            <IconButton
              className="iconButton"
              aria-label="delete"
              style={{
                color: "#b23c17",
                background: "white",
                border: "solid 3px #b23c17",
                height: "44px",
                width: "44px",
              }}
              onClick={() => handleDeleteOpen(todo)}
            >
              <DeleteOutlinedIcon />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default Todo;
