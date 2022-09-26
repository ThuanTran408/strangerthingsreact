import { Link, Route, Routes, useNavigate } from "react-router-dom";
import { callApi, fetchUser } from "../utilities";
import { useEffect, useState } from "react";

import AccountForm from "./AccountForm";
import Home from "./Home";
import Posts from "./Posts";
import Profile from "./Profile";
import SinglePost from "./SinglePost";

const App = () => {
    const navigate = useNavigate();

    const [posts, setPosts] = useState([]);
    const [token, setToken] = useState(
        window.localStorage.getItem("token") || ""
    );
    const [user, setUser] = useState(null);

    const logout = () => {
        setToken("");
        setUser(null);
        navigate("/");
    };

    useEffect(() => {
        const getPosts = async () => {
        try {
            const { posts } = await callApi({ path: "/posts", token });
            setPosts(posts);
        } catch (error) {
            console.log("error :>> ", error);
        }
        };
        getPosts();
    }, [token]);

    useEffect(() => {
        if (token) {
        const getUser = async () => {
            const user = await fetchUser(token);
            // console.log('response :>> ', response);
            setUser(user);
        };
        getUser();
        }
    }, [token]);


    useEffect(() => {
        window.localStorage.setItem("token", token);
    }, [token]);

    return (
        <div className="p-3">
        <nav className="d-flex justify-content-between mb-4">
            <div>
            <Link className="me-2" to="/">
                Home
            </Link>
            <Link className="me-2" to="/posts">
                Posts
            </Link>
            <Link to="/profile">Profile</Link>
            </div>
            <div>
            {token ? (
                <button className="btn btn-link" onClick={logout}>
                Log out
                </button>
            ) : (
                <>
                <Link className="me-2" to="/account/login">
                    Login
                </Link>
                <Link to="/account/signup">Sign Up</Link>
                </>
            )}
            </div>
        </nav>
        <Routes>
            <Route path="/" element={<Home user={user} />} />
            <Route
            path="/posts"
            element={<Posts posts={posts} token={token} setPosts={setPosts} />}
            />
            <Route path="/profile" element={<Profile user={user} />} />
            <Route
            path="/posts/:postId"
            element={<SinglePost posts={posts} token={token} user={user} />}
            />
            <Route
            path="/account/:action"
            element={<AccountForm setToken={setToken} />}
            />
        </Routes>
        </div>
    );
};

export default App;
