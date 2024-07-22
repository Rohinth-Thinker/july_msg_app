import { Routes, Route } from "react-router-dom";
import { Header } from "./pages/Home/components/PostComponents";
import FooterContainer from "./pages/Home/FooterContainer"
import HomePage from "./pages/Home/HomePage"
import Post from "./pages/Home/Post";
import FollowersPage from "./pages/List/FollowersPage";
import FollowingPage from "./pages/List/FollowingPage";
import Login from "./pages/Login/Login"
import ProfilePage from "./pages/Profile/ProfilePage"
import Signup from "./pages/Signup/Signup"

function App() {

  return (
    <Routes>
      <Route path="/home" element={<> <HomePage /> <FooterContainer tab={"home"} /> </>} />
      <Route path="/:requestUsername" element={<> <ProfilePage /> <FooterContainer tab={"profile"} /> </>} />
      <Route path="/p/:postId" element={<> <Header header={"Post"} /> <Post /> </>} />
      <Route path="/:requestUsername/followers" element={<> <Header header={"Followers"} /> <FollowersPage /> <FooterContainer /> </>} />
      <Route path="/:requestUsername/following" element={<> <Header header={"Following"} /> <FollowingPage /> <FooterContainer /> </>} />
    </Routes>
  )
}

export default App;
