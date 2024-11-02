import { Link } from "react-router-dom";

const MyProductsLink = () => {
    return (
        <Link to="/myProducts">
            <button type="button">My Products</button>
        </Link>
    );
};

export default MyProductsLink;
