import React, { useContext} from 'react';
import axios from 'axios';
import TextField from '@material-ui/core/TextField';
import {Context} from '../../App'


const AddPost = () => {
  const context = useContext(Context)

  const handleSubmit = (event) => {
    event.preventDefault()
    const user_id = context.dbProfileState[0].uid
    const username = context.dbProfileState[0].username
    const data = {
      title: event.target.title.value,
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
            id='body'
            label='Body'
            multiline
            rowsMax='4'
            margin="normal"
            />
           <br />
           <button type='submit'> Submit </button>
           </form>
        <br />
        <button onClick={}> Cancel </button>
      </div>
  )}



export default AddPost;