import { Link } from "react-router-dom";

const GetAllProductsLink = () => {
    return (
        <Link to="/products">
            <button type="button">Watch the Products</button>
        </Link>
    );
};

export default GetAllProductsLink;
