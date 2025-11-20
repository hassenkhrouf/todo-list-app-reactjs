import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { Divider } from "@mui/material";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import ToggleButton from "@mui/material/ToggleButton";
import Todo from "./Todo";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { TodosContext } from "../contexts/todosContext";
import { v4 as uuidv4 } from "uuid";
import { useContext, useState, useEffect, useMemo } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ToastContext } from "../contexts/ToastContext";

export default function TodoList() {
  const { todos, setTodos } = useContext(TodosContext);
  const [titleInput, setTitleInput] = useState("");
  const [displayedTodosType, setDisplayedTodosType] = useState("all");
  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [todoToDelete, setTodoToDelete] = useState(null);
  const [showEditAlert, setShowEditAlert] = useState(false);
  const [todoToUpdate, settodoToUpdate] = useState(null);
  const { showToast } = useContext(ToastContext);

  // Filtration Todos Based on Completion Status

  const todosCompleted = useMemo(
    () => todos.filter((t) => t.isCompleted),
    [todos]
  );
  const todosNotCompleted = useMemo(
    () => todos.filter((t) => !t.isCompleted),
    [todos]
  );

  let todosToDisplay = [];
  if (displayedTodosType === "notCompleted") {
    todosToDisplay = todosNotCompleted;
  } else if (displayedTodosType === "completed") {
    todosToDisplay = todosCompleted;
  } else if (displayedTodosType === "all") {
    todosToDisplay = todos;
  }

  // Handle Add Todo
  const handleAddClick = () => {
    const newTodo = {
      id: uuidv4(),
      title: titleInput,
      description: "",
      isCompleted: false,
    };
    const updatedTodos = [...todos, newTodo];
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setTitleInput("");
    showToast("تمت إضافة المهمة بنجاح.");
  };

  // Handle Delete Alert Open / Close / Confirm
  const handleDeleteClose = () => {
    setShowDeleteAlert(false);
    setTodoToDelete(null);
  };
  const handleDeleteOpen = (todo) => {
    setShowDeleteAlert(true);
    setTodoToDelete(todo);
  };
  const handleDeleteConfirm = () => {
    const updatedTodos = todos.filter((t) => t.id !== todoToDelete.id);
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowDeleteAlert(false);
    setTodoToDelete(null);
    showToast("تم حذف المهمة بنجاح.");
  };
  // Handle Edit Alert Open / Close / Confirm
  const handleEditClose = () => {
    setShowEditAlert(false);
    settodoToUpdate(null);
  };
  const handleEditClick = (todo) => {
    setShowEditAlert(true);
    settodoToUpdate(todo);
  };
  const handleEditConfirm = (e) => {
    e.preventDefault();
    const updatedTodos = todos.map((t) =>
      t.id === todoToUpdate.id
        ? {
            ...t,
            title: todoToUpdate.title,
            description: todoToUpdate.description,
          }
        : t
    );
    setTodos(updatedTodos);
    localStorage.setItem("todos", JSON.stringify(updatedTodos));
    setShowEditAlert(false);
    settodoToUpdate(null);
    showToast("تم تعديل المهمة بنجاح.");
  };

  // Handle display of todos
  const todoJsx = todosToDisplay.map((t) => (
    <Todo
      key={t.id}
      handleDeleteOpen={handleDeleteOpen}
      todo={t}
      handleEditClick={handleEditClick}
    />
  ));

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem("todos")) || [];
    if (storedTodos) {
      setTodos(storedTodos);
    }
  }, []);

  const card = (
    <>
      {/* Delete alert */}
      <Dialog
        open={showDeleteAlert}
        onClose={handleDeleteClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">تأكيد حذف المهمة</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            هل أنت متأكد أنك تريد حذف المهمة "
            <strong>{todoToDelete?.title}</strong>"؟
            <br />
            هذا الإجراء لا يمكن التراجع عنه وسيتم حذف المهمة نهائيًا.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose}>إلغاء</Button>
          <Button onClick={handleDeleteConfirm} autoFocus color="error">
            حذف
          </Button>
        </DialogActions>
      </Dialog>

      {/* Edit alert */}
      <Dialog
        open={showEditAlert}
        onClose={handleEditClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ direction: "rtl" }}
      >
        <DialogTitle id="alert-dialog-title">تعديل المهمة</DialogTitle>
        <DialogContent>
          <form onSubmit={handleEditConfirm} id="subscription-form">
            <TextField
              autoFocus
              required
              margin="dense"
              id="title"
              name="title"
              label="عنوان المهمة"
              value={todoToUpdate?.title}
              onChange={(e) =>
                settodoToUpdate({ ...todoToUpdate, title: e.target.value })
              }
              fullWidth
              variant="standard"
            />
            <TextField
              autoFocus
              margin="dense"
              id="description"
              name="description"
              label="الوصف"
              value={todoToUpdate?.description}
              onChange={(e) =>
                settodoToUpdate({
                  ...todoToUpdate,
                  description: e.target.value,
                })
              }
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleEditClose}>إلغاء</Button>
          <Button
            type="submit"
            form="subscription-form"
            autoFocus
            color="secondary"
          >
            تعديل
          </Button>
        </DialogActions>
      </Dialog>

      <CardContent>
        <Typography variant="h2" component="div" style={{ fontWeight: "bold" }}>
          مهامي
        </Typography>
        <Divider />
        <ToggleButtonGroup
          value={displayedTodosType}
          exclusive
          onChange={(e, value) => setDisplayedTodosType(value)}
          aria-label="text alignment"
          style={{ direction: "ltr", marginTop: "24px" }}
        >
          <ToggleButton value="notCompleted">غير المنجز</ToggleButton>
          <ToggleButton value="completed">المنجز</ToggleButton>
          <ToggleButton value="all">الكل</ToggleButton>
        </ToggleButtonGroup>
        <div
          style={{
            marginTop: "16px",
            maxHeight: "50vh",
            overflowY: "auto",
            overflowX: "hidden",
            paddingBottom: "24px",
          }}
        >
          {todoJsx}
        </div>
        <Grid container spacing={2} style={{ marginTop: "24px" }}>
          <Grid
            size={8}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <TextField
              id="outlined-basic"
              label="عنوان المهمة"
              variant="outlined"
              style={{ width: "100%" }}
              value={titleInput}
              onChange={(e) => setTitleInput(e.target.value)}
            />
          </Grid>
          <Grid
            size={4}
            display="flex"
            justifyContent="space-around"
            alignItems="center"
          >
            <Button
              variant="contained"
              style={{ width: "100%", height: "100%" }}
              onClick={handleAddClick}
              disabled={!titleInput}
            >
              إضافة
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </>
  );

  return (
    <Container maxWidth="sm">
      <Card variant="outlined">{card}</Card>
    </Container>
  );
}
