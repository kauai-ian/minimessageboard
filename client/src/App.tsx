import "./App.css";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router";
import MessageBoard from "./pages/MessageBoard";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import AuthRoute from "./components/AuthRoute";
import Signup from "./pages/Signup";

function App() {
 
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<MessageBoard />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
             </AuthRoute>
          }
        />
        <Route path="/signup" element={<Signup />} />
        {/* <Route path="/messages" element={<AuthRoute><MessageBoard /></AuthRoute>} /> to be done in future feature to have users post if logged in*/}
          
      </Routes>
    </>
  );
}

export default App;
