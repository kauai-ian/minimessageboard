import "./App.css";
import MessageForm from "./components/MessageForm";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import { MessageBoard } from "./pages/MessageBoard";

// set API for messageBoard
const API_MessageBoard = "http://localhost:3000";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        <MessageBoard>
          <MessageForm addMessage={addMessage} />
        </MessageBoard>
      </Routes>
    </>
  );
}

export default App;
