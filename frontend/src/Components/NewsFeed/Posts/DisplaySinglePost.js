import React, {useEffect, useContext, useState} from 'react'
import {Context} from '../../../App'

function Comment({comment}) {
    // console.log(comment)
    const nestedComments = (comment.child_comments || []).map(comment => {
        if (comment.child_comments.length>0)
        return <Comment key={comment.id} comment={comment} type="child" />
        console.log(comment)
      
    })
  
    return (
      <div style={{"marginLeft": "25px", "marginTop": "10px"}}>
        <div>{comment.content}</div>
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
            console.log(context.singlePost.results[0].comments)
            commentArr = Object.values(context.singlePost.results[0].comments).map(function(val, key){
                let container ={}
                let tempComArr = new Array(key, Object.values(context.singlePost.results[0].comments[key]))
                container['id'] = key
                container['comments'] = tempComArr
                return container
            })
            setPostData(commentArr)
        }
        // console.log(postData)
    },[context.singlePost])
    return ( 
        <div>
            {postData !== "" ? (context.singlePost.results[0].comments.map((comment)=>{
               return <Comment key={comment.id} comment={comment} />
            })):(
                <h3>hello there</h3>
            )}
        </div>
    )
}

export default DisplaySinglePost
