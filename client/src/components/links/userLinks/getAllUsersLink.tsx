import { Link } from "react-router-dom";

const GetAllUsersLink = () => {
    return (
        <Link to="/getAllUsers">
            <button type="button">Show Users</button>
        </Link>
    );
};

export default GetAllUsersLink;
