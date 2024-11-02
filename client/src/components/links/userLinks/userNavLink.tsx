import { Link } from "react-router-dom";

const UserNavLink = () => {
    return (
        <Link to="/userNavigator">
            <button type="button">Users</button>
        </Link>
    );
};

export default UserNavLink;