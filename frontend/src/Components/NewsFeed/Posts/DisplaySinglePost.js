import React, {useEffect, useContext, useState} from 'react'
import {Context} from '../../../App'
import CommentBox from '../Comments/CommentBox'

function Comment({comment}) {
    const [replyToggle, setReplyToggle] = useState(false)
    
    const nestedComments = (comment.child_comments || []).map(comment => {
        if (comment.child_comments.length>0)
        return <Comment key={comment.id} comment={comment} type="child" />
        
      
    })
    
    function handleReply() {
        setReplyToggle(!replyToggle)
    }

    return (
        <div>
            <div className="comment">
                <div className="comment__meta">
                <h5>{comment.author}</h5>
                <span>{comment.submitted}</span>
                </div>
                <p className="comment__body">{comment.content}</p>
                {replyToggle === false ? (
                    <button type="button" onClick={handleReply} >Reply</button>
                ):(
                    <CommentBox setReplyToggle={setReplyToggle} replyToggle={replyToggle}/>
                )}
            </div>
            {nestedComments}
        </div> 
        
    )
}

function DisplaySinglePost() {
    const context = useContext(Context)
    const [postData, setPostData ] = useState("")
    let commentArr
    

    useEffect(()=>{
        if (context.singlePost !== ""){
            
            commentArr = Object.values(context.singlePost.results[0].comments).map(function(val, key){
                let container ={}
                let tempComArr = new Array(key, Object.values(context.singlePost.results[0].comments[key]))
                container['id'] = key
                container['comments'] = tempComArr
                return container
            })
            setPostData(commentArr)
        }
        
    },[context.singlePost])
    return ( 
        <div className="comment-section">
            {postData !== "" ? (
                <section className="post-container">
                    <h2>{context.singlePost.results[0].title}</h2>
                    <p className="post-subject"> {context.singlePost.results[0].subject}</p>
                    <p className="post-submitted">{context.singlePost.results[0].submitted}</p>
                    <p className="post-content">{context.singlePost.results[0].content}</p>
                </section>
            ):(<h3>No Post Data</h3>)}
            <h4 className="comment-header">Comments</h4>
            {postData !== "" ? (context.singlePost.results[0].comments.map((comment)=>{
               return <Comment key={comment.id} comment={comment} />
            })):(
                <h4>hello there</h4>
            )}
        </div>
    )
}

export default DisplaySinglePost
