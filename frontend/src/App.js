import React, { useState } from "react";
import "./App.css";
// import Navigation from "./Components/Navigation/Navigation";
import MaterialNavigation from './Components/Navigation/MaterialNavigation'
import Home from "./Components/Home/Home";
// import Login from "./Components/Login/Login";
import MaterialLogin from "./Components/Login/MaterialLogin"
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Utility/Auth";
// import SignupForm from './Components/Login/Signup';
import MaterialSignup from './Components/Login/MaterialSignup';
// import AddPost from './Components/NewsFeed/Posts/AddPost';
import MaterialAddPost from './Components/NewsFeed/Posts/MaterialAddPost';
// import Footer from './Components/Home/Footer';
import Profile from './Components/Profile/UserProfile';
// import DisplayAllPosts from './Components/NewsFeed/Posts/DisplayAllPosts'
import MaterialAllPosts from './Components/NewsFeed/Posts/MaterialAllPosts'
import DisplaySinglePost from './Components/NewsFeed/Posts/DisplaySinglePost'
import MissionStatement from './Components/Mission/MissionStatement'

export const Context = React.createContext();

export function Dashboard() {
  if (Auth.isUserAuthenticated()){ return <Home />}
  else { return <Navigate to="/Login"></Navigate> }
  return <Home />
}

/**
 * @component
 *
 * @property {}
 *
 * @description
 * description goes here
 *
 * @returns {}
 */
export default function App() {
  
  const [data, setData] = useState({results: []});
  const [isAuth, setIsAuth] = useState(false)
  const [showTable, setShowTable] = useState(false)
  const [username, setUsername] = useState("")
  const [userid, setUserid] = useState("")
  const [posts, setPosts] = useState()
  const [singlePost, setSinglePost] = useState("")
  const [markDown, setMarkdown] = useState()
  /**
   * description goes here
   * @returns {boolean}
   */
  function checkAuth() {
    if (Auth.isUserAuthenticated()) { return true; }
    else { return false; }
  }

  /**
   * description goes here
   * @param {string} input
   */
  function handleSetPosts(posts){
    setPosts(posts)
  }
  function handleRemovePosts() {
    console.log('removed')
  }
  function displaySinglePost(input) {
    setSinglePost(input)
  }
  function handleSetMarkdown(input){
    setMarkdown(input)
  }
  function updateData(inputs) {
    setData(inputs);
  }
  function updateUser(input) {
    setUsername(input)
  }
  function updateUserid(input) {
    setUserid(input)
  }
  function updateTableVis(input) {
    setShowTable(input)
  }
  /**
   * description goes here
   * @returns {}
   */

  return (
    <Context.Provider
      value={{
        
        username: username,
        updateUser: updateUser,
        userid: userid,
        updateUserid:updateUserid, 
        markDown: markDown,
        handleSetMarkdown: handleSetMarkdown,
        data,
        updateData,
        showTable,
        updateTableVis,
        isAuth: isAuth,
        setAuth: (bool) => setIsAuth(bool),
        postsState: posts,
        singlePost:singlePost,
        displaySinglePost:displaySinglePost,
        handleAddPosts: (posts) => handleSetPosts(posts),
        handleRemovePosts: () => handleRemovePosts(),
        
      }}
    >
      {/* <Router> */}
      {/* <Navigation /> */}
      <MaterialNavigation/>
      <div className="App">
        <Routes>
          <Route path='/Login' element={<MaterialLogin/>}/>
          <Route path='/Signup' element={<MaterialSignup/>}/>
          <Route path='/Mission' element={<MissionStatement/>}/>
          <Route path='/Addpost' element={<MaterialAddPost/>}/>
          <Route path='/PostArchive' element={<MaterialAllPosts/>}/>
          <Route path='/Post' element={<DisplaySinglePost/>}/>
          <Route path='/Profiles' element={<Profile/>}/>
          {/* <Route path='/' element={() => (isAuth ? <Home /> : <Redirect to="/Login" />)} />   */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
      {/* <Footer /> */}
      {/* </Router> */}
    </Context.Provider>
  );
}
