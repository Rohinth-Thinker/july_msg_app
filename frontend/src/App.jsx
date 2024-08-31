import { Routes, Route } from "react-router-dom";
import PostDetails from "./comp/Post/create/PostDetails";
import PostStyles from "./comp/Post/create/PostStyles";
import { useAuthContext } from "./context/AuthContext";
import ExplorePage from "./pages/Explore/ExplorePage";
import { Header } from "./pages/Home/components/PostComponents";
import FooterContainer from "./pages/Home/FooterContainer"
import HomePage from "./pages/Home/HomePage"
import InboxContainer from "./pages/direct/inbox/InboxContainer";
import FollowersPage from "./pages/List/FollowersPage";
import { FollowingPage } from "./pages/List/FollowingPage";
import Login from "./pages/Login/Login"
import SinglePost from "./pages/Profile/components/SinglePost";
import EditProfile from "./pages/Profile/EditProfile";
import ProfilePage from "./pages/Profile/ProfilePage"
import Signup from "./pages/Signup/Signup"
import MessageContainer from "./pages/direct/threads/MessageContainer";
import NewChatContainer from "./pages/direct/newChat/NewChatContainer";

function App() {
  const { authUser } = useAuthContext();
  return (
    <Routes>

      <Route path="/signup" element={ <Signup /> } />
      <Route path="/signin" element={ <Login /> } />

      <Route path="/home" element={<> <HomePage /> <FooterContainer tab={"home"} /> </>} />
      <Route path="/:requestUsername" element={<> <ProfilePage /> <FooterContainer tab={"profile"} /> </>} />
      <Route path="/p/:postId" element={<> <Header header={"Post"} /> <SinglePost /> </>} />
      <Route path="/:requestUsername/followers" element={<> <Header header={"Followers"} /> <FollowersPage /> <FooterContainer /> </>} />
      <Route path="/:requestUsername/following" element={<> <Header header={"Following"} /> <FollowingPage /> <FooterContainer /> </>} />
      <Route path="/explore" element={<> <ExplorePage /> <FooterContainer tab={"explore"} /> </>} />
      <Route path="/accounts/edit" element={ <> <Header header={"Edit Profile"} /> <EditProfile />  <FooterContainer /> </>} />
      <Route path="/create/styles" element={ <> <PostStyles /> </> } />
      <Route path="/create/details" element={ <> <PostDetails /> </> } />

      <Route path="/direct/inbox" element={ <> <Header header={authUser.username} /> <InboxContainer /> </> } />
      <Route path="/direct/t" element={ <> <MessageContainer /> </> } />
      <Route path="/direct/new" element={ <> <NewChatContainer /> </> } />

    </Routes>
  )
}

export default App;
