import { Link } from "react-router-dom";

const ProductNavLink = () => {
    return (
        <Link to="/productNavigator">
            <button type="button">Products</button>
        </Link>
    );
};

export default ProductNavLink;