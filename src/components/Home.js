import { Link } from "react-router-dom";


const Home = ({ user }) => {

    return (
        <div>
            <>
            <h1>Welcome to Stranger's Things!</h1>
            <h2>Buy, Sell, and Trade with other strangers</h2>
            { user && (
                <p>
                    Logged in as <Link to="/profile"> { user.username }</Link>
                </p>
            )}
            </>
        </div>
    );
};

export default Home