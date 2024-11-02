import { Link } from "react-router-dom";

const UpdateUserLink = () => {
    return (
        <Link to="/updateUser">
            <button type="button">Update User</button>
        </Link>
    );
};

export default UpdateUserLink;
