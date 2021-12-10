import React, { useContext} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {Context} from '../../../App'
import {useNavigate} from 'react-router-dom'
import Auth from '../../../Utility/Auth'
const AddPost = () => {
  const context = useContext(Context)
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    let today = new Date()
    event.preventDefault()
    const username = context.username
    // const user_id = context.userid
    let curr_date = today.getDate();
    let curr_month = today.getMonth();
    let curr_year = today.getFullYear();
    const submitted = String(curr_year + "-" + curr_month + "-" + curr_date)
    const data = {
      title: event.target.title.value,
      submitted: submitted,
      subject: event.target.subject.value,
      content: event.target.body.value,
      user_email: username,
    }
    let token = Auth.getToken();
    let authStr = "Bearer " + String(token);
    console.log('submitted', data)
    axios
      .post('https://api-innolab-dev.makpar-innovation.net/news', data, {
        headers: {
          Authorization: authStr,
        }
      })
      .then((res) => {
        // console.log('Success: ', res.data)
        console.log(res.data)
        axios.get('https://api-innolab-dev.makpar-innovation.net/news/', 
        {
            headers: {
                Authorization: authStr,
            },
        } )
        .then(res => setAllPosts(res.data.results) )
        .catch((err) => console.log(err))
        navigate('/PostArchive')
        
      })
    
  }


  return(
    <div
      className="d-flex flex-column align-items-center background-light "
      style={{ width: "100%", minHeight: "95vh" , margin:"10px 0"}}
    >
      <h2 className="mt-3">Add Post</h2>
      <form onSubmit={handleSubmit}>
        <TextField
          id='title'
          label='Title'
          margin='normal'
          />
        <br />
        <TextField
          id='subject'
          label='subject'
          margin='normal'
          />
        <br />
        <TextField
          id='body'
          label='Body'
          multiline
          maxRows='200'
          margin="normal"
          />
        <br />
          <button type='submit'> Submit </button>
      </form>
      <br />
      <button onClick={()=> navigate('/PostArchive')}> Cancel </button>
    </div>
  )}



export default AddPost;