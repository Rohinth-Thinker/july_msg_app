import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/auth/login/Login";
import Signup from "./pages/auth/signup/Signup"

import PostDetails from "./comp/Post/create/PostDetails";
import PostStyles from "./comp/Post/create/PostStyles";
import { useAuthContext } from "./context/AuthContext";
import ExplorePage from "./pages/Explore/ExplorePage";
import { Header } from "./comp/Header";
import FooterContainer from "./comp/footer/FooterContainer"
import HomePage from "./pages/Home/HomePage"
import InboxContainer from "./pages/direct/inbox/InboxContainer";
import FollowersPage from "./pages/List/FollowersPage";
import { FollowingPage } from "./pages/List/FollowingPage";
import SinglePost from "./pages/Profile/components/SinglePost";
import EditProfile from "./pages/Profile/EditProfile";
import ProfilePage from "./pages/Profile/ProfilePage"
import MessageContainer from "./pages/direct/threads/MessageContainer";
import NewChatContainer from "./pages/direct/newChat/NewChatContainer";
import { NewChatButton } from "./pages/direct/inbox/components/InboxContainerComponents";
import CommentsContainer from "./comp/Post/postComments/CommentsContainer";

function App() {
  const { authUser } = useAuthContext();

  return (
    <Routes>
      
      <Route path="/signup" element={ authUser ? <Navigate to="/home" /> : <Signup /> } />
      <Route path="/signin" element={ authUser ? <Navigate to="/home" /> : <Login /> } />

      <Route path="/home" element={ authUser ? <> <HomePage /> <FooterContainer tab={"home"} /> </> : <Login /> } />
      <Route path="/create/styles" element={ <> <PostStyles /> </> } />
      <Route path="/create/details" element={ <> <PostDetails /> </> } />

      <Route path="/:requestUsername" element={<> <ProfilePage /> <FooterContainer tab={"profile"} /> </>} />
      <Route path="/:requestUsername/followers" element={<> <Header header={"Followers"} /> <FollowersPage /> <FooterContainer /> </>} />
      <Route path="/:requestUsername/following" element={<> <Header header={"Following"} /> <FollowingPage /> <FooterContainer /> </>} />
      <Route path="/accounts/edit" element={ <> <Header header={"Edit Profile"} /> <EditProfile />  <FooterContainer /> </>} />
      
      <Route path="/p/:postId" element={<> <Header header={"Post"} /> <SinglePost /> <FooterContainer /> </>} />
      <Route path="/p/:postId/comments" element={<> <Header header={"Comments"} /> <CommentsContainer /> <FooterContainer /> </>} />
      <Route path="/explore" element={<> <ExplorePage /> <FooterContainer tab={"explore"} /> </>} />


      <Route path="/direct/inbox" element={ <> <Header header={authUser?.username}> <NewChatButton /> </Header> <InboxContainer /> </> } />
      <Route path="/direct/t/:conversationId" element={ <> <MessageContainer /> </> } />
      <Route path="/direct/new" element={ <> <NewChatContainer /> </> } />

    </Routes>
  )
}

export default App;
