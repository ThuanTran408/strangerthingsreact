import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { login, register } from "../utilities";


const AccountForm = ({ setToken }) => {
    const { action } = useParams();
    const navigate = useNavigate();

    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        try {
        const authFn = action ==="login" ? login : register
        event.preventDefault();
        const { token } = await authFn(username, password)
        setToken(token);
        navigate("/");
        } catch (error) {
            console.log("err :>>", error)
            setError(error);
        }
    }
    
    const title = action === "login" ? "Log in" : "Sign up"

    return (
        <>
        <h1>{title}</h1>
        <form onSubmit={handleSubmit} >
            <label htmlFor="username" className="form-label">
            Username
            </label>
            <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            name="username"
            type="text"
            className="form-control"
            />
            <label htmlFor="password" className="form-label">
            Password
            </label>
            <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            name="password"
            type="password"
            className="form-control"
            />
            { error && <p>{error}</p> }
        <button type="submit" className="btn btn-primary mt-3">{title}</button>
        </form>
        </>
    );
};

export default AccountForm;
