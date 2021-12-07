import React, { useContext} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {Context} from '../../App'
import {useNavigate} from 'react-router-dom'

const AddPost = () => {
  const context = useContext(Context)
  const navigate = useNavigate()
  const handleSubmit = (event) => {
    event.preventDefault()
    const user_id = context.username
    const username = context.userid
    const submitted = today.toUTCString()
    const data = {
      title: event.target.title.value,
      submitted: submitted,
      subject: event.target.subject.value,
      body: event.target.body.value,
      username: username,
      uid: user_id
    }
    // add axios call here for api gateway
    console.log(data)
  }


  return(
    <div>
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
      <button onClick={()=> navigate('/Addpost')}> Cancel </button>
    </div>
  )}



export default AddPost;