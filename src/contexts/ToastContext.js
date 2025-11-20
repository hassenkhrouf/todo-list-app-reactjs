import { useState, useContext, createContext } from "react";
import MySnackbar from "../components/MySnackBar";

export const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("success");

  const showToast = (message, type) => {
    setMessage(message);
    setType(type);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 3000);
  };

  return (
    <ToastContext.Provider value={{ open, message, type, showToast }}>
      {children}
      <MySnackbar open={open} message={message} type={type} />
    </ToastContext.Provider>
  );
};

// Custom Hook
export const useToast = () => {
  const { showToast } = useContext(ToastContext);
  return { showToast };
};
