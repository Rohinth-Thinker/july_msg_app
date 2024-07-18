import { Routes, Route } from "react-router-dom";
import FooterContainer from "./pages/Home/FooterContainer"
import HomePage from "./pages/Home/HomePage"
import Login from "./pages/Login/Login"
import ProfilePage from "./pages/Profile/ProfilePage"
import Signup from "./pages/Signup/Signup"

function App() {

  return (
    <Routes>
      <Route path="/home" element={<> <HomePage /> <FooterContainer tab={"home"} /> </>} />
      <Route path="/profile" element={<> <ProfilePage /> <FooterContainer tab={"profile"} /> </>} />
    </Routes>
  )
}

export default App;
