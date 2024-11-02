import { Link } from "react-router-dom";

const UpdateProductLink = () => {
    return (
        <Link to="/updateProduct">
            <button type="button">Update Product</button>
        </Link>
    );
};

export default UpdateProductLink;
