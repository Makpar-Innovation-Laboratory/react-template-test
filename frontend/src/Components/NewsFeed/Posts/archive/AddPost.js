import React, { useContext} from 'react';
import axios from 'axios';
import {Form, Button, ButtonToolbar} from 'react-bootstrap'
import {Context} from '../../../../App'
import {useNavigate} from 'react-router-dom'
import Auth from '../../../../Utility/Auth'
import MyEditor from '../../RichText/RichTextEditor'

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
      <Form onSubmit={handleSubmit} data-testid='AddPostForm'>
        <Form.Group controlId="formTitle">
            <Form.Label>Title</Form.Label>
            <Form.Control type="text" placeholder="Enter Title" />
        </Form.Group>
        <Form.Group controlId="formSubject">
            <Form.Label>Subject</Form.Label>
            <Form.Control type="text" placeholder="Enter Subject" />
        </Form.Group>
        <Form.Group controlId="formContent">
            <Form.Label>Body</Form.Label>
            <Form.Control type="textareaautosize" placeholder="" rows="20" />
        </Form.Group>
        <br/>
        <MyEditor/>
        <br/>
        <ButtonToolbar>
          <Button type='submit' variant='primary'> Submit </Button>
          <Button onClick={()=> navigate('/PostArchive')}> Cancel </Button>
        </ButtonToolbar>
      </Form>
      <br />
    </div>
  )}



export default AddPost;