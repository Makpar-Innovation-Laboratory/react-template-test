import React, {useContext} from "react";
import {Context} from '../../../App'
import {useNavigate} from 'react-router-dom'
import Auth from '../../../Utility/Auth'
import axios from 'axios'
const Post = ({ title, content, submitted, subject, editPost, id, deletePost }) => {
  const context = useContext(Context)
  const navigate = useNavigate()
  function handleClick() {
    
    let token = Auth.getToken();
    let authStr = "Bearer " + String(token);
    let getStr = 'https://api-innolab-dev.makpar-innovation.net/news/' + String(id)
    axios.get(getStr, 
        {
          headers: {
                Authorization: authStr,
            },
        }
      ).then((res) => {
        // console.log(res.data)
        context.displaySinglePost(res.data)
        navigate('/Post')
      })
    }
  return (
    <>
      <section className="post-container">
        <h2>{title}</h2>
        <p className="post-subject"> {subject}</p>
        <p className="post-submitted">{submitted}</p>
        <button className="button" onClick={handleClick}>View Post</button>
        {/* <button className="button" onClick={() => editPost(id)}>Edit</button>
        <button className="button" onClick={() => deletePost(id)}>Delete</button> */}
      </section>
    </>
  );
};
export default Post;