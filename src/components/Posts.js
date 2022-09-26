// import { Link } from "react-router-dom";
import { useState } from "react";
// import { callApi } from "../utilities";
import CreateForm from "./CreateForm";
import Post from "./Post";

const Posts = ({ posts, setPosts, token }) => {
    const [searchValue, setSearchValue] = useState("");

    const postMatches = (post) => {
        const textToCheck = (
        post.location +
        post.description +
        post.title
        ).toLowerCase();
        return textToCheck.includes(searchValue.toLowerCase());
    };

    const filteredPosts = posts.filter((post) => {
        return postMatches(post);
        });

    return (
        <div>
        <h1>Posts</h1>
        {token && (
        <CreateForm token={token} posts={posts} setPosts={setPosts} />
        )}
        <input
            type="text"
            className="form-control my-4"
            placeholder="Search for a post"
            value={searchValue}
            onChange={(event) => setSearchValue(event.target.value)}
        />
    
        {filteredPosts.map((post) => (
            <Post key={post._id} post={post} token={token} setPosts={setPosts}/>
        ))}
        </div>
    );
};


export default Posts;
