import { Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Chat from "./components/Chat";
import People from "./components/People";
import "react-toastify/ReactToastify.css";

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login  />} />
        <Route path="/signup" element={<Signup />} />
        <Route
          path="/people"
          element={<People />}
        />
        <Route
          path="/chat"
          element={<Chat/>}
        />
      </Routes>
    </>
  );
}

export default App;
