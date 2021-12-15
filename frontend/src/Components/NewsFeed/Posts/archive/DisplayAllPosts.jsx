import React, { useState, useRef, useContext, useEffect } from "react";
import Post from "../Post";
import ModifyPost from "./ModifyPost"
import {Context} from '../../../../App'
import Auth from '../../../../Utility/Auth'
import axios from 'axios'
import { Link } from 'react-router-dom';
import Button from '@material-ui/core/Button';

const DisplayAllPosts = () => {
  const context = useContext(Context)
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [allPosts, setAllPosts] = useState([]);
  const [isCreateNewPost, setIsCreateNewPost] = useState(false);
  const [isModifyPost, setIsModifyPost] = useState(false);
  const [editPostId, setEditPostId] = useState("");
  const [firstRend, setFirstRend] = useState(false)
  // Initialize useRef
  const getTitle = useRef();
  const getContent = useRef();
  useEffect(() => {
    if (firstRend === false){  
      let token = Auth.getToken();
      let authStr = "Bearer " + String(token);
      axios.get('https://api-innolab-dev.makpar-innovation.net/news/', 
          {
              headers: {
                  Authorization: authStr,
              },
          } )
          .then(res => setAllPosts(res.data.results) )
          .catch((err) => console.log(err))
    }
    setFirstRend(true)  
  }, [context.posts])
  const savePostTitleToState = event => {
    setTitle(event.target.value);
  };
  const savePostContentToState = event => {
    setContent(event.target.value);
  };
  const toggleModifyPostComponent = () => {
    setIsModifyPost(!isModifyPost)
  }
  const editPost = id => {
    setEditPostId(id);
    console.log(id)
    toggleModifyPostComponent();
  };
  const deletePost = id => {
    const modifiedPost = allPosts.filter(eachPost => {
      return eachPost.id !== id;
    });
    setAllPosts(modifiedPost);
  };
  const updatePost = (event) => {
    event.preventDefault();
    const updatedPost = allPosts.map(eachPost => {
      if (eachPost.id === editPostId) {
        console.log([eachPost.id, editPostId] )
        return {
          ...eachPost,
          title: title || eachPost.title,
          content: content || eachPost.content
        };
      }
      console.log(eachPost)
      return eachPost;
    });
    setAllPosts(updatedPost);
    toggleModifyPostComponent();
  };
  if (isModifyPost) {
    const post = allPosts.find(post => {
      return post.id === editPostId;
    });
    return (
      <ModifyPost
        title={post.title}
        content={post.content}
        updatePost={updatePost}
        savePostTitleToState={savePostTitleToState}
        savePostContentToState={savePostContentToState}
      />
    );
  }
  return (
    <div
      className="flex-column align-items-center background-light "
      style={{ width: "100%" }}
    >
      {!allPosts.length ? (
        <section className="no-post">
          <h1>Loading Posts</h1>
          <br />
          <br />
          <section className="button-wrapper">
          <Link to="/Addpost">
              <Button variant="contained" color="primary">
              Add Post
              </Button>
          </Link>
          </section>
          </section>
        ) : (
        <div><h1>All Posts</h1>
          <section className="all-post">
          <section className="button-wrapper">
            <Link to="/Addpost">
              <Button variant="contained" color="primary">
                Add Post
              </Button>
            </Link>
          </section>
          {allPosts.map(eachPost => {
            return (
            <Post
              id={eachPost.news_id}
              key={eachPost.news_id}
              subject={eachPost.subject}
              submitted={eachPost.submitted}
              title={eachPost.title}
              content={eachPost.content}
              editPost={editPost}
              deletePost={deletePost}
            />
          );
        })}
      
        </section>
        
        </div>
      )}

      
    </div>
  );
};
export default DisplayAllPosts;