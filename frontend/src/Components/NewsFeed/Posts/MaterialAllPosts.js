import {
    Box,
    CssBaseline,
    Typography,
    Card,
    CardContent,
    Grid,
    Container,
  } from "@material-ui/core";
//   import Pagination from "@material-ui/core/Pagination";
import { useState, useEffect } from "react";
import axios from "axios";
import Auth from '../../../Utility/Auth'

  
export default function MaterialAllPosts() {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(1);
    useEffect(() => {
        let token = Auth.getToken();
        let authStr = "Bearer " + String(token);
        async function fetchPostDetails() {
            await axios
                .get('https://api-innolab-dev.makpar-innovation.net/news/', {
                    headers: {
                        Authorization: authStr,
                    },
                })
                .then((res) => {
                    setPosts(res.data.results)
                }).catch((err) => console.log(err));
        }    
        fetchPostDetails()
    })
    return (
      <div className="App">
        <CssBaseline />
        <Container component={Box} py={3}>
          <Grid container spacing={2}>
            {posts.map((post) => (
              <Grid item sm={3}>
                <Card key={post.id} style={{ height: 250 }}>
                  <CardContent>
                    <Typography variant="h6">
                      {post.id}. {post.title}
                    </Typography>
                    <Typography variant="h2">
                      {post.subject}
                    </Typography>
                    <Typography variant="body1">{post.content}</Typography>
                  </CardContent>
                  
                </Card>
              </Grid>
            ))}
          </Grid>
          {/* <Box py={3} display="flex" justifyContent="center">
            <Pagination
              count={10}
              color="secondary"
              variant="outlined"
              onChange={(e, value) => setPage(value)}
            />
          </Box> */}
        </Container>
      </div>
    );
  }