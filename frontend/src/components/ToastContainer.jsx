import { ToastContainer as ReactToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ToastContainer = () => {
  return (
    <ReactToastContainer
      position="bottom-left"
      autoClose={3000}
      hideProgressBar={true}
      closeButton={false}
      newestOnTop={false}
      pauseOnFocusLoss={false}
      pauseOnHover={false}
      rtl={false}
      draggable={false}
      limit={3}
    />
  );
};

export default ToastContainer;
