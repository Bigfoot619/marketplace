import { Link } from "react-router-dom";

const GetUserLink = () => {
    return (
        <Link to="/getUser">
            <button type="button">Get User</button>
        </Link>
    );
};

export default GetUserLink;
