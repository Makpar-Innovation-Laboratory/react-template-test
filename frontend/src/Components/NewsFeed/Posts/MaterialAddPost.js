import React, { useContext } from 'react';
import axios from 'axios';
import { Button, CssBaseline, TextField, Toolbar, Box, Typography, Container } from '@material-ui/core';
import { createTheme, ThemeProvider } from '@material-ui/core/styles';
import { Context } from '../../../App'
import { useNavigate } from 'react-router-dom'
import Auth from '../../../Utility/Auth'
import MyEditor from '../RichText/RichTextEditor'

const theme = createTheme();

const MaterialAddPost = () => {
    const context = useContext(Context)
    const navigate = useNavigate()
    const handleSubmit = (event) => {
        event.preventDefault()
        let today = new Date()
        const username = context.username
        // const user_id = context.userid
        let curr_date = today.getDate();
        let curr_month = today.getMonth();
        let curr_year = today.getFullYear();
        const submitted = String(curr_year + "-" + curr_month + "-" + curr_date)
        console.log(context.markDown)
        const data = {
            title: event.target.title.value,
            submitted: submitted,
            subject: event.target.subject.value,
            content: context.markDown,
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
                    })
                    .then(res => setAllPosts(res.data.results))
                    .catch((err) => console.log(err))
                navigate('/PostArchive')

            })

    }


    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="xs" component="main">
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <CssBaseline />
                    <Box onSubmit={handleSubmit} component="form" noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="title"
                            label="title"
                            name="title"
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="subject"
                            label="subject"
                            id="subject"

                        />
                        <br />
                        <MyEditor />
                        <br />
                        <Toolbar>
                            <Button variant='outlined' onClick={() => navigate('/PostArchive')}> Cancel </Button>
                            <Button type='submit' variant='contained'> Submit </Button>

                        </Toolbar>
                    </Box>
                </Box>
            </Container>
        </ThemeProvider>
    )
}



export default MaterialAddPost;