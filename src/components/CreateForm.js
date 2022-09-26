import { useState } from "react";
import { createRoutesFromChildren } from "react-router-dom";
import { callApi } from "../utilities";


const CreateForm = ({ posts, setPosts, token }) => {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [location, setLocation] = useState("");


    const createPost = async (event) => {
        // console.log(title, description, price)
        event.preventDefault();
        try {
        const { post } = await callApi ({
            method: "POST",
            path: "/posts", 
            token,
                body: {
                    post: {
                    title,
                    description,
                    price,
                    location,
                },
        },
    });
        post.isAuthor = true;
        setPosts((prev) => [post, ...prev]);
        setTitle("");
        setDescription("");
        setPrice("");
        setLocation("")
        } catch (error) {
        console.log(error);
    }
    };

    return (
        <>
        <h4 className="text-info">Create a Post</h4>
        <form onSubmit={createPost} className="mb-4">
            <label htmlFor="title">Title</label>
            <input
            type="text"
            name="title"
            className="form-control"
            placeholder="add title"
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            />
            <label htmlFor="title">Description</label>
            <input
            type="text"
            name="description"
            className="form-control"
            placeholder="add description"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            />
            <label htmlFor="title">Price</label>
            <input
            type="text"
            name="price"
            className="form-control"
            placeholder="add price"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            />
            <label htmlFor="title">Location</label>
            <input
            type="text"
            name="location"
            className="form-control"
            placeholder="add location"
            value={location}
            onChange={(event) => setLocation(event.target.value)}
            />
            <button type="submit" className="btn btn-primary mt-2">
            Add post
            </button>
        </form>
        </>
    );
};

export default CreateForm;
