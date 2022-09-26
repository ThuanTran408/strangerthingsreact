import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { callApi } from "../utilities";

function SinglePost({ posts, token }) {
    const [content, setContent] = useState("");
    const { postId } = useParams();
    console.log('useParams() :>> ', useParams());
    // console.log('postId :>> ', postId);

    const post = posts.find((post) => post._id === postId);
    console.log('postId :>> ', postId);
    console.log('post :>> ', post);
    const handleSubmit = async (event) => {

    try {
        event.preventDefault();
        const { message } = await callApi({
        path: `/posts/${post._id}/messages`,
        method: "POST",
        body: { message: { content } },
        token,
        });
        setContent("");
        console.log('message :>> ', message);
    } catch (error) {
        console.log(error)
    }
    };

    const canMessagePost = post && !post.isAuthor && 
    token;


    return (
    // <div>Single Post</div>
        <div>
        {post ? (
            <>
            <h1>{post.title}</h1>
            <h3>Posted by: {post.author.username}</h3>
            <p>Price: {post.price}</p>
            <p>{post.description}</p>
            {post?.isAuthor && (
                <>
                <h2>Messages</h2>
                {post.messages.map((message) => (
                <div key={message._id}> 
                <p>{message.content}</p> 
                <p>- {message.author.username}</p> 
                </div>
                ))}
                </>
                )}
                {canMessagePost && (
                <form onSubmit={handleSubmit}>
                    <textarea
                        type="text"
                        value={content}
                        onChange={(event) => setContent(event.target.value)}
                        className="form-control"
                    />
                <button type="submit" className="btn btn-secondary">Send</button>
            </form>
            )}
            </>
        ) : (
            <p>No Messages</p>
        )}
        <Link to="/posts">Back to Posts</Link>
        </div>
    );
}

export default SinglePost;
