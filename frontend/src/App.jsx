import "./App.css";
import { Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
import Login from "./pages/login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import appStore from "./utils/appStore";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div>
      <Provider store={appStore}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/home" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </Provider>
    </div>
  );
};
export default App;
