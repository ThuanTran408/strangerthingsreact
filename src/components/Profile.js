import Post from "./Post";

const Profile = ({user}) => {
    if (!user) return null;

console.log('user :>> ', user);
    return (
        <div>
        <h1>{user.username}</h1>
        <h3>My posts</h3>
        {
            user.posts.map(post => <Post key={post._id} post={post} />)
        }
        </div>
    );
};

export default Profile