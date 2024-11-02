import { Link } from "react-router-dom";

const DeleteUserLink = () => {
    return (
        <Link to="/deleteUser">
            <button type="button">Delete User</button>
        </Link>
    );
};

export default DeleteUserLink;
