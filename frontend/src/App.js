import React, { useState } from "react";
import "./App.css";
import Navigation from "./Components/Navigation/Navigation";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import { Routes, Route, Navigate } from "react-router-dom";
import Auth from "./Utility/Auth";
import SignupForm from './Components/Login/Signup';
import AddPost from './Components/NewsFeed/Posts/AddPost';
import Footer from './Components/Home/Footer';
import Profile from './Components/Profile/UserProfile';
import DisplayAllPosts from './Components/NewsFeed/Posts/DisplayAllPosts'
import DisplaySinglePost from './Components/NewsFeed/Posts/DisplaySinglePost'
export const Context = React.createContext();

export function Dashboard() {
  if (Auth.isUserAuthenticated()){ return <Home />}
  else { return <Navigate to="/Login"></Navigate> }
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
  const [page, setPage] = useState("Home");
  const [data, setData] = useState({results: []});
  const [isAuth, setIsAuth] = useState(false)
  const [showTable, setShowTable] = useState(false)
  const [username, setUsername] = useState("")
  const [userid, setUserid] = useState("")
  const [posts, setPosts] = useState()
  const [singlePost, setSinglePost] = useState("")
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
  function updatePage(input) {
    setPage(input);
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
        page: page,
        username: username,
        updateUser: updateUser,
        userid: userid,
        updateUserid:updateUserid, 
        updatePage,
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
      <Navigation />
      <div className="App" id="app-root">
        <Routes>
          <Route path='/Login' element={<Login/>}/>
          <Route path='/Signup' element={<SignupForm/>}/>
          <Route path='/Addpost' element={<AddPost/>}/>
          <Route path='/PostArchive' element={<DisplayAllPosts/>}/>
          <Route path='/Post' element={<DisplaySinglePost/>}/>
          <Route path='/Profiles' element={<Profile/>}/>
          {/* <Route path='/' element={() => (isAuth ? <Home /> : <Redirect to="/Login" />)} />   */}
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </div>
      <Footer />
      {/* </Router> */}
    </Context.Provider>
  );
}
