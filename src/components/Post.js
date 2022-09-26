import { callApi } from "../utilities";
import { Link } from "react-router-dom";
// import { useState} from "react";
// import React from "react";
// import Posts from "./Posts";


function Post ({ post, token, setPosts }) {
    const deletePost = async (postId) => {
        try {
            await callApi({ 
                method: "DELETE", 
                path: `/posts/${postId}`, 
                token, 
            });
            setPosts((prev) => 
                prev.filter((post) => postId !== post._id)
            );
        } catch (error) {
            console.log(error);
        }
    };

    // console.log('post._id :>> ', post._id);
return (
    <div className="card">
    <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <p className="card-text">{post.description}</p>
        <h6>Price: {post.price}</h6>
        <h6>Location: {post.location}</h6>
        <h6 >{post.willDeliver}</h6>
{ post.author?.username && <h6 className="text-info">Posted by: {post.author.username}</h6>
}    
        <Link className="card-link" to={`/posts/${post._id}`}>
        View Post
        </Link>
        {post.isAuthor && (
        <button
            className="btn btn-link text-danger"
            onClick={() => deletePost(post._id)}
        >
            Delete post
        </button>
        )}
    </div>
    </div>
)
};

export default Post